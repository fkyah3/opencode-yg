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
