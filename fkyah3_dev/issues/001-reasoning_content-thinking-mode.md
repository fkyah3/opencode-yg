# Issue #1: DeepSeek thinking mode `reasoning_content` must be passed back to API

**状态**: ✅ 已修复  
**修复提交**: `b5b6ad05d`  
**分支**: `fix/permission-reasoning-truncation`  
**日期**: 2026-04-24

---

## Problem

When using DeepSeek models with thinking mode enabled (`thinking: {type: "enabled"}`) via the `@ai-sdk/openai-compatible` provider, API calls fail after the first assistant response with:

```
The `reasoning_content` in the thinking mode must be passed back to the API.
```

This occurs on every subsequent API call that replays conversation history (DB restore, session continuation), making thinking mode models effectively unusable beyond the first turn.

Affected models:
- `deepseek-v4-flash` (V4, `thinking: {type: "enabled"}`)
- `deepseek-v4-pro` (V4, `thinking: {type: "enabled"}`)
- `deepseek-reasoner` (R1, when conversation history contains assistant messages without `reasoning_content`)

## Root Cause

Two issues in `packages/opencode/src/provider/transform.ts` → `normalizeMessages()`:

### Issue 1: Non-interleaved models never enter the reasoning_content injection path

The original code only entered the reasoning content injection block when `model.capabilities.interleaved` was an object with a `field` property:

```typescript
if (typeof model.capabilities.interleaved === "object" && model.capabilities.interleaved.field) {
```

Models like `deepseek-reasoner` (R1) that have `capabilities.reasoning = true` but don't configure `interleaved` were completely skipped. The `@ai-sdk/openai-compatible` SDK's `convertToOpenAICompatibleChatMessages()` only adds `reasoning_content` when `reasoning.length > 0`, which means messages without reasoning parts (DB-replayed history, plain text, tool-call messages) all miss the field.

### Issue 2: Narrow inner condition skips history-replayed messages

Inside the reasoning content block, the inner condition only injected `reasoning_content` for assistant messages that met at least one of:
- Had actual reasoning text
- Were after the last user message
- Contained tool calls

This missed old assistant messages from DB replay that had none of these — plain text responses stored before thinking mode was enabled. But DeepSeek's API requires **every** assistant message in the conversation to carry `reasoning_content`, even empty string.

## Solution

### Fix 1: Broaden entry condition

The `hasReasoningContent` check now also fires when `model.capabilities.reasoning` is `true` or when existing messages already contain reasoning parts (from DB replay):

```typescript
const hasReasoningContent =
  isInterleaved ||
  model.capabilities.reasoning ||
  msgs.some((msg) =>
    msg.role === "assistant" &&
    Array.isArray(msg.content) &&
    msg.content.some((part: any) => part.type === "reasoning"),
  )
```

### Fix 2: Remove narrow inner condition

All assistant messages now get `reasoning_content` injected unconditionally (with actual reasoning text or empty string). Also handles string-content assistant messages (old DB format):

```typescript
return msgs.map((msg) => {
  if (msg.role === "assistant" && Array.isArray(msg.content)) {
    const reasoningParts = msg.content.filter((part: any) => part.type === "reasoning")
    const reasoningText = reasoningParts.map((part: any) => part.text).join("")
    const filteredContent = msg.content.filter((part: any) => part.type !== "reasoning")

    return {
      ...msg,
      content: filteredContent,
      providerOptions: {
        ...msg.providerOptions,
        [key]: {
          ...msg.providerOptions?.[key],
          [field]: reasoningText || "",
        },
      },
    }
  }

  if (msg.role === "assistant" && typeof msg.content === "string") {
    return {
      ...msg,
      providerOptions: {
        ...msg.providerOptions,
        [key]: {
          ...msg.providerOptions?.[key],
          [field]: "",
        },
      },
    }
  }

  return msg
})
```

### Workaround (V4 models only)

Before the code fix, adding this to `opencode.json` V4 model config partially mitigates the issue:

```json
"deepseek-v4-flash": {
  "interleaved": {
    "field": "reasoning_content"
  }
}
```

This makes the original `normalizeMessages()` enter the injection block, but still doesn't fix the narrow inner condition (Issue 2).

## Technical Details

- DeepSeek V4 API uses `thinking: {type: "enabled"}` format
- The `@ai-sdk/openai-compatible` provider stores `reasoning_content` in `providerOptions.openaiCompatible.reasoning_content`
- AI SDK's `getOpenAIMetadata()` reads `message.providerOptions.openaiCompatible` and spreads it into the API request body
- DeepSeek API requires ALL assistant messages in a thinking-mode conversation to carry `reasoning_content` (may be empty string `""`)

## Files Changed

- `packages/opencode/src/provider/transform.ts` — `normalizeMessages()` function (72 insertions, 30 deletions)

## References

- DeepSeek 思考模式文档: https://api-docs.deepseek.com/zh-cn/guides/thinking_mode
- Root cause analysis: `E:\fkyah3\Agent\deepseek\doc\reasoning_content-loss-root-cause-analysis.md`
