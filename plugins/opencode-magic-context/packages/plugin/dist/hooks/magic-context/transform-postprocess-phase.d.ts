import { type ContextDatabase, getTopNBySize } from "../../features/magic-context/storage";
import type { SessionMeta, TagEntry } from "../../features/magic-context/types";
import { type PreparedCompartmentInjection } from "./inject-compartments";
import type { NudgePlacementStore } from "./nudge-placement-store";
import type { ContextNudge } from "./nudger";
import { type MessageLike, type TagTarget } from "./transform-operations";
interface RunPostTransformPhaseArgs {
    sessionId: string;
    db: ContextDatabase;
    messages: MessageLike[];
    tags: TagEntry[];
    targets: Map<number, TagTarget>;
    reasoningByMessage: Map<MessageLike, {
        type: string;
        thinking?: string;
        text?: string;
    }[]>;
    messageTagNumbers: Map<MessageLike, number>;
    batch: {
        finalize: () => void;
    } | null;
    contextUsage: {
        percentage: number;
        inputTokens: number;
    };
    schedulerDecision: "execute" | "defer";
    fullFeatureMode: boolean;
    canRunCompartments: boolean;
    awaitedCompartmentRun: boolean;
    compartmentInProgress: boolean;
    sessionMeta: SessionMeta;
    currentTurnId: string | null;
    flushedSessions: Set<string>;
    lastHeuristicsTurnId: Map<string, string>;
    autoDropToolAge: number;
    dropToolStructure: boolean;
    clearReasoningAge: number;
    protectedTags: number;
    nudgePlacements: NudgePlacementStore;
    nudger: (sessionId: string, contextUsage: {
        percentage: number;
        inputTokens: number;
    }, db: ContextDatabase, topNFn: typeof getTopNBySize, preloadedTags?: TagEntry[], messagesSinceLastUser?: number, preloadedSessionMeta?: SessionMeta) => ContextNudge | null;
    pendingCompartmentInjection: PreparedCompartmentInjection | null;
    didMutateFromFlushedStatuses: boolean;
    watermark: number;
    forceMaterializationPercentage: number;
    hasRecentReduceCall: boolean;
    /**
     * Providers with `capabilities.interleaved.field` require typed reasoning
     * parts to survive until OpenCode lifts them into a top-level
     * `reasoning_content`/`reasoning_details` wire field. When true, skip the
     * rewrite-and-remove cleanup for typed reasoning parts only.
     *
     * Inline `<thinking>...</thinking>` text is intentionally NOT gated. It
     * lives inside ordinary text parts and does not participate in the typed
     * provider contract that triggered Moonshot/Kimi's rejection.
     */
    skipTypedReasoningCleanup: boolean;
    projectPath?: string;
    /** Experimental auto-search: when enabled, runs ctx_search on the latest
     *  user prompt and appends a compact fragment hint. */
    autoSearch?: {
        enabled: boolean;
        scoreThreshold: number;
        minPromptChars: number;
        memoryEnabled: boolean;
        embeddingEnabled: boolean;
        gitCommitsEnabled: boolean;
    };
}
export declare function runPostTransformPhase(args: RunPostTransformPhaseArgs): Promise<void>;
export {};
//# sourceMappingURL=transform-postprocess-phase.d.ts.map