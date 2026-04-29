/**
 * Conflict warning for Desktop mode when magic-context is disabled.
 *
 * - When conflicts detected: reads Desktop app state → finds active session → sends ignored warning
 * - When no conflicts: cleans up any leftover warning messages from previous runs
 *
 * TUI handles this via a startup dialog — this covers Desktop only.
 */
import type { ConflictResult } from "../shared/conflict-detector";
/**
 * Send an ignored notification to the active Desktop session at plugin startup.
 */
export declare function sendConflictWarning(client: unknown, directory: string, conflictResult: ConflictResult): Promise<void>;
/**
 * Clean up leftover conflict warning messages from previous disabled runs.
 * Called at startup when no conflicts exist (plugin is enabled normally).
 */
export declare function cleanupConflictWarnings(client: unknown, directory: string, serverUrl?: string): Promise<void>;
/**
 * Notify the user that tui.json was configured with the sidebar plugin.
 * Sends an ignored message that auto-deletes after 1 second.
 */
export declare function sendTuiSetupNotification(client: unknown, directory: string, serverUrl?: string): Promise<void>;
//# sourceMappingURL=conflict-warning-hook.d.ts.map