import type { Database } from "bun:sqlite";
/**
 * Run all pending migrations sequentially.
 * Each migration runs in its own transaction — if it fails, only that migration rolls back.
 * Already-applied migrations are skipped.
 */
export declare function runMigrations(db: Database): void;
//# sourceMappingURL=migrations.d.ts.map