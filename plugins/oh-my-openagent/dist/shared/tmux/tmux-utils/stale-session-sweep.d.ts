export type SweepDeps = {
    isInsideTmux: () => boolean;
    getTmuxPath: () => Promise<string | null | undefined>;
    listCandidateSessions: (tmux: string) => Promise<string[]>;
    killSession: (sessionName: string) => Promise<boolean>;
    processAlive: (pid: number) => boolean;
    currentPid: number;
    log: (message: string, payload?: unknown) => void;
};
export declare function sweepStaleOmoAgentSessionsWith(deps: SweepDeps): Promise<number>;
export declare function sweepStaleOmoAgentSessions(): Promise<number>;
