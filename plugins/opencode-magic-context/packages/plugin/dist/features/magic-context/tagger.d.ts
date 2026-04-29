import type { Database } from "bun:sqlite";
import type { TagEntry } from "./types";
export interface Tagger {
    assignTag(sessionId: string, messageId: string, type: TagEntry["type"], byteSize: number, db: Database, reasoningByteSize?: number, toolName?: string | null, inputByteSize?: number): number;
    getTag(sessionId: string, messageId: string): number | undefined;
    bindTag(sessionId: string, messageId: string, tagNumber: number): void;
    getAssignments(sessionId: string): ReadonlyMap<string, number>;
    resetCounter(sessionId: string, db: Database): void;
    getCounter(sessionId: string): number;
    initFromDb(sessionId: string, db: Database): void;
    cleanup(sessionId: string): void;
}
export declare function createTagger(): Tagger;
//# sourceMappingURL=tagger.d.ts.map