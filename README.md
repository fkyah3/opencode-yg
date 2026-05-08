<p align="center"><b>fkyah3/opencode-yg</b><br>
<code>DeepSeek depth optimization · Chinese AI Agent · Trinity · Archived</code></p>

> **2026·4.26 — 2026·5.4** — This fork's mission is complete. No further feature updates.

| Branch | Status |
|:------|:-------|
| `stable` | ✅ Archived — last stable: `9e82ea751` (6 code audit fixes) |
| `main` | ✅ Frozen, legacy content kept for reference |

---

## Archive Summary

This is a personal fork of **[anomalyco/opencode](https://github.com/anomalyco/opencode)** focused on three things:

1. **DeepSeek model integration** — `reasoning_content` multi-round fix, interleaved fallback, 1M context alignment
2. **Chinese language thinking system** — full Chinese AI Agent methodology from prompt translation to cognitive framework
3. **Godot native client** — no TUI, pure Godot 4.3 rendering (virtual scrolling, SSE streaming, node pool)

All built in the "one-person army" pattern — **human sets direction, AI writes all code, F5 validates**.

## Now

- ⛔ **No further feature development**
- ✅ Minor bug fixes still possible occasionally
- ✅ All experiments, documentation, and research remain in the repo
- ✅ Interested parties may fork and study freely

## What's Inside

| Path | Content |
|------|---------|
| `fkyah3_dev/` | Full research archive: experiments, analysis, fork strategy |
| `specs/` | Article series: One-Person Army · Mechanical Prompts · Language Anchoring · Close-loop Thesis · Virtual Scroll |
| `godot-opencode/` | Godot client source code (virtual scroll + SSE + message bubbles) |
| `packages/` | OpenCode trinity: core + OMO agent + Magic Context plugin |

## Key Research Findings

### Language Anchoring — V2 Controlled Experiments

Three controlled tests (temperature=0, OMO disabled):

| Test | Condition | Result |
|------|-----------|--------|
| A | Pure English prompt | English throughout |
| B | Anchor instruction (7 lines) | Chinese → English drift after ~1600 lines |
| C | "请用中文语言思维方式来完成所有任务" | **Zero drift, Chinese throughout** |

**Conclusion:** Cognitive framing ("use Chinese thinking") beats output rules. Environmental alignment provides baseline stability; thinking-mode instruction provides zero-drift anchoring.

Full report in [`fkyah3_dev/实验/`](./fkyah3_dev/实验/).

### Fix Highlights

| Fix | Area |
|-----|------|
| `reasoning_content` multi-round loss — root cause of DeepSeek 400 in thinking mode | **Core** |
| OpenRouter `@openrouter/ai-sdk-provider` providerOptions mismatch | **Provider** |
| Multi-window crash cascade — circuit breaker in OMO validator | **Stability** |
| Isolated per-session logging (no more truncated dev.log) | **DX** |
| Windows CJK triple-layer GBK/UTF-8 pipe fix | **Win32** |
| MC tool truncation `[truncated]` → `[tool: N lines, MKB \| preview]` | **MC** |
| Full Chinese system prompt: Yugong, keyword detector, env info | **i18n** |
| Snapshot incremental add() + stat cache, track 3s→200ms | **Perf** |

### The Cognitive Framework

「愚公」(Yugong) prompt uses 5 classic Chinese philosophy quotes as section headings, **zero mechanical constraints** in 212 lines:

- **谋定而后动** — Plan before acting
- **知人者智，自知者明** — Know yourself and others
- **工欲善其事，必先利其器** — Sharpen your tools
- **未虑胜，先虑败** — Prepare for failure before success
- **知是行之始，行是知之成** — Knowledge begins action, action completes knowledge

Framework naming: **愚公** (AI Operator) / **移山** (OMO) / **聚沙** (MC) / **精卫** (Search) / **智叟** (Oracle) / **周公** (Dreamer)

---

<p align="center"><i>Built by AI. Reviewed by human. Archived April 2026.</i></p>
