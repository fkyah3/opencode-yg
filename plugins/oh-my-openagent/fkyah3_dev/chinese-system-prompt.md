# DeepSeek 全中文系统提示词 / Chinese System Prompt for DeepSeek

> 分支: `feat/chinese-system-prompt` | 最后更新: 2026-04-25

## 背景 / Background

所有 agent 配置为 DeepSeek 模型（deepseek/deepseek-v4-flash）时，OMO 的 system prompt、keyword-detector 注入消息、命令模板、子 Agent prompt 均为英文。导致 Agent 的思考和回复语言混杂。

根本原因：OMO 为 Claude（默认）、GPT、Gemini 各维护了一套 prompt，但 DeepSeek 路由到"default"或"generic"变体，这些变体均为英文。此外 keyword-detector 的 analyze-mode 在 `constants.ts` 中存在独立于导入变量的硬编码英文版本。

## 改动范围 / Scope

### 第1层：Sisyphus 系统 prompt（6 files）

| 文件 | 改动 |
|------|------|
| `src/agents/sisyphus/deepseek.ts` | 全中文 system prompt + 添加"必须用中文思考"指令 |
| `src/agents/dynamic-agent-core-sections.ts` | 9 个 builder 函数翻译为中文 |
| `src/agents/dynamic-agent-policy-sections.ts` | 3 个 builder 函数翻译为中文 |
| `src/agents/dynamic-agent-category-skills-guide.ts` | Category 委派指南翻译为中文 |

### 第2层：Hook 注入 & 命令模板（10 files）

| 文件 | 改动 |
|------|------|
| `src/hooks/atlas/system-reminder-templates.ts` | 验证提醒、编排协议等 6 段翻译为中文 |
| `src/hooks/prometheus-md-only/constants.ts` | 规划工作流提醒翻译为中文 |
| `src/hooks/start-work/start-work-hook.ts` | 检测标记同步 |
| `src/features/builtin-commands/templates/start-work.ts` | 128 行命令模板翻译为中文 |
| `src/features/builtin-commands/templates/ralph-loop.ts` | 3 个循环模板翻译为中文 |
| `src/features/builtin-commands/templates/remove-ai-slops.ts` | 96 行模板翻译为中文 |
| `src/plugin/chat-message.ts` + tests | Ralph Loop 检测字符串同步 |

### 第3层：子 Agent DeepSeek prompt（8 files）

每个 agent 的 DeepSeek 路由 prompt 顶部添加"必须用中文思考"指令：

| Agent 类型 | 文件 | 
|-----------|------|
| Oracle | `src/agents/oracle.ts` |
| Momus | `src/agents/momus.ts` |
| Librarian | `src/agents/librarian.ts` |
| Explore | `src/agents/explore.ts` |
| Sisyphus-Junior | `src/agents/sisyphus-junior/default.ts` |
| Hephaestus | `src/agents/hephaestus/gpt.ts` |
| Prometheus | `src/agents/prometheus/identity-constraints.ts` |
| Atlas | `src/agents/atlas/default-prompt-sections.ts` |

### 第4层：Ultrawork + Constants 修复（2 files）

| 文件 | 改动 |
|------|------|
| `src/hooks/keyword-detector/constants.ts` | KEYWORD_DETECTORS 中 analyze 条目原来硬编码英文字符串，改为引用导入的 ANALYZE_MESSAGE 变量 |
| `src/hooks/keyword-detector/ultrawork/deepseek.ts` | 全中文 ultrawork prompt + 中文思考指令 |

## 保留英文的内容 / What Stays English

- 文件路径（`src/auth/middleware.ts`、`.sisyphus/`）
- 命令/工具名（`task()`、`lsp_diagnostics`、`Bash`、`grep`）
- Agent/Category 标识符（`Sisyphus`、`Oracle`、`visual-engineering`）
- 代码示例中的符号、语法、字符串值
- 技术专有名词的第一引用保持英文

## 分支管理 / Branch Strategy

- `feat/chinese-system-prompt` — 所有中文翻译工作在此分支进行
- `main` — 无中文改动，保留英文原版回退能力
- 不提交到上游（code-yeongyu/oh-my-openagent），因为中文 prompt 不是所有人都需要

## 更新方式 / How to Rebuild

```bash
# 修改源码后，重新构建 dist 并同步到运行时路径
cd E:\fkyah3\Agent\deepseek\oh-my-openagent
bun run build
Copy-Item -Path "dist\index.js" -Destination "<runtime-cache-path>\oh-my-openagent@latest\node_modules\oh-my-openagent\dist\index.js" -Force
```

运行时缓存路径：`~/.cache/opencode/packages/oh-my-openagent@latest/`

## 验证 / Verification

开新的 OpenCode 终端（新 session），发送中文分析型问题（如"分析一下这段代码的逻辑"），确认：
1. Agent 的思考过程（chain-of-thought）为中文
2. 回复为中文
3. analyze/search/ultrawork 模式注入消息为中文
