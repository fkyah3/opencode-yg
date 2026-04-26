# fkyah3/opencode-fkyah3 — V2.0 全局 Session 池

> 基于 [anomalyco/opencode](https://github.com/anomalyco/opencode) v1.14.19
> **代码实现：AI（DeepSeek V4 Flash/Pro / Sisyphus）**  
> **人工审核：fkyah3**

---

## V2.0 新增 / 2.0 Features

| 特性 | 说明 |
|------|------|
| 🌐 **全局 Session 池** | Session 不再按 git projectID 分裂。从任意目录启动都能看到所有对话 |
| 📋 **Session 列表优化** | 含子 agent session、自动刷新、删除保护（AI 工作中禁用）、红色标题警告 |
| 🛡️ **安全默认值** | Session 分享功能完全禁用（`OPENCODE_FKYAH3_DISABLE_SHARE=true`），AI 工作时禁止删除 |
| 🎨 **UI 改进** | 对话框加大（xlarge）、隐藏搜索栏、工作目录 footer |
| 🔧 **V4 配置对齐** | 上下文 500K→800K、MC 阈值 70%→85%、CSA 对齐的 compression grace |
| 🆔 **版本标识** | `local-fkyah3-V2.0` |

### 如何启用

`opencode.cmd` 已预设两个环境变量：

```cmd
set "OPENCODE_FKYAH3_GLOBAL_SESSIONS=true"
set "OPENCODE_FKYAH3_DISABLE_SHARE=true"
```

> **注意**：V2.0 的全局 session 池是一次性迁移。首次启动后所有 session 的 `project_id` 自动变为 `"global"`，之后不再分裂。

---

## 全部修复一览 / All Fixes

### 核心修复
- [x] **reasoning_content 回传修复** — DeepSeek V4 thinking mode API 400 的根本修复
- [x] **全局 Session 池 V2.0** — session 不再按项目分裂，跨目录可见
- [x] **Windows CJK 编码** — 三层 UTF-8 修复
- [x] **TUI 侧边栏** — Zod strict → show_thinking
- [x] **子 Agent 权限分析** — workaround 通过 opencode.json 声明

### 会话管理（2.0）
- [x] 子 agent session 在列表中可见
- [x] 对话框自动刷新
- [x] AI 工作中禁止删除
- [x] 删除保护红色警告
- [x] Session 分享功能全局禁用（服务端 403）

### OMO Agent 插件
- [x] DeepSeek 全中文系统提示词
- [x] tool-pair-validator 断路器
- [x] non-interactive-env Windows 修复
- [x] per-process 日志隔离

### Magic Context 插件
- [x] tool truncation 智能摘要 `[tool: N lines, MKB | preview]`
- [x] compression grace 10→15（V4 CSA 对齐）
- [x] session list 全局可见

### 配置
- [x] reasoningEffort: max
- [x] limit.context: 800K
- [x] MC execute_threshold: 85%
- [x] HISTORIAN_CHUNK_MAX: 80K
- [x] Pro/Flash agent split（Sisyphus/Oracle → Pro）

---

## 文档导航

| 文档 | 内容 |
|------|------|
| `analysis/reasoning_content-loss-root-cause-analysis.md` | reasoning_content 丢失的完整链路分析 |
| `analysis/GLOBAL-SESSION-POOL-DESIGN.md` | 2.0 全局 session 池架构设计 |
| `analysis/DEEPSEEK-V4-ECOSYSTEM-ISSUE.md` | 跨项目 systemic 问题汇总 |
| `analysis/deepseek-v4-workflow-optimization.md` | V4 架构研究 → 工作流优化 |
| `internal/COMPLETION.md` | 完成清单 |
| `internal/DEEPSEEK-FEEDBACK.md` | DeepSeek 反馈邮件 |
