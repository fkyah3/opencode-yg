<p align="center">
  <picture>
    <source srcset="packages/console/app/src/asset/logo-ornate-dark.svg" media="(prefers-color-scheme: dark)">
    <source srcset="packages/console/app/src/asset/logo-ornate-light.svg" media="(prefers-color-scheme: light)">
    <img src="packages/console/app/src/asset/logo-ornate-light.svg" alt="OpenCode logo" width="400">
  </picture>
</p>
<p align="center"><b>fkyah3/opencode-fkyah3</b> — Windows 优先 + DeepSeek 优化分支</p>

---

**这是 [anomalyco/opencode](https://github.com/anomalyco/opencode) 的个人维护分支。**  
专注于解决 Windows 平台问题和 DeepSeek 模型兼容性。

## 本分支修复了什么问题

- **[Windows CJK 编码]** 子进程中文输出乱码（GBK → UTF-8 三层注入）
- **[TUI 插件加载]** Magic Context 侧边栏空白（Zod schema `show_thinking` 未声明）
- **[DeepSeek 思考模式]** `reasoning_content` 丢失导致 API 400（核心修复，已提交 upstream issue [#24104](https://github.com/anomalyco/opencode/issues/24104)）

## 快速开始

```powershell
# 从源码运行（推荐）
cd packages/opencode
bun run --conditions=browser src/index.ts
```

## 了解更多

| 位置 | 内容 |
|------|------|
| [`fkyah3_dev/README.md`](./fkyah3_dev/README.md) | 完整修复详情、根因分析入口 |
| [`fkyah3_dev/issues/`](./fkyah3_dev/issues/) | 已知问题和修复跟踪 |
| [`fkyah3_dev/analysis/`](./fkyah3_dev/analysis/) | 根因分析文档（含代码流程图） |

## Upstream

本项目基于 [anomalyco/opencode](https://github.com/anomalyco/opencode)（Apache 2.0）。  
所有上游变更定期合并。
