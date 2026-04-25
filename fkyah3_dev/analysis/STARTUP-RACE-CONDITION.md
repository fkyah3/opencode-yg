# Startup race condition — service=server error=failed

## 状态
已知，低优先级，不阻塞任何功能。

## 现象
OpenCode 启动日志前 2 分钟内出现大量 `service=server error=failed`，14:25→14:27 集中，14:30 后消失。

## 根因
Effect 调度器异步初始化中的 race condition：historian/dreamer 等后台子服务启动快于主 LLM 服务，过早尝试 API 调用时主服务尚未就绪。重试机制最终成功，不影响使用。

## 日志特征
```
ERROR 2026-04-25T14:25:38 service=server error= failed
ERROR 2026-04-25T14:27:19 service=server error= failed
...
(密集，间隔短)
...
(逐渐稀疏)
...
(消失)
```

## 上游相关
上游架构设计如此。Effect 调度器调度多个 Effect fiber 并行启动，不保证顺序。

## 修复建议
- 低优先级 — 纯粹日志噪音，不影响用户功能
- 如需修：在 LLM provider 初始化 ready 信号后，再启动依赖 provider 的 background fiber
- 投入产出不成正比，暂时 ignore
