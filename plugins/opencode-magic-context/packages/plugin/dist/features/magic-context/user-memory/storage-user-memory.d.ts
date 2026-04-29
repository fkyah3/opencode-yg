import type { Database } from "bun:sqlite";
export interface UserMemoryCandidate {
    id: number;
    content: string;
    sessionId: string;
    sourceCompartmentStart: number | null;
    sourceCompartmentEnd: number | null;
    createdAt: number;
}
export interface UserMemory {
    id: number;
    content: string;
    status: "active" | "dismissed";
    promotedAt: number;
    sourceCandidateIds: number[];
    createdAt: number;
    updatedAt: number;
}
export declare function insertUserMemoryCandidates(db: Database, candidates: Array<{
    content: string;
    sessionId: string;
    sourceCompartmentStart?: number;
    sourceCompartmentEnd?: number;
}>): void;
export declare function getUserMemoryCandidates(db: Database): UserMemoryCandidate[];
export declare function deleteUserMemoryCandidates(db: Database, ids: number[]): void;
export declare function insertUserMemory(db: Database, content: string, sourceCandidateIds: number[]): number;
export declare function getActiveUserMemories(db: Database): UserMemory[];
export declare function getAllUserMemories(db: Database): UserMemory[];
export declare function updateUserMemoryContent(db: Database, id: number, content: string): void;
export declare function dismissUserMemory(db: Database, id: number): void;
export declare function deleteUserMemory(db: Database, id: number): void;
//# sourceMappingURL=storage-user-memory.d.ts.map