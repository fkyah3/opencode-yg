<p align="center"><b>fkyah3/opencode-fkyah3</b><br>
<code>DeepSeek 优化 · Windows 适配 · AI 实现</code></p>

<p align="center">
  <a href="./SETUP.md"><b>🚀 从零搭建指南（中文）</b></a> · <a href="./README.en.md">English</a> · <a href="./README.zht.md">繁體中文</a>
</p>

---

本项目是 [anomalyco/opencode](https://github.com/anomalyco/opencode) 的个人 Fork。所有修复、优化、功能均由 AI 完成——**DeepSeek V4 Flash (thinking mode) / Sisyphus**——在人类监督下执行。

上游是优秀项目。Windows 和 DeepSeek 并非他们的优先方向。我们自行处理。

> **代码实现：DeepSeek V4 Flash (thinking mode) / Sisyphus（AI）**  
> **人工审核与方向把控：fkyah3**  
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
| MC tool truncation — `[truncated]` → `[tool: N lines, MKB \| preview]` for compressed context | **MC** |
| DeepSeek V4 architecture research → config alignment: 400K context, 90% MC threshold, CSA-aligned compression | **V4** |
| Global session pool — all conversations visible from any directory (2.0) | **Session** |
| Full Chinese system prompt: Sisyphus, keyword-detector, system messages, environment info | **i18n** |

## Quick Start

```powershell
cd packages/opencode
bun run --conditions=browser src/index.ts
```

## Model Configuration Reference

### Flash (daily driver — all agents)

```jsonc
"deepseek-v4-flash": {
  "limit": { "context": 400000, "output": 393216 },
  "options": {
    "reasoningEffort": "max",
    "thinking": { "type": "enabled" }
  },
  "interleaved": { "field": "reasoning_content" }
}
```

- **`reasoningEffort`**: `high` (default) or `max`. Per [DeepSeek docs](https://api-docs.deepseek.com/guides/thinking_mode), agent tools auto-set to `max` anyway.
- **`interleaved`**: Required for DeepSeek thinking mode via `@ai-sdk/openai-compatible`. Without it, `reasoning_content` is not forwarded.
- **`thinking`**: Must be `{ type: "enabled" }` for reasoning models.

## Learn More

| Link | Content |
|------|---------|
| [`fkyah3_dev/`](./fkyah3_dev/) | Fix details, analysis docs, issue tracking |
| [`fkyah3_dev/internal/COMPLETION.md`](./fkyah3_dev/internal/COMPLETION.md) | Completed work checklist & current state |
| [`fkyah3_dev/analysis/deepseek-v4-workflow-optimization.md`](./fkyah3_dev/analysis/deepseek-v4-workflow-optimization.md) | V4 architecture research → config alignment |
| [Upstream issue #24104](https://github.com/anomalyco/opencode/issues/24104) | reasoning_content root cause discussion |

## Upstream

Based on [anomalyco/opencode](https://github.com/anomalyco/opencode) (Apache 2.0). Changes merged periodically.

---

<p align="center"><i>Crafted by AI. Curated by human. Built for the real world.</i></p>
