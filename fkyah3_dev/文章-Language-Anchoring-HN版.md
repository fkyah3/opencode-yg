# Language Anchoring: A Systematic Method for LLM Multilingual Adaptation

> From 70% to near-100% — How the first output language locks the model's thinking inertia

---

We've been running DeepSeek V4 Flash under the Sisyphus agent framework (an opencode fork) and hit a recurring problem: even with explicit "think in Chinese" prompts, the model would periodically switch back to English during technical analysis. The usual fix — adding more language constraints to the system prompt — only got us to ~70% compliance.

After 1000+ messages of systematic experimentation, we found something that actually works.

## The Discovery

The key factor isn't what the model **reads** — it's what the model **first writes**.

When the model's first active output after a user message is in Chinese, the entire session stays in Chinese with near-perfect consistency. When the first output is in English, no amount of prompt engineering can fully prevent backsliding.

We call this **Language Anchoring**: the first output language determines the autoregressive inertia for the entire conversation.

This maps to known mechanisms described by Contextual Inertia (arXiv 2603.04783) and Cognitive Inertia (arXiv 2503.01307). The difference: existing research approaches this from the negative angle ("how to break harmful inertia"), while we utilize it positively by designing the first interaction to anchor the desired language.

The mechanism is straightforward: autoregressive next-token prediction. A Chinese token sequence raises the probability of subsequent Chinese tokens. But there's a critical nuance — **passive comprehension** (reading Chinese input) doesn't shift the model's generative space, while **active production** (writing Chinese output) forces alignment to the Chinese token space.

## The Dose-Response Relationship

We measured compliance across four stages of intervention:

| Stage | Compliance | Intervention |
|-------|-----------|-------------|
| Prompt constraints only (4 language rules) | ~70% | Prompt text changes only |
| + Translate 16 tool descriptions (~450 lines) | ~85% | Tool layer language alignment |
| + Translate 50+ source file comments (fresh session) | ~95%+ | Code layer reinforcement |
| + Anchoring instruction (constrain first output language) | Near-100% | User-verified (§1013 of experiment log) |

Note the non-linear dose-response: 70%→95% takes significant translation work, but from 95% to near-100% requires only a 7-line anchoring instruction. The marginal cost of the last few percent approaches zero once you understand the mechanism.

## The Method

The approach generalizes to any language pair in three steps:

1. **Translate the instruction layer**: system prompt, tool descriptions, agent directives
2. **Design the first interaction**: insert an anchoring instruction that forces the first output to be in the target language
3. **Reinforce (optional, high impact)**: align code comments and documentation language to reduce context-switching triggers

The anchoring instruction itself is minimal (7 lines):

```
## Language Anchoring (Hard Requirement)
After receiving the user's first message, before executing any action
or starting reasoning, you MUST first write a brief summary
in Chinese describing:
1. What the user is asking you to do
2. What steps you plan to take
3. What information is still missing
This Chinese output is your first response.
Only after completing this can you start executing the task.
```

## Open Source Implementation

The complete implementation is in our opencode fork (github.com/fkyah3/opencode-fkyah3), commit `1f2e3203f`, 45 files changed (+1158/-1611). It serves as a verifiable reference implementation.

## Generality

The mechanism is language-agnostic. The same approach should work for Japanese, Korean, French, Spanish, or any language pair — the theoretical basis (autoregressive token prediction + active output inertia) has nothing to do with Chinese specifically. We'd welcome experiments with other languages to validate the claim.

## Limitations

- Requires control over system prompts (may not apply to hosted/managed model services)
- Non-linear dose-response: 70%→95% takes significant translation work, but from 95% to near-100% requires minimal effort
- Domain terminology (SQLite, WebSocket, LSP, etc.) should remain in original form

**Related**: Contextual Inertia (arXiv 2603.04783), Cognitive Inertia (arXiv 2503.01307)
