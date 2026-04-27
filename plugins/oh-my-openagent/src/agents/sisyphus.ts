import type { AgentConfig } from "@opencode-ai/sdk";
import type { AgentMode, AgentPromptMetadata } from "./types";

import { buildDeepSeekSisyphusPrompt } from "./sisyphus/deepseek";
import { getGptApplyPatchPermission } from "./gpt-apply-patch-guard";

const MODE: AgentMode = "primary";
export const SISYPHUS_PROMPT_METADATA: AgentPromptMetadata = {
  category: "utility",
  cost: "EXPENSIVE",
  promptAlias: "Sisyphus",
  triggers: [],
};
import type {
  AvailableAgent,
  AvailableTool,
  AvailableSkill,
  AvailableCategory,
} from "./dynamic-agent-prompt-builder";
import {
  categorizeTools,
} from "./dynamic-agent-prompt-builder";

export function createSisyphusAgent(
  model: string,
  availableAgents?: AvailableAgent[],
  availableToolNames?: string[],
  availableSkills?: AvailableSkill[],
  availableCategories?: AvailableCategory[],
  useTaskSystem = false,
): AgentConfig {
  const tools = availableToolNames ? categorizeTools(availableToolNames) : [];
  const skills = availableSkills ?? [];
  const categories = availableCategories ?? [];
  const agents = availableAgents ?? [];

  const prompt = buildDeepSeekSisyphusPrompt(
    model,
    agents,
    tools,
    skills,
    categories,
    useTaskSystem,
  );

  return {
    description:
      "深度求索高级工程师 — 编排型 AI Agent。工作、委派、验证、交付。(Sisyphus - OhMyOpenCode)",
    mode: MODE,
    model,
    maxTokens: 32000,
    prompt,
    color: "#00CED1",
    permission: {
      question: "allow",
      call_omo_agent: "deny",
      ...getGptApplyPatchPermission(model),
    } as AgentConfig["permission"],
    reasoningEffort: "low",
  };
}
createSisyphusAgent.mode = MODE;
