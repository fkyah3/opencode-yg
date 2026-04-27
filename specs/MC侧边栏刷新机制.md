# MC 侧边栏刷新机制

## 核心矛盾

MC 侧边栏（TUI 面板）的 UI 刷新依赖 `message.updated` / `session.updated` 事件。
**这些事件只有 LLM 输出（你和我对话）时才会触发。**
flush、dreamer、historian 等后台操作不会触发这些事件，因此侧边栏不会自动更新。

```
flush 执行成功（服务端 pending_ops → 0）
        ↓
但侧边栏只在下一次输出时才刷新
        ↓
UI 卡在"待清理"，用户以为没生效
```

## 为什么轮询不可靠

- 前端 `setInterval` + `requestRender()` 在 Solid TUI 下效果不稳定
- 非活跃会话下 `requestRender()` 可能被跳过
- 轮询间隔太短浪费开销，太长又不够实时

## 最终方案：队列三态

纯前端派生状态，不依赖事件驱动：

| 状态 | 触发条件 | 显示 |
|------|----------|------|
| `idle` | 一直无待清理 | 队列: 无 |
| `pending` | `pendingOpsCount` 从 0 → N | 队列: 待清理 (N) |
| `cleaning` | `pendingOpsCount` 从 N → 0（1.5秒保底） | 队列: 正在清理 ⟳ |
| `justCleared` | cleaning 结束（15秒后回 idle） | 队列: 刚刚清理 (Xs 前) |

核心原理：
- **`createEffect` 只做一件事：** 检测 N→0 跳变，记录时间戳。不设 state 不设 timer
- **`createMemo` 计算显示状态：** 基于 `tick` 信号（500ms）自动重算
- **先决条件：** `count > 0` → 永远优先显示 pending

## 如果要做到完美

需要改服务端 flush 完成后发通知事件（如 `mc.flushed`），让侧边栏收到推送后立刻刷新。
但性价比不高——核心功能（flush 实际执行了）不受 UI 延迟影响。

## 结论

- 用户看到"待清理"后运行 `/ctx-flush` → flush 确实执行了
- 侧边栏最多等一次输出才更新显示
- 队列三态的核心价值是 **明确了"正在清理"这个中间态的心理模型**
- 没有 Bug，是 MC 设计特性：事件驱动刷新，后台操作不触发事件
