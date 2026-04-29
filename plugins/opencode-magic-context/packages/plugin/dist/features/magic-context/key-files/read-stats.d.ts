import type { Database } from "bun:sqlite";
export interface FileReadStat {
    filePath: string;
    fullReadCount: number;
    /** Number of distinct compartment ranges the reads span across */
    spreadAcrossCompartments: number;
    /** Number of times the file was edited (write/edit tool) in this session */
    editCount: number;
    /** Byte size of the most recent full read output */
    latestReadBytes: number;
    /** Approximate token count of the most recent full read (~3.5 chars per token) */
    latestReadTokens: number;
}
/**
 * Query file read patterns from OpenCode's DB for a specific session.
 * Returns files that were fully read (no line range) at least `minReads` times,
 * sorted by read frequency descending.
 */
export declare function getSessionReadStats(openCodeDb: Database, sessionId: string, minReads: number): FileReadStat[];
//# sourceMappingURL=read-stats.d.ts.map