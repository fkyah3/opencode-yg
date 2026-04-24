# OpenCode Fork 交接文档

## 当前状态

- **分支**: `fix/permission-reasoning-truncation`
- **版本标识**: `local-fkyah3-V1`（Sidebar 右下角）
- **核心修复**: `packages/opencode/src/provider/transform.ts`

## 已知修复

### 1. reasoning_content missing 错误（部分修复）

**位置**: `packages/opencode/src/provider/transform.ts` normalizeMessages()

**已修复场景**:
- 历史 assistant + tool-call 消息（`hasToolCalls` 检测）
- 最后一条 user 之后的 assistant 消息（`isAfterLastUser`）

**未完全修复**:
- `index 190` 报错仍可能在长对话中出现
- 根因可能是 `normalizeMessages` 只处理 `Array.isArray(msg.content)` 的消息
- 如果 `convertToModelMessages` 将 content 压缩为字符串，reasoning 信息会丢失

**验证状态**: ❌ 未完全验证（用户之前一直在运行预编译版本 `opencodedev`，非源码修复版）

## 关键路径

```
packages/opencode/src/provider/transform.ts       # 修复位置
packages/opencode/src/provider/transform.test.ts  # 单元测试
packages/opencode/src/cli/cmd/tui/routes/session/sidebar.tsx  # 版本号显示
```

## 数据库

- **路径**: `C:\Users\13248\.local\share\opencode\opencode.db`
- **格式**: SQLite（含 -shm 和 -wal WAL 文件）
- **工具**: DB Browser for SQLite v3.13.1

## 待办事项

1. [ ] 确认用户实际运行的是源码修复版（见 DEV_STARTUP.md）
2. [ ] 重新验证 reasoning_content 修复（长对话测试）
3. [ ] 排查 Win32 `$env:` 注入问题（见 INVESTIGATION_STATUS.md）
4. [ ] 整理 fkyah3_dev 目录，建立项目索引（任务 T-29191117）

## 关键记忆

- OpenCode 数据库: `C:\Users\13248\.local\share\opencode\opencode.db`
- 默认分支: `dev`
- 开发模式命令: `bun run --conditions=browser src/index.ts`
- 上游 PR/issue 限制: 禁止 AI 生成长文本（VOUCHED.td 黑名单）
