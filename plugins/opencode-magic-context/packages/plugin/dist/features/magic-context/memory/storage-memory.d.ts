import type { Database } from "bun:sqlite";
import type { Memory, MemoryCategory, MemoryInput, MemoryStatus, VerificationStatus } from "./types";
export declare const COLUMN_MAP: Record<keyof Memory, string>;
export interface MemoryCountsByStatus {
    total: number;
    active: number;
    permanent: number;
    archived: number;
    merged: number;
    ids: number[];
    archivedIds: number[];
    mergedIds: number[];
}
export declare function isMemoryRow(row: unknown): row is Memory;
export declare function toMemory(row: Memory): Memory;
export declare function insertMemory(db: Database, input: MemoryInput): Memory;
export declare function getMemoryByHash(db: Database, projectPath: string, category: MemoryCategory, normalizedHash: string): Memory | null;
export declare function getMemoriesByProject(db: Database, projectPath: string, statuses?: MemoryStatus[]): Memory[];
export declare function getMemoryById(db: Database, id: number): Memory | null;
export declare function updateMemorySeenCount(db: Database, id: number): void;
export declare function updateMemoryRetrievalCount(db: Database, id: number): void;
export declare function updateMemoryStatus(db: Database, id: number, status: MemoryStatus): void;
export declare function updateMemoryVerification(db: Database, id: number, verificationStatus: VerificationStatus): void;
export declare function updateMemoryContent(db: Database, id: number, content: string, normalizedHash: string): void;
export declare function supersededMemory(db: Database, id: number, supersededById: number): void;
export declare function mergeMemoryStats(db: Database, id: number, seenCount: number, retrievalCount: number, mergedFrom: string, status: MemoryStatus): void;
export declare function archiveMemory(db: Database, id: number, reason?: string): void;
export declare function deleteMemory(db: Database, id: number): void;
export declare function getMemoryCount(db: Database, projectPath?: string): number;
export declare function getMemoryCountsByStatus(db: Database, projectPath: string): MemoryCountsByStatus;
//# sourceMappingURL=storage-memory.d.ts.map