import type { Database } from "bun:sqlite";
import type { TagEntry } from "./types";
export declare function insertTag(db: Database, sessionId: string, messageId: string, type: TagEntry["type"], byteSize: number, tagNumber: number, reasoningByteSize?: number, toolName?: string | null, inputByteSize?: number): number;
export declare function updateTagStatus(db: Database, sessionId: string, tagId: number, status: TagEntry["status"]): void;
export declare function updateTagDropMode(db: Database, sessionId: string, tagNumber: number, dropMode: TagEntry["dropMode"]): void;
export declare function updateTagMessageId(db: Database, sessionId: string, tagId: number, messageId: string): void;
export declare function deleteTagsByMessageId(db: Database, sessionId: string, messageId: string): number[];
export declare function getMaxTagNumberBySession(db: Database, sessionId: string): number;
export declare function getTagsBySession(db: Database, sessionId: string): TagEntry[];
export declare function getTagById(db: Database, sessionId: string, tagId: number): TagEntry | null;
export declare function getTopNBySize(db: Database, sessionId: string, n: number): TagEntry[];
//# sourceMappingURL=storage-tags.d.ts.map