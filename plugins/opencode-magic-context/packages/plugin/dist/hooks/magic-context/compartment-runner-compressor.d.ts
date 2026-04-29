import type { Database } from "bun:sqlite";
import type { Compartment } from "../../features/magic-context/compartment-storage";
import type { PluginContext } from "../../plugin/types";
export interface CompressorDeps {
    client: PluginContext["client"];
    db: Database;
    sessionId: string;
    directory: string;
    historyBudgetTokens: number;
    historianTimeoutMs?: number;
    /** Floor = ceil(lastEndMessage / minCompartmentRatio). Default 1000. */
    minCompartmentRatio?: number;
    /** Maximum depth any compartment range can be compressed to. Default 5. */
    maxMergeDepth?: number;
    /** Cap on compartments sent to the LLM in one pass. Default 15. */
    maxCompartmentsPerPass?: number;
    /** Newest compartments always excluded from compression. Default 10. */
    graceCompartments?: number;
}
interface ScoredCompartment {
    compartment: Compartment;
    index: number;
    tokenEstimate: number;
    averageDepth: number;
}
/**
 * Check if the compartment block exceeds the history budget and run a compression pass if needed.
 * Returns true if compression ran successfully, false otherwise.
 */
export declare function runCompressionPassIfNeeded(deps: CompressorDeps): Promise<boolean>;
interface SelectionConstraints {
    /** Max compartments to pick per pass (LLM batch cap). */
    maxPickable: number;
    /** Max compression depth a compartment range can reach. */
    maxMergeDepth: number;
    /** Number of newest compartments always excluded (grace period). */
    graceCompartments: number;
    /** compartments.length - floor; we can't reduce below this without violating floor. */
    floorHeadroom: number;
}
/**
 * Pick a contiguous same-depth band of compartments to compress next.
 *
 * Strategy (depth-first, oldest-within-tier):
 *   1. Eligible scope = [0, scored.length - graceCompartments).
 *      Newest `graceCompartments` are never compressed (protects just-published
 *      historian output).
 *   2. Within eligible scope, ignore compartments whose rounded depth is
 *      already at `maxMergeDepth` — they're done.
 *   3. Find the **minimum** depth tier that still exists in scope.
 *   4. Anchor on the **oldest** compartment at that minimum depth (lowest
 *      index). Extend forward while the next compartment has the same rounded
 *      depth, stopping at maxPickable / floorHeadroom / scope end.
 *   5. Require runLen ≥ 2. If the oldest minimum-depth compartment can't form
 *      a run (neighbor has a different depth), the algorithm would stall —
 *      so fall back to finding the *next* oldest compartment at minDepth and
 *      retry. This preserves the old "skip singleton and move on" safety
 *      without abandoning the min-depth invariant.
 *
 * Why this shape:
 *   The previous algorithm was oldest-first regardless of depth. After the
 *   first pass compressed seq 0-14 to depth 1, the next pass picked seq 0-X
 *   AGAIN because they were still the oldest. The cascade ran depth 0→1→2→
 *   3→4→5 on the same range within hours, crushing early compartments to
 *   empty title-only shells while the rest of history stayed at depth 0.
 *
 *   Depth-first selection means: once seq 0-14 reach depth 1, the next pass
 *   prefers any depth-0 band elsewhere (seq 15+) before touching seq 0-14
 *   again. Old→new gets pushed down one tier at a time, producing a smooth
 *   depth gradient (old = deeper, recent = shallower) like memory decay.
 *
 *   Grace window still protects the newest N from compression entirely so
 *   freshly-published historian output has time to settle.
 */
export declare function selectCompressionBand(scored: ScoredCompartment[], constraints: SelectionConstraints): ScoredCompartment[];
/**
 * @deprecated Use {@link selectCompressionBand}. Kept as an export for the
 * existing test suite that targets the older naming; semantics are identical.
 */
export declare const findOldestContiguousSameDepthBand: typeof selectCompressionBand;
export {};
//# sourceMappingURL=compartment-runner-compressor.d.ts.map