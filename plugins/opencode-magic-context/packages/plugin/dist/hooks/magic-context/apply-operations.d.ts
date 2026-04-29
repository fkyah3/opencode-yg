import type { ContextDatabase } from "../../features/magic-context/storage";
import { getPendingOps } from "../../features/magic-context/storage";
import type { TagEntry } from "../../features/magic-context/types";
import type { TagTarget } from "./tag-messages";
export declare function applyPendingOperations(sessionId: string, db: ContextDatabase, targets: Map<number, TagTarget>, protectedTags?: number, preloadedTags?: TagEntry[], preloadedPendingOps?: ReturnType<typeof getPendingOps>): boolean;
export declare function applyFlushedStatuses(sessionId: string, db: ContextDatabase, targets: Map<number, TagTarget>, preloadedTags?: TagEntry[]): boolean;
//# sourceMappingURL=apply-operations.d.ts.map