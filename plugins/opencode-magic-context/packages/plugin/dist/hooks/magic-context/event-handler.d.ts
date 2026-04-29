import type { createCompactionHandler } from "../../features/magic-context/compaction";
import type { Tagger } from "../../features/magic-context/tagger";
import type { ContextUsage } from "../../features/magic-context/types";
import { type NudgePlacementStore } from "./transform";
type CacheTtlConfig = string | Record<string, string>;
interface ContextUsageEntry {
    usage: ContextUsage;
    updatedAt: number;
}
export interface EventHandlerDeps {
    contextUsageMap: Map<string, ContextUsageEntry>;
    compactionHandler: ReturnType<typeof createCompactionHandler>;
    nudgePlacements: NudgePlacementStore;
    onSessionCacheInvalidated?: (sessionId: string) => void;
    onSessionDeleted?: (sessionId: string) => void;
    config: {
        protected_tags: number;
        auto_drop_tool_age?: number;
        drop_tool_structure?: boolean;
        clear_reasoning_age?: number;
        execute_threshold_percentage?: number | {
            default: number;
            [modelKey: string]: number;
        };
        execute_threshold_tokens?: {
            default?: number;
            [modelKey: string]: number | undefined;
        };
        cache_ttl: CacheTtlConfig;
        commit_cluster_trigger?: {
            enabled: boolean;
            min_clusters: number;
        };
    };
    tagger: Tagger;
    db: ReturnType<typeof import("../../features/magic-context/storage").openDatabase>;
}
export declare function createEventHandler(deps: EventHandlerDeps): (input: {
    event: {
        type: string;
        properties?: unknown;
    };
}) => Promise<void>;
export {};
//# sourceMappingURL=event-handler.d.ts.map