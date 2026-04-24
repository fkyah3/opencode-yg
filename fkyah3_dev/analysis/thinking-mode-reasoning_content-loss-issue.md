# Thinking Mode `reasoning_content` 丢失问题

## 现象

使用 DeepSeek reasoning 模型（或其他需要 `thinking`/`reasoning` 模式的模型）时，在以下场景报错：

```
The `reasoning_content` in the thinking mode must be passed back to the API.
```

**仅发生在上下文回放/历史重建时**。新开 session 一次性使用正常。

## 原因

DeepSeek API 的 thinking 模式有一个关键约束：**API 返回过的 `reasoning_content` 在后续请求中必须原样回传**。回放历史消息时，如果任何 assistant 消息的 `reasoning_content` 被剥离或缺失，API 就会拒绝请求。

## 根因

OpenCode 的 `transform.ts` 在处理消息格式时，在 `providerOptions.openaiCompatible` 下保存 `reasoning_content`（见 `src/provider/transform.ts:188-201`）：

```typescript
// 将 reasoning parts 提取到 message.providerOptions.openaiCompatible.reasoning_content
return {
  ...msg,
  content: filteredContent,
  providerOptions: {
    ...msg.providerOptions,
    openaiCompatible: {
      ...msg.providerOptions?.openaiCompatible,
      [field]: reasoningText,
    },
  },
}
```

这种方式存在丢失风险：

1. **Magic Context 上下文压缩**→ 消息被压缩时 `providerOptions` 可能不完整
2. **序列化/反序列化路径**→ 某些序列化器不处理 `providerOptions` 中的嵌套字段
3. **上下文窗口超限 FIFO 淘汰**→ 旧消息被丢弃后丢失其 `reasoning_content`
4. **session 切换 / 快照恢复**→ 某些恢复路径走的是不携带 `providerOptions` 的消息拷贝

## 谁受影响

- **DeepSeek reasoning 模式**（当前触发）
- Kimi K2.5 / Qwen-plus / Qwen3 / QWQ 等 reasoning 模型（理论也会触发）
- 长 session、历史回放、Magic Context 压缩后重启的场景

## 验证

1. 新开 session 正常 → 非模型/API层面问题
2. 回放历史旧 session 后报错 → 确认 `reasoning_content` 在回放路径丢失
3. 日志中出现 `statusCode: 400` + `"reasoning_content" must be passed back` → 确认

## 预期修复位置

最直接的修复在 `transform.ts` 或消息序列化层：

### 方案 A — 回放时补回 reasoning_content

在构建回放消息时，从 `providerOptions.openaiCompatible.reasoning_content` 提取回消息的顶层 `reasoningContent` 字段。

### 方案 B — 不走 providerOptions（不推荐）

把 `reasoning_content` 直接嵌入消息内容数组而非藏在 `providerOptions` 里——但这可能违反消息格式规范。

### 方案 C — DeepSeek provider 处理

在 DeepSeek provider 的消息序列化层，主动从历史消息的 `providerOptions` 中提取 `reasoning_content` 回填到请求体。这是最安全的做法——只影响 DeepSeek 的 thinking 模型，不影响其他模型。

## 参考

- `packages/opencode/src/provider/transform.ts:874-884` → reasoning 模式开启逻辑
- `packages/opencode/src/provider/transform.ts:180-201` → `reasoning_content` 保存到 `providerOptions`
- API 错误日志：`dev.log` 中搜 `reasoning_content` `must be passed back`

## 临时绕过

- 新开 session 重新开始对话
- 避免在长 session 中触发 Magic Context 压缩后继续使用 thinking 模式（可在 thinking 模式切换到非 thinking 模式来规避）
