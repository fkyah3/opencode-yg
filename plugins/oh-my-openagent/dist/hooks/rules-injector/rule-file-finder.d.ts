import type { RuleScanCache } from "./rule-scan-cache";
import type { RuleFileCandidate } from "./types";
export interface FindRuleFilesOptions {
    skipClaudeUserRules?: boolean;
}
export declare function findRuleFiles(projectRoot: string | null, homeDir: string, currentFile: string, options?: FindRuleFilesOptions, cache?: RuleScanCache): RuleFileCandidate[];
