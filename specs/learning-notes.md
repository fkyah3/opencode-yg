# 学习笔记

## bun 构建缓存不跟随源码更新

**问题**：修改 `sidebar-content.tsx`（MC TUI 插件）后反复 `bun run build`，dist 始终不包含新代码。

**排查路径**：
1. 确认源文件有修改（时间戳正确）✅
2. 删除 dist 目录重建 → 仍不生效 ❌
3. 清除 bun 全局缓存 → 超时 ❌
4. 最终发现：`sidebar-content.tsx` **不在 `src/index.ts` 的导入链中**。它是 TUI 插件，由 OpenCode 运行时直接加载源文件，不进 bun build

**教训**：先查导入链，再怀疑缓存。不是所有源码都经过 bundler。

## solo.log 分析 (2026-04-26 session)

**日志文件位置**：`C:\Users\13248\.local\share\opencode\log\solo.log`（29,020 行）

**关键发现**：
- 最长 API 调用耗时 **87 秒**（87469ms）—— 上下文过大 + `reasoningEffort: max` 导致
- 275 个 ERROR，全是 `service=server error=failed`（标准启动期 race condition）
- **tool-pair-validator 活动：0 次** —— 熔断器工作正常
- **reasoning_content 报错：0 次** —— NormalizeMessages 全覆盖

**结论**：日志无异常。配置改 400K + 90% threshold + 全部 Flash 后 87 秒超时不会再现。
