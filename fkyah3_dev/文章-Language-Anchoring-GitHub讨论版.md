# RFC: Language Anchoring — A System-Level Approach to Multilingual LLM Adaptation

**Target**: opencode upstream community  
**Format**: GitHub Discussion / RFC  

---

## Context

The opencode community has users across many languages. Currently, multilingual support relies entirely on custom instructions and user-side prompt engineering — which, as we've found, achieves only ~70% reliability.

Over the course of 1000+ messages of sessions with DeepSeek V4 Flash under the Sisyphus agent framework (fkyah3/opencode-fkyah3 fork), we identified and verified a mechanism that achieves near-100% target-language consistency. This RFC documents the discovery and proposes it as a potential upstream pattern.

## Problem Statement

Existing approaches to multilingual adaptation in LLM-based tools suffer from two weaknesses:

1. **Passive constraints are unreliable**: adding "think in [language]" rules to system prompts (4 rules in our test) yields only ~70% compliance
2. **Session drift**: even when an interaction starts in the target language, the model regresses to English (or its training-dominant language) within 10-20 turns

## The Mechanism: Language Anchoring

We found that the first active output from the model determines the autoregressive inertia for the entire session. When the first response is in Chinese, the Chinese token sequence significantly raises the probability of subsequent Chinese tokens — this is a direct consequence of next-token prediction's self-reinforcing property.

- **Active production vs passive comprehension**: reading Chinese input (passive) does not shift the model's generative token space. Writing Chinese output (active) forces alignment to that token space.
- **Related research**: Contextual Inertia (arXiv 2603.04783) and Cognitive Inertia (arXiv 2503.01307) study this mechanism from the "breaking harmful inertia" perspective. Our contribution is the positive utilization of the same mechanism.

## Verifiable Results

Dose-response data from our fork (measured across 4 stages of intervention):

| Stage | Compliance | Delta | Implementation Effort |
|-------|-----------|-------|---------------------|
| Prompt constraints only (4 language rules) | ~70% | baseline | 4 lines added to system prompt |
| + Tool descriptions translated (16 files, ~450 lines) | ~85% | +15pp | Bulk text translation |
| + Code comments translated (50+ files, fresh session) | ~95%+ | +10pp | Codebase-wide comment translation |
| + Anchoring instruction (7 lines) added to system prompt | Near-100% | +4pp | 7 lines added to system prompt |

Note the non-linear dose-response: the last ~5 percentage points required minimal effort (7 lines) once the mechanism was understood.

## Proposed Integration

The anchoring instruction is a self-contained addition to the system prompt:

```
## Language Anchoring
After receiving the user's first message, before executing any action
or starting reasoning, you MUST first write a brief summary in the
target language describing:
1. What the user is asking you to do
2. What steps you plan to take
3. What information is still missing
```

This could be integrated as:

1. A configurable system prompt template option (e.g., `language_anchoring: { enabled: true, language: "zh-CN" }`)
2. A per-agent setting, allowing different agents to operate in different languages
3. A plugin hook that injects the anchoring instruction dynamically based on session locale

## Reference Implementation

Commit `1f2e3203f` in fkyah3/opencode-fkyah3: 45 files changed (+1158/-1611), includes translated tool descriptions, anchoring instruction, and full Chinese system prompt.

## Discussion Points

1. Does this generalize to all LLM providers, or is it specific to models with strong multilingual training (like DeepSeek)?
2. Should the anchoring language be tied to the session locale, or be independently configurable?
3. Is there value in making the dose-response data available as a community benchmark for multilingual LLM adaptation?
4. Would upstream consider adding an `anchor` parameter in the agent config schema?

## Limitations

- Effectiveness depends on the model's multilingual capabilities (the anchoring mechanism itself does not compensate for models that lack training data in the target language)
- Domain terminology (SQLite, WebSocket, LSP, etc.) should remain untranslated
- The approach requires control over the system prompt (not applicable when prompts are managed by an external service)
