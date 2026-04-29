import type { Database } from "bun:sqlite";
import type { RawMessage } from "../../hooks/magic-context/read-session-raw";
export declare function deleteIndexedMessage(db: Database, sessionId: string, messageId: string): number;
export declare function clearIndexedMessages(db: Database, sessionId: string): void;
export declare function ensureMessagesIndexed(db: Database, sessionId: string, readMessages: (sessionId: string) => RawMessage[]): void;
//# sourceMappingURL=message-index.d.ts.map