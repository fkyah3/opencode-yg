import type { TmuxSessionManager } from "../../tmux-subagent/manager";
type TeamLayoutMember = {
    name: string;
    sessionId: string;
    color?: string;
};
type TeamLayoutResult = {
    focusWindowId: string;
    gridWindowId: string;
    panesByMember: Record<string, string>;
};
export declare function canVisualize(): boolean;
export declare function createTeamLayout(teamRunId: string, members: Array<TeamLayoutMember>, tmuxMgr: TmuxSessionManager): Promise<TeamLayoutResult | null>;
export declare function removeTeamLayout(teamRunId: string, tmuxMgr: TmuxSessionManager): Promise<void>;
export {};
