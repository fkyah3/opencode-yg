/**
 * Compaction Marker Injection
 *
 * Injects compaction boundaries into OpenCode's SQLite DB so that
 * `filterCompacted` stops at the historian boundary. After injection,
 * the transform hook receives only post-boundary messages instead
 * of the full session history.
 *
 * Gated behind the `compaction_markers` config flag (default: true).
 *
 * ## What gets injected (3 rows):
 * 1. A `compaction` part on the boundary user message
 * 2. A summary assistant message with `parentID` → boundary user message
 * 3. A text part on that summary message containing a static placeholder
 *
 * The real `<session-history>` is injected by the transform pipeline via
 * inject-compartments.ts. The marker exists solely to make filterCompacted
 * stop at the boundary.
 *
 * ## How OpenCode's filterCompacted works:
 * - Iterates newest→oldest
 * - Stops when it finds a user message that:
 *   (a) has a part with type: "compaction"
 *   (b) has a completed summary assistant response (summary: true, finish: "stop")
 *       whose parentID matches that user message's id
 */
export declare function generateMessageId(timestampMs: number, counter?: bigint): string;
export declare function generatePartId(timestampMs: number, counter?: bigint): string;
export declare function closeCompactionMarkerDb(): void;
interface BoundaryUserMessage {
    id: string;
    timeCreated: number;
}
/**
 * Find the nearest user message at or before the given raw ordinal.
 * The boundary must be a user message for filterCompacted to work.
 *
 * Filters out compaction summary messages (summary=true, finish="stop")
 * so ordinals stay consistent with readRawSessionMessagesFromDb.
 */
export declare function findBoundaryUserMessage(sessionId: string, endOrdinal: number): BoundaryUserMessage | null;
interface CompactionMarkerState {
    /** The user message ID that has the compaction part */
    boundaryMessageId: string;
    /** The summary assistant message ID we injected */
    summaryMessageId: string;
    /** The compaction part ID on the user message */
    compactionPartId: string;
    /** The text part ID on the summary message */
    summaryPartId: string;
}
export interface InjectCompactionMarkerArgs {
    sessionId: string;
    /** Raw ordinal of the last compartmentalized message */
    endOrdinal: number;
    /** Summary text for the compaction summary message (static placeholder) */
    summaryText: string;
    /** Working directory for the session */
    directory: string;
}
/**
 * Inject a compaction marker into OpenCode's DB.
 * Returns the marker state if successful, null if boundary couldn't be found.
 */
export declare function injectCompactionMarker(args: InjectCompactionMarkerArgs): CompactionMarkerState | null;
/**
 * Remove an existing compaction marker (all 3 rows).
 * Used when moving the boundary forward or on session cleanup.
 */
export declare function removeCompactionMarker(state: CompactionMarkerState): boolean;
export {};
//# sourceMappingURL=compaction-marker.d.ts.map