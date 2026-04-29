import type { Database } from "bun:sqlite";
import type { Memory } from "./types";
/**
 * Sanitize a user query for FTS5 MATCH syntax.
 *
 * FTS5 interprets characters like `-`, `:`, `*`, `(`, `)` as operators.
 * This wraps each whitespace-delimited token in double quotes so special
 * characters are treated as literal content rather than query syntax.
 */
export declare function sanitizeFtsQuery(query: string): string;
export declare function searchMemoriesFTS(db: Database, projectPath: string, query: string, limit?: number): Memory[];
//# sourceMappingURL=storage-memory-fts.d.ts.map