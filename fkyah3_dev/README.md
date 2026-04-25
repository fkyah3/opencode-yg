# fkyah3/opencode-fkyah3 — Windows-first OpenCode 分支

> 基于 [anomalyco/opencode](https://github.com/anomalyco/opencode) v1.14.19
> 这些 bug 在社区挂了几个月，没人愿意修 Windows 平台的问题。我们修了。
>
> **代码实现：AI（DeepSeek v4Lite / Sisyphus）**  
> **反馈与质量监督：fkyah3（人工）**  
> 本分支所有修复和优化由 AI 完成。人类负责发现问题、确认方向、紧急刹车。
>
> **⚠️ 本分支所有配置优化和修复均基于 DeepSeek 系列模型。** 使用其他模型的用户可能需要调整配置。

---

## 本分支做了什么 / What This Fork Fixes

### 1. Windows CJK 编码修复 / CJK Encoding Fix

OpenCode 在 Windows 中文系统上执行命令时，中文输出乱码。根因：子进程使用 GBK 编码而非 UTF-8。

**修复**：在 `packages/opencode/src/tool/bash.ts` 中，为每个子进程注入三层 UTF-8 编码设置（控制台代码页、.NET 输出编码、PowerShell 管道编码）。

```powershell
# Before: 输出乱码
Write-Output "你好世界"
# → ä½ å¥½ä¸ç\U+fffd\U+fffd

# After: 输出正常
Write-Output "你好世界"
# → 你好世界
```

### 2. Magic Context TUI 侧边栏修复 / TUI Sidebar Fix（跨仓库） 

Magic Context 侧边栏始终空白不渲染。根因：OpenCode fork 的 `TuiOptions` Zod schema 使用 `.strict()` 拒绝未声明的 `show_thinking: true` 字段，导致整个配置解析失败返回空对象，外部插件永不加载。

**修复**：在 `packages/opencode/src/cli/cmd/tui/config/tui-schema.ts` 中新增 `show_thinking: z.boolean().optional()`。一行代码，三个月没人找到。

提交：`c1a595acc`

### 3. DeepSeek 思考模式 reasoning_content 回传修复（核心修复）

**问题**：DeepSeek 模型在思考模式（V4: `thinking: {type: "enabled"}` / R1: 内置）下使用工具调用时，第二轮起报错：

> The `reasoning_content` in the thinking mode must be passed back to the API.

每条消息都失败，对话直接锁死。纯聊天无 tool call 时不触发，一旦有工具调用则必然发生。

**根因**：DeepSeek API 要求思考模式下**所有** assistant 消息都必须携带 `reasoning_content` 字段（无推理内容时传空字符串 `""`）。但 OpenCode 的 `normalizeMessages()`（`packages/opencode/src/provider/transform.ts`）有两个缺陷：

1. **入口条件过窄**：只有配置了 `model.capabilities.interleaved` 的模型才能进入 `reasoning_content` 注入分支。R1 等模型只有 `capabilities.reasoning = true`，被完全跳过。
2. **内层条件遗漏**：注入分支内，对 `reasoning_content` 的附加条件（有推理文本 / 在最后 user 之后 / 有 tool call）过滤掉了从 DB 回放的历史消息，而这些恰是 DeepSeek API 最需要的。

**源码头修复（commit `b5b6ad05d`）**：

```typescript
// 1️⃣ 入口条件：interleaved || reasoning || 消息已含 reasoning parts
const hasReasoningContent =
  isInterleaved ||
  model.capabilities.reasoning ||
  msgs.some((msg) =>
    msg.role === "assistant" &&
    Array.isArray(msg.content) &&
    msg.content.some((part: any) => part.type === "reasoning"),
  )

// 2️⃣ 去掉内层条件：所有 assistant 消息无条件注入 reasoning_content
// （无推理内容 = 空字符串，旧 DB 格式的 string content 也处理）
if (hasReasoningContent) {
  return msgs.map((msg) => {
    if (msg.role === "assistant" && Array.isArray(msg.content)) {
      // ... 提取 reasoningText，filter out reasoning parts
      return { ...msg, content: filteredContent, providerOptions: { [field]: reasoningText || "" } }
    }
    if (msg.role === "assistant" && typeof msg.content === "string") {
      return { ...msg, providerOptions: { [field]: "" } }
    }
    return msg
  })
}
```

**Workaround（仅 V4，临时）**：在 `opencode.json` 的 V4 模型配置中添加 `interleaved` 字段可绕过入口条件，但内层条件依然会漏——这是该 workaround 不能彻底解决的原因：

```json
"deepseek-v4-flash": {
  "interleaved": { "field": "reasoning_content" }
}
```

**参考**：
- 根因分析文档：`fkyah3_dev/analysis/reasoning_content-loss-root-cause-analysis.md`
- Fork issue 跟踪：`fkyah3_dev/issues/001-reasoning_content-thinking-mode.md`
- Upstream issue：`anomalyco/opencode#24104`
- 社区 issue：#17523、#19081、#8934、#6040

### 4. 仓库清理与分支管理 / Repo Cleanup

**问题**：Fork 时复制了 upstream 全部 373 个分支，导致仓库首页被噪音淹没，难以区分哪些是我们的修复。

**操作**：
1. 在最新 commit 创建 `main` 稳定分支，推送至远程
2. 将 GitHub 默认分支从 `fix/permission-reasoning-truncation` 切换为 `main`
3. 通过 GitHub API 列出全部远端分支
4. **白名单保留** `main` 和 `fix/permission-reasoning-truncation`，其余 373 个分两批批量删除
5. 每次删除后立即验证，确保我们自己的分支完好
6. 清理本地孤儿分支和 remote-tracking refs

**结果**：远程只保留两个分支：
- `main`（默认）—— 稳定构建版本，首页展示 fork README
- `fix/permission-reasoning-truncation` —— 开发分支

**风险控制**：先建 `main` + 改默认分支再删，确保仓库永不处于无默认分支状态。白名单过滤而非黑名单排除，保证永远不会误删自己的分支。

---

### 5. 子 Agent 权限继承分析与 Workaround / Sub-Agent Permission Analysis

**问题**：父 agent 通过 `task()` 创建子 agent 时，子 agent 不继承父 agent 的权限限制。如果一个 agent 配置了 `write: false`，它仍然可以通过 `task()` 让子 agent 执行写操作绕过限制。

**根因**：`tool/task.ts` 创建子 session 时只限制了 `todowrite` 和 `task` 递归，其他工具全部放行。父 agent 的规则集不传递给子 session。

**Workaround（配置层）**：在 `opencode.json` 中用 `agent.{name}.permission` 为已知子 agent 类型声明独立权限：

```jsonc
{
  "agent": {
    "oracle": {
      "permission": {
        "read":  { "action": "allow" },
        "edit":  { "action": "deny" },
        "write": { "action": "deny" },
        "bash":  { "action": "ask" }
      }
    }
  }
}
```

**局限性**：只对已知名称的 agent 生效；不是真正的权限隔离机制；上游若改动合并逻辑可能失效。

详见：`fkyah3_dev/analysis/subagent-permission-inheritance.md`

---

## 启动 / How to Run

```powershell
# 1. 在 opencode-fkyah3 根目录
cd packages/opencode
bun run --conditions=browser src/index.ts
```

或使用 `opencodesrc.ps1`（自动处理编码设置）。

---

## 目录结构 / Directory Layout

| 路径 | 说明 |
|------|------|
| `fkyah3_dev/README.md` | 本文件 — 分支介绍 |
| `fkyah3_dev/analysis/` | 根因分析文档（问题追踪 + 技术细节） |
| `fkyah3_dev/issues/` | 已知问题和修复记录（issues 已禁用时的替代） |
| `fkyah3_dev/做了什么/` | 详细贡献总结 |
| `fkyah3_dev/ACHIEVEMENTS.md` | 修订记录（含难度评估和排查过程） |
| `fkyah3_dev/workflows/` | 可复用工作流文档（B站评论采集等跨仓库任务） |
| `fkyah3_dev/internal/` | 内部工作文档（无关观众） |
| `opencodesrc.ps1` | 推荐启动脚本 |

---

## 开源许可 / License

Apache 2.0（继承上游 anomalyco/opencode）
