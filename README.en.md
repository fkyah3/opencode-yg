<p align="center"><b>fkyah3/opencode-fkyah3</b><br>
<code>DeepSeek 优化 · Windows 适配 · AI 实现</code></p>

<p align="center">
  <a href="./SETUP.md"><b>🚀 从零搭建指南（中文）</b></a> · <a href="./README.md">简体中文</a> · <a href="./README.zht.md">繁體中文</a>
</p>

---

## 🧠 Language Anchoring — A Systematic Method for LLM Multilingual Adaptation

**Key finding:** The first active output from an LLM determines the thinking language for the entire session. Reading a language ≠ thinking in it.

| Stage | Compliance | Intervention |
|-------|-----------|-------------|
| Prompt constraints only (4 language rules) | ~70% | Prompt text changes only |
| + Translate 16 tool descriptions | ~85% | Tool layer language alignment |
| + Translate 50+ source file comments (fresh session) | ~95%+ | Code layer reinforcement |
| + Anchoring instruction (7 lines) | ~100% | Leverages autoregressive inertia |

The anchoring instruction is minimal:

```
## Language Anchoring (Hard Requirement)
After receiving the user's first message, before executing any action or starting reasoning, you MUST first write a brief summary in the target language describing:
1. What the user is asking you to do
2. What steps you plan to take
3. What information is still missing
This output is your first response — it anchors the thinking language for the entire session.
```

**Related academic work:** Contextual Inertia ([arXiv 2603.04783](https://arxiv.org/abs/2603.04783)), Cognitive Inertia ([arXiv 2503.01307](https://arxiv.org/abs/2503.01307)) — these study "how to break harmful inertia". Our contribution is the positive utilization of the same mechanism.

📖 [Discussion #1 — Language Anchoring RFC](https://github.com/fkyah3/opencode-fkyah3/discussions/1)
💬 [Discussion #2 — AI合作、信任、螺旋进化（中文）](https://github.com/fkyah3/opencode-fkyah3/discussions/2)
🌐 [Discussion #3 — How I Work with AI (English)](https://github.com/fkyah3/opencode-fkyah3/discussions/3)

### V2 Controlled Experiment (2026-04-27)

We tested our own claim with a 3-group controlled experiment in a **pure English environment** (disabling all Chinese prompts, with OMO plugin off):

| Test | Environment | Instruction | Thinking Language | Drift |
|------|------------|-------------|-----------------|-------|
| 2 | Pure English | None | **English** (stable) | None — expected |
| 3 | Pure English | Anchoring instruction (7 lines) | Chinese → **English drift** at ~1600 lines | ✅ Significant drift |
| 5 | Pure English | "Think in Chinese" (one sentence) | **Chinese** (stable) | None |

**Key findings:**
- Environment alignment provides the baseline (~70-90% of the effect), not the anchoring instruction
- The anchoring instruction (output constraint) **decays** over long sessions — especially when processing English code/tool results
- A direct "think in Chinese" thinking-mode instruction is **significantly more stable** (zero decay observed)
- **Thinking language ≠ output language** — anchoring constrains output format, while a thinking-mode instruction directly shapes cognition

**Full report:** [`fkyah3_dev/实验/语言对齐实验报告-v2.md`](./fkyah3_dev/实验/语言对齐实验报告-v2.md)

This doesn't invalidate the v1 findings — it **splits them** into three layers:

```
Environment alignment (Chinese context)  →  ~70-90% of effect
Output anchoring (first-response rule)   →  ~30-50%, short-term, decays
Thinking-mode instruction (direct frame) →  ~90%+, stable across long sessions
```

The original claim ("anchoring instruction alone drives Chinese thinking") was too coarse. The refined understanding is more useful: **the most effective approach is environment alignment + a direct thinking-mode instruction, in that order.**

---

## About This Fork

This is a personal fork of [anomalyco/opencode](https://github.com/anomalyco/opencode). All fixes, optimizations, and features are implemented by AI — **DeepSeek V4 Flash (thinking mode) / Sisyphus** — under human supervision.

The upstream project is excellent. Windows and DeepSeek are not their priority. We handle them ourselves.

> **Implementation: DeepSeek V4 Flash (thinking mode) / Sisyphus (AI)**  
> **Review & direction: fkyah3 (human)**  
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
| Language Anchoring — systematic method for LLM multilingual adaptation (verified with dose-response data) | **i18n** |

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
| [Upstream issue #24104](https://github.com/anomalyco/opencode/issues/24104) | reasoning_content root cause discussion |

## Upstream

Based on [anomalyco/opencode](https://github.com/anomalyco/opencode) (Apache 2.0). Changes merged periodically.

---

<p align="center"><i>Crafted by AI. Curated by human. Built for the real world.</i></p>
