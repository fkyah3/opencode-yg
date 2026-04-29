/**
 * Atlas - Master Orchestrator Agent
 *
 * Orchestrates work via task() to complete ALL tasks in a todo list until fully done.
 */
import type { AgentConfig } from "@opencode-ai/sdk";
import type { AgentPromptMetadata } from "../types";
import type { AvailableAgent, AvailableSkill } from "../dynamic-agent-prompt-builder";
import type { CategoryConfig } from "../../config/schema";
export type AtlasPromptSource = "default";
export declare function getAtlasPromptSource(_model?: string): AtlasPromptSource;
export interface OrchestratorContext {
    model?: string;
    availableAgents?: AvailableAgent[];
    availableSkills?: AvailableSkill[];
    userCategories?: Record<string, CategoryConfig>;
}
/**
 * Gets the Atlas prompt (default/only variant).
 */
export declare function getAtlasPrompt(_model?: string): string;
export declare function createAtlasAgent(ctx: OrchestratorContext): AgentConfig;
export declare namespace createAtlasAgent {
    var mode: "primary";
}
export declare const atlasPromptMetadata: AgentPromptMetadata;
