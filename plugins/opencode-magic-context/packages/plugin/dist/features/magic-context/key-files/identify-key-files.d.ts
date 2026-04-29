import type { Database } from "bun:sqlite";
import { type FileReadStat } from "./read-stats";
export declare const KEY_FILES_SYSTEM_PROMPT = "You are a file importance evaluator. Given read statistics about files in a coding session, identify which are core orientation files worth pinning in context. Return a JSON array.";
/**
 * Build the LLM prompt for key file identification.
 * Called from the dreamer runner which handles session creation.
 */
export declare function buildKeyFilesPrompt(candidates: FileReadStat[], tokenBudget: number, minReads: number): string;
/**
 * Parse the LLM's response into a ranked file list.
 */
export declare function parseKeyFilesOutput(text: string): Array<{
    filePath: string;
    tokens: number;
}>;
/**
 * Get candidate files for key-file analysis from OpenCode's DB.
 * Returns files with full reads >= minReads and size under half the budget.
 */
export declare function getKeyFileCandidates(openCodeDb: Database, sessionId: string, minReads: number, tokenBudget: number, projectDirectory?: string): FileReadStat[];
/**
 * Apply LLM-ranked results through the knapsack solver and persist.
 */
export declare function applyKeyFileResults(db: Database, sessionId: string, llmRanked: Array<{
    filePath: string;
    tokens: number;
}>, tokenBudget: number, candidatePaths?: Set<string>): {
    filesIdentified: number;
    totalTokens: number;
};
/**
 * Pure heuristic fallback when LLM is unavailable.
 * Ranks by: high read count, low edit count, reasonable size.
 */
export declare function heuristicKeyFileSelection(db: Database, sessionId: string, candidates: FileReadStat[], tokenBudget: number): {
    filesIdentified: number;
    totalTokens: number;
};
//# sourceMappingURL=identify-key-files.d.ts.map