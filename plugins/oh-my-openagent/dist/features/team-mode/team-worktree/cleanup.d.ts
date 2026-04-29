import type { TeamModeConfig } from "./manager";
export declare function removeWorktree(worktreePath: string): Promise<void>;
export declare function findOrphanWorktrees(baseDir: string, _config: TeamModeConfig): Promise<string[]>;
