import { getOrCreateSessionMeta, type getTopNBySize } from "../../features/magic-context/storage";
import type { ContextUsage, SessionMeta, TagEntry } from "../../features/magic-context/types";
type ContextDatabase = Parameters<typeof getOrCreateSessionMeta>[0];
export type ContextNudge = {
    type: "assistant";
    text: string;
};
export declare const RECENT_CTX_REDUCE_WINDOW_MS: number;
export declare function createNudger(config: {
    protected_tags: number;
    nudge_interval_tokens: number;
    iteration_nudge_threshold: number;
    execute_threshold_percentage: number | {
        default: number;
        [modelKey: string]: number;
    };
    now?: () => number;
    recentReduceBySession?: Map<string, number>;
}): (sessionId: string, contextUsage: ContextUsage, db: ContextDatabase, topNFn: typeof getTopNBySize, preloadedTags?: TagEntry[], messagesSinceLastUser?: number, preloadedSessionMeta?: SessionMeta) => ContextNudge | null;
export {};
//# sourceMappingURL=nudger.d.ts.map