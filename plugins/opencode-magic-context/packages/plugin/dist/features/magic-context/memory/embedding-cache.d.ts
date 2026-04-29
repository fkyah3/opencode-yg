import type { Database } from "bun:sqlite";
export declare function getProjectEmbeddings(db: Database, projectPath: string): Map<number, Float32Array>;
export declare function peekProjectEmbeddings(projectPath: string): Map<number, Float32Array> | null;
export declare function invalidateProject(projectPath: string): void;
export declare function invalidateMemory(projectPath: string, memoryId: number): void;
export declare function resetEmbeddingCacheForTests(): void;
export declare function setEmbeddingCacheTtlForTests(ttlMs: number): void;
//# sourceMappingURL=embedding-cache.d.ts.map