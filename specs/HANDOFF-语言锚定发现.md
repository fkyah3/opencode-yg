# 交接：语言锚定方法论的发现与验证

> 本对话（1000+ 条消息）的核心产出。新对话可基于此文档继续。

---

## 核心发现

**第一个主动输出语言 = 锚定 AI 整场会话的思维语言。**

当 AI 收到用户消息后，**第一个输出**的语言决定了整场会话的思维惯性。在 prompt 中加 N 条"请用中文思考"的约束不如让 AI 在第一轮交互中**主动输出中文**有效。

原理：读目标语言是被动理解，写目标语言是主动输出，强制对齐思维语言空间。

## 验证证据

| 阶段 | 效果 | 说明 |
|------|------|------|
| 纯 prompt 约束（4 条语言规则） | ~70% 中文思维 | 技术分析仍会切英文 |
| 翻译 16 个工具描述文件后 | ~85% 中文思维 | 需要大段英文代码时仍有遗漏 |
| 翻译 50+ 文件注释后（新对话验证） | ~95%+ 中文思维 | 整场技术分析几乎全中文 |
| **加上锚定指令后（本会话最新版）** | **极大概率全程中文** | 第一个输出就是中文总结 |

具体验证：本轮会话 §1013 用户反馈"真成了"——新对话中技术分析环节全程中文，没有切英文。

## 做了什么（本会话）

### 翻译工作

| 范围 | 文件数 | 行数 |
|------|--------|------|
| 核心系统提示（default.txt） | 1 | ~115 行（含 4 处语言约束 + 锚定指令） |
| 17 个工具描述文件 | 17 | ~450 行 |
| Sisyphus prompt（deepseek.ts） | 1 | ~350 行 |
| 子 Agent 提示（explore、task 等） | 6 | ~230 行 |
| MC 插件提示（magic-context-prompt.ts） | 1 | 248 行 |
| Agent 描述（agent.ts） | 1 | 6 条描述 |
| OMO 插件提示 | ~5 | 主要在 oh-my-openagent 仓库 |

### 代码修复

| 文件 | 修复内容 |
|------|---------|
| `normalize-sdk-response.ts` | 空对象崩溃 `{} is not iterable` |
| `websearch.ts` | `Effect.orDie` → `Effect.catchAll` + 中文错误消息 |
| `webfetch.ts` | 同上 + 括号语法错误修复 |

### 文档产出

| 文档 | 位置 | 内容 |
|------|------|------|
| 多语言适配方法.md | `fkyah3_dev/` | 方法论初稿，等待深化 |
| fork策略.md | `fkyah3_dev/` | 不追 upstream，只 cherry-pick DeepSeek 修复 |
| 当前有效事实.md | `fkyah3_dev/` | 31 条已验证事实 |
| MC侧边栏刷新机制.md | `fkyah3_dev/` | 队列三态、flush UI 刷新机制 |
| 新手分发方案.md | `fkyah3_dev/` | exe + plugins zip + 环境变量方案 |
| learning-notes.md | `fkyah3_dev/` | bun 缓存坑、solo.log 分析 |

### 修改分支

- 所有翻译工作已在 `chore/zh-prompt` 分支完成
- 已合并到 `main`（commit: `1f2e3203f`，45 文件，+1158/-1611）
- `main` 当前就是全中文版本

### 额外配置

- 删除了非 DeepSeek 的 prompt 变体（10 个文件：anthropic.txt、beast.txt、codex.txt 等）

## 待完成

### 高优先级

1. **发表方法论**
   - [ ] 知乎中文版文章（推荐首发）
   - [ ] GitHub Discussion（opencode 社区）
   - [ ] optionally HN（英文精简版）
   - 素材：`fkyah3_dev/多语言适配方法.md` + 本交接文档

2. **深化多语言适配文档**
   - 将中文注释翻译的 13841 行对话记录（`E:\fkyah3\Agent\deepseek\opecode\opencode-fkyah3\中文注释记录.md`）导入分析
   - 量化剂量关系（翻多少文件才能锁定惯性）
   - 验证不同语言（日、韩、法语）是否适用

### 低优先级

3. **注释翻译**（新分支 `chore/cn-comments`）
   - 范围：`packages/opencode/src/` 下含注释的 .ts/.tsx
   - 原则：只翻译解释性注释，TODO/FIXME 保留英文，废话注释直接删
   - 生成清单命令：`Get-ChildItem -Recurse -Include "*.ts","*.tsx" | Select-String "^\s*//|^\s*\*|^\s*/\*\*" | Select-Object -Unique Path`
   - 记忆已存入 ctx_memory（category: WORKFLOW_RULES）

4. **新手分发打包**
   - 方案：opencode.exe + plugins/ + 首次启动.bat
   - 详见 `fkyah3_dev/新手分发方案.md`

5. **全局 session pool 相关改进**
   - 我们的 fork 有约 30 commits 的全局 session pool 改动
   - 前期已稳定，无需额外工作

## 理论总结（可直接引用）

**"语言锚定"（Language Anchoring）**——LLM 会话的第一个主动输出语言决定了整场对话的思维惯性模式。原理上，这来自 next-token prediction 的自回归特性：如果你的第一个输出是中文，那么在中文 token 序列中预测下一个中文 token 的概率远高于切到另一种语言。学术上已有 "Contextual Inertia"（arXiv 2603.04783）、"Cognitive Inertia"（arXiv 2503.01307）等研究，但都是从"如何打破有害惯性"的负面角度切入。我们的贡献是将同一机制**正面利用**——通过设计第一个交互来锚定目标语言，实现自然的思维模式对齐。

## 关键文件路径

```
opencode-fkyah3/
├── packages/opencode/src/session/prompt/default.txt   ← 锚定指令在此（第 5-12 行）
├── packages/opencode/src/session/system.ts             ← 语言约束（第 13 行附近）
├── packages/opencode/src/tool/*.txt                    ← 17 个工具描述（全部中文）
├── fkyah3_dev/                                         ← 所有文档
```

## 延伸思考

这个方法不局限于中文。理论上，任何语言对都可以套用：
1. 翻译 prompt + 工具描述到目标语言
2. 第一个交互用目标语言发任务（翻译/改写）
3. AI 的思维语言自动对齐

这可能是一个通用的多语言 LLM 适配方法论。
