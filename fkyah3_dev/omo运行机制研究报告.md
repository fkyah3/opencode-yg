# oh-my-openagent 运行机制研究报告

> 基于源码分析 + 实践验证
> 2026-04-27

---

## 一、omo 是什么

oh-my-openagent（简称 omo）是一个 **OpenCode 的编排型 AI 插件**。它的核心作用是：在 opencode 的基础上，注入一套 agent 编排、任务调度、hook 扩展的体系。

### 分层

```
用户 CLI
  ↓
opencode（原生）
  ├── 内置功能（session、config、server、tool 等）
  └── plugin（插件加载器）
        └── omo（oh-my-openagent） ← 我们关心的
              ├── Agent 体系（11 个 agent）
              ├── Hook 体系（52 个 hooks）
              ├── Manager 层（BackgroundManager、Task 系统）
              └── 扩展工具（26 个自定义工具）
```

omo 本身不算大——src/ 下约 60+ TypeScript 文件，编译后 dist/index.js 约 1.6MB。

---

## 二、启动流程

### 2.1 opencode 加载 omo

```
opencode 启动
  → 读 opencode.json
    → 找到 plugin: "file:///E:/.../oh-my-openagent"
      → PluginLoader.loadExternal()
        → import("dist/index.js")  ← 动态加载 dist
          → 插件返回 pluginModule: PluginModule
            → opencode 调用 pluginModule.server(input, options)
              → omo 启动
```

### 2.2 omo 5 步初始化（src/index.ts）

```
1. loadPluginConfig()
   → 读取 opencode.json 中 omo 的配置段
   → JSONC 解析 → Zod 验证 → 合并默认值

2. createManagers()
   ├── TmuxSessionManager（Windows 不可用）
   ├── BackgroundManager（核心！任务编排 + spawn 控制）
   └── SkillMcpManager
       └── ConfigHandler

3. createTools()
   ├── SkillContext（技能上下文）
   ├── AvailableCategories（分类加载）
   └── ToolRegistry（注册 26 个工具给 opencode）

4. createHooks()
   ├── CoreHooks（43 个）— 会话、工具守卫
   ├── ContinuationHooks（7 个）— 任务延续
   └── SkillHooks（2 个）— 技能自动加载

5. createPluginInterface()
   → 包装成 opencode 可识别的 PluginModule 返回
   → 注册 10 个 hook 实现
```

---

## 三、Agent 体系

omo 有 **11 个 agent**，每个由工厂函数构建。

### 3.1 Agent 列表

| Agent | 文件 | 作用 |
|-------|------|------|
| **Sisyphus** | `src/agents/sisyphus/deepseek.ts` | 主编排器，负责委派、验证、交付 |
| **Sisyphus-Junior** | `src/agents/sisyphus-junior/agent.ts` | 子任务执行器（task() 的默认目标） |
| **Hephaestus** | `src/agents/hephaestus/agent.ts` | 深度实施 agent |
| **Prometheus** | `src/agents/prometheus/` | 规划 agent，生成工作计划 |
| **Atlas** | `src/agents/atlas/agent.ts` | 知识探索 agent |
| **Oracle** | `src/agents/oracle.ts` | 只读高智商顾问（架构、调试） |
| **Explore** | `src/agents/explore.ts` | 上下文文件搜索 |
| **Librarian** | `src/agents/librarian.ts` | 外部参考搜索（GitHub、文档） |
| **Metis** | `src/agents/metis.ts` | 预规划顾问（识别歧义、假设） |
| **Momus** | `src/agents/momus.ts` | 计划评审（质量把关） |
| **Multimodal-looker** | `src/agents/multimodal-looker.ts` | 多媒体文件分析 |

### 3.2 Prompt 构建机制

每个 agent 的 prompt 由对应的工厂函数在调用时动态构建。核心构建模式：

```
buildAgent() → 组装 prompt 字符串
  ├── 基础系统提示（hardcoded 在 agent file 中）
  ├── 技能描述（从 SkillContext 加载）
  ├── 政策规则（dynamic-agent-policy-sections.ts）
  └── 模型特定适配（deepseek vs gpt vs gemini）
```

当前 Sisyphus 的 prompt 约 **344 行**（deepseek.ts），其中包含了角色定义、语言规则、行为约束、工具使用规则等。

