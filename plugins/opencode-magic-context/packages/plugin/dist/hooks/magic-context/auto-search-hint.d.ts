/**
 * Build a compact "you may recall something related" hint from unified search
 * results, ready to append to a user message.
 *
 * The hint intentionally compresses fragments so they feel like vague recall
 * rather than a drop-in answer — the goal is to nudge the agent to run
 * ctx_search for full context, not to provide the answer itself.
 *
 * Compression strategy per source:
 *   - memory → caveman-ultra via `cavemanCompress()` (token-dense)
 *   - git_commit → raw commit subject (already terse); prefixed with SHA + age
 *   - message → caveman-ultra, role tag
 *
 * Guardrails:
 *   - Per-fragment token cap (~20 tokens, ~80 chars) with ellipsis truncation
 *   - Skip fragments whose source is already present in visible session-history
 *     (caller handles) — this module only knows about search results
 *   - Hard-caps total output at ~200 tokens so misconfigured thresholds can't
 *     balloon the user message
 */
import type { UnifiedSearchResult } from "../../features/magic-context/search";
export interface AutoSearchHintOptions {
    maxFragments?: number;
    fragmentCharCap?: number;
}
/**
 * Build the hint text. Returns null when `results` is empty, when no fragment
 * has meaningful content after compression, or when limits zero out the budget.
 *
 * This function does NOT enforce score thresholds or message-length rules —
 * callers (the transform-time auto-search wiring) apply those gates first.
 */
export declare function buildAutoSearchHint(results: UnifiedSearchResult[], options?: AutoSearchHintOptions): string | null;
//# sourceMappingURL=auto-search-hint.d.ts.map