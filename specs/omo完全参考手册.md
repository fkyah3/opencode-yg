# oh-my-openagent 完全参考手册

> 面向修改者——名词解释、架构、agent 清单、skill 清单、文件位置
> 版本：基于 feat/chinese-system-prompt 分支 (commit 12aa0910)

---

## 一、核心名词解释

| 术语 | 含义 |
|------|------|
| **Agent** | 一个 AI 角色，有自己的 system prompt、工具集和行为规则。omo 定义了 11 个。 |
| **Skill** | 一段注入到 agent prompt 中的专业化知识/工作流。skill 本身不是代码，是文本。 |
| **Hook** | omo 注册到 opencode 生命周期中的"钩子"——在特定事件（发消息、执行工具、会话压缩等）时触发。 |
| **Category** | `task()` 工具的"分类"参数，决定了子 agent 用哪个模型、哪个 prompt 模板。 |
| **Tool** | omo 注册的 26 个工具（read / write / bash / task / question / ...），可直接供 AI 调用。 |
| **BackgroundManager** | 子 agent 创建、调度、并发控制的系统组件。 |
| **Context Window** | AI 模型一次能"看到"的 token 总量（包括 system prompt + 对话历史）。 |
| **Plugin Module** | omo 编译产物 `dist/index.js`，被 opencode 动态加载的入口。 |
| **Hook Tier** | Hook 的分层体系（Core → Continuation → Skill），不同层级有不同优先级。 |
| **Spawn** | 创建一个子 agent 实例的过程。由 `task()` 触发，BackgroundManager 管理。 |

---

## 二、11 个 Agent 完全清单

### 2.1 Sisyphus（你自己）

| 属性 | 值 |
|------|----|
| **名字来源** | 希腊神话——推石上山 |
| **当前改名叫** | 愚公（用户钦定） |
| **定位** | 主编排器。委派、验证、交付。 |
| **模型** | DeepSeek（system prompt 在 deepseek.ts） |
| **文件** | `plugins/oh-my-openagent/src/agents/sisyphus/deepseek.ts` |
| **prompt 行数** | ~344 行 |
| **关键能力** | task() 委派、工具调用、结果验证、并行调度 |
| **子 agent 生成** | 从不——你是父 agent，你生成子 agent |

### 2.2 Sisyphus-Junior

| 属性 | 值 |
|------|----|
| **定位** | 子任务执行器 |
| **文件** | `plugins/oh-my-openagent/src/agents/sisyphus-junior/agent.ts` |
| **是谁** | task() 的默认目标——当你写 `task(category="quick", ...)` 时，叫的就是它 |
| **关键** | 它**不能**再调用 task()（子 agent 不能嵌套） |

### 2.3 Hephaestus

| 属性 | 值 |
|------|----|
| **名字来源** | 希腊神话——工匠之神 |
| **定位** | 深度实施 agent。自主研究+端到端完成。 |
| **文件** | `plugins/oh-my-openagent/src/agents/hephaestus/default.ts` |
| **文件** | `plugins/oh-my-openagent/src/agents/hephaestus/agent.ts` |
| **用于** | `category="deep"` 时 |

### 2.4 Prometheus

| 属性 | 值 |
|------|----|
| **定位** | 规划 agent。为复杂任务生成工作计划。 |
| **文件** | `plugins/oh-my-openagent/src/agents/prometheus/` |
| **中包含** | system-prompt.ts、plan-template.ts、plan-generation.ts、interview-mode.ts、identity-constraints.ts、high-accuracy-mode.ts、behavioral-summary.ts |
| **用于** | 复杂任务需要先规划再执行时 |

### 2.5 Atlas

| 属性 | 值 |
|------|----|
| **定位** | 知识探索 agent。深度研究复杂问题。 |
| **文件** | `plugins/oh-my-openagent/src/agents/atlas/default-prompt-sections.ts` |
| **文件** | `plugins/oh-my-openagent/src/agents/atlas/agent.ts` |

### 2.6 Oracle

| 属性 | 值 |
|------|----|
| **定位** | 只读顾问。高智商推理，用于架构设计、调试疑难杂症。 |
| **文件** | `plugins/oh-my-openagent/src/agents/oracle.ts` |
| **特点** | 只读，不修改代码，昂贵但准确 |
| **用于** | `subagent_type="oracle"` 时 |

