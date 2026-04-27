import type {
  AvailableAgent,
  AvailableCategory,
  AvailableSkill,
} from "./dynamic-agent-prompt-types"

export function buildHardBlocksSection(): string {
  const blocks = [
    "- Type error suppression (`as any`, `@ts-ignore`) - **Never**",
    "- Commit without explicit request - **Never**",
    "- Speculate about unread code - **Never**",
    "- Leave code in broken state after failures - **Never**",
    "- `background_cancel(all=true)` - **Never.** Always cancel individually by taskId.",
    "- Delivering final answer before collecting Oracle result - **Never.**",
  ]

  return `## 硬性禁止（绝不可违反）

${blocks.join("\n")}`
}

export function buildAntiPatternsSection(): string {
  const patterns = [
    "- **Type Safety**: `as any`, `@ts-ignore`, `@ts-expect-error`",
    "- **Error Handling**: Empty catch blocks `catch(e) {}`",
    '- **Testing**: Deleting failing tests to "pass"',
    "- **Search**: Firing agents for single-line typos or obvious syntax errors",
    "- **Debugging**: Shotgun debugging, random changes",
    "- **Background Tasks**: Polling `background_output` on running tasks - end response and wait for notification",
    "- **Delegation Duplication**: Delegating exploration to explore/librarian and then manually doing the same search yourself",
    "- **Oracle**: Delivering answer without collecting Oracle results",
  ]

  return `## 反模式（阻塞性违规）

${patterns.join("\n")}`
}

export function buildToolCallFormatSection(): string {
  return `## 工具调用格式（关键）

**始终使用原生工具调用机制。绝不要将工具调用以文本形式输出。**

当需要调用工具时：
1. 使用系统提供的工具调用接口
2. 不要以纯文本形式写工具调用，如 \`assistant to=functions.XXX\`
3. 不要在文本回复中直接输出 JSON
4. 系统会自动处理工具调用格式

**正确**：通过工具调用接口调用工具
**错误**：以文本形式写 \`assistant to=functions.todowrite\` 或 \`json\n{...}\`

你的工具调用会自动处理。只管调用工具 —— 不要自己格式化调用。`
}

export function buildUltraworkSection(
  agents: AvailableAgent[],
  categories: AvailableCategory[],
  skills: AvailableSkill[],
): string {
  const lines: string[] = []

  if (categories.length > 0) {
    lines.push("**分类**（用于实施任务）：")
    for (const category of categories) {
      const shortDescription = category.description || category.name
      lines.push(`- \`${category.name}\`: ${shortDescription}`)
    }
    lines.push("")
  }

  if (skills.length > 0) {
    const builtinSkills = skills.filter((skill) => skill.location === "plugin")
    const customSkills = skills.filter((skill) => skill.location !== "plugin")

    if (builtinSkills.length > 0) {
      lines.push("**内置技能**（可与分类组合使用）：")
      for (const skill of builtinSkills) {
        const shortDescription = skill.description.split(".")[0] || skill.description
        lines.push(`- \`${skill.name}\`: ${shortDescription}`)
      }
      lines.push("")
    }

    if (customSkills.length > 0) {
      lines.push("**用户安装的技能**（高优先级 —— 用户为其工作流程安装的）：")
      for (const skill of customSkills) {
        const shortDescription = skill.description.split(".")[0] || skill.description
        lines.push(`- \`${skill.name}\`: ${shortDescription}`)
      }
      lines.push("")
    }
  }

  if (agents.length > 0) {
    const ultraworkAgentPriority = ["explore", "librarian", "plan", "oracle"]
    const sortedAgents = [...agents].sort((left, right) => {
      const leftIndex = ultraworkAgentPriority.indexOf(left.name)
      const rightIndex = ultraworkAgentPriority.indexOf(right.name)
      if (leftIndex === -1 && rightIndex === -1) {
        return 0
      }
      if (leftIndex === -1) {
        return 1
      }
      if (rightIndex === -1) {
        return -1
      }
      return leftIndex - rightIndex
    })

    lines.push("**Agent**（用于专业咨询/探索）：")
    for (const agent of sortedAgents) {
      const shortDescription =
        agent.description.length > 120
          ? `${agent.description.slice(0, 120)}...`
          : agent.description
      const suffix =
        agent.name === "explore" || agent.name === "librarian" ? " (multiple)" : ""
      lines.push(`- \`${agent.name}${suffix}\`: ${shortDescription}`)
    }
  }

  return lines.join("\n")
}

export function buildAntiDuplicationSection(): string {
  return `<Anti_Duplication>
## 反查重规则（关键）

一旦你将探索委派给 explore/librarian agent，**不要自己再执行相同的搜索**。

### 这意味着什么：

**禁止：**
- 派出 explore/librarian 后，手动 grep/搜索相同的信息
- 重复执行 agent 刚被委派的研究工作
- "快速检查一下"后台 agent 正在检查的相同文件

**允许：**
- 继续做**不重叠的工作** —— 不依赖于已委派研究的工作
- 处理代码库中不相关的部分
- 可以独立进行的准备工作（如设置文件、配置）

### 正确等待结果：

当你需要委派的结果但还没准备好时：

1. **结束你的回复** —— 不要继续做依赖于那些结果的工作
2. **等待完成通知** —— 系统会触发你的下一轮
3. **然后**通过 \`background_output(task_id="...")\` 收集结果
4. **不要**在等待时急躁地重新搜索相同主题

### 为什么这很重要：

- **浪费 token**：重复搜索浪费你的上下文预算
- **混乱**：你可能与 agent 的发现相矛盾
- **效率**：委派的全部意义就在于并行吞吐量

### 示例：

\`\`\`typescript
// 错误做法：委派后自己重新搜索
task(subagent_type="explore", run_in_background=true, ...)
// 然后立刻自己 grep 同样的东西 —— 禁止

// 正确做法：继续不重叠的工作
task(subagent_type="explore", run_in_background=true, ...)
// 在他们搜索时处理不同的、不相关的文件
// 结束你的回复并等待通知
\`\`\`
</Anti_Duplication>`
}
