import type { MagicContextPluginConfig } from "../../config";
import type { LiveSessionState } from "../../hooks/magic-context/live-session-state";
import type { PluginContext } from "../types";
export declare function createSessionHooks(args: {
    ctx: PluginContext;
    pluginConfig: MagicContextPluginConfig;
    liveSessionState: LiveSessionState;
}): {
    magicContext: {
        "experimental.chat.messages.transform": (_input: Record<string, never>, output: {
            messages: unknown[];
        }) => Promise<void>;
        "experimental.chat.system.transform": (input: {
            sessionID?: string;
        }, output: {
            system: string[];
        }) => Promise<void>;
        "experimental.text.complete": (_input: {
            sessionID: string;
            messageID: string;
            partID: string;
        }, output: {
            text: string;
        }) => Promise<void>;
        "chat.message": (input: {
            sessionID?: string;
            variant?: string;
            agent?: string;
            model?: {
                providerID?: string;
                modelID?: string;
            };
        }) => Promise<void>;
        event: (input: {
            event: {
                type: string;
                properties?: unknown;
            };
        }) => Promise<void>;
        "command.execute.before": (input: unknown, output: unknown) => Promise<unknown>;
        "tool.execute.after": (input: unknown) => Promise<void>;
    } | null;
};
//# sourceMappingURL=create-session-hooks.d.ts.map