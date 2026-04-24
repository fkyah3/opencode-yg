<p align="center"><b>fkyah3/opencode-fkyah3</b> — Windows-first fork, optimized for DeepSeek</p>

---

**English** · [简体中文](./README.zh.md) · [繁體中文](./README.zht.md)

---

This is a personal fork of [anomalyco/opencode](https://github.com/anomalyco/opencode), focused on Windows platform compatibility and DeepSeek model support.

The upstream project is excellent, but Windows and DeepSeek have different priorities there. Rather than waiting on open issues, we chose to address these problems ourselves and move at our own pace.

> **Code by: AI (DeepSeek v4Lite / Sisyphus)**  
> **Review & direction: fkyah3 (human)**  
> All fixes and optimizations in this fork are implemented by AI. The human reviews the output and catches direction errors.  
> See [`fkyah3_dev/`](./fkyah3_dev/) for details.

---

**这是 [anomalyco/opencode](https://github.com/anomalyco/opencode) 的个人维护分支。**  
专注于解决 Windows 平台问题和 DeepSeek 模型兼容性。

这个分支源于个人使用需求。上游是个优秀的项目，但 Windows 平台和 DeepSeek 模型的兼容性不是他们的优先方向。与其在 issue 里等待，我们选择自己处理这些问题，按自己的节奏推进。

> **代码实现：AI（DeepSeek v4Lite / Sisyphus）**  
> **反馈与质量监督：fkyah3（人工）**  
> 这个分支的所有修复和优化由 AI 完成。人类负责发现问题、确认方向、紧急刹车。  
> 详见 [`fkyah3_dev/`](./fkyah3_dev/)。

---

## What's Fixed / 修复列表

- **[Windows CJK Encoding]** Garbled Chinese output in subprocesses (GBK → UTF-8, 3-layer fix)
- **[TUI Plugin Loading]** Magic Context sidebar blank (Zod schema `show_thinking` undeclared)
- **[DeepSeek Thinking Mode]** `reasoning_content` lost on replay causing API 400 (core fix, upstream issue [#24104](https://github.com/anomalyco/opencode/issues/24104))

## Quick Start / 快速开始

```powershell
cd packages/opencode
bun run --conditions=browser src/index.ts
```

## Learn More / 了解更多

| Location / 位置 | What's there / 内容 |
|------|------|
| [`fkyah3_dev/README.md`](./fkyah3_dev/README.md) | Full fix details & root cause analysis |
| [`fkyah3_dev/issues/`](./fkyah3_dev/issues/) | Issue tracking & resolution records |
| [`fkyah3_dev/analysis/`](./fkyah3_dev/analysis/) | Deep-dive analysis docs with code flow |

## Upstream

Based on [anomalyco/opencode](https://github.com/anomalyco/opencode) (Apache 2.0).  
Changes from upstream are merged regularly.
