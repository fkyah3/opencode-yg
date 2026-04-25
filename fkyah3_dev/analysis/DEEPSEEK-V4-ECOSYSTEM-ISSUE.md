# DeepSeek V4 Thinking Mode: A Cross-Project Systemic API Compatibility Issue

## The Problem

DeepSeek V4 (released April 24, 2026) has a systemic incompatibility with existing AI SDK ecosystems when running **thinking mode + tool calls**.

**This is not isolated to any single project.**

---

## Known Affected Projects (as of April 26, 2026)

| Project | Issue | User Reports |
|---------|-------|----------|
| **OpenCode** | [#24104](https://github.com/anomalyco/opencode/issues/24104) · [#24130](https://github.com/anomalyco/opencode/issues/24130) · [#24261](https://github.com/anomalyco/opencode/issues/24261) | OpenRouter + direct DeepSeek API both trigger |
| **OpenClaw** | [#71160](https://github.com/openclaw/openclaw/issues/71160) · [#71455](https://github.com/openclaw/openclaw/issues/71455) | Fixed, but provider-specific |
| **n8n** (workflow automation) | [#29119](https://github.com/n8n-io/n8n/issues/29119) | Any agent workflow using tools triggers it |
| **Continue.dev** | [#10758](https://github.com/continuedev/continue/issues/10758) | OpenRouter + DeepSeek → 400 |
| **HuggingFace Chat-UI** | [#1664](https://github.com/huggingface/chat-ui/issues/1664) | reasoning_content serialization issue |

**All share the same root cause.**

---

## Root Cause

DeepSeek V4 thinking mode API contract:

> **"All assistant messages containing `tool_calls` MUST preserve the `reasoning_content` field across subsequent requests."**

But the existing AI SDK ecosystem (`@ai-sdk/openai-compatible`, OpenRouter gateway, various Chat UI frameworks) does one of three things:

1. **Doesn't save `reasoning_content` on first response** (treats it as temporary display data)
2. **Drops `reasoning_content` during history replay** (assumes old-turn reasoning is unnecessary)
3. **OpenRouter gateway silently deletes empty-string `reasoning_content: ""`**

Result: plain chat is unaffected (API silently ignores it), but as soon as tool calls are involved, the second request always 400's.

---

## Why This Hasn't Been Fixed Completely

1. **DeepSeek's official docs are imprecise** — `reasoning_content` is optional in plain chat but mandatory with tool calls. The distinction is buried in one sentence: "tool call scenarios require reasoning_content"
2. **AI SDK design mismatch** — `@ai-sdk/openai-compatible`'s `convertToOpenAICompatibleChatMessages()` only adds `reasoning_content` when `reasoning.length > 0`
3. **OpenRouter's additional layer** — gateway strips empty strings, adding a second incompatibility layer
4. **Every project is patching independently** — OpenCode fixed part of it (#24146), OpenClaw fixed part of it (#71105), but each patch is project-specific. No universal approach exists

---

## Our Verified Fix

In the [fkyah3/opencode-fkyah3](https://github.com/fkyah3/opencode-fkyah3) fork:

```typescript
// transform.ts normalizeMessages()
// Unconditionally inject reasoning_content (empty string fallback) 
// for ALL assistant messages
// commit b5b6ad05d
```

**Strategy**: Regardless of where the message comes from (DB replay, history compression, fresh response), inject `reasoning_content: ""` at the final step before API dispatch. Simple, brute-force, effective.

Combined verification from OpenCode, OpenClaw, and n8n confirms this fix direction works across all affected projects.

---

## If You're Hitting This

If you're using DeepSeek V4 thinking mode for agent/tool-call workflows and seeing:

> `The reasoning_content in the thinking mode must be passed back to the API`

**This is not your config. You don't need to switch models.** This is ecosystem adaptation lag. The fix exists.
