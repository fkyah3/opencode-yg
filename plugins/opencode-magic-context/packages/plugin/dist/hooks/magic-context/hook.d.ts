import { type DreamerConfig, type HistorianConfig, type SidekickConfig } from "../../config/schema/magic-context";
import type { createCompactionHandler } from "../../features/magic-context/compaction";
import type { Scheduler } from "../../features/magic-context/scheduler";
import type { Tagger } from "../../features/magic-context/tagger";
import type { PluginContext } from "../../plugin/types";
export type { CommandExecuteInput, CommandExecuteOutput } from "./command-handler";
import type { LiveSessionState } from "./live-session-state";
export interface MagicContextDeps {
    client: PluginContext["client"];
    directory: string;
    tagger: Tagger;
    scheduler: Scheduler;
    onSessionCacheInvalidated?: (sessionId: string) => void;
    compactionHandler: ReturnType<typeof createCompactionHandler>;
    liveSessionState?: LiveSessionState;
    config: {
        protected_tags: number;
        ctx_reduce_enabled?: boolean;
        nudge_interval_tokens?: number;
        auto_drop_tool_age?: number;
        drop_tool_structure?: boolean;
        clear_reasoning_age?: number;
        iteration_nudge_threshold?: number;
        execute_threshold_percentage?: number | {
            default: number;
            [modelKey: string]: number;
        };
        execute_threshold_tokens?: {
            default?: number;
            [modelKey: string]: number | undefined;
        };
        cache_ttl: string | Record<string, string>;
        historian?: HistorianConfig;
        history_budget_percentage?: number;
        historian_timeout_ms?: number;
        memory?: {
            enabled: boolean;
            injection_budget_tokens: number;
        };
        embedding?: {
            provider?: "local" | "openai-compatible" | "off";
        };
        sidekick?: SidekickConfig;
        dreamer?: DreamerConfig;
        commit_cluster_trigger?: {
            enabled: boolean;
            min_clusters: number;
        };
        compaction_markers?: boolean;
        compressor?: {
            enabled: boolean;
            min_compartment_ratio: number;
            max_merge_depth: number;
            cooldown_ms: number;
        };
        experimental?: {
            temporal_awareness?: boolean;
            git_commit_indexing?: {
                enabled: boolean;
                since_days: number;
                max_commits: number;
            };
            auto_search?: {
                enabled: boolean;
                score_threshold: number;
                min_prompt_chars: number;
            };
        };
    };
}
export declare function createMagicContextHook(deps: MagicContextDeps): {
    "experimental.chat.messages.transform": (_input: Record<string, never>, output: {
        messages: unknown[];
    }) => Promise<void>;
    "experimental.chat.system.transform": (input: {
        sessionID?: string;
    }, output: {
        system: string[];
    }) => Promise<void>;
    "experimental.text.complete": (_input: {
        sessionID: string;
        messageID: string;
        partID: string;
    }, output: {
        text: string;
    }) => Promise<void>;
    "chat.message": (input: {
        sessionID?: string;
        variant?: string;
        agent?: string;
        model?: {
            providerID?: string;
            modelID?: string;
        };
    }) => Promise<void>;
    event: (input: {
        event: {
            type: string;
            properties?: unknown;
        };
    }) => Promise<void>;
    "command.execute.before": (input: unknown, output: unknown) => Promise<unknown>;
    "tool.execute.after": (input: unknown) => Promise<void>;
} | null;
//# sourceMappingURL=hook.d.ts.map