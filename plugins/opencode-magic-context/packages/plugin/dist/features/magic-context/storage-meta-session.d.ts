import type { Database } from "bun:sqlite";
import type { SessionMeta } from "./types";
export declare function getOrCreateSessionMeta(db: Database, sessionId: string): SessionMeta;
export declare function updateSessionMeta(db: Database, sessionId: string, updates: Partial<SessionMeta>): void;
export declare function clearSession(db: Database, sessionId: string): void;
//# sourceMappingURL=storage-meta-session.d.ts.map