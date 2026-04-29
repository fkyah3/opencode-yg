import type { Database } from "bun:sqlite";
import type { Memory } from "../../features/magic-context/memory/types";
import type { MessageLike } from "./tag-messages";
export interface PreparedCompartmentInjection {
    block: string;
    compartmentEndMessage: number;
    compartmentEndMessageId: string;
    compartmentCount: number;
    skippedVisibleMessages: number;
    factCount: number;
    memoryCount: number;
}
export declare function clearInjectionCache(sessionId: string): void;
/**
 * Return the set of memory ids currently rendered in the cached
 * <session-history> block for this session, if any. Used by ctx_search
 * to hard-filter memories the agent already sees in context — retrieving
 * them from search wastes tokens and pushes high-signal raw-history hits
 * further down the ranking.
 *
 * Returns null when no cache exists or the JSON payload is malformed
 * (callers should treat null as "don't filter" — the worst case is a
 * redundant memory result, not a correctness issue).
 */
export declare function getVisibleMemoryIds(db: Database, sessionId: string): Set<number> | null;
export interface CompartmentInjectionResult {
    injected: boolean;
    compartmentEndMessage: number;
    compartmentCount: number;
    skippedVisibleMessages: number;
}
export declare function renderMemoryBlock(memories: Memory[]): string | null;
export declare function prepareCompartmentInjection(db: Database, sessionId: string, messages: MessageLike[], isCacheBusting: boolean, projectPath?: string, injectionBudgetTokens?: number, temporalAwareness?: boolean): PreparedCompartmentInjection | null;
export declare function renderCompartmentInjection(sessionId: string, messages: MessageLike[], prepared: PreparedCompartmentInjection): CompartmentInjectionResult;
//# sourceMappingURL=inject-compartments.d.ts.map