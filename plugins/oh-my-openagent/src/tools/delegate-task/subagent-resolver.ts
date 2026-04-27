import type { DelegateTaskArgs } from "./types"
import type { ExecutorContext } from "./executor-types"
import type { DelegatedModelConfig } from "./types"
import { isPlanFamily } from "./constants"
import { SISYPHUS_JUNIOR_AGENT } from "./sisyphus-junior-agent"
import { applyCategoryParams } from "./delegated-model-config"
import { resolveEffectiveFallbackEntry } from "./fallback-entry-resolution"
import { applyFallbackEntrySettings } from "./fallback-entry-settings"
import {
  type AgentInfo,
  sanitizeSubagentType,
  mergeWithClaudeCodeAgents,
  findPrimaryAgentMatch,
  findCallableAgentMatch,
  listCallableAgentNames,
} from "./subagent-discovery"
import { normalizeModelFormat } from "../../shared/model-format-normalizer"
import { AGENT_MODEL_REQUIREMENTS } from "../../shared/model-requirements"
import { normalizeFallbackModels, flattenToFallbackModelStrings } from "../../shared/model-resolver"
import { buildFallbackChainFromModels } from "../../shared/fallback-chain-from-models"
import { getAgentConfigKey, stripAgentListSortPrefix } from "../../shared/agent-display-names"
import { normalizeSDKResponse } from "../../shared"
import { log } from "../../shared/logger"
import { getAvailableModelsForDelegateTask } from "./available-models"
import type { FallbackEntry } from "../../shared/model-requirements"
import { resolveModelForDelegateTask } from "./model-selection"
import { fuzzyMatchModel } from "../../shared/model-availability"

