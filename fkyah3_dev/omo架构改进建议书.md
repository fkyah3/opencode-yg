# omo 架构改进建议书

> 基于 2026 年 agent 编排领域架构调研
> 对比 Claude Code、Spring AI、Anthropic Research、Kimi K2.5 等行业参考实现

---

## 一、当前架构定位

omo 采用的是 **Hierarchical Supervisor（分层编排）** 模式——2026 年的行业默认标准。和 Claude Code、Cursor、Windsurf、Spring AI **本质上是同一套架构**：

```
用户 → Sisyphus（主编排器）
         ├── task(category, prompt) → 子 agent（独立上下文）
         ├── task(subagent_type)     → 专用 agent（Oracle/Explore...）
         └── 直接工具调用           → 简单任务自己处理
```

**方向正确**。omo 没走错路。需要改进的是**实现细节**而非顶层设计。

---

## 二、六个改进点

### 改进 1：固定子 agent 深度为 1（最高优先级）

**现状**：
- 子 agent 可以通过 task() 继续 spawn 子 agent
- maxDepth 默认 3，通过 lineage 安全检查控制
- lineage 安全检查需要 `session.get` 解析血缘关系
- **fail-closed**：一旦血缘解析失败，全部子 agent 都被阻止

**行业参考**（Claude Code / Spring AI）：
- 子 agent **不允许** spawn 子 agent（depth=1）
- Claude Code：`Agent` 工具的子 agent 没有 `Agent` 工具
- Spring AI：`Subagents cannot spawn their own subagents. Don't include Task in a subagent's tools list`
- 不需要 lineage 安全检查，因为深度固定

**改进方案**：

```typescript
// src/tools/task.ts
// 在当前会话 role 中标记 isSubagent
// 如果是子 agent 的上下文，task() 工具直接返回"不支持嵌套"

export const taskTool = (ctx) => {
  if (ctx.session.isSubagent) {
    return {
      type: "text",
      text: "子 agent 不能创建子 agent。请直接在当前上下文中完成，或将任务报告给父 agent。",
    }
  }
  // 正常 task 逻辑...
}
```

**代价**：
- 改动量：1 个文件，约 5 行
- 效果：**直接解决 spawn 安全检查 fail-closed 问题**，不再需要 `resolveSubagentSpawnContext`

**优先级**：P0（最高，修完 spawn 问题）

---

### 改进 2：子 agent 只返回摘要（高优先级）

**现状**：
- 子 agent 的完整对话内容会作为 tool result 返回到父 agent 上下文中
- 父 agent 上下文被子 agent 的中间步骤污染
- 长对话中，父 agent 上下文膨胀严重

**行业参考**（Claude Code）：
- 子 agent 只返回 **最终结果摘要**
- "Only their summary returns"——父 agent 看到的只是子 agent 的总结
- 子 agent 有自己的上下文窗口，完全不污染父 agent
- 父 agent 上下文增长 = 摘要大小，不是完整对话大小

**改进方案**：

```typescript
// 在 task() 工具完成时，对子 agent 的完整对话做摘要压缩
// 只把摘要返回给父 agent，而不是完整对话

// 方案 A（简单）：截取子 agent 的最终输出
const subagentResult = subagent.output.slice(-2000) // 只取最后 2000 字符

// 方案 B（更好）：让子 agent 自己生成摘要
const summary = await subagent.summarize()
// 子 agent 在结束时被要求："请总结你的发现，不超过 500 字"
```

**代价**：
- 改动量：`task.ts` + background manager，约 30-50 行
- 风险：子 agent 摘要可能丢失细节（需要设计好摘要格式）

**优先级**：P1

---

### 改进 3：异步 + 定时任务模式（中优先级）

**现状**：
- `task()` 只有同步模式：阻塞等待子 agent 完成
- 子 agent 运行时，父 agent 被阻塞

**行业参考**（Inngest / Claude Code）：
- 三种模式：
  - **Sync（同步）**：`"Do this and wait"`——当前行为
  - **Async（异步）**：`"Go do this, report back"`——父 agent 不等待，继续工作；子 agent 完成后直接回复用户
  - **Scheduled（定时）**：`"Do this later"`——在指定时间执行

**改进方案**：

```typescript
// task() 参数新增 mode 字段
task({
  category: "explore",
  prompt: "...",
  mode: "async", // "sync" | "async" | "scheduled"
  schedule: "2026-05-01T00:00:00Z", // scheduled 模式下使用
})

// async 模式下：
// 1. 子 agent 在后台启动
// 2. 父 agent 立即返回"已启动，稍后汇报"
// 3. 子 agent 完成后通过 runAgent 回调通知用户
```

**代价**：
- 改动量：task 工具 + background manager + runAgent 回调，约 100-150 行
- 好处：长任务不再阻塞主对话

**优先级**：P2

---

### 改进 4：子 agent 多模型路由（中优先级）

**现状**：
- 子 agent 使用和父 agent 相同的模型
- 不区分任务类型和模型匹配

**行业参考**（Anthropic Research / Spring AI）：
- 父 agent 用强模型（Opus），子 agent 用便宜模型（Sonnet/Haiku）
- Spring AI：子 agent 定义中指定 `preferredModel`
- Anthropic Research：Opus 做判断，Haiku 做搜索，token 成本降低 ~70%

**改进方案**：

