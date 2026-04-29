import { Database } from "bun:sqlite";
export declare function initializeDatabase(db: Database): void;
export declare function openDatabase(): Database;
export declare function isDatabasePersisted(db: Database): boolean;
export declare function getDatabasePersistenceError(db: Database): string | null;
export declare function closeDatabase(): void;
export type ContextDatabase = ReturnType<typeof openDatabase>;
//# sourceMappingURL=storage-db.d.ts.map