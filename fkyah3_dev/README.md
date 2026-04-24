# fkyah3/opencode-fkyah3 — Windows-first OpenCode 分支

> 基于 [anomalyco/opencode](https://github.com/anomalyco/opencode) v1.14.19
> 这些 bug 在社区挂了几个月，没人愿意修 Windows 平台的问题。我们修了。

---

## 本分支做了什么 / What This Fork Fixes

### 1. Windows CJK 编码修复 / CJK Encoding Fix

OpenCode 在 Windows 中文系统上执行命令时，中文输出乱码。根因：子进程使用 GBK 编码而非 UTF-8。

**修复**：在 `packages/opencode/src/tool/bash.ts` 中，为每个子进程注入三层 UTF-8 编码设置（控制台代码页、.NET 输出编码、PowerShell 管道编码）。

```powershell
# Before: 输出乱码
Write-Output "你好世界"
# → ä½ å¥½ä¸ç\U+fffd\U+fffd

# After: 输出正常
Write-Output "你好世界"
# → 你好世界
```

### 2. Magic Context TUI 侧边栏修复 / TUI Sidebar Fix（跨仓库） 

Magic Context 侧边栏始终空白不渲染。根因：OpenCode fork 的 `TuiOptions` Zod schema 使用 `.strict()` 拒绝未声明的 `show_thinking: true` 字段，导致整个配置解析失败返回空对象，外部插件永不加载。

**修复**：在 `packages/opencode/src/cli/cmd/tui/config/tui-schema.ts` 中新增 `show_thinking: z.boolean().optional()`。一行代码，三个月没人找到。

提交：`c1a595acc`

---

## 启动 / How to Run

```powershell
# 1. 在 opencode-fkyah3 根目录
cd packages/opencode
bun run --conditions=browser src/index.ts
```

或使用 `opencodesrc.ps1`（自动处理编码设置）。

---

## 目录结构 / Directory Layout

| 路径 | 说明 |
|------|------|
| `fkyah3_dev/README.md` | 本文件 — 分支介绍 |
| `fkyah3_dev/做了什么/` | 详细贡献总结 |
| `fkyah3_dev/ACHIEVEMENTS.md` | 修订记录 |
| `fkyah3_dev/internal/` | 内部工作文档（无关观众） |
| `opencodesrc.ps1` | 推荐启动脚本 |

---

## 开源许可 / License

Apache 2.0（继承上游 anomalyco/opencode）
