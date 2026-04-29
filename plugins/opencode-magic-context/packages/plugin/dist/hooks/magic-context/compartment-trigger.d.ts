import type { Database } from "bun:sqlite";
import type { ContextUsage, SessionMeta } from "../../features/magic-context/types";
declare const POST_DROP_TARGET_RATIO = 0.75;
declare const FORCE_COMPARTMENT_PERCENTAGE = 80;
declare const BLOCK_UNTIL_DONE_PERCENTAGE = 95;
declare const FORCE_MATERIALIZE_PERCENTAGE = 85;
export { BLOCK_UNTIL_DONE_PERCENTAGE, FORCE_COMPARTMENT_PERCENTAGE, FORCE_MATERIALIZE_PERCENTAGE, POST_DROP_TARGET_RATIO, };
export interface CompartmentTriggerResult {
    shouldFire: boolean;
    reason?: "projected_headroom" | "force_80" | "commit_clusters" | "tail_size";
}
export declare function getProactiveCompartmentTriggerPercentage(executeThresholdPercentage: number): number;
export declare function checkCompartmentTrigger(db: Database, sessionId: string, sessionMeta: SessionMeta, usage: ContextUsage, _previousPercentage: number, executeThresholdPercentage: number, triggerBudget: number, autoDropToolAge?: number, protectedTagCount?: number, clearReasoningAge?: number, dropToolStructure?: boolean, commitClusterTrigger?: {
    enabled: boolean;
    min_clusters: number;
}): CompartmentTriggerResult;
//# sourceMappingURL=compartment-trigger.d.ts.map