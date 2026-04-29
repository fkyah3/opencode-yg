import type { ContextDatabase } from "../../features/magic-context/storage";
import type { TagEntry } from "../../features/magic-context/types";
import type { MessageLike, TagTarget } from "./tag-messages";
export declare function applyHeuristicCleanup(sessionId: string, db: ContextDatabase, targets: Map<number, TagTarget>, messageTagNumbers: Map<MessageLike, number>, config: {
    autoDropToolAge: number;
    dropToolStructure: boolean;
    protectedTags: number;
    dropAllTools?: boolean;
}, preloadedTags?: TagEntry[]): {
    droppedTools: number;
    deduplicatedTools: number;
    droppedInjections: number;
};
//# sourceMappingURL=heuristic-cleanup.d.ts.map