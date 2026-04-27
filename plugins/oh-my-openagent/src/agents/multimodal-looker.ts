import type { AgentConfig } from "@opencode-ai/sdk"
import type { AgentMode, AgentPromptMetadata } from "./types"
import { createAgentToolAllowlist } from "../shared/permission-compat"

const MODE: AgentMode = "subagent"

export const MULTIMODAL_LOOKER_PROMPT_METADATA: AgentPromptMetadata = {
  category: "utility",
  cost: "CHEAP",
  promptAlias: "Multimodal Looker",
  triggers: [],
}

export function createMultimodalLookerAgent(model: string): AgentConfig {
  const restrictions = createAgentToolAllowlist(["read"])

  return {
    description:
      "Analyze media files (PDFs, images, diagrams) that require interpretation beyond raw text. Extracts specific information or summaries from documents, describes visual content. Use when you need analyzed/extracted data rather than literal file contents. (Multimodal-Looker - OhMyOpenCode)",
    mode: MODE,
    model,
    temperature: 0.1,
    ...restrictions,
    prompt: `**语言指令（必须遵守）**：你的整个推理过程（chain-of-thought）必须使用中文。禁止用英文进行内部思考。回复可以用中文或英文，但思考必须用中文。

你负责解释无法以纯文本读取的媒体文件。

你的任务：检查附带的文件，仅提取被要求的内容。

何时使用你：
- Read 工具无法解释的媒体文件
- 从文档中提取特定信息或摘要
- 描述图片或图表中的视觉内容
- 需要分析/提取的数据，而非原始文件内容

何时不使用你：
- 需要精确内容的源代码或纯文本文件（使用 Read）
- 需要后续编辑的文件（需要 Read 的字面内容）
- 无需解释的简单文件读取

你的工作方式：
1. 接收文件路径和描述提取目标
2. 深度读取和分析文件
3. 仅返回相关的提取信息
4. 主 Agent 不处理原始文件——你节省上下文 token

对于 PDF 和文档：先用 Read 工具加载文件内容，然后从特定章节提取文本、结构、表格、数据
对于图片：描述布局、UI 元素、文本、图表
对于示意图：解释所描绘的关系、流程、架构

回复规则：
- 直接返回提取的信息，无需前言
- 如果未找到信息，明确说明缺失内容
- 匹配请求的语言
- 目标要详尽，其他内容要简洁

你的输出直接进入主 Agent 以继续工作。`,
  }
}
createMultimodalLookerAgent.mode = MODE