### 2.7 Explore

| 属性 | 值 |
|------|----|
| **定位** | 上下文文件搜索。回答"X 在哪？""哪个文件有 Y？" |
| **文件** | `plugins/oh-my-openagent/src/agents/explore.ts` |
| **用于** | `subagent_type="explore"` 时 |

### 2.8 Librarian

| 属性 | 值 |
|------|----|
| **定位** | 外部参考搜索。查 GitHub、文档、网络。 |
| **文件** | `plugins/oh-my-openagent/src/agents/librarian.ts` |
| **用于** | `subagent_type="librarian"` 时 |

### 2.9 Metis

| 属性 | 值 |
|------|----|
| **名字来源** | 希腊神话——智慧女神 |
| **定位** | 预规划顾问。分析需求的模糊点、隐藏意图、AI 容易失败的地方。 |
| **文件** | `plugins/oh-my-openagent/src/agents/metis.ts` |
| **用于** | `subagent_type="metis"` 时 |

### 2.10 Momus

| 属性 | 值 |
|------|----|
| **名字来源** | 希腊神话——嘲讽之神 |
| **定位** | 计划评审。评价工作计划是否清晰、可验证、完整。 |
| **文件** | `plugins/oh-my-openagent/src/agents/momus.ts` |
| **用于** | `subagent_type="momus"` 时 |

### 2.11 Multimodal-looker

| 属性 | 值 |
|------|----|
| **定位** | 多媒体分析。分析图片、PDF 等视觉内容。 |
| **文件** | `plugins/oh-my-openagent/src/agents/multimodal-looker.ts` |

### 2.12 Agent 调用关系图

```
                  ┌─────────────┐
                  │   Sisyphus  │  ← 主编排器（你）
                  │   (愚公)     │
                  └──────┬──────┘
                         │
          ┌──────────────┼──────────────────┐
          │              │                  │
   ┌──────▼──────┐ ┌────▼─────┐ ┌──────────▼──────────┐
   │  Sisyphus   │ │ Explore │ │     Librarian       │
   │   Junior    │ │ (搜文件) │ │ (搜外部参考/文档)   │
   │ (子任务执行) │ └──────────┘ └─────────────────────┘
   └─────────────┘
          │
    ┌─────┼──────┬──────┬──────┬──────┐
    │     │      │      │      │      │
  Oracle Atlas Hephaestus Metis Momus Multimodal
  (顾问) (研究)  (实施)   (规划顾问) (评审) (看图片)

  Prometheus — 独立于调用链之外
  (生成工作计划，不直接参与执行)
```

---

## 三、8 个内置 Skill 完全清单

### 3.1 git-master

| 属性 | 值 |
|------|----|
| **定位** | Git 专家 |
| **大小** | **1105 行**（最庞大的 skill） |
| **内容** | commit、rebase、history search（blame/bisect/log -S）的完整工作流 |
| **文件** | `plugins/oh-my-openagent/src/features/builtin-skills/git-master/SKILL.md` |
| **代码** | `plugins/oh-my-openagent/src/features/builtin-skills/skills/git-master.ts` |
| **元数据** | `plugins/oh-my-openagent/src/features/builtin-skills/skills/git-master-skill-metadata.ts` |
| **影响** | 每次 AI 要执行 git 操作时，这 1105 行会被注入到 prompt 中 |

### 3.2 playwright

| 属性 | 值 |
|------|----|
| **定位** | 浏览器自动化（通过 MCP） |
| **大小** | 312 行（与下面三个共享文件） |
| **文件** | `plugins/oh-my-openagent/src/features/builtin-skills/skills/playwright.ts` |

### 3.3 playwright-cli

| 属性 | 值 |
|------|----|
| **定位** | 浏览器自动化（通过 CLI，无 MCP） |
| **大小** | 268 行（在 playwright.ts 内） |
| **文件** | `plugins/oh-my-openagent/src/features/builtin-skills/skills/playwright.ts` |

### 3.4 agent-browser

| 属性 | 值 |
|------|----|
| **定位** | 浏览器自动化（通过 agent-browser 工具） |
| **大小** | 在 playwright.ts 内 |
| **文件** | `plugins/oh-my-openagent/src/features/builtin-skills/skills/playwright.ts` |

