# OpenCode 开发模式启动指南

## 启动源码版本（带修复）

```bash
# 1. 进入源码目录
cd E:\fkyah3\Agent\KIMI2.6\openode-fkyah3\opencode-fkyah3\packages\opencode

# 2. 确认当前分支
git branch
# 应该显示 * fix/permission-reasoning-truncation

# 3. 启动开发模式
bun run --conditions=browser src/index.ts

# 4. 如果需要指定项目目录
bun run --conditions=browser src/index.ts E:\你的\项目\路径
```

## 验证运行的是源码版本

1. **看 Sidebar 右下角**：应该显示 `• OpenCode local-fkyah3-V1`
   - 如果显示 `local` 或 `1.14.20`，说明运行的是旧版本

2. **不要运行 `opencodedev`**：这可能是全局安装的预编译版本，不包含我们的修复

3. **不要运行 `opencode`**：同上，可能是旧版本

## 如果版本号不显示

```bash
# 确认修改存在
git diff packages/opencode/src/cli/cmd/tui/routes/session/sidebar.tsx

# 确认在正确目录
pwd
# 应该显示 .../packages/opencode

# 强制重新启动
cd packages/opencode
bun run --conditions=browser src/index.ts
```

## 常用命令

| 命令 | 用途 |
|---|---|
| `bun typecheck` | 类型检查 |
| `bun test` | 运行测试 |
| `git status` | 查看修改状态 |
| `git log --oneline -3` | 查看最近提交 |

## ⚠️ 重要提醒

- 开发模式**不需要** `bun run build`
- 修改 `src/` 下的文件后直接重启即可生效

### 数据库与对话记录

**不同版本使用不同的数据库文件**：

| 运行方式 | Channel | 数据库文件 | 对话记录 |
|---|---|---|---|
| 预编译版本 (`opencode`/`opencodedev`) | `latest`/`beta` | `opencode.db` | ✅ 原有记录 |
| 源码开发模式 | `local` | `opencode-local.db` | ❌ **空的，不共享** |

**这意味着**：切换到源码开发模式后，你之前的对话记录**不会显示**。它们仍然保存在 `opencode.db` 里，但开发模式读取的是 `opencode-local.db`。

**如果需要访问旧对话**：暂时用回预编译版本，或者手动导出/迁移数据库。

### 数据库文件位置

- 主数据库：`C:\Users\13248\.local\share\opencode\opencode.db`
- 开发模式数据库：`C:\Users\13248\.local\share\opencode\opencode-local.db`
- WAL 文件：`-shm` 和 `-wal` 后缀的配套文件
