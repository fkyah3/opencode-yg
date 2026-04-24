# reasoning_content 丢失根因分析及修复

## 现象

DeepSeek reasoning 模型在长对话中报错：
```
The `reasoning_content` in the thinking mode must be passed back to the API.
```

仅发生在上下文回放/历史重建时。新 session 一次性使用正常。

## 根因链路

### 第一层：DeepSeek API 约束

DeepSeek API 要求当 `thinking` 模式启用时，conversation 中**每一条 assistant 消息**都必须包含 `reasoning_content` 字段（即使为空字符串 `""`）。这是 DeepSeek 特有的 API 约束，OpenAI 原生无此要求。

### 第二层：AI SDK 的序列化缺陷

`@ai-sdk/openai-compatible` 的 `convertToOpenAICompatibleChatMessages()` (`dist/index.js:260`)：

```javascript
...reasoning.length > 0 ? { reasoning_content: reasoning } : {},
```

AI SDK **只在有实际 reasoning 文本时**才加 `reasoning_content`。对不含 reasoning 的 assistant 消息（如纯 tool-call 消息或后续轮次消息），该字段**缺失**，触发 DeepSeek API 报错。

### 第三层：OpenCode 的 `normalizeMessages()` 被条件阻挡

OpenCode 的 `transform.ts` 中 `normalizeMessages()` (line 189-236) 有专门逻辑处理这个问题——对后置消息和含 tool-call 的消息注入空 `reasoning_content: ""`。

但该代码块被条件挡住：
```typescript
if (typeof model.capabilities.interleaved === "object" && model.capabilities.interleaved.field) {
```

`interleaved` 来自模型定义，对 `opencode.json` 自定义模型默认为 `false`（boolean）。因此：
- `deepseek-reasoner`：有 `"reasoning": true`，但 `interleaved: false` → **不执行**
- `deepseek-v4-flash`：无 `"reasoning"`，`interleaved: false` → **不执行**

### 总结链路

```
DeepSeek API: 要求所有 assistant 消息带 reasoning_content
    ↓
AI SDK: 只在 reasoning.len > 0 时才添加
    ↓
OpenCode normalizeMessages(): 有补空逻辑但被 interleaved 条件挡住
    ↓
结：回放历史时，纯 tool-call / 后置 assistant 消息缺 reasoning_content → API 400
```

## 修复

### `transform.ts` 改动

文件：`packages/opencode/src/provider/transform.ts`

将条件从「仅 `interleaved` 模型」扩展为「任意有 reasoning 需求的模型」：

```typescript
// 旧：
if (typeof model.capabilities.interleaved === "object" && model.capabilities.interleaved.field) {

// 新：
const interleaved = model.capabilities.interleaved
const isInterleaved = typeof interleaved === "object" && interleaved.field
const field = isInterleaved ? interleaved.field : "reasoning_content"
const key = providerOptionsKey(model)

const hasReasoningContent =
  isInterleaved ||
  model.capabilities.reasoning ||
  msgs.some((msg) => ... reasoning parts ...)

if (hasReasoningContent) {
```

三个触发条件任一个满足即可激活：
1. `interleaved` 已配置（原条件，兼容现有模型）
2. `model.capabilities.reasoning = true`（`deepseek-reasoner` 等 reasoning 模型）
3. 消息中已存在 `{type: "reasoning"}` parts（DB 回放路径，通用兜底）

### 配置文件改动

- `magic-context.jsonc`: `max_input_tokens: 490000 → 200000`（减少上下文膨胀速度）
- `opencode.json`: 所有 model 的 `limit.context` 从 1048576 → 200000
- `oh-my-openagent.json`: 所有 agent 恢复 `deepseek/deepseek-reasoner`（测试后决定是否切 flash）

## 验证方法

1. 确认 OpenCode fork 的 `transform.ts` 中 `normalizeMessages()` 的条件已更改
2. 使用 `deepseek-reasoner` 模型进行长对话（5+ 轮带 tool-call），检查是否再出现 400 错误
3. 如果仍然报错，日志中搜 `reasoning_content` 确认是否还有缺失的 assistant 消息

## 涉及的代码位置

| 文件 | 作用 |
|---|---|
| `opencode-fkyah3/packages/opencode/src/provider/transform.ts` | `normalizeMessages()` 提取 reasoning → providerOptions |
| `node_modules/@ai-sdk/openai-compatible/dist/index.js:260` | AI SDK 序列化 `reasoning_content` 的条件 |
| `opencode-fkyah3/packages/opencode/src/session/llm.ts:395` | 中间件调用 `ProviderTransform.message()` |
| `opencode-fkyah3/packages/opencode/src/session/message-v2.ts:796` | DB 回放时重建 reasoning part |

## 未解决的问题

- `reasoning_content` 在 Magic Context 压缩路径中是否也会被丢弃？需要进一步测试
- 切换到 `deepseek-v4-flash`（thinking 模式而非 reasoning 模式）后是否还有此问题？flash 用 `thinking: { type: "enabled" }` 而非 `reasoning: true`，修复的第三个条件（`hasReasoningContent` 的 `.some()` 回退）理论上应覆盖此场景
