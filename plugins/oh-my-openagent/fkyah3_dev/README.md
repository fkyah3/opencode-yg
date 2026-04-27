# fkyah3/oh-my-openagent-fkyah3 — Windows-compatible OMO 分支

> 基于 [code-yeongyu/oh-my-openagent](https://github.com/code-yeongyu/oh-my-openagent)
> 这些 bug 在社区挂了几个月，没人愿意修 Windows 平台的问题。我们修了。

---

## 本分支修复了什么 / What This Fork Fixes

### 1. Git-master 前缀注入根治 / Git-master Prefix Triple Fix

每次执行 git 命令时自动注入 `GIT_MASTER=1` 前缀，且通过配置 `disabled_skills` 无法关闭。根因有三层：

- Schema 默认值硬编码 `"GIT_MASTER=1"`
- Ultrawork 指令模板硬编码 `load_skills=["git-master"]`，绕过 `disabled_skills`
- `injectGitMasterConfig` 后备值 `?? "GIT_MASTER=1"` 在默认值清空后重新生成

**修复**：三层全部清零。分支：`fix/git-master-disable-default`

### 3. DeepSeek 全中文系统提示词 / Full Chinese System Prompt for DeepSeek

所有 agent 使用 DeepSeek 模型时，系统提示词、keyword-detector 注入、命令模板、子 Agent prompt 全部中文化。
用户询问分析/搜索/实现等任务时，Agent 的思考过程和回复均为中文。

**修复范围（分支 `feat/chinese-system-prompt`）：**
- Sisyphus 系统 prompt + 8 个子 Agent prompt（Oracle、Momus、Librarian、Explore、Sisyphus-Junior、Hephaestus、Prometheus、Atlas）
- 3 个动态 builder 文件（core-sections、policy-sections、category-skills-guide）
- keyword-detector 注入消息（search-mode、analyze-mode、ultrawork-mode）
- 命令模板（start-work、ralph-loop、remove-ai-slops）
- atlas system-reminder 模板
- `constants.ts` 中硬编码的英文 ANALYZE_MESSAGE 修复

**保留英文的内容：** 文件路径、命令名（`task()`、`lsp_diagnostics`、`Bash`）、Agent/Category 标识符（`Sisyphus`、`visual-engineering`）、代码示例中的符号和语法

详见 [`chinese-system-prompt.md`](chinese-system-prompt.md)

---

在 Windows 上执行 git 命令时报错 `export : 无法将“export”项识别为 cmdlet`。根因：`detectShellType()` 检测到 `MSYSTEM` 环境变量（Git Bash）返回 `"unix"`，生成 `export KEY=val;` 语法，但实际执行环境是 PowerShell。

**修复**：在 `non-interactive-env-hook.ts` 中，Windows 平台固定使用 PowerShell 语法（`$env:KEY='val';`），不再依赖父进程 shell 类型检测。

---

## 分支 / Branches

| 分支 | 说明 |
|------|------|
| `fix/git-master-disable-default` | git-master + non-interactive-env 修复 |
| `feat/chinese-system-prompt` | DeepSeek 全中文系统提示词，含 8 个子 Agent + hooks 翻译 |
| `main` | 上游同步 |

---

## 目录结构 / Directory Layout

| 路径 | 说明 |
|------|------|
| `fkyah3_dev/README.md` | 本文件 |
| `fkyah3_dev/git-master-issue.md` | git-master 问题详细分析 |
| `fkyah3_dev/non-interactive-env-fix.md` | non-interactive-env 修复文档 |
| `fkyah3_dev/chinese-system-prompt.md` | DeepSeek 全中文 prompt 详细说明 |

> 📋 **跨项目索引**: 参见 [`E:\fkyah3\Agent\deepseek\INDEX.md`](../INDEX.md) — 三个 Fork 项目的完整分析与关系架构

---

## 开源许可 / License

SUL-1.0（继承上游 code-yeongyu/oh-my-openagent）