### 3.5 dev-browser

| 属性 | 值 |
|------|----|
| **定位** | 持久页面状态浏览器 |
| **大小** | 221 行 |
| **文件** | `plugins/oh-my-openagent/src/features/builtin-skills/skills/playwright.ts` |

四个浏览器 skill 的切换由配置 `browser_automation_engine` 控制。

### 3.6 frontend-ui-ux

| 属性 | 值 |
|------|----|
| **定位** | 前端 UI/UX 设计 |
| **大小** | 79 行 |
| **文件** | `plugins/oh-my-openagent/src/features/builtin-skills/skills/frontend-ui-ux.ts` |

### 3.7 review-work

| 属性 | 值 |
|------|----|
| **定位** | 5 个并行 agent 的代码审查编排器 |
| **大小** | ~500 行 |
| **文件** | `plugins/oh-my-openagent/src/features/builtin-skills/skills/review-work.ts` |
| **做什么** | 启动 5 个后台 agent（Oracle×3 + 执行 agent×2）同时审查你的代码 |

### 3.8 ai-slop-remover

| 属性 | 值 |
|------|----|
| **定位** | 消除 AI 生成代码的"AI 味道" |
| **大小** | ~300 行 |
| **文件** | `plugins/oh-my-openagent/src/features/builtin-skills/skills/ai-slop-remover.ts` |
| **用于** | `/ai-slop-remover` 命令，单文件处理 |

---

## 四、运作原理

### 4.1 5 步初始化

```
opencode 启动
  → 读 opencode.json → 找到 plugin 列表
    → 动态 import("plugins/oh-my-openagent/dist/index.js")
      → omo 执行 5 步：

  ① loadPluginConfig()
     读取 opencode.json 中 oh-my-openagent 段的配置
     合并用户配置 + 项目配置 + 默认值
     Zod 校验 → 补全缺失字段

  ② createManagers()
     ├── BackgroundManager（核心！任务调度+spawn控制）
     ├── SkillMcpManager（技能附带的 MCP 环境管理）
     └── ConfigHandler（配置热更新）

  ③ createTools()
     注册 26 个工具到 opencode 的工具系统
     （task、session_*、ctx_*、lsp_* 等）

  ④ createHooks()
     3 个 tier，共 52 个 hook
     Core(43) → Continuation(7) → Skill(2)

  ⑤ createPluginInterface()
     打包成 PluginInterface 返回给 opencode
     注册 10 个 hook handler
```

### 4.2 Hook 触发流程（一次典型交互）

```
你发送消息
  → opencode 收到
    → 触发 omo 的 chat.message handler（拦截消息、初始化 session）
    → 触发 chat.headers handler（注入请求头）
    → 触发 chat.params handler（设置模型参数）
    → 模型开始推理
      → AI 决定调用工具
        → 触发 tool.execute.before（权限检查、规则注入）
          → 工具实际执行
            → 触发 tool.execute.after（结果处理、延续逻辑）
    → 触发 chat.messages.transform（上下文注入、thinking 验证）
  → AI 回复显示在你面前
```

Hook 的 3 个 tier 执行顺序：**Core 优先 → Continuation 中间 → Skill 最后**

### 4.3 Task 委派流程

```
Sisyphus 调用 task() 工具
  → category + prompt 参数传递给 BackgroundManager
    → BackgroundManager 检查 spawn 权限（maxDepth、concurrency）
    → 创建子 agent session（独立上下文窗口）
    → 构建子 agent 的 system prompt
      ├── 基础 prompt（来自 agent 文件）
      ├── 当前分类的 prompt 片段
      ├── 匹配的技能内容（skill injection）
      └── 任务说明（你的 prompt）
    → 子 agent 在独立上下文中执行
    → 完成后结果返回给父 agent
```

### 4.4 Skill 加载机制

```
openCode 启动
  → skill-loader 扫描 4 个层级（按优先级）：
    ① Project   → .opencode/skills/ 目录
    ② opencode  → opencode 仓库内的 skill
    ③ User      → ~/.config/opencode/skills/ 目录
    ④ Builtin   → omo 内置的 8 个 skill（当前清单）
  → 同名的 skill，高优先级覆盖低优先级
  → skill 内容被注入到 agent 的 system prompt 中
  → AI 在推理时就能"看到"skill 的内容并按照它执行
```

