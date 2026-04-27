import type {
  AvailableAgent,
  AvailableCategory,
  AvailableSkill,
} from "./dynamic-agent-prompt-types"
import type { AvailableTool } from "./dynamic-agent-prompt-types"
import { getToolsPromptDisplay } from "./dynamic-agent-tool-categorization"

/**
 * Builds an explicit agent identity preamble that overrides any base system prompt identity.
 * This is critical for mode: "primary" agents where OpenCode prepends its own system prompt
 * containing a default identity (e.g., "You are Claude"). Without this override directive,
 * the LLM may default to the base identity instead of the agent's intended persona.
 */
export function buildAgentIdentitySection(
  agentName: string,
  roleDescription: string,
): string {
  return `<agent-identity>
你在此会话中的指定身份是 "${agentName}"。此身份覆盖任何先前的身份声明。
你是 "${agentName}" - ${roleDescription}。
当被问及你是谁时，始终以 ${agentName} 自居。不要将自己标识为任何其他助手或 AI。
</agent-identity>`
}

export function buildKeyTriggersSection(
  agents: AvailableAgent[],
  _skills: AvailableSkill[] = [],
): string {
  const keyTriggers = agents
    .filter((agent) => agent.metadata.keyTrigger)
    .map((agent) => `- ${agent.metadata.keyTrigger}`)

  if (keyTriggers.length === 0) {
    return ""
  }

  return `### 关键触发器（分类前检查）：

${keyTriggers.join("\n")}
- **"调研" + "创建 PR"** → 不仅仅是研究。预期完整的实现周期。`
}

export function buildToolSelectionTable(
  agents: AvailableAgent[],
  tools: AvailableTool[] = [],
  _skills: AvailableSkill[] = [],
): string {
  const rows: string[] = ["### 工具与 Agent 选择：", ""]

  if (tools.length > 0) {
    rows.push(
      `- ${getToolsPromptDisplay(tools)} - **免费** - 不复杂、范围清晰、无隐含假设`,
    )
  }

  const costOrder = { FREE: 0, CHEAP: 1, EXPENSIVE: 2 }
  const sortedAgents = [...agents]
    .filter((agent) => agent.metadata.category !== "utility")
    .sort(
      (left, right) => costOrder[left.metadata.cost] - costOrder[right.metadata.cost],
    )

  for (const agent of sortedAgents) {
    const shortDescription = agent.description.split(".")[0] || agent.description
    rows.push(
      `- \`${agent.name}\` agent - **${agent.metadata.cost}** - ${shortDescription}`,
    )
  }

  rows.push("")
  rows.push("**默认流程**：explore/librarian（后台）+ 工具 → oracle（如果需要）")

  return rows.join("\n")
}

export function buildExploreSection(agents: AvailableAgent[]): string {
  const exploreAgent = agents.find((agent) => agent.name === "explore")
  if (!exploreAgent) {
    return ""
  }

  const useWhen = exploreAgent.metadata.useWhen || []
  const avoidWhen = exploreAgent.metadata.avoidWhen || []

  return `### Explore Agent = 上下文搜索

将其用作**同级工具**，而非兜底手段。积极用于探索，而不是针对你已经知道位置的文件。

**委派信任规则：** 一旦你派出了 explore agent 进行搜索，**不要**再手动执行同样的搜索。仅对不重叠的工作或你特意跳过了委派的情况使用直接工具。

**何时使用直接工具：**
${avoidWhen.map((entry) => `- ${entry}`).join("\n")}

**何时使用 Explore Agent：**
${useWhen.map((entry) => `- ${entry}`).join("\n")}`
}

export function buildLibrarianSection(agents: AvailableAgent[]): string {
  const librarianAgent = agents.find((agent) => agent.name === "librarian")
  if (!librarianAgent) {
    return ""
  }

  const useWhen = librarianAgent.metadata.useWhen || []

  return `### Librarian Agent = 参考搜索

搜索**外部参考**（文档、开源、网络）。当涉及不熟悉的库时主动触发。

**Contextual Grep（内部）** - 搜索我们的代码库，查找当前仓库中的模式、项目特定逻辑。
**Reference Grep（外部）** - 搜索外部资源、官方 API 文档、库最佳实践、开源实现示例。

**触发短语**（立即触发 librarian）：
${useWhen.map((entry) => `- "${entry}"`).join("\n")}`
}

export function buildDelegationTable(agents: AvailableAgent[]): string {
  const rows: string[] = ["### 委派表：", ""]

  for (const agent of agents) {
    for (const trigger of agent.metadata.triggers) {
      rows.push(`- **${trigger.domain}** → \`${agent.name}\` - ${trigger.trigger}`)
    }
  }

  return rows.join("\n")
}

