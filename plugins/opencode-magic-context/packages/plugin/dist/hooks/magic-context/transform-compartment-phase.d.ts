import { type ContextDatabase } from "../../features/magic-context/storage";
import type { PluginContext } from "../../plugin/types";
import { type PreparedCompartmentInjection } from "./inject-compartments";
import type { MessageLike } from "./transform-operations";
export declare function clearCompressorCooldown(sessionId: string): void;
interface RunCompartmentPhaseArgs {
    canRunCompartments: boolean;
    fullFeatureMode: boolean;
    sessionMeta: {
        compartmentInProgress: boolean;
    };
    contextUsage: {
        percentage: number;
    };
    client?: PluginContext["client"];
    db: ContextDatabase;
    sessionId: string;
    resolvedSessionId: string;
    historianChunkTokens: number;
    historyBudgetTokens?: number;
    historianTimeoutMs?: number;
    compartmentDirectory: string;
    messages: MessageLike[];
    pendingCompartmentInjection: PreparedCompartmentInjection | null;
    fallbackModelId?: string;
    projectPath?: string;
    injectionBudgetTokens?: number;
    getNotificationParams?: () => import("./send-session-notification").NotificationParams;
    /** True when this pass is already cache-busting (flush or scheduler execute). */
    cacheAlreadyBusting?: boolean;
    /** True when transform already triggered recovery/emergency historian work this pass. */
    skipAwaitForThisPass?: boolean;
    /** When true, inject compaction markers into OpenCode's DB after historian publication */
    experimentalCompactionMarkers?: boolean;
    /** When true, extract user behavior observations from historian output */
    experimentalUserMemories?: boolean;
    /** When true, inject wall-clock dates on compartments in <session-history>. */
    experimentalTemporalAwareness?: boolean;
    /** When true, run a second editor pass after historian to clean U: lines. */
    historianTwoPass?: boolean;
    /** Compressor floor ratio: floor = ceil(lastEndMessage / minCompartmentRatio). */
    compressorMinCompartmentRatio?: number;
    /** Compressor max merge depth (1-5). Compartments at or above this depth are skipped. */
    compressorMaxMergeDepth?: number;
    /** Compressor cooldown in milliseconds between background runs. */
    compressorCooldownMs?: number;
    /** Forwarded to compartment runner — see CompartmentRunnerDeps.onInjectionCacheCleared. */
    onInjectionCacheCleared?: (sessionId: string) => void;
}
export declare function runCompartmentPhase(args: RunCompartmentPhaseArgs): Promise<{
    pendingCompartmentInjection: PreparedCompartmentInjection | null;
    awaitedCompartmentRun: boolean;
    compartmentInProgress: boolean;
}>;
export {};
//# sourceMappingURL=transform-compartment-phase.d.ts.map