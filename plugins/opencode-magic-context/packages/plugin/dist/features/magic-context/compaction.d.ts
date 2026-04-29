import type { Database } from "bun:sqlite";
interface CompactionHandler {
    onCompacted(sessionId: string, db: Database): void;
}
export declare function createCompactionHandler(): CompactionHandler;
export {};
//# sourceMappingURL=compaction.d.ts.map