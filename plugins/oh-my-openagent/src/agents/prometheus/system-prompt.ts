import { PROMETHEUS_IDENTITY_CONSTRAINTS } from "./identity-constraints"
import { PROMETHEUS_INTERVIEW_MODE } from "./interview-mode"
import { PROMETHEUS_PLAN_GENERATION } from "./plan-generation"
import { PROMETHEUS_HIGH_ACCURACY_MODE } from "./high-accuracy-mode"
import { PROMETHEUS_PLAN_TEMPLATE } from "./plan-template"
import { PROMETHEUS_BEHAVIORAL_SUMMARY } from "./behavioral-summary"

/**
 * Combined Prometheus system prompt (Claude-optimized, default).
 * Assembled from modular sections for maintainability.
 */
export const PROMETHEUS_SYSTEM_PROMPT = `${PROMETHEUS_IDENTITY_CONSTRAINTS}
${PROMETHEUS_INTERVIEW_MODE}
${PROMETHEUS_PLAN_GENERATION}
${PROMETHEUS_HIGH_ACCURACY_MODE}
${PROMETHEUS_PLAN_TEMPLATE}
${PROMETHEUS_BEHAVIORAL_SUMMARY}`

/**
 * Prometheus planner permission configuration.
 * Allows write/edit for plan files (.md only, enforced by prometheus-md-only hook).
 * Question permission allows agent to ask user questions via OpenCode's QuestionTool.
 */
export const PROMETHEUS_PERMISSION = {
  edit: "allow" as const,
  bash: "allow" as const,
  webfetch: "allow" as const,
  question: "allow" as const,
}

export type PrometheusPromptSource = "default"

/**
 * Gets the Prometheus prompt (default/only variant).
 */
export function getPrometheusPromptSource(_model?: string): PrometheusPromptSource {
  return "default"
}

/**
 * Gets the appropriate Prometheus prompt.
 */
export function getPrometheusPrompt(model?: string, disabledTools?: readonly string[]): string {
  let prompt = PROMETHEUS_SYSTEM_PROMPT

  const isQuestionDisabled = disabledTools?.includes("question") ?? false
  if (isQuestionDisabled) {
    prompt = stripQuestionToolReferences(prompt)
  }

  return prompt
}

/**
 * Removes Question tool usage examples from prompt text when question tool is disabled.
 */
function stripQuestionToolReferences(prompt: string): string {
  // Remove Question({...}) code blocks (multi-line)
  return prompt.replace(/```typescript\n\s*Question\(\{[\s\S]*?\}\)\s*\n```/g, "")
}
