# 分支：feat/tui-replacement

> 创建于 2026-04-28，基于 `main`
> 目标：测试 TUI 渲染架构的替代方案（Ink/Rubi/Cascade）

## 背景

`@opentui/core` 在 Windows TTY 下崩溃，根因在 Bun 的 `win32.zig` 类型声明，非我们能控。
详细调试见 `specs/tui-调试总结与根因.md`

## 探索方向

- [ ] Ink（React 终端 UI）— star 28k+，成熟但需要 Solid → React 重构
- [ ] Cascade — @opentui 的社区 fork，API 基本兼容
- [ ] Rubi — 纯 Bun/Zig 方案
- [ ] 纯 `--headless` 继续优化

## 关联

- 根因文档：`specs/tui-调试总结与根因.md`
- 上游 issue：`anomalyco/opentui#152` `#940`
