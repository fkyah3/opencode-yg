import type { ToolDefinition } from "@opencode-ai/plugin";
import type { MagicContextPluginConfig } from "../config";
import type { PluginContext } from "./types";
export declare function createToolRegistry(args: {
    ctx: PluginContext;
    pluginConfig: MagicContextPluginConfig;
}): Record<string, ToolDefinition>;
//# sourceMappingURL=tool-registry.d.ts.map