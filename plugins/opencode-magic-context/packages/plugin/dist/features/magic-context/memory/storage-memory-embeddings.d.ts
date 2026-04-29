import type { Database } from "bun:sqlite";
export declare function saveEmbedding(db: Database, memoryId: number, embedding: Float32Array, modelId: string): void;
export declare function loadAllEmbeddings(db: Database, projectPath: string): Map<number, Float32Array>;
export declare function deleteEmbedding(db: Database, memoryId: number): void;
export declare function getStoredModelId(db: Database, projectPath: string): string | null;
export declare function clearEmbeddingsForProject(db: Database, projectPath: string): void;
//# sourceMappingURL=storage-memory-embeddings.d.ts.map