import type { SidebarSnapshot, StatusDetail } from "../../shared/rpc-types";
export type { SidebarSnapshot, StatusDetail };
/** Initialize the RPC client. Call once on TUI startup. */
export declare function initRpcClient(directory: string): void;
/** Clean up the RPC client. */
export declare function closeRpc(): void;
/** Fetch sidebar snapshot from the server via RPC. */
export declare function loadSidebarSnapshot(sessionId: string, directory: string): Promise<SidebarSnapshot>;
/** Fetch full status detail from the server via RPC. */
export declare function loadStatusDetail(sessionId: string, directory: string, modelKey?: string): Promise<StatusDetail>;
/** Get compartment count via RPC. */
export declare function getCompartmentCount(sessionId: string): Promise<number>;
/** Send recomp request to server via RPC. */
export declare function requestRecomp(sessionId: string): Promise<boolean>;
export interface TuiMessage {
    type: string;
    payload: Record<string, unknown>;
    sessionId?: string;
}
/** Poll for pending server→TUI notifications via RPC. */
export declare function consumeTuiMessages(): Promise<TuiMessage[]>;
//# sourceMappingURL=context-db.d.ts.map