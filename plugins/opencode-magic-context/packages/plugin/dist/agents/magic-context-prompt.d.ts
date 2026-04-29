/**
 * Per-agent magic context system prompt sections.
 * Each agent gets tailored guidance based on its workflow patterns.
 */
type AgentType = "sisyphus" | "atlas" | "hephaestus" | "sisyphus-junior" | "oracle" | "athena" | "athena-junior";
/**
 * Detect which agent is active by scanning the system prompt for known signatures.
 * Returns the detected agent type or null for unknown agents.
 * Order matters — more specific signatures (e.g., "Sisyphus-Junior") are checked first.
 */
export declare function detectAgentFromSystemPrompt(systemPrompt: string): AgentType | null;
export declare function buildMagicContextSection(agent: AgentType | null, protectedTags: number, ctxReduceEnabled?: boolean, dreamerEnabled?: boolean, dropToolStructure?: boolean, temporalAwarenessEnabled?: boolean): string;
export {};
//# sourceMappingURL=magic-context-prompt.d.ts.map