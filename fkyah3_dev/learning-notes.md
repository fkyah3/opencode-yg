# 学习笔记

## bun 构建缓存不跟随源码更新

**问题**：修改 `sidebar-content.tsx`（MC TUI 插件）后反复 `bun run build`，dist 始终不包含新代码。

**排查路径**：
1. 确认源文件有修改（时间戳正确）✅
2. 删除 dist 目录重建 → 仍不生效 ❌
3. 清除 bun 全局缓存 → 超时 ❌
4. 最终发现：`sidebar-content.tsx` **不在 `src/index.ts` 的导入链中**。它是 TUI 插件，由 OpenCode 运行时直接加载源文件，不进 bun build

**教训**：先查导入链，再怀疑缓存。不是所有源码都经过 bundler。
