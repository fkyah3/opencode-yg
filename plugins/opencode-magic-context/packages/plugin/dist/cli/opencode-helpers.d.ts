export declare function isOpenCodeInstalled(): boolean;
export declare function getOpenCodeVersion(): string | null;
export declare function getAvailableModels(): string[];
/** Group models by provider for display */
export declare function groupModelsByProvider(models: string[]): Map<string, string[]>;
/** Get unique providers from model list */
export declare function getProviders(models: string[]): string[];
/** Filter models matching any of the given patterns */
export declare function filterModels(models: string[], patterns: string[]): string[];
/**
 * Build a curated model selection list for a given role.
 * Returns models ordered by recommendation priority.
 */
export declare function buildModelSelection(allModels: string[], role: "historian" | "dreamer" | "sidekick"): {
    label: string;
    value: string;
    recommended?: boolean;
}[];
//# sourceMappingURL=opencode-helpers.d.ts.map