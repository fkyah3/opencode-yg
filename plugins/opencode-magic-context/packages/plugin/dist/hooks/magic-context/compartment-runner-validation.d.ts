import type { StoredCompartmentRange, ValidatedHistorianPassResult } from "./compartment-runner-types";
export declare function validateHistorianOutput(text: string, _sessionId: string, chunk: {
    startIndex: number;
    endIndex: number;
    lines: Array<{
        ordinal: number;
        messageId: string;
    }>;
    /** Optional — when provided, gaps inside these ranges heal at any size. */
    toolOnlyRanges?: ReadonlyArray<{
        start: number;
        end: number;
    }>;
}, _priorCompartments: StoredCompartmentRange[], sequenceOffset: number): ValidatedHistorianPassResult;
export declare function buildHistorianRepairPrompt(originalPrompt: string, previousOutput: string, validationError: string): string;
export declare function validateStoredCompartments(compartments: Array<{
    startMessage: number;
    endMessage: number;
}>): string | null;
export declare function validateChunkCoverage(chunk: {
    startIndex: number;
    endIndex: number;
    lines: Array<{
        ordinal: number;
    }>;
}): string | null;
export declare function getReducedRecompTokenBudget(currentBudget: number): number | null;
//# sourceMappingURL=compartment-runner-validation.d.ts.map