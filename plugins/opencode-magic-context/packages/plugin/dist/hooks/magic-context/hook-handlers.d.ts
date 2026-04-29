import { getOrCreateSessionMeta } from "../../features/magic-context/storage-meta";
import type { PluginContext } from "../../plugin/types";
export type LiveModelBySession = Map<string, {
    providerID: string;
    modelID: string;
}>;
export type VariantBySession = Map<string, string | undefined>;
export type AgentBySession = Map<string, string>;
export type RecentReduceBySession = Map<string, number>;
export type ToolUsageSinceUserTurn = Map<string, number>;
export type FlushedSessions = Set<string>;
export type LastHeuristicsTurnId = Map<string, string>;
export declare function getLiveNotificationParams(sessionId: string, liveModelBySession: LiveModelBySession, variantBySession: VariantBySession, agentBySession?: AgentBySession): {
    agent?: string;
    variant?: string;
    providerId?: string;
    modelId?: string;
};
export declare function createChatMessageHook(args: {
    db: Parameters<typeof getOrCreateSessionMeta>[0];
    toolUsageSinceUserTurn: ToolUsageSinceUserTurn;
    recentReduceBySession: RecentReduceBySession;
    liveModelBySession: LiveModelBySession;
    variantBySession: VariantBySession;
    agentBySession: AgentBySession;
    flushedSessions: FlushedSessions;
    lastHeuristicsTurnId: LastHeuristicsTurnId;
    ctxReduceEnabled?: boolean;
}): (input: {
    sessionID?: string;
    variant?: string;
    agent?: string;
    model?: {
        providerID?: string;
        modelID?: string;
    };
}) => Promise<void>;
export declare function createEventHook(args: {
    eventHandler: (input: {
        event: {
            type: string;
            properties?: unknown;
        };
    }) => Promise<void>;
    contextUsageMap: Map<string, {
        usage: {
            percentage: number;
            inputTokens: number;
        };
        updatedAt: number;
    }>;
    db: Parameters<typeof getOrCreateSessionMeta>[0];
    liveModelBySession: LiveModelBySession;
    variantBySession: VariantBySession;
    agentBySession: AgentBySession;
    recentReduceBySession: RecentReduceBySession;
    toolUsageSinceUserTurn: ToolUsageSinceUserTurn;
    flushedSessions: FlushedSessions;
    lastHeuristicsTurnId: LastHeuristicsTurnId;
    commitSeenLastPass?: Map<string, boolean>;
    client: PluginContext["client"];
    protectedTags: number;
    ctxReduceEnabled?: boolean;
}): (input: {
    event: {
        type: string;
        properties?: unknown;
    };
}) => Promise<void>;
export declare function createCommandExecuteBeforeHook(commandHandler: {
    "command.execute.before": (input: import("./command-handler").CommandExecuteInput, output: import("./command-handler").CommandExecuteOutput, params: {
        agent?: string;
        variant?: string;
        providerId?: string;
        modelId?: string;
    }) => Promise<unknown>;
}): (input: unknown, output: unknown) => Promise<unknown>;
export declare function createToolExecuteAfterHook(args: {
    db: Parameters<typeof getOrCreateSessionMeta>[0];
    recentReduceBySession: RecentReduceBySession;
    toolUsageSinceUserTurn: ToolUsageSinceUserTurn;
}): (input: unknown) => Promise<void>;
//# sourceMappingURL=hook-handlers.d.ts.map