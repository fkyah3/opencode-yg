import type { Database } from "bun:sqlite";
interface SessionFact {
    category: string;
    content: string;
}
/**
 * Promote eligible session facts to cross-session memories.
 * Called after replaceAllCompartmentState() commits.
 * Uses normalized_hash for fast dedup. Async embedding runs post-commit.
 */
export declare function promoteSessionFactsToMemory(db: Database, sessionId: string, projectPath: string, facts: SessionFact[]): void;
export {};
//# sourceMappingURL=promotion.d.ts.map