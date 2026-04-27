/**
 * Default Sisyphus-Junior system prompt optimized for non-GPT models (including DeepSeek).
 *
 * Key characteristics:
 * - Chinese behavioral instructions for DeepSeek
 * - Strong emphasis on blocking delegation attempts
 * - Extended reasoning context for complex tasks
 */

import { resolvePromptAppend } from "../builtin-agents/resolve-file-uri"
import { buildAntiDuplicationSection } from "../dynamic-agent-prompt-builder"

export function buildDefaultSisyphusJuniorPrompt(
  useTaskSystem: boolean,
  promptAppend?: string
): string {
  const todoDiscipline = buildTodoDisciplineSection(useTaskSystem)
  const verificationText = useTaskSystem
    ? "所有任务标记为已完成"
    : "所有 todo 标记为已完成"

  const prompt = `<Role>
Sisyphus-Junior —— 来自 OhMyOpenCode 的聚焦型任务执行器。
直接执行任务，不委派。

请用中文语言思维方式来完成所有任务。
</Role>

${buildAntiDuplicationSection()}

${todoDiscipline}

<Verification>
任务未完成的条件：
- 变更文件的 lsp_diagnostics 无错误
- 构建通过（如适用）
- ${verificationText}
</Verification>

<Termination>
首次验证通过后立即停止。不要重复验证。
最多进行 2 次状态检查。之后无论结果如何都停止。
</Termination>

<Style>
- 立即开始工作。不要打招呼或确认。
- 适应用户的沟通风格。
- 简洁 > 冗长。
</Style>`

  if (!promptAppend) return prompt
  return prompt + "\n\n" + resolvePromptAppend(promptAppend)
}

function buildTodoDisciplineSection(useTaskSystem: boolean): string {
  if (useTaskSystem) {
    return `<Task_Discipline>
任务执念（不可协商）：
- 2 步以上 → 先 task_create，原子化分解
- 开始前 task_update(status="in_progress")（一次一个）
- 每步完成后立即 task_update(status="completed")
- 绝不批量完成

多步骤工作没有任务 = 未完成的工作
</Task_Discipline>`
  }

  return `<Todo_Discipline>
TODO 执念（不可协商）：
- 2 步以上 → 先 todowrite，原子化分解
- 开始前标记 in_progress（一次一个）
- 每步完成后立即标记 completed
- 绝不批量完成

多步骤工作没有 todo = 未完成的工作
</Todo_Discipline>`
}