```typescript
// category 到 model 的映射表
const categoryModelMap = {
  "quick": "deepseek-chat",        // 简单任务 → 便宜模型
  "explore": "deepseek-chat",      // 搜索 → 便宜模型
  "deep": "deepseek-reasoner",     // 深度任务 → 强模型
  "ultrabrain": "deepseek-reasoner",
  "visual-engineering": "deepseek-chat",
}

// 在 task() 创建子 agent 时，检查 category 对应的模型
// 如果和当前模型不同，在 prompt 中注入模型切换指令
```

注意：这需要 opencode 支持在单个 session 中切换模型。当前版本的 opencode 可能不支持。如果不行，这个改进需要等待 opencode 支持。

**代价**：
- 改动量：task 工具约 20 行 + 需要 opencode 支持模型切换
- 前置条件：opencode 支持 session 内模型切换

**优先级**：P3（依赖上游能力）

---

### 改进 5：Scout-Then-Act 模式（中优先级）

**现状**：
- 父 agent 直接 spawn 子 agent 去执行任务，没有探索阶段
- 强模型直接做搜索型任务，token 浪费严重

**行业参考**：
- **最高杠杆模式**：先用便宜、快速的模型做"探索"（搜索代码、读文件、收集信息），再用强模型做"执行"（生成代码、决策）
- 探索阶段是 I/O 密集型（读文件、grep），不需要强推理
- 执行阶段需要深度推理，用强模型

**改进方案**：

```typescript
// 在 task() 工具中内置 scout-then-act 模式
// 或者让 explore agent 和推理 agent 自动配对

// 场景示例：
// Sisyphus 说："我需要修复这个 bug"
// → Prometheus 制定计划
// → Explore（便宜模型）搜索相关代码
// → Hephaestus（强模型）读取搜索结果并执行修复
```

这个模式大部分已经可以在现有架构上实现了（Sisyphus 可以自己规划）。需要做的是**默认行为优化**——让 Sisyphus 更倾向于先用 Explore agent 搜索，再派高成本 agent 执行。

**代价**：
- 改动量：Sisyphus 的 system prompt 调整，约 10-20 行
- 本质是提示词优化，不是架构改动

**优先级**：P2（低代码改动，高收益）

---

### 改进 6：去掉 spawn 安全检查（P0 附带）

**现状**：
- `subagent-spawn-limits.ts` 中 `assertCanSpawn()` 通过 `session.get` 解析 lineage
- fail-closed：解析失败 → 全部阻止
- 增加了不必要的 HTTP 往返和依赖

**改进方案**（配合改进 1 实现）：

固定深度=1 后，spawn 安全检查简化为：

```typescript
function assertCanSpawn(session): boolean {
  // 如果当前 session 已经是子 agent，不允许 spawn
  return !session.isSubagent
}
```

不再需要 `resolveSubagentSpawnContext`，不再需要 `session.get`，不再有 fail-closed 问题。

**代价**：
- 改动量：删除 `subagent-spawn-limits.ts` + 修改 `manager.ts`，约 -50 行（净减少）
- 本质是改进 1 的附带收益

**优先级**：P0

---

## 三、各改进点关系图

```
P0 ──────────────────────────────────────────────────────────
│                                                             │
│  改进 1（固定深度=1）─────→ 改进 6（去掉spawn检查）         │
│       ↓                                                    │
│  改进 2（摘要返回）       ← 依赖：改进 1 的 isSubagent 标记 │
│                                                             │
P1 ──────────────────────────────────────────────────────────
│                                                             │
│  改进 3（异步任务）       ← 依赖：子 agent 独立生命周期     │
│                                                             │
P2 ──────────────────────────────────────────────────────────
│                                                             │
│  改进 5（Scout-Act）     ← 提示词优化，无代码依赖          │
│  改进 4（多模型路由）    ← 依赖 opencode 支持模型切换      │
│                                                             │
P3 ──────────────────────────────────────────────────────────
```

**建议执行顺序**：1+6 → 2 → 5 → 3 → 4

---

## 四、工作量估算

| 改进 | 文件数 | 代码行数（改动） | 预计工时 |
|:----:|:------:|:----------------:|:--------:|
| 1+6（固定深度+去安全检查） | 3 | +5 / -50 | ~30 分钟 |
| 2（摘要返回） | 2 | +30~50 | ~1 小时 |
| 5（Scout-Act 提示词） | 1 | +10~20 | ~20 分钟 |
| 3（异步任务） | 3 | +100~150 | ~2 小时 |
| 4（多模型路由） | 1 | +20 | ~30 分钟+上游配合 |

**总计：约 4-5 小时**

---

## 五、长期展望

### 模型原生编排

Kimi K2.5（2026 年 1 月）展示了模型原生编排的能力——**模型内部自己 spawn 子 agent，不需要外部框架**。这意味着：

> 未来可能不需要 omo 这个编排层——模型本身就是编排器。

但目前深度求索还没有这个能力。如果 DeepSeek 后续版本也支持模型原生编排，那 omo 的角色会退化为：
1. **工具注册**（提供给模型的工具集）
2. **执行环境**（沙箱、权限、安全）
3. **状态管理**（持久化、恢复）

编排逻辑本身会交给模型。

### 短期建议

对于现在而言，**P0 的改进 1+6 价值最大**：
- 立即修复 spawn 问题（不再需要 `session.get`）
- 深度固定为 1，简化整个架构
- 减少约 50 行代码
- 零依赖

---

*本建议基于 oh-my-openagent 仓库 commit 12aa0910（feat/chinese-system-prompt 分支）分析。*
*行业参考来源：Claude Code 源码分析、Spring AI Agent Pattern 文档、Anthropic Research 报告、Inngest Blog、Kimi K2.5 技术报告。*
