import type { Database } from "bun:sqlite";
import type { ContextUsage } from "./types";
export interface PersistedStickyTurnReminder {
    text: string;
    messageId: string | null;
}
export interface PersistedNoteNudge {
    triggerPending: boolean;
    triggerMessageId: string | null;
    stickyText: string | null;
    stickyMessageId: string | null;
}
export interface PersistedHistorianFailureState {
    failureCount: number;
    lastError: string | null;
    lastFailureAt: number | null;
}
export declare function loadPersistedUsage(db: Database, sessionId: string): {
    usage: ContextUsage;
    updatedAt: number;
} | null;
export declare function getPersistedReasoningWatermark(db: Database, sessionId: string): number;
export declare function setPersistedReasoningWatermark(db: Database, sessionId: string, tagNumber: number): void;
/**
 * Reset the persisted reasoning watermark for a session.
 *
 * The watermark is model-specific because non-interleaved models may safely
 * rewrite/remove typed reasoning parts while providers that expose
 * `capabilities.interleaved.field` need those same parts to survive until
 * OpenCode's provider transform serializes them onto the wire.
 */
export declare function clearPersistedReasoningWatermark(db: Database, sessionId: string): void;
export declare function getPersistedNudgePlacement(db: Database, sessionId: string): {
    messageId: string;
    nudgeText: string;
} | null;
export declare function setPersistedNudgePlacement(db: Database, sessionId: string, messageId: string, nudgeText: string): void;
export declare function clearPersistedNudgePlacement(db: Database, sessionId: string): void;
export declare function getPersistedStickyTurnReminder(db: Database, sessionId: string): PersistedStickyTurnReminder | null;
export declare function setPersistedStickyTurnReminder(db: Database, sessionId: string, text: string, messageId?: string): void;
export declare function clearPersistedStickyTurnReminder(db: Database, sessionId: string): void;
export declare function getPersistedNoteNudge(db: Database, sessionId: string): PersistedNoteNudge;
export declare function setPersistedNoteNudgeTrigger(db: Database, sessionId: string, triggerMessageId?: string): void;
export declare function setPersistedNoteNudgeTriggerMessageId(db: Database, sessionId: string, triggerMessageId: string): void;
export declare function setPersistedDeliveredNoteNudge(db: Database, sessionId: string, text: string, messageId?: string): void;
export declare function clearPersistedNoteNudge(db: Database, sessionId: string): void;
/**
 * Return the timestamp of the most recent ctx_note(read) call for this session,
 * or 0 when the session has never called it. Used by note-nudger to suppress
 * reminders when the agent has already seen notes in recent context.
 */
export declare function getNoteLastReadAt(db: Database, sessionId: string): number;
/**
 * Record that ctx_note(read) was just called for this session. The watermark is
 * compared against note updated_at / created_at on each nudge decision.
 */
export declare function setNoteLastReadAt(db: Database, sessionId: string, at?: number): void;
export declare function getHistorianFailureState(db: Database, sessionId: string): PersistedHistorianFailureState;
export declare function incrementHistorianFailure(db: Database, sessionId: string, error: string): void;
export declare function clearHistorianFailureState(db: Database, sessionId: string): void;
export interface PersistedOverflowState {
    /** Provider-reported context limit from the overflow error; 0 means none detected. */
    detectedContextLimit: number;
    /** True while recovery is still required after an overflow. */
    needsEmergencyRecovery: boolean;
}
export declare function getOverflowState(db: Database, sessionId: string): PersistedOverflowState;
/**
 * Record that a provider reported an overflow. Sets the recovery flag
 * unconditionally; also persists the real limit if one was extracted from the
 * error message. Transactional so the two fields always agree.
 */
export declare function recordOverflowDetected(db: Database, sessionId: string, reportedLimit: number | undefined): void;
/** Clear the recovery flag. Keeps the detected limit (valuable even after recovery). */
export declare function clearEmergencyRecovery(db: Database, sessionId: string): void;
/**
 * Clear the detected limit. Called when the session switches to a different
 * model — the old limit is no longer relevant.
 */
export declare function clearDetectedContextLimit(db: Database, sessionId: string): void;
export interface PersistedCompactionMarkerState {
    boundaryMessageId: string;
    summaryMessageId: string;
    compactionPartId: string;
    summaryPartId: string;
    /** The raw ordinal at which the boundary was set */
    boundaryOrdinal: number;
}
export declare function getPersistedCompactionMarkerState(db: Database, sessionId: string): PersistedCompactionMarkerState | null;
export declare function setPersistedCompactionMarkerState(db: Database, sessionId: string, state: PersistedCompactionMarkerState | null): void;
export declare function getStrippedPlaceholderIds(db: Database, sessionId: string): Set<string>;
export declare function setStrippedPlaceholderIds(db: Database, sessionId: string, ids: Set<string>): void;
export declare function removeStrippedPlaceholderId(db: Database, sessionId: string, messageId: string): boolean;
//# sourceMappingURL=storage-meta-persisted.d.ts.map