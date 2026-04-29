import type { Database } from "bun:sqlite";
import type { DreamerConfig, SidekickConfig } from "../../config/schema/magic-context";
import { type DreamRunResult } from "../../features/magic-context/dreamer";
import type { PluginContext } from "../../plugin/types";
import { type PartialRecompRange } from "./compartment-runner-partial-recomp";
import type { NotificationParams } from "./send-session-notification";
/** Parse `/ctx-recomp` arguments.
 *
 *  Accepted forms:
 *  - empty / whitespace-only → full recomp
 *  - `<start>-<end>`         → partial recomp with explicit inclusive range
 *
 *  Returns an error object for unparseable or nonsensical inputs. */
export declare function parseRecompArgs(raw: string): {
    kind: "full";
} | {
    kind: "partial";
    range: PartialRecompRange;
} | {
    kind: "error";
    message: string;
};
export interface CommandExecuteInput {
    command: string;
    sessionID: string;
    arguments: string;
}
export interface CommandExecuteOutput {
    parts: Array<{
        type: string;
        text?: string;
    }>;
}
export declare function createMagicContextCommandHandler(deps: {
    db: Database;
    protectedTags: number;
    nudgeIntervalTokens?: number;
    executeThresholdPercentage?: number | {
        default: number;
        [modelKey: string]: number;
    };
    executeThresholdTokens?: {
        default?: number;
        [modelKey: string]: number | undefined;
    };
    historyBudgetPercentage?: number;
    commitClusterTrigger?: {
        enabled: boolean;
        min_clusters: number;
    };
    getLiveModelKey?: (sessionId: string) => string | undefined;
    /** Optional live context limit resolver — used for tokens-based threshold display. */
    getContextLimit?: (sessionId: string) => number | undefined;
    onFlush?: (sessionId: string) => void;
    /** Runs /ctx-recomp. When `range` is provided, runs partial recomp over
     *  that range (snapped to enclosing compartment boundaries). When omitted,
     *  runs full recomp from message 1 to the protected tail. */
    executeRecomp?: (sessionId: string, options?: {
        range?: PartialRecompRange;
    }) => Promise<string>;
    sendNotification: (sessionId: string, text: string, params: NotificationParams) => Promise<void>;
    sidekick?: {
        config: SidekickConfig;
        projectPath: string;
        sessionDirectory?: string;
        client: PluginContext["client"];
    };
    dreamer?: {
        config: DreamerConfig;
        projectPath: string;
        client: unknown;
        directory: string;
        executeDream?: (sessionId: string) => Promise<DreamRunResult | null>;
        experimentalUserMemories?: {
            enabled: boolean;
            promotionThreshold: number;
        };
        experimentalPinKeyFiles?: {
            enabled: boolean;
            token_budget: number;
            min_reads: number;
        };
    };
}): {
    "command.execute.before": (input: CommandExecuteInput, _output: CommandExecuteOutput, _params: NotificationParams) => Promise<void>;
};
//# sourceMappingURL=command-handler.d.ts.map