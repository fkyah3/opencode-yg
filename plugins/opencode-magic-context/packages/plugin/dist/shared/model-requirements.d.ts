/**
 * Provider-agnostic fallback chain entry.
 * Each entry specifies a model and the providers to try in priority order.
 * Follows oh-my-opencode's FallbackEntry pattern — `opencode` acts as a
 * catch-all proxy provider and is listed last in most entries.
 */
export type FallbackEntry = {
    providers: string[];
    model: string;
    variant?: string;
};
export type AgentModelRequirement = {
    fallbackChain: FallbackEntry[];
};
export declare const AGENT_MODEL_REQUIREMENTS: Record<string, AgentModelRequirement>;
/**
 * Expand a provider-agnostic fallback chain into a flat `provider/model` list
 * that OpenCode's agent config accepts as `fallback_models`.
 */
export declare function expandFallbackChain(chain: FallbackEntry[]): string[];
/**
 * Get the expanded fallback_models list for an agent.
 * Returns undefined if no requirement is defined.
 */
export declare function getAgentFallbackModels(agent: string): string[] | undefined;
//# sourceMappingURL=model-requirements.d.ts.map