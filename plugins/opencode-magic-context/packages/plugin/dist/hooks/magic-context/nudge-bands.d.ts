export type RollingNudgeBand = "far" | "near" | "urgent" | "critical";
export declare function getRollingNudgeBand(percentage: number, executeThresholdPercentage: number): RollingNudgeBand;
export declare function getRollingNudgeBandPriority(band: RollingNudgeBand | null): number;
export declare function formatRollingNudgeBand(band: RollingNudgeBand | null): string;
export declare function getRollingNudgeIntervalTokens(baseIntervalTokens: number, band: RollingNudgeBand): number;
//# sourceMappingURL=nudge-bands.d.ts.map