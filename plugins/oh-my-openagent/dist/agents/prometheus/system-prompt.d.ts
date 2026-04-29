/**
 * Combined Prometheus system prompt (Claude-optimized, default).
 * Assembled from modular sections for maintainability.
 */
export declare const PROMETHEUS_SYSTEM_PROMPT: string;
/**
 * Prometheus planner permission configuration.
 * Allows write/edit for plan files (.md only, enforced by prometheus-md-only hook).
 * Question permission allows agent to ask user questions via OpenCode's QuestionTool.
 */
export declare const PROMETHEUS_PERMISSION: {
    edit: "allow";
    bash: "allow";
    webfetch: "allow";
    question: "allow";
};
export type PrometheusPromptSource = "default";
/**
 * Gets the Prometheus prompt (default/only variant).
 */
export declare function getPrometheusPromptSource(_model?: string): PrometheusPromptSource;
/**
 * Gets the appropriate Prometheus prompt.
 */
export declare function getPrometheusPrompt(model?: string, disabledTools?: readonly string[]): string;
