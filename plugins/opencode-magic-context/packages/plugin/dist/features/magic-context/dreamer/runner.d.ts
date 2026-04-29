import { Database } from "bun:sqlite";
import type { DreamingTask } from "../../../config/schema/magic-context";
import type { PluginContext } from "../../../plugin/types";
interface ExperimentalPinKeyFilesConfig {
    enabled: boolean;
    token_budget: number;
    min_reads: number;
}
export declare function registerDreamProjectDirectory(projectIdentity: string, directory: string): void;
export interface DreamRunResult {
    startedAt: number;
    finishedAt: number;
    holderId: string;
    smartNotesSurfaced: number;
    smartNotesPending: number;
    tasks: {
        name: string;
        durationMs: number;
        result: unknown;
        error?: string;
    }[];
}
export declare function runDream(args: {
    db: Database;
    client: PluginContext["client"];
    /** Project identity (e.g. "git:<sha>"), NOT a filesystem path. Used for dream state keys. */
    projectIdentity: string;
    tasks: DreamingTask[];
    taskTimeoutMinutes: number;
    maxRuntimeMinutes: number;
    parentSessionId?: string;
    sessionDirectory?: string;
    experimentalUserMemories?: {
        enabled: boolean;
        promotionThreshold: number;
    };
    experimentalPinKeyFiles?: ExperimentalPinKeyFilesConfig;
}): Promise<DreamRunResult>;
export declare function processDreamQueue(args: {
    db: Database;
    client: PluginContext["client"];
    tasks: DreamingTask[];
    taskTimeoutMinutes: number;
    maxRuntimeMinutes: number;
    experimentalUserMemories?: {
        enabled: boolean;
        promotionThreshold: number;
    };
    experimentalPinKeyFiles?: ExperimentalPinKeyFilesConfig;
}): Promise<DreamRunResult | null>;
export {};
//# sourceMappingURL=runner.d.ts.map