import type { Database } from "bun:sqlite";
export interface RawMessage {
    ordinal: number;
    id: string;
    role: string;
    parts: unknown[];
}
export declare function readRawSessionMessagesFromDb(db: Database, sessionId: string): RawMessage[];
//# sourceMappingURL=read-session-raw.d.ts.map