import type { Database } from "bun:sqlite";
export interface KeyFileEntry {
    filePath: string;
    /** Approximate token count when last pinned */
    tokens: number;
}
/**
 * Get the pinned key files for a session from session_meta.
 * Returns empty array if not set or parse fails.
 */
export declare function getKeyFiles(db: Database, sessionId: string): KeyFileEntry[];
/**
 * Set the pinned key files for a session.
 */
export declare function setKeyFiles(db: Database, sessionId: string, files: KeyFileEntry[]): void;
/**
 * Greedy-fit files into a token budget.
 * Takes files sorted by priority (dreamer's ranking) and greedily adds
 * them until the budget is exhausted. Returns the selected files.
 */
export declare function greedyFitFiles(rankedFiles: Array<{
    filePath: string;
    tokens: number;
}>, tokenBudget: number): KeyFileEntry[];
//# sourceMappingURL=storage-key-files.d.ts.map