import type { MagicContextConfig } from "../config/schema/magic-context";
import type { LiveSessionState } from "../hooks/magic-context/live-session-state";
import type { PluginContext } from "./types";
/**
 * Start a server-side consumer that polls plugin_messages for TUI→server
 * action messages and dispatches them. Currently handles:
 * - { command: "recomp" } — executes /ctx-recomp for the given session
 */
export declare function startTuiActionConsumer(args: {
    client: PluginContext["client"];
    directory: string;
    config: MagicContextConfig;
    liveSessionState: LiveSessionState;
}): (() => void) | undefined;
//# sourceMappingURL=tui-action-consumer.d.ts.map