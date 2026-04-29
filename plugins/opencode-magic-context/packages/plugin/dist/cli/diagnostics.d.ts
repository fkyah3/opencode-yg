import { type ConfigPaths } from "./config-paths";
export interface DiagnosticReport {
    timestamp: string;
    platform: string;
    arch: string;
    nodeVersion: string;
    pluginVersion: string;
    opencodeInstalled: boolean;
    opencodeVersion: string | null;
    configPaths: ConfigPaths;
    opencodeConfigHasPlugin: boolean;
    tuiConfigHasPlugin: boolean;
    magicContextConfig: {
        exists: boolean;
        parseError?: string;
        flags: Record<string, unknown>;
    };
    pluginCache: {
        path: string;
        cached?: string;
        latest?: string;
    };
    storageDir: {
        path: string;
        exists: boolean;
        contextDbSizeBytes: number;
    };
    conflicts: {
        hasConflict: boolean;
        reasons: string[];
    };
    logFile: {
        path: string;
        exists: boolean;
        sizeKb: number;
    };
    historianDumps: {
        dir: string;
        count: number;
        recent: HistorianDumpSummary[];
    };
    /** Most recent historian-failure rows from session_meta across all sessions. */
    historianFailures: HistorianFailureSummary[];
}
export interface HistorianDumpSummary {
    name: string;
    ageMinutes: number;
    sizeKb: number;
    /** Parsed metadata — only structural fields, never raw XML content. */
    meta?: HistorianDumpMeta;
    /** If the XML could not be parsed, reason for failure. */
    parseError?: string;
}
export interface HistorianDumpMeta {
    /** Number of <compartment> elements found. */
    compartmentCount: number;
    /** Smallest start ordinal across compartments, or null if none. */
    minStart: number | null;
    /** Largest end ordinal across compartments, or null if none. */
    maxEnd: number | null;
    /** Value of <unprocessed_from> tag, if present. */
    unprocessedFrom: number | null;
    /** Number of <fact> items grouped by category. */
    factCountByCategory: Record<string, number>;
    /** Number of <user_observations> items. */
    userObservationCount: number;
    /** Total number of compartment ordinal gaps (missing ranges between consecutive compartments). */
    ordinalGapCount: number;
    /** Total number of overlapping compartment ranges. */
    ordinalOverlapCount: number;
}
export interface HistorianFailureSummary {
    sessionId: string;
    failureCount: number;
    /** Sanitized truncated last-error text. May be empty if never set. */
    lastError: string;
    /** ISO timestamp of last failure, or empty if never failed. */
    lastFailureAt: string;
}
export declare function collectDiagnostics(): Promise<DiagnosticReport>;
export declare function renderDiagnosticsMarkdown(report: DiagnosticReport): string;
//# sourceMappingURL=diagnostics.d.ts.map