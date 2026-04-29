import type { AgentBySession, LiveModelBySession, VariantBySession } from "./hook-handlers";
export interface LiveSessionState {
    liveModelBySession: LiveModelBySession;
    variantBySession: VariantBySession;
    agentBySession: AgentBySession;
}
export declare function createLiveSessionState(): LiveSessionState;
//# sourceMappingURL=live-session-state.d.ts.map