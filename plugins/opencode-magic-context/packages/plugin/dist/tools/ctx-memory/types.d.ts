import type { Database } from "bun:sqlite";
import type { MemorySourceType } from "../../features/magic-context/memory";
export declare const CTX_MEMORY_ACTIONS: readonly ["write", "delete"];
export declare const CTX_MEMORY_DREAMER_ACTIONS: readonly ["write", "delete", "list", "update", "merge", "archive"];
export type CtxMemoryAction = (typeof CTX_MEMORY_DREAMER_ACTIONS)[number];
export interface CtxMemoryArgs {
    action: CtxMemoryAction;
    content?: string;
    category?: string;
    id?: number;
    ids?: number[];
    limit?: number;
    reason?: string;
}
export interface CtxMemoryToolDeps {
    db: Database;
    projectPath: string;
    memoryEnabled: boolean;
    embeddingEnabled: boolean;
    allowedActions?: CtxMemoryAction[];
    sourceType?: MemorySourceType;
}
//# sourceMappingURL=types.d.ts.map