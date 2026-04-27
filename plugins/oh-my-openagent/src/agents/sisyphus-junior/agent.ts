/**
 * Sisyphus-Junior - Focused Task Executor
 *
 * Executes delegated tasks directly without spawning other agents.
 * Category-spawned executor with domain-specific configurations.
 */

import type { AgentConfig } from "@opencode-ai/sdk"
import type { AgentMode } from "../types"
import type { AgentOverrideConfig } from "../../config/schema"

import { buildDefaultSisyphusJuniorPrompt } from "./default"

const MODE: AgentMode = "subagent"

export const SISYPHUS_JUNIOR_DEFAULTS = {
  temperature: 0.1,
} as const

export type SisyphusJuniorPromptSource = "default"

export function getSisyphusJuniorPromptSource(_model?: string): SisyphusJuniorPromptSource {
  return "default"
}

/**
 * Builds the appropriate Sisyphus-Junior prompt based on model.
 */
export function buildSisyphusJuniorPrompt(
  model: string | undefined,
  useTaskSystem: boolean,
  promptAppend?: string
): string {
  return buildDefaultSisyphusJuniorPrompt(useTaskSystem, promptAppend)
}

export function createSisyphusJuniorAgentWithOverrides(
  override: AgentOverrideConfig | undefined,
  systemDefaultModel?: string,
  useTaskSystem = false
): AgentConfig {
  if (override?.disable) {
    override = undefined
  }

  const overrideModel = (override as { model?: string } | undefined)?.model
  const model = overrideModel ?? systemDefaultModel
  const temperature = override?.temperature ?? SISYPHUS_JUNIOR_DEFAULTS.temperature

  const promptAppend = override?.prompt_append
  const prompt = buildSisyphusJuniorPrompt(model, useTaskSystem, promptAppend)

  const permission: Record<string, string> = {
    ...((override?.permission ?? {}) as Record<string, string>),
    task: "deny",
    call_omo_agent: "allow",
  }

  const base: AgentConfig = {
    description: override?.description ??
      "Focused task executor. Same discipline, no delegation. (Sisyphus-Junior - OhMyOpenCode)",
    mode: MODE,
    model,
    temperature,
    maxTokens: 64000,
    prompt,
    color: override?.color ?? "#20B2AA",
    permission,
  }

  if (override?.top_p !== undefined) {
    base.top_p = override.top_p
  }

  return {
    ...base,
    thinking: { type: "enabled", budgetTokens: 32000 },
  } as AgentConfig
}

createSisyphusJuniorAgentWithOverrides.mode = MODE
