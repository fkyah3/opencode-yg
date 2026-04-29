import type { Database } from "bun:sqlite";
export interface Compartment {
    id: number;
    sessionId: string;
    sequence: number;
    startMessage: number;
    endMessage: number;
    startMessageId: string;
    endMessageId: string;
    title: string;
    content: string;
    createdAt: number;
}
export interface SessionFact {
    id: number;
    sessionId: string;
    category: string;
    content: string;
    createdAt: number;
    updatedAt: number;
}
export interface CompartmentInput {
    sequence: number;
    startMessage: number;
    endMessage: number;
    startMessageId: string;
    endMessageId: string;
    title: string;
    content: string;
}
export declare function getCompartments(db: Database, sessionId: string): Compartment[];
export declare function getLastCompartmentEndMessage(db: Database, sessionId: string): number;
export declare function replaceAllCompartments(db: Database, sessionId: string, compartments: CompartmentInput[]): void;
/**
 * Append new compartments without deleting existing ones.
 * Used by the incremental runner where existing compartments are preserved
 * and only new compartments for the latest chunk are added.
 */
export declare function appendCompartments(db: Database, sessionId: string, compartments: CompartmentInput[]): void;
/**
 * Replace session facts without touching compartments.
 * Facts are fully re-normalized by the historian on each pass,
 * so they always need a full replacement.
 */
export declare function replaceSessionFacts(db: Database, sessionId: string, facts: Array<{
    category: string;
    content: string;
}>): void;
export declare function getSessionFacts(db: Database, sessionId: string): SessionFact[];
export declare function replaceAllCompartmentState(db: Database, sessionId: string, compartments: CompartmentInput[], facts: Array<{
    category: string;
    content: string;
}>): void;
export interface CompartmentDateRanges {
    /** Map compartment id → `{ start: "YYYY-MM-DD", end: "YYYY-MM-DD" }` */
    byId: Map<number, {
        start: string;
        end: string;
    }>;
}
export declare function buildCompartmentBlock(compartments: Compartment[], facts: SessionFact[], memoryBlock?: string, dateRanges?: CompartmentDateRanges): string;
export interface RecompStaging {
    compartments: CompartmentInput[];
    facts: Array<{
        category: string;
        content: string;
    }>;
    passCount: number;
    lastEndMessage: number;
}
/** Append one pass's results to the staging tables. */
export declare function saveRecompStagingPass(db: Database, sessionId: string, passNumber: number, compartments: CompartmentInput[], facts: Array<{
    category: string;
    content: string;
}>): void;
/** Read existing staging data for resume. Returns null if no staging exists. */
export declare function getRecompStaging(db: Database, sessionId: string): RecompStaging | null;
/** Atomically promote staging → real tables, then clear staging. */
export declare function promoteRecompStaging(db: Database, sessionId: string): {
    compartments: CompartmentInput[];
    facts: Array<{
        category: string;
        content: string;
    }>;
} | null;
/**
 * Clear memory_block_cache for ALL sessions so every active session
 * re-renders its memory block on the next cache-busting pass.
 * Called after ctx_memory write/delete mutations.
 */
export declare function invalidateAllMemoryBlockCaches(db: Database): void;
/** Clear staging tables for a session (on cancel/abandon or after successful promote). */
export declare function clearRecompStaging(db: Database, sessionId: string): void;
/**
 * Returns the stored partial recomp range for this session, or null when the
 * active staging (if any) is for a full recomp.
 *
 * A zero-valued row means "no partial range recorded" — either no staging or
 * full-recomp staging.
 */
export declare function getRecompPartialRange(db: Database, sessionId: string): {
    start: number;
    end: number;
} | null;
/**
 * Record the active partial recomp range. Must be called inside or alongside
 * saveRecompStagingPass so staging and range marker stay in sync.
 */
export declare function setRecompPartialRange(db: Database, sessionId: string, range: {
    start: number;
    end: number;
} | null): void;
export declare function escapeXmlAttr(s: string): string;
export declare function escapeXmlContent(s: string): string;
//# sourceMappingURL=compartment-storage.d.ts.map