<p align="center"><b>fkyah3/opencode-fkyah3</b><br>
<code>DeepSeek-optimized · Windows-hardened · AI-crafted</code></p>

<p align="center">
  <a href="./README.zh.md">简体中文</a> · <a href="./README.zht.md">繁體中文</a>
</p>

---

This is a personal fork of [anomalyco/opencode](https://github.com/anomalyco/opencode). Every fix, optimization, and feature in this repository was implemented entirely by AI — specifically **DeepSeek V4 Flash (thinking mode) / Sisyphus** — under human oversight.

The upstream project is excellent. Windows and DeepSeek are simply not their priority. We handle those ourselves.

> **Code by: DeepSeek V4 Flash (thinking mode) / Sisyphus**  
> **Human reviewer & direction: fkyah3**  
> This fork is a live demonstration of what AI-built software looks like.  
> See [`fkyah3_dev/`](./fkyah3_dev/) for the full story.

---

## What's Fixed

| Fix | Area |
|-----|------|
| `reasoning_content` loss on conversation replay — the root cause of API 400 errors with DeepSeek thinking mode | **Core** |
| OpenRouter `@openrouter/ai-sdk-provider` providerOptions key mismatch | **Provider** |
| Multi-window crash cascade — added circuit breaker to OMO tool-pair-validator | **Stability** |
| Per-session log isolation (no more truncated dev.log on restart) | **DX** |
| Windows CJK encoding — 3-layer GBK/UTF-8 fix for subprocess pipes | **Win32** |
| TUI plugin loading — Magic Context sidebar blank due to Zod strict mode | **TUI** |

## Quick Start

```powershell
cd packages/opencode
bun run --conditions=browser src/index.ts
```

## Model Configuration Reference

### Flash (daily driver)

```jsonc
"deepseek-v4-flash": {
  "limit": { "context": 500000, "output": 393216 },
  "options": {
    "reasoningEffort": "max",
    "thinking": { "type": "enabled" }
  },
  "interleaved": { "field": "reasoning_content" }
}
```

### Pro (heavy tasks — planning, architecture, oracle)

```jsonc
"deepseek-v4-pro": {
  "limit": { "context": 500000, "output": 262144 },
  "options": {
    "reasoningEffort": "max",
    "thinking": { "type": "enabled" }
  },
  "interleaved": { "field": "reasoning_content" }
}
```

**Agent split (via oh-my-openagent.json):**

| Agent | Model | Fallback | Use case |
|-------|-------|----------|----------|
| Sisyphus | Pro | → Flash | Complex planning, architecture, debug |
| Oracle | Pro | → Flash | High-difficulty reasoning |
| Others | Flash | → Flash | Search, execute, routine |

> Pro is on 2.5折 discount until **2026/05/05 23:59 (UTC+8)**. After that, revert to all-Flash.

- **`reasoningEffort`**: `high` (default) or `max`. Per [DeepSeek docs](https://api-docs.deepseek.com/guides/thinking_mode), agent tools auto-set to `max` anyway.
- **`interleaved`**: Required for DeepSeek thinking mode via `@ai-sdk/openai-compatible`. Without it, `reasoning_content` is not forwarded.
- **`thinking`**: Must be `{ type: "enabled" }` for reasoning models.

## Learn More

| Link | Content |
|------|---------|
| [`fkyah3_dev/`](./fkyah3_dev/) | Fix details, analysis docs, issue tracking |
| [`fkyah3_dev/internal/HANDOFF.md`](./fkyah3_dev/internal/HANDOFF.md) | Current fork state & commit map |
| [Upstream issue #24104](https://github.com/anomalyco/opencode/issues/24104) | reasoning_content root cause discussion |

## Upstream

Based on [anomalyco/opencode](https://github.com/anomalyco/opencode) (Apache 2.0). Changes merged periodically.

---

<p align="center"><i>Crafted by AI. Curated by human. Built for the real world.</i></p>