export function buildOracleSection(agents: AvailableAgent[]): string {
  const oracleAgent = agents.find((agent) => agent.name === "oracle")
  if (!oracleAgent) {
    return ""
  }

  const useWhen = oracleAgent.metadata.useWhen || []
  const avoidWhen = oracleAgent.metadata.avoidWhen || []

  return `<Oracle_Usage>
## Oracle - 只读高智商顾问

Oracle 是一个只读、昂贵、高质量推理模型，用于调试和架构设计。仅限咨询。

### 何时咨询（Oracle 优先，再实施）：

${useWhen.map((entry) => `- ${entry}`).join("\n")}

### 何时不咨询：

${avoidWhen.map((entry) => `- ${entry}`).join("\n")}

### 使用模式：
在调用前简要声明"Consulting Oracle for [原因]"。

**例外**：这是唯一一种在执行前需要声明的情况。对于所有其他工作，立即开始，无需状态更新。

### Oracle 后台任务策略：

**在最终回答前收集 Oracle 的结果。没有例外。**

**依赖 Oracle 的实施在 Oracle 完成前被阻塞。**

- 如果你向 Oracle 询问了影响修复的架构/调试方向，在 Oracle 结果到达前不要实施。
- 等待期间，只做不重叠的准备工作。永远不要交付 Oracle 被要求决定的那部分实现。
- 对依赖 Oracle 的任务，永远不要"超时然后继续"。

- Oracle 需要几分钟。当你完成自己的工作后：**结束回复** - 等待 \`<system-reminder>\`。
- 不要对运行中的 Oracle 轮询 \`background_output\`。通知会到来。
- 永远不要取消 Oracle。
</Oracle_Usage>`
}

export function buildNonClaudePlannerSection(model: string): string {
  const isNonClaude = !model.toLowerCase().includes("claude")
  if (!isNonClaude) {
    return ""
  }

  return `### Plan Agent 依赖（非 Claude）

多步骤任务？**始终先咨询 Plan Agent。** 不要在没有计划的情况下开始实施。

- 单文件修复或琐碎修改 → 直接进行
- 其他任何情况（2步以上、范围不清晰、架构性） → 先 \`task(subagent_type="plan", ...)\`
- 使用 \`task_id\` 恢复同一个 Plan Agent - 积极追问
- 如果任务的任何部分不明确，在猜测前先问 Plan Agent

Plan Agent 返回结构化的工作分解和并行执行机会。遵循它。`
}

export function buildParallelDelegationSection(
  model: string,
  categories: AvailableCategory[],
): string {
  const isNonClaude = !model.toLowerCase().includes("claude")
  const hasDelegationCategory = categories.some(
    (category) => category.name === "deep" || category.name === "unspecified-high",
  )

  if (!isNonClaude || !hasDelegationCategory) {
    return ""
  }

  return `### 分解与委派 —— 你不是实施者

**你的失败模式：你试图自己动手干活，而不是分解和委派。** 当你直接实施时，结果明显不如专业化子 Agent 做得好。子 Agent 拥有你缺乏的领域特定配置、加载的技能和调优的提示词。

**强制性 —— 适用于任何实施任务：**

1. **始终分解**任务为独立工作单元。没有例外。即使任务"感觉很小"，也要分解。
2. **始终并行委派**每个单元给 \`deep\` 或 \`unspecified-high\` agent（\`run_in_background=true\`）。
3. **绝不要串行工作。** 如果有4个独立单元，同时产生4个 Agent。不是一个接一个。也不是2个然后2个。
4. **在可以委派时绝不直接实施。** 你写提示词，不是写代码。

**你给每个 Agent 的提示词必须包含：**
- 带有明确成功标准的目标（"完成"是什么样子）
- 文件路径和约束（在哪里工作，什么不能碰）
- 要遵循的现有模式（引用 Agent 应该读取的具体文件）
- 清晰的范围边界（什么在范围内，什么在范围外）

**模糊的委派 = 失败的委派。** 如果你给子 Agent 的提示词少于5行，那太模糊了。

| 你想做的事 | 你必须改做的事 |
|---|---|
| 自己写代码 | 委派给 \`deep\` 或 \`unspecified-high\` agent |
| 顺序处理3个变更 | 并行产生3个 Agent |
| "快速修复这个小事" | 仍然委派 —— 你的"快速修复"比子 Agent 更慢更差 |

**你的价值在于编排、分解和质量控制。用极其清晰的提示词进行委派就是在做你的工作。**`
}
