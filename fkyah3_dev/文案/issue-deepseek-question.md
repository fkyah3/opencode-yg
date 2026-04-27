## Experiment Report & Question: Chinese vs English for DeepSeek Reasoning in Agentic Workflows

**Context:** I'm running DeepSeek V4 Flash (thinking mode) in the opencode agent framework as my daily driver. I've been systematically testing how to get stable Chinese thinking chains in long-form agent sessions.

### My Experiment (3-group controlled, temperature=0)

All 3 tests in a **pure English environment** (no Chinese prompts, no Chinese tool descriptions):

| Test | Environment | Instruction | Thinking Language | Drift |
|------|------------|-------------|-----------------|-------|
| A | Pure English | None (baseline) | **English** — stable | None |
| B | Pure English | "Write a Chinese summary first" | Chinese → **English drift** at ~1600 lines | ✅ Significant |
| C | Pure English | "Think in Chinese" (one sentence) | **Chinese** — stable, zero drift | None |

**Key findings:**
1. Environment alignment (Chinese prompts/tool descriptions) provides ~70-90% of the effect
2. Output-level anchoring (e.g. "write Chinese summary first") **decays** as English context accumulates
3. A direct thinking-mode instruction ("think in Chinese") is significantly more stable — zero drift observed across 2000+ lines of mixed-language context
4. Evidence: [B站 video with screen captures](https://www.bilibili.com/video/BV1S7orB3E5z/)

### My Question to the DeepSeek Team

From an architecture and training-data perspective:

1. **Does DeepSeek natively prefer one language for reasoning?** Your training data is predominantly Chinese. Does the tokenizer/attention mechanism have an inherent bias toward Chinese token sequences for chain-of-thought?

2. **Mixed-language context handling.** In agentic workflows, the model constantly switches between Chinese (user intent, instructions) and English (code, API docs, file paths, tool outputs). How does DeepSeek handle this language switching internally? Does each switch incur an "entropy loss" as I've hypothesized?

3. **"Think in Chinese" vs "Write in Chinese"** — My experiments show these are distinct. The model can output Chinese while thinking in English, or think in Chinese while outputting Chinese. Is this distinction meaningful from your architecture perspective?

### What I'm Building

Full fork + 6 discussions with all experiment data: https://github.com/fkyah3/opencode-fkyah3

I'm treating this as a systematic investigation rather than a one-off question. Any architectural insights would be valuable.

**Related RFC:** https://github.com/fkyah3/opencode-fkyah3/discussions/1  
**V2 controlled experiment:** https://github.com/fkyah3/opencode-fkyah3/discussions/6  
**B站 demo:** https://www.bilibili.com/video/BV1S7orB3E5z/
