import type { Database } from "bun:sqlite";
interface NudgePlacement {
    messageId: string;
    nudgeText: string;
}
export interface NudgePlacementStore {
    set(sessionId: string, messageId: string, nudgeText: string): void;
    get(sessionId: string): NudgePlacement | null;
    clear(sessionId: string, options?: {
        persist?: boolean;
    }): void;
}
export declare function createNudgePlacementStore(db?: Database): NudgePlacementStore;
export {};
//# sourceMappingURL=nudge-placement-store.d.ts.map