/**
 * Embedding storage for git commits.
 *
 * Mirrors the memory-embedding storage layout but keyed by commit SHA rather
 * than memory id. Embeddings are byte-equivalent to memory embeddings (Float32
 * serialized via Float32Array.buffer), so the same cosine-similarity helpers
 * apply without conversion.
 */
import type { Database } from "bun:sqlite";
export declare function saveCommitEmbedding(db: Database, sha: string, embedding: Float32Array, modelId: string): void;
export declare function loadProjectCommitEmbeddings(db: Database, projectPath: string): Map<string, Float32Array>;
export declare function loadUnembeddedCommits(db: Database, projectPath: string, limit: number): Array<{
    sha: string;
    message: string;
}>;
export declare function countEmbeddedCommits(db: Database, projectPath: string): number;
export declare function clearProjectCommitEmbeddings(db: Database, projectPath: string): number;
//# sourceMappingURL=storage-git-commit-embeddings.d.ts.map