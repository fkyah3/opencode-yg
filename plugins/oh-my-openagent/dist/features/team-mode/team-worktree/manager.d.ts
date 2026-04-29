export type TeamModeConfig = {
    worktreeBaseDir?: string;
};
export declare class GitUnavailableError extends Error {
    constructor();
}
declare function runGit(args: string[], cwd?: string): Promise<{
    code: number;
    stderr: string;
}>;
export declare function setGitCommandRunnerForTests(runner: typeof runGit): void;
export declare function isGitAvailable(): Promise<boolean>;
export declare function validateWorktreeSpec(spec: string): void;
export declare function createWorktree(repoRoot: string, _teamRunId: string, _memberName: string, worktreePath: string, _config: TeamModeConfig): Promise<string>;
export {};
