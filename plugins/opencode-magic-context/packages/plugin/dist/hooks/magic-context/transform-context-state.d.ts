import type { Scheduler } from "../../features/magic-context/scheduler";
import type { ContextDatabase } from "../../features/magic-context/storage";
import type { ContextUsage, SessionMeta } from "../../features/magic-context/types";
export declare function loadContextUsage(contextUsageMap: Map<string, {
    usage: ContextUsage;
    updatedAt: number;
}>, db: ContextDatabase, sessionId: string): ContextUsage;
export declare function resolveSchedulerDecision(scheduler: Scheduler, sessionMeta: SessionMeta, contextUsage: ContextUsage, sessionId: string, modelKey?: string): "execute" | "defer";
//# sourceMappingURL=transform-context-state.d.ts.map