### 3.3 委派链路

```
用户消息 → Sisyphus
  ├── 简单任务 → Sisyphus 自己干（直接工具调用）
  ├── 复杂任务 → task() 工具
  │     ├── category="quick" → 默认 Sisyphus-Junior
  │     ├── category="ultrabrain" → 专用 agent
  │     ├── subagent_type="oracle" → Oracle agent
  │     ├── subagent_type="explore" → Explore agent
  │     └── ...
  └── 需要规划 → Prometheus 先生成计划
```

---

## 四、Hook 体系

### 4.1 三个抽象层

| 层 | 文件 | 数量 |
|----|------|:----:|
| **Core hooks** | `src/hooks/core/` 目录 | 43 |
| **Continuation hooks** | `src/hooks/continuation/` | 7 |
| **Skill hooks** | `src/hooks/skill/` | 2 |

### 4.2 Hook 注册（src/hooks/index.ts）

```
omo 启动
  → createHooks()
    → 加载所有 hook 函数
    → 按 tier 分组（core → continuation → skill）
    → 返回 hooks 列表
```

### 4.3 10 个 OpenCode Hook Handler

omo 注册到 opencode 的 hook 点：

| # | Handler | 触发时机 | 作用 |
|:-:|---------|---------|------|
| 1 | `tool` | 工具执行前 | 注册 26 个自定义工具 |
| 2 | `chat.params` | 发送请求前 | 修改模型参数（effort level） |
| 3 | `chat.headers` | 发送请求前 | 注入自定义请求头 |
| 4 | `chat.message` | 用户发消息时 | 拦截消息、session 初始化、关键词检测 |
| 5 | `chat.messages.transform` | 消息发送前 | 注入上下文、验证 thinking block |
| 6 | `session.compacting` | 会话压缩时 | 保存上下文摘要 |
| 7 | `tool.execute.before` | 工具执行前 | 预先检查/修改工具调用 |
| 8 | `tool.execute.after` | 工具执行后 | 处理工具输出、延续逻辑 |
| 9 | `event` | 会话生命周期事件 | 响应会话变更 |
| 10 | `command.execute.before` | 命令执行前 | 拦截/处理命令 |

---

## 五、Task 系统与 BackgroundManager

`BackgroundManager` 是 omo 最核心的组件之一，负责子 agent 的创建、调度和生命周期管理。

### 5.1 关键文件

| 文件 | 作用 |
|------|------|
| `src/features/background-agent/manager.ts` | BackgroundManager 主逻辑 |
| `src/features/background-agent/subagent-spawn-limits.ts` | spawn 安全检查（maxDepth） |
| `src/features/background-agent/session-lineage.ts` | 会话血缘关系解析 |

### 5.2 spawn 检查流程

```
task() 被调用
  → BackgroundManager.reserveSubagentSpawn(sessionID)
    → assertCanSpawn(sessionID)
      → resolveSubagentSpawnContext(client, sessionID)
        → client.session.get(sessionID)  ← 读取 session 的 parentID
        → 上溯到根 session
        → 检查嵌套深度 ≤ maxDepth（默认 3）
      → 通过 → 允许 spawn
      → 失败 → 阻止 spawn（fail-closed）
```

### 5.3 安全失败问题

当前实现是 **fail-closed** 的——一旦 session lineage 解析失败，直接阻止所有子 agent 创建。这是之前子代理不能用的根本原因。

---

## 六、工具系统

### 6.1 26 个自定义工具

omo 通过 `tool.execute.before` hook 向 opencode 注册 26 个工具：

| 分类 | 工具 |
|------|------|
| **文件操作** | read, write, edit, glob, grep |
| **执行** | bash |
| **网络** | webfetch |
| **AI 委派** | task（分类 + 技能系统） |
| **会话** | session_* 系列 |
| **上下文** | ctx_reduce, ctx_note, ctx_search |
| **LSP** | lsp_* 系列 |
| **时间** | time_* 系列 |
| **其他** | question, skill, background_output, background_cancel, look_at, ast_grep_*, grep_app 等 |

### 6.2 Task 工具的特殊性

`task()` 工具是 omo 的核心能力——它触发了完整的：
```
分类匹配 → 技能加载 → spawn 检查 → agent 创建 → prompt 构建 → 任务执行 → 结果返回
```

---

## 七、配置文件

### 7.1 配置加载链路

```
opencode 启动
  → 读 opencode.json（opencode 配置）
    → 读 opencode.json 中的 "oh-my-openagent" 段
      → omo 的 loadPluginConfig()
        ├── 用户配置（用户 opencode.json 中的 oh-my-openagent 段）
        ├── 项目配置（项目 opencode.json 中的 oh-my-openagent 段）
        └── 默认值合并
```

### 7.2 关键配置项

| 配置项 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `background_task.maxDepth` | number | 3 | 子 agent 嵌套深度 |
| `background_task.timeout` | number | 300000 | 子任务超时时间（ms） |
| `maxTurns` | number | 50 | 会话最大轮次 |
| `effortLevel` | "low" \| "medium" \| "high" | "medium" | 模型推理力度 |
| `thinkMode` | boolean | false | 是否启用 think token 模式 |

---

## 八、哪些是骨架、哪些可以砍

### ✅ 必须保留（核心骨架）

| 模块 | 原因 |
|------|------|
| BackgroundManager | 子 agent 创建、调度、spawn 检查的核心 |
| Task 系统（`task()` 工具） | 编排委派的入口 |
| session-lineage | spawn 安全检查的依赖 |
| Hook 触发机制 | 与 opencode 的通信桥梁 |
| Agent 工厂注册 | 各 agent 的 prompt 构建和注册 |

### ⚠️ 可以简化

| 模块 | 简化方案 |
|------|---------|
| 26 个工具 → 保留 15 个核心 | 去掉不常用的（如 grep_app、部分 time_*） |
| 43 个 core hooks → 合并为 20-25 个 | 部分 hook 功能重叠 |
| 11 个 agent → 保留 8 个 | Metis、Momus、Multimodal-looker 可以合并 |
| 多模型适配（GPT/Gemini 等） | 只用 DeepSeek |

### 🗑️ 可以砍掉

| 模块 | 原因 |
|------|------|
| TmuxSubagent 相关 | Windows 不可用 |
| Claude Code 兼容层 | 用不到 |
| Platform binaries（packages/ 下 11 个） | exe 打包不需要 |
| git-master 等内置 skill | 可改为原生实现 |
| 多 provider 回退链 | DeepSeek 一个模型就够了 |
| Think block 验证 | 非必须 |

---

## 九、Agent 关系图

```
                    ┌─────────────┐
                    │   Sisyphus  │ ← 主编排器
                    │ (deepseek)  │
                    └──────┬──────┘
                           │
            ┌──────────────┼──────────────┐
            │              │              │
     ┌──────▼──────┐ ┌────▼─────┐ ┌──────▼──────┐
     │  Sisyphus   │ │ Explore  │ │  Librarian  │
     │   Junior    │ │ (搜索)    │ │ (参考查询)   │
     │ (子任务执行) │ └──────────┘ └─────────────┘
     └─────────────┘
            │
    ┌───────┼───────────┐
    │       │           │
┌───▼──┐ ┌─▼──┐ ┌─────▼──────┐
│Oracle│ │Atlas│ │ Hephaestus │
│(顾问) │ │(研) │ │  (实施)    │
└──────┘ └────┘ └───────────┘
```

**Hook 触发顺序（一次典型交互）：**

```
用户消息
  → chat.message（拦截）
    → chat.headers（注入请求头）
      → chat.params（设置模型参数）
        → 模型推理
          → tool.execute.before（工具检查）
            → 工具执行
              → tool.execute.after（延续逻辑）
                → chat.messages.transform（注入上下文）
```

---

## 十、总结

1. **omo 不大** — 核心代码约 60+ 个 TypeScript 文件，编译后 1.6MB
2. **核心是 Agent 体系 + Hook 体系 + Task 系统** — 三个部分互为基础
3. **spawn 安全检查是 fail-closed** — 之前不能调子 agent 的根因
4. **可以砍掉约 30-40% 的代码** — 多模型适配、Tmux、Claude Code 兼容层、platform binaries
5. **打包 exe 可行** — 把动态 import 改为静态 import，约 30 行改动

---

*本报告基于 omo 仓库 commit 12aa0910（feat/chinese-system-prompt 分支）分析。*