export async function resolveSubagentExecution(
  args: DelegateTaskArgs,
  executorCtx: ExecutorContext,
  parentAgent: string | undefined,
  categoryExamples: string
): Promise<{ agentToUse: string; categoryModel: DelegatedModelConfig | undefined; fallbackChain?: FallbackEntry[]; error?: string }> {
  const { client, agentOverrides, userCategories } = executorCtx

  if (!args.subagent_type?.trim()) {
    return { agentToUse: "", categoryModel: undefined, error: `Agent 名称不能为空。` }
  }

  const agentName = sanitizeSubagentType(args.subagent_type)

  if (agentName.toLowerCase() === SISYPHUS_JUNIOR_AGENT.toLowerCase()) {
    return {
      agentToUse: "",
      categoryModel: undefined,
      error: `不能直接使用 subagent_type="${SISYPHUS_JUNIOR_AGENT}"。请改用 category 参数（例如 ${categoryExamples}）。

当你指定 category 时，Sisyphus-Junior 会自动生成。选择适合你任务领域的 category。`,
    }
  }

  if (isPlanFamily(agentName) && isPlanFamily(parentAgent)) {
    return {
      agentToUse: "",
      categoryModel: undefined,
      error: `你是 plan 族 agent（plan/prometheus）。不能通过 task 委派给其他 plan 族 agent。

直接创建工作计划——这是你作为规划 agent 的工作。`,
    }
  }

  let agentToUse = agentName
  let categoryModel: DelegatedModelConfig | undefined
  let fallbackChain: FallbackEntry[] | undefined = undefined

  try {
    const agentsResult = await client.app.agents()
    const agents = normalizeSDKResponse(agentsResult, [] as AgentInfo[], {
      preferResponseOnMissingData: true,
    })

    const mergedAgents = mergeWithClaudeCodeAgents(agents, executorCtx.directory)
    const matchedPrimaryAgent = findPrimaryAgentMatch(mergedAgents, agentToUse)

    if (matchedPrimaryAgent) {
      return {
        agentToUse: "",
        categoryModel: undefined,
        error: `不能通过 task 委派给主 agent "${stripAgentListSortPrefix(matchedPrimaryAgent.name)}"。请直接选择该 agent。`,
      }
    }

    const matchedAgent = findCallableAgentMatch(mergedAgents, agentToUse)
    if (!matchedAgent) {
      return {
        agentToUse: "",
        categoryModel: undefined,
        error: `未知 agent: "${agentToUse}"。可用 agent：${listCallableAgentNames(mergedAgents)}`,
      }
    }

    agentToUse = stripAgentListSortPrefix(matchedAgent.name)

    const agentConfigKey = getAgentConfigKey(agentToUse)
    const agentOverride = agentOverrides?.[agentConfigKey as keyof typeof agentOverrides]
      ?? (agentOverrides ? Object.entries(agentOverrides).find(([key]) => key.toLowerCase() === agentConfigKey)?.[1] : undefined)
    const agentRequirement = AGENT_MODEL_REQUIREMENTS[agentConfigKey]
    const agentCategoryConfig = agentOverride?.category
      ? userCategories?.[agentOverride.category]
      : undefined
    const agentCategoryModel = agentCategoryConfig?.model
    const normalizedAgentFallbackModels = normalizeFallbackModels(
      agentOverride?.fallback_models
      ?? agentCategoryConfig?.fallback_models
    )

    const availableModels = await getAvailableModelsForDelegateTask(client)

    if (agentOverride?.model || agentCategoryModel || agentRequirement || matchedAgent.model) {

      const normalizedMatchedModel = matchedAgent.model
        ? normalizeModelFormat(matchedAgent.model)
        : undefined
      const matchedAgentModelStr = normalizedMatchedModel
        ? `${normalizedMatchedModel.providerID}/${normalizedMatchedModel.modelID}`
        : undefined

      const resolution = resolveModelForDelegateTask({
        userModel: agentOverride?.model ?? agentCategoryModel,
        userFallbackModels: flattenToFallbackModelStrings(normalizedAgentFallbackModels),
        categoryDefaultModel: matchedAgentModelStr,
        fallbackChain: agentRequirement?.fallbackChain,
        availableModels,
        systemDefaultModel: undefined,
      })

      const resolutionSkipped = resolution && 'skipped' in resolution

      if (resolution && !resolutionSkipped) {
        const normalized = normalizeModelFormat(resolution.model)
        if (normalized) {
          const variantToUse = agentOverride?.variant ?? resolution.variant ?? agentCategoryConfig?.variant
          const resolvedModel = variantToUse ? { ...normalized, variant: variantToUse } : normalized
          categoryModel = applyCategoryParams(resolvedModel, agentCategoryConfig)
        }
      } else if (resolutionSkipped && (agentOverride?.model ?? agentCategoryModel)) {
        const normalized = normalizeModelFormat((agentOverride?.model ?? agentCategoryModel)!)
        if (normalized) {
          const variantToUse = agentOverride?.variant ?? agentCategoryConfig?.variant
          const resolvedModel = variantToUse ? { ...normalized, variant: variantToUse } : normalized
          categoryModel = applyCategoryParams(resolvedModel, agentCategoryConfig)
          log("[delegate-task] Cold cache: using explicit user override for subagent", {
            agent: agentToUse,
            model: agentOverride?.model ?? agentCategoryModel,
          })
        }
      }

      const defaultProviderID = categoryModel?.providerID
        ?? normalizedMatchedModel?.providerID
        ?? "opencode"
      const configuredFallbackChain = buildFallbackChainFromModels(
        normalizedAgentFallbackModels,
        defaultProviderID,
      )
      fallbackChain = configuredFallbackChain ?? (resolutionSkipped ? undefined : agentRequirement?.fallbackChain)
      const effectiveEntry = resolveEffectiveFallbackEntry({
        categoryModel,
        configuredFallbackChain,
        resolution,
      })

      if (categoryModel && effectiveEntry) {
        categoryModel = applyFallbackEntrySettings({
          categoryModel,
          effectiveEntry,
          variantOverride: agentOverride?.variant,
        })
      }
    }

    if (!categoryModel && matchedAgent.model) {
      const normalizedMatchedModel = normalizeModelFormat(matchedAgent.model)
      if (normalizedMatchedModel) {
        const fullModel = `${normalizedMatchedModel.providerID}/${normalizedMatchedModel.modelID}`
        if (availableModels.size === 0 || fuzzyMatchModel(fullModel, availableModels, [normalizedMatchedModel.providerID])) {
          categoryModel = normalizedMatchedModel
        } else {
          log("[delegate-task] Skipping unavailable agent default model", {
            agent: agentToUse,
            model: fullModel,
          })
        }
      }
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    log("[delegate-task] Failed to resolve subagent execution", {
      requestedAgent: agentToUse,
      parentAgent,
      error: errorMessage,
    })

    return {
      agentToUse: "",
      categoryModel: undefined,
      error: `委派给 agent "${agentToUse}" 失败：${errorMessage}`,
    }
  }

  return { agentToUse, categoryModel, fallbackChain }
}
