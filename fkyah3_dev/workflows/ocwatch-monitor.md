# OCWatch — OpenCode 活动监视器

> ocwatch 是 OpenCode 生态的实时活动监视器，提供 Web 仪表盘查看所有 agent 活动、session 状态。

## 启动

```powershell
bunx ocwatch
```

默认在 `http://localhost:50234` 启动 Web 仪表盘。添加 `--no-browser` 只启动 API 不自动打开浏览器：

```powershell
bunx ocwatch --no-browser
```

## 通过 API 查询（AI 可用）

ocwatch 提供 REST API，AI 可以在会话中直接访问：

### 列出所有 session

```
GET /api/sessions
```

返回包含所有 session ID、标题、创建/更新时间、所属项目的 JSON 数组。

### 查看特定 session 详情

```powershell
# 查看 session ID 列表
curl http://localhost:50234/api/sessions

# 查看特定 session 消息
curl "http://localhost:50234/api/sessions/{session_id}"
```

### 可查看的 agent 活动

- **Dreamer**（Magic Context）：会话标题包含 `magic-context-dream-*`（verify / archive-stale / consolidate）
- **Historian**（Magic Context）：会话标题含 `magic-context-historical-*`
- 所有 AI agent 会话（sisyphus、oracle、explore 等）

## 用途

| 场景 | 做法 |
|------|------|
| 检查 Dreamer 是否在运行 | `GET /api/sessions` 看有没有新的 `magic-context-dream-*` |
| 查看 agent 历史活动 | 按 session 标题和时间过滤，用 `session_read` 看具体内容 |
| 确认 session 是否卡住 | 对比 `updatedAt` 和当前时间 |

## 注意事项

- 需要 OpenCode 在运行时才能访问，重启 OpenCode 后需重新启动 ocwatch
- 端口 `50234` 冲突时，用 `--port <number>` 指定其他端口
- API 路径可能随版本变动，当前版本支持 `/api/sessions`
