import type { DreamerConfig, EmbeddingConfig } from "../config/schema/magic-context";
import type { PluginContext } from "./types";
/**
 * Per-project work registered with the timer. The timer is a process-wide
 * singleton, but Desktop OpenCode can load the same plugin once per project
 * within one process — every load needs its directory's git commits indexed,
 * its dream schedule checked, and its experimental config respected.
 */
interface ProjectRegistration {
    directory: string;
    client: PluginContext["client"];
    dreamerConfig?: DreamerConfig;
    embeddingConfig: EmbeddingConfig;
    memoryEnabled: boolean;
    experimentalUserMemories?: {
        enabled: boolean;
        promotionThreshold: number;
    };
    experimentalPinKeyFiles?: {
        enabled: boolean;
        token_budget: number;
        min_reads: number;
    };
    gitCommitIndexing?: {
        enabled: boolean;
        since_days: number;
        max_commits: number;
    };
}
/**
 * Register the calling project with the process-wide dream + maintenance
 * timer. The timer itself is a singleton (we only need one setInterval per
 * process), but every registered project gets its per-directory work — git
 * commit indexing, dream schedule check, dream queue processing — on each
 * tick. The first registration also kicks off an immediate startup tick so
 * fresh installs and restarts don't wait 15 minutes for first-time indexing.
 *
 * Returns a cleanup that removes this project's registration. The timer
 * itself stops only when the last project unregisters.
 */
export declare function startDreamScheduleTimer(args: ProjectRegistration): (() => void) | undefined;
export {};
//# sourceMappingURL=dream-timer.d.ts.map