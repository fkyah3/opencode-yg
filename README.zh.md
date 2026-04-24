<p align="center"><b>fkyah3/opencode-fkyah3</b> — Windows 优先 + DeepSeek 优化分支</p>

---

[English](./README.md) · **简体中文** · [繁體中文](./README.zht.md)

---

这是 [anomalyco/opencode](https://github.com/anomalyco/opencode) 的个人维护分支，专注于 Windows 平台兼容性和 DeepSeek 模型支持。

上游是个优秀的项目，但 Windows 和 DeepSeek 不是他们的优先方向。与其在 issue 里等待，我们选择自己处理这些问题，按自己的节奏推进。

> **代码实现：AI（DeepSeek v4Lite / Sisyphus）**  
> **反馈与质量监督：fkyah3（人工）**  
> 所有修复和优化由 AI 完成，人类负责发现问题、确认方向、紧急刹车。  
> 详见 [`fkyah3_dev/`](./fkyah3_dev/)。

## 修复列表

- **[Windows CJK 编码]** 子进程中文输出乱码（GBK → UTF-8 三层注入）
- **[TUI 插件加载]** Magic Context 侧边栏空白（Zod schema `show_thinking` 未声明）
- **[DeepSeek 思考模式]** `reasoning_content` 丢失导致 API 400（核心修复，upstream issue [#24104](https://github.com/anomalyco/opencode/issues/24104)）

## 了解更多

| 位置 | 内容 |
|------|------|
| [`fkyah3_dev/README.md`](./fkyah3_dev/README.md) | 完整修复详情与根因分析入口 |
| [`fkyah3_dev/issues/`](./fkyah3_dev/issues/) | 问题跟踪与修复记录 |
| [`fkyah3_dev/analysis/`](./fkyah3_dev/analysis/) | 深度分析文档 |

## Upstream

基于 [anomalyco/opencode](https://github.com/anomalyco/opencode)（Apache 2.0），定期合并上游变更。