注意：**skill 不是代码**，是**文本提示**。它被拼接到 AI 的 system prompt 里，告诉 AI"做 X 的时候应该怎么做 Y"。这也意味着——**skill 越长，prompt 越脏，AI 的注意力越分散**。

---

## 五、关键文件目录速查

| 要找什么 | 路径 |
|---------|------|
| 所有 agent 定义 | `plugins/oh-my-openagent/src/agents/` |
| Sisyphus（你）的 prompt | `plugins/oh-my-openagent/src/agents/sisyphus/deepseek.ts` |
| Sisyphus-Junior 的 prompt | `plugins/oh-my-openagent/src/agents/sisyphus-junior/` |
| 所有 skill 文件 | `plugins/oh-my-openagent/src/features/builtin-skills/` |
| git-master skill | `plugins/oh-my-openagent/src/features/builtin-skills/git-master/SKILL.md` |
| 所有 skill 实现 | `plugins/oh-my-openagent/src/features/builtin-skills/skills/` |
| Hook 定义（43 个 core hook） | `plugins/oh-my-openagent/src/hooks/core/` |
| Hook 触发配置 | `plugins/oh-my-openagent/src/hooks/index.ts` |
| 26 个工具 | `plugins/oh-my-openagent/src/tools/` |
| task() 工具 | `plugins/oh-my-openagent/src/tools/delegate-task/` |
| BackgroundManager | `plugins/oh-my-openagent/src/features/background-agent/` |
| spawn 安全检查 | `plugins/oh-my-openagent/src/features/background-agent/subagent-spawn-limits.ts` |
| 配置 schema | `plugins/oh-my-openagent/src/config/schema/` |
| 入口 + 5 步初始化 | `plugins/oh-my-openagent/src/index.ts` |
| 插件接口（10 hook handler） | `plugins/oh-my-openagent/src/plugin-interface.ts` |
| opencode plugin 路径配置 | `C:\Users\13248\.config\opencode\opencode.json` |
| omo 配置段（用户配置） | `C:\Users\13248\.config\opencode\oh-my-openagent.json` |

---

## 六、需要修改的 17 处"添加中文思维指令"

所有需要加 `请用中文语言思维方式来完成所有任务。` 的文件清单：

| # | 文件 | 语言规则所在行 | 状态 |
|:-:|------|:-------------:|:----:|
| 1 | `src/agents/sisyphus/deepseek.ts` | 第 133 行 | 已示范 |
| 2 | `src/agents/sisyphus-junior/default.ts` | 第 26 行 | 待改 |
| 3 | `src/agents/oracle.ts` | 第 44 行 | 待改 |
| 4 | `src/agents/explore.ts` | 第 40 行 | 待改 |
| 5 | `src/agents/librarian.ts` | 第 42 行 | 待改 |
| 6 | `src/agents/metis.ts` | 第 24 行 | 待改 |
| 7 | `src/agents/momus.ts` | 第 25 行 | 待改 |
| 8 | `src/agents/multimodal-looker.ts` | 第 24 行 | 待改 |
| 9 | `src/agents/hephaestus/default.ts` | 第 90 行 | 待改 |
| 10-15 | `src/agents/prometheus/` 6 个文件 | 各有 | 待改 |
| 16 | `src/agents/atlas/default-prompt-sections.ts` | 第 3+20 行（两处） | 待改 |
| 17 | `src/hooks/keyword-detector/ultrawork/deepseek.ts` | 第 15 行 | 待改 |

---

## 七、修改 omo 后要做什么

```bash
# 1. 改完 prompt 文件后，重新编译
cd E:\agent\opencode-fkyah3\plugins\oh-my-openagent
bun run build

# 2. 验证编译产物
ls dist/index.js        # 应该存在且是最新的

# 3. opencode 下次重启就会加载新的 dist
# （不需要额外操作）
```

注意：omo 插件加载的是 `dist/index.js`，**不是** `src/` 下的 TypeScript 源码。所以改完 `src/` 后必须重新编译才能生效。

---

*本手册基于 omo 仓库 commit 12aa0910（feat/chinese-system-prompt 分支）分析。*
