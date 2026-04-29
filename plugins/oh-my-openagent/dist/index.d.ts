import type { PluginModule } from "@opencode-ai/plugin";
declare const pluginModule: PluginModule;
export default pluginModule;
export type { OhMyOpenCodeConfig, AgentName, AgentOverrideConfig, AgentOverrides, McpName, HookName, BuiltinCommandName, } from "./config";
export type { ConfigLoadError } from "./shared/config-errors";
