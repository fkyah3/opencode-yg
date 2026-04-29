import { Database } from "bun:sqlite";
export declare function withReadOnlySessionDb<T>(fn: (db: Database) => T): T;
export declare function closeReadOnlySessionDb(): void;
export declare function getRawSessionMessageCountFromDb(db: Database, sessionId: string): number;
/**
 * Resolve `time_created` (ms since epoch) for a set of OpenCode message IDs.
 * Returns a Map keyed by message ID. Missing IDs are simply omitted.
 *
 * Used by temporal-awareness to map compartment start/end message IDs to
 * wall-clock dates for the `start="YYYY-MM-DD"` / `end="YYYY-MM-DD"` attrs
 * on the `<compartment>` elements in `<session-history>`.
 */
export declare function getMessageTimesFromOpenCodeDb(sessionId: string, messageIds: readonly string[]): Map<string, number>;
export declare function findLastAssistantModelFromOpenCodeDb(sessionId: string): {
    providerID: string;
    modelID: string;
} | null;
//# sourceMappingURL=read-session-db.d.ts.map