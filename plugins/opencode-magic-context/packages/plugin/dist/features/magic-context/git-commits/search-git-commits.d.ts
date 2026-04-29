/**
 * Hybrid FTS + semantic search for indexed git commits.
 *
 * Returns raw scored matches; the caller (unifiedSearch) slots these into
 * the existing merged ranking with source boosts.
 */
import type { Database } from "bun:sqlite";
import type { StoredGitCommit } from "./storage-git-commits";
export interface GitCommitSearchHit {
    commit: StoredGitCommit;
    /** 0..1 combined score. */
    score: number;
    matchType: "semantic" | "fts" | "hybrid";
}
export interface SearchGitCommitsOptions {
    limit: number;
    /** Raw semantic score weight. Default 0.7. */
    semanticWeight?: number;
    /** Raw FTS score weight. Default 0.3. */
    ftsWeight?: number;
    /** When semantic OR FTS has only one signal, scale the score by this
     *  penalty to favor hybrid matches. Default 0.8. */
    singleSourcePenalty?: number;
    /** Pre-computed query embedding. When omitted, we skip the semantic pass. */
    queryEmbedding?: Float32Array | null;
}
/**
 * Return top-K commits matching `query` for `projectPath`, combining FTS
 * and semantic ranks. Falls back to LIKE when FTS fails (e.g. short queries).
 */
export declare function searchGitCommitsSync(db: Database, projectPath: string, query: string, options: SearchGitCommitsOptions): GitCommitSearchHit[];
//# sourceMappingURL=search-git-commits.d.ts.map