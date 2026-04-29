<p align="center"><b>fkyah3/opencode-yg — 愚公</b><br>
<code>DeepSeek 深度优化 · 全中文 AI Agent · 三位一体</code></p>

<p align="center">
  <a href="./SETUP.md"><b>🚀 从零搭建指南</b></a> · <a href="./README.md">English</a> · <a href="./README.zht.md">繁體中文</a>
</p>

---

## ⚠️ 分支状态 (2026-04-30)

| Branch | 状态 | 说明 |
|--------|------|------|
| **`stable`** ✅ | **稳定版本（推荐）** | 已修复 6 项代码审计问题，性能优化（snapshot 增量），每日推进进度 |
| `main` | ❌ **有冲突，不推荐** | 合并了 plan/build 模式砍除，TUI 可能不稳定 |

**开发完成时间待定，但每天都会推进。** 如果你是新用户，请使用 `stable` 分支。

最新稳定 commit: `9e82ea751` — 6项代码审计修复

---

## 🧠 语言锚定 —— LLM 多语言适配的系统方法

**核心发现**：LLM 会话的第一个主动输出语言，决定了整场对话的思维惯性。读中文 ≠ 用中文思考。

| 阶段 | 效果 | 干预措施 |
|------|------|---------|
| 纯 prompt 约束（4 条语言规则） | ~70% | 仅修改 prompt 文本 |
| + 翻译 16 个工具描述 | ~85% | 工具层中文对齐 |
| + 翻译 50+ 文件注释（新对话验证） | ~95%+ | 代码层加固 |
| + 锚定指令（7 行） | 接近全程中文 | 自回归惯性利用 |

### V2 对照实验（已验证）

2026年4月，三组对照测试（温度=0，关闭 OMO）：

| 测试 | 条件 | 结果 |
|------|------|------|
| A | 纯英文提示词 + 英文指令 | 全程英文思考 |
| B | 纯英文提示词 + 锚定指令 | 前期中文，约 1600 行后漂移回英文 |
| C | 纯英文提示词 + 中文语言思维指令 | **全程中文，零漂移** |

**核心结论**：思维指令（"请用中文语言思维"）比输出锚定指令更稳定。环境对齐提供基线，思维指令提供零漂移稳定性。

完整实验报告在 [`fkyah3_dev/实验/`](./fkyah3_dev/实验/)。  
📖 [Discussion #6 — V2 对照实验](https://github.com/fkyah3/opencode-fkyah3/discussions/6)

---

## 关于本项目

这是 opencode 的**中文完全体**——不仅翻译了提示词和工具描述，还内置了 OMO 和 Magic Context 插件，实现三位一体。

所有修复和优化均由 AI（**DeepSeek V4 Flash + 愚公**）在人类监督下完成。

> **代码实现：DeepSeek V4 Flash (thinking mode) / 愚公（AI）**  
> **人工审核与方向把控：fkyah3**  
> **这个 fork 是 AI 驱动软件开发的现场演示。**  
> 详见 [`fkyah3_dev/`](./fkyah3_dev/)。

---

## 修复列表

| 修复项 | 领域 |
|--------|------|
| `reasoning_content` 多轮对话丢失 — DeepSeek 思考模式 400 错误的根源 | **核心** |
| OpenRouter `@openrouter/ai-sdk-provider` providerOptions key 不匹配 | **Provider** |
| 多窗口崩溃级联 — OMO tool-pair-validator 断路器 | **稳定性** |
| 每会话独立日志（重启不再截断 dev.log） | **开发体验** |
| Windows CJK 编码 — 子进程管道三层 GBK/UTF-8 修复 | **Win32** |
| TUI 插件加载 — Magic Context 侧边栏空白（Zod strict 模式） | **TUI** |
| MC 工具截断 — `[truncated]` → `[tool: N lines, MKB \| preview]` | **MC** |
| DeepSeek V4 架构研究 → 400K 上下文、90% MC 阈值 | **V4** |
| 全局 Session 池 — 任意目录下查看所有对话 (2.0) | **Session** |
| 全中文系统提示：愚公、关键词检测、环境信息 | **i18n** |
| 语言锚定 — 已验证的 LLM 多语言适配系统方法 | **i18n** |
| `stable` 分支 6 项代码审计修复（异常退出、env 泄漏等） | **稳定性** |
| Snapshot 增量优化 — add() 增量 + stat 缓存，track 从 3s 降到 200ms | **性能** |

---

## 快速启动

```powershell
cd packages/opencode
bun install
bun run --conditions=browser src/index.ts
```

**建议使用 `stable` 分支。**

---

## 了解更多

| 链接 | 内容 |
|------|------|
| [`fkyah3_dev/`](./fkyah3_dev/) | 修复详情、分析文档 |
| [`fkyah3_dev/实验/`](./fkyah3_dev/实验/) | V2 对照实验完整报告 |
| [Discussion #1 — 语言锚定 RFC](https://github.com/fkyah3/opencode-fkyah3/discussions/1) | 技术方案 |
| [Discussion #4 — 培养用户，而不是驯化用户](https://github.com/fkyah3/opencode-fkyah3/discussions/4) | 设计哲学 |
| [上游 Issue #24104](https://github.com/anomalyco/opencode/issues/24104) | reasoning_content 根因讨论 |

## 上游

基于 [anomalyco/opencode](https://github.com/anomalyco/opencode)（Apache 2.0）。定期合并上游变更。

---

<p align="center"><i>由 AI 建造。由人类把关。为真实世界而生。</i></p>
