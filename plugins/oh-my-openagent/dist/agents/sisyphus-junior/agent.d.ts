/**
 * Sisyphus-Junior - Focused Task Executor
 *
 * Executes delegated tasks directly without spawning other agents.
 * Category-spawned executor with domain-specific configurations.
 */
import type { AgentConfig } from "@opencode-ai/sdk";
import type { AgentOverrideConfig } from "../../config/schema";
export declare const SISYPHUS_JUNIOR_DEFAULTS: {
    readonly temperature: 0.1;
};
export type SisyphusJuniorPromptSource = "default";
export declare function getSisyphusJuniorPromptSource(_model?: string): SisyphusJuniorPromptSource;
/**
 * Builds the appropriate Sisyphus-Junior prompt based on model.
 */
export declare function buildSisyphusJuniorPrompt(model: string | undefined, useTaskSystem: boolean, promptAppend?: string): string;
export declare function createSisyphusJuniorAgentWithOverrides(override: AgentOverrideConfig | undefined, systemDefaultModel?: string, useTaskSystem?: boolean): AgentConfig;
export declare namespace createSisyphusJuniorAgentWithOverrides {
    var mode: "subagent";
}
