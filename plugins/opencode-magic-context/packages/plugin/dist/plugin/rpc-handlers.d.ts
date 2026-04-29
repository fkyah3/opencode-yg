import type { MagicContextConfig } from "../config/schema/magic-context";
import type { LiveSessionState } from "../hooks/magic-context/live-session-state";
import type { MagicContextRpcServer } from "../shared/rpc-server";
/**
 * Register all RPC handlers on the server.
 */
export declare function registerRpcHandlers(rpcServer: MagicContextRpcServer, args: {
    directory: string;
    config: MagicContextConfig;
    client: unknown;
    liveSessionState: LiveSessionState;
}): void;
//# sourceMappingURL=rpc-handlers.d.ts.map