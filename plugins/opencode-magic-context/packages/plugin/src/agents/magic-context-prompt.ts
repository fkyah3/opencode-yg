/**
 * Per-agent magic context system prompt sections.
 * Each agent gets tailored guidance based on its workflow patterns.
 */

type AgentType =
    | "sisyphus"
    | "atlas"
    | "hephaestus"
    | "sisyphus-junior"
    | "oracle"
    | "athena"
    | "athena-junior";

function getToolHistoryGuidance(dropToolStructure: boolean): string {
    if (dropToolStructure) {
        return `压缩后的历史记录会省略工具调用及其输出——像"我编辑了文件 X"这样的总结是历史学家的记录，不是需要复制的模式。在实时对话中，较旧的工具调用及其结果会被清理以节省上下文——你可能会看到自己的旧消息引用了某个操作，但对应的工具调用或结果已不可见。这是正常的上下文管理。始终使用真实的工具调用；绝不要在文本中模拟、编造或内联工具输出。如果没有工具结果消息，说明该操作没有发生。绝不要模拟、幻觉或声称工具调用、命令输出、搜索结果、文件编辑或差异（diff），仿佛它们真的发生过一样。`;
    }

    return `对话中较旧的工具调用显示截断的输入和[截断]的输出——这是正常的上下文管理，不是需要遵循的模式。原始工具调用成功执行了完整输入并产生了真实输出，它们后来被清理以节省上下文。始终使用具有完整参数的真正工具调用；不要将诸如"filePa...[truncated]"之类的截断模式复制到你的工具输入中。如果你需要重新读取文件或重新运行命令，请进行全新的工具调用。`;
}

const BASE_INTRO = (
    protectedTags: number,
    dropToolStructure: boolean,
): string => `消息和工具输出带有 §N§ 标识符（例如 §1§、§42§）。
使用 \`ctx_reduce\` 管理上下文大小。它支持一种操作：
- \`drop\`：完全移除（最适合你已经处理过的工具输出）。
语法："3-5"、"1,2,9" 或 "1-5,8,12-15"。最后 ${protectedTags} 个标签受保护。
使用 \`ctx_note\` 记录推迟的意图——稍后处理的事情，不是现在。不用于任务追踪（使用 todos）。笔记会在上下文压缩后保留，并在自然的工作边界（提交后、历史学家运行后、todo 完成后）提醒你。
使用 \`ctx_memory\` 管理跨会话的项目记忆。可以写入新记忆或删除旧记忆。记忆跨会话持久存在，并自动注入到新会话中。
**主动保存到记忆**：如果你花了多个轮次才找到某样东西（文件路径、数据库位置、配置模式、解决方案），用 \`ctx_memory\` 保存它，这样以后的会话就不需要重复搜索。示例：
- 搜索找到项目源代码路径 → \`ctx_memory(action="write", category="ENVIRONMENT", content="OpenCode source is at ~/Work/OSS/opencode")\`
- 发现非显而易见的构建/测试命令 → \`ctx_memory(action="write", category="WORKFLOW_RULES", content="Always use scripts/release.sh for releases")\`
- 吃了亏才学到的约束 → \`ctx_memory(action="write", category="CONSTRAINTS", content="Dashboard Tauri build needs RGBA PNGs, not grayscale")\`
使用 \`ctx_search\` 通过一次查询搜索项目记忆、会话事实和对话历史。
使用 \`ctx_expand\` 解压某个压缩区范围以查看原始对话记录。使用来自 \`<compartment start=N end=M>\` 属性的 \`start\`/\`end\`。返回压缩后的 U:/A: 记录，限制约 15K tokens。
**先搜索再问用户**：如果你记不起或不知道某些可能已经讨论过或存储在项目记忆中的内容，先使用 \`ctx_search\` 再询问用户。示例：
- 不记得相关代码库或依赖的位置 → \`ctx_search(query="opencode source code path")\`
- 忘记了之前的架构决策或约束 → \`ctx_search(query="why did we choose SQLite over postgres")\`
- 需要配置值、API 密钥位置或环境细节 → \`ctx_search(query="embedding provider configuration")\`
- 想了解某件事之前是如何实现的 → \`ctx_search(query="how does the dreamer lease work")\`
- 想要回想早期的对话中决定了什么 → \`ctx_search(query="dashboard release signing setup")\`
\`ctx_search\` 从记忆、会话事实和原始消息历史中返回排序的结果。使用结果中的消息序号与 \`ctx_expand\` 一起获取周围的对话上下文。
${getToolHistoryGuidance(dropToolStructure)}
绝不盲目丢弃大范围（例如 "1-50"）。在决定前审查每个标签。
绝不丢弃用户消息——它们简短且会被自动压缩概括。丢弃它们会丢失历史学家需要的上下文。
绝不丢弃助手文本消息，除非它们异常庞大。你的对话消息很轻量；只有大型工具输出才值得丢弃。
在每次轮次结束前，考虑使用 \`ctx_reduce\` 丢弃你不再需要的大型工具输出。`;

/** Intro when ctx_reduce is disabled — no drop guidance, no ctx_reduce references. */
const BASE_INTRO_NO_REDUCE = (
    dropToolStructure: boolean,
): string => `消息和工具输出带有 §N§ 标识符（例如 §1§、§42§）。
使用 \`ctx_note\` 记录推迟的意图——稍后处理的事情，不是现在。不用于任务追踪（使用 todos）。笔记会在上下文压缩后保留，并在自然的工作边界（提交后、历史学家运行后、todo 完成后）提醒你。
使用 \`ctx_memory\` 管理跨会话的项目记忆。可以写入新记忆或删除旧记忆。记忆跨会话持久存在，并自动注入到新会话中。
**主动保存到记忆**：如果你花了多个轮次才找到某样东西（文件路径、数据库位置、配置模式、解决方案），用 \`ctx_memory\` 保存它，这样以后的会话就不需要重复搜索。示例：
- 搜索找到项目源代码路径 → \`ctx_memory(action="write", category="ENVIRONMENT", content="OpenCode source is at ~/Work/OSS/opencode")\`
- 发现非显而易见的构建/测试命令 → \`ctx_memory(action="write", category="WORKFLOW_RULES", content="Always use scripts/release.sh for releases")\`
- 吃了亏才学到的约束 → \`ctx_memory(action="write", category="CONSTRAINTS", content="Dashboard Tauri build needs RGBA PNGs, not grayscale")\`
使用 \`ctx_search\` 通过一次查询搜索项目记忆、会话事实和对话历史。
使用 \`ctx_expand\` 解压某个压缩区范围以查看原始对话记录。使用来自 \`<compartment start=N end=M>\` 属性的 \`start\`/\`end\`。返回压缩后的 U:/A: 记录，限制约 15K tokens。
**先搜索再问用户**：如果你记不起或不知道某些可能已经讨论过或存储在项目记忆中的内容，先使用 \`ctx_search\` 再询问用户。示例：
- 不记得相关代码库或依赖的位置 → \`ctx_search(query="opencode source code path")\`
- 忘记了之前的架构决策或约束 → \`ctx_search(query="why did we choose SQLite over postgres")\`
- 需要配置值、API 密钥位置或环境细节 → \`ctx_search(query="embedding provider configuration")\`
- 想了解某件事之前是如何实现的 → \`ctx_search(query="how does the dreamer lease work")\`
- 想要回想早期的对话中决定了什么 → \`ctx_search(query="dashboard release signing setup")\`
\`ctx_search\` 从记忆、会话事实和原始消息历史中返回排序的结果。使用结果中的消息序号与 \`ctx_expand\` 一起获取周围的对话上下文。
${getToolHistoryGuidance(dropToolStructure)}`;

const SISYPHUS_SECTION = `
### 缩减触发时机
- 收集后台 agent 结果（explore/librarian）后——提取所需内容后丢弃原始输出。
- 委派结果验证后——丢弃完整的 agent 输出，保留你的验证摘要。
- 完成一个 todo 阶段后——丢弃该阶段的工具输出。

### 应该丢弃的内容
- 综合后的大型 explore/librarian 工具输出。
- 验证后的大型后台任务输出。
- 已经处理过的大型文件读取和 grep 结果。

### 应该保留的内容
- 所有用户消息和助手对话文本——它们轻量且会自动压缩。
- 当前的 todo 列表和活跃的任务上下文。
- 最近的错误和未解决的决策。`;

const ATLAS_SECTION = `
### 缩减触发时机（关键——你的会话很长）
- 每个 wave/phase 完成后——在开始下一个 wave 前缩减。这是你最重要的缩减点。
- 委派结果验证后——完整的输出不再需要。
- 主要上下文切换之间——当转移到新的任务区域时。

### 应该丢弃的内容
- 已完成 wave 的大型委派工具输出。
- 已通过检查的大型验证结果。
- 已完成任务的大型文件读取和测试输出。

### 应该保留的内容
- 所有用户消息和助手对话文本——它们轻量且会自动压缩。
- 工作计划和当前 wave/phase 状态。
- 未完成的 todo 及它们的上下文。
- 需要重试的最近失败。`;

const HEPHAESTUS_SECTION = `
### 缩减触发时机
- 处理文件读取后——你已经将内容用于实现了。
- grep/搜索结果消耗后——找到所需内容后丢弃原始输出。
- 测试运行分析后——只保留通过/失败结果，丢弃原始输出。
- 逻辑实现步骤之间。

### 应该丢弃的内容
- 编辑文件后的大型文件读取（你的编辑已反映当前状态）。
- 确定所需内容后的大型 grep/搜索结果。
- 修复问题后的大型构建/测试输出。
- 修复应用后的旧 LSP 诊断。

### 应该保留的内容
- 所有用户消息和助手对话文本——它们轻量且会自动压缩。
- 当前正在编辑的文件及其最近状态。
- 活跃的错误和失败的测试。
- 来自 prompt 的任务要求和约束。`;

const SISYPHUS_JUNIOR_SECTION = `
### 缩减触发时机
- 用于实现的文件读取后——对内容进行操作后丢弃。
- 搜索结果处理后——丢弃原始的 grep/glob 输出。
- 每个逻辑实现步骤完成后。

### 应该丢弃的内容
- 已经处理过的大型工具输出（文件读取、grep、构建日志）。
- 绝不要丢弃你的任务 prompt 或初始需求。

### 应该保留的内容
- 所有用户消息和助手对话文本——它们轻量且会自动压缩。
- 你的任务需求（初始 prompt）。
- 当前的实现上下文和最近的编辑。
- 最近的错误和测试结果。`;

const ORACLE_SECTION = `
### 缩减触发时机
- 完成一轮代码库审查后——形成建议后丢弃原始读取。
- 比较多个选项后——只保留决定性的证据。
- 在同一次咨询中的不同调查之间。

### 应该丢弃的内容
- 已纳入结论的大型文件读取和搜索结果。
- 综合后的大型后台 agent 输出。

### 应该保留的内容
- 所有用户消息和助手对话文本——它们轻量且会自动压缩。
- 用户的问题和你的当前建议。
- 直接支持建议的关键证据。
- 仍在评估中的未解决权衡或风险。`;

const ATHENA_SECTION = `
### 缩减触发时机
- 议会综合完成后——丢弃个别议会成员的输出。
- 用户接受/拒绝议会建议后——丢弃审议内容。
- 不同主题的议会调用之间。

### 应该丢弃的内容
- 综合后的大型个别议会成员回复输出。
- 用于构建议会问题的大型原始浏览输出。

### 应该保留的内容
- 所有用户消息和助手对话文本——它们轻量且会自动压缩。
- 当前的议会主题和活跃的审议。
- 用户的原始问题和约束。
- 来自之前议会的最终决策和行动项。`;

const GENERIC_SECTION = `
### 缩减触发时机
- 处理过的文件读取或搜索结果已使用——丢弃原始输出。
- 完成一个逻辑步骤后——丢弃该步骤的中间输出。
- 主要上下文切换之间——当转移到新的任务区域时。

### 应该丢弃的内容
- 已经使用过的大型文件读取、grep 结果和工具输出。
- 分析并处理后的大型构建/测试输出。
- 不再相关的旧诊断或浏览结果。

### 应该保留的内容
- 所有用户消息和助手对话文本——它们轻量且会自动压缩。
- 你当前的任务需求和约束。
- 最近的错误和未解决的决策。
- 活跃的工作上下文和正在编辑的文件。`;

const AGENT_SECTIONS: Record<AgentType, string> = {
    sisyphus: SISYPHUS_SECTION,
    atlas: ATLAS_SECTION,
    hephaestus: HEPHAESTUS_SECTION,
    oracle: ORACLE_SECTION,
    "sisyphus-junior": SISYPHUS_JUNIOR_SECTION,
    athena: ATHENA_SECTION,
    "athena-junior": ATHENA_SECTION,
};

/** Signature strings used to detect known agents from system prompt content.
 *  Order matters — more specific signatures are checked first.
 *  IMPORTANT: signatures must be unique to each agent's OWN prompt, not strings
 *  that appear in other agents' delegation tables (e.g., "athena-junior" appears
 *  in every agent's delegation list and must NOT be used as a signature). */
const AGENT_SIGNATURES: [AgentType, string][] = [
    ["athena-junior", "Athena in non-interactive mode"],
    ["sisyphus-junior", "Sisyphus-Junior"],
    ["sisyphus", '"Sisyphus"'],
    ["atlas", "You are Atlas"],
    ["hephaestus", "You are Hephaestus"],
    ["oracle", "strategic technical advisor"],
    ["athena", "You are Athena"],
];

/**
 * Detect which agent is active by scanning the system prompt for known signatures.
 * Returns the detected agent type or null for unknown agents.
 * Order matters — more specific signatures (e.g., "Sisyphus-Junior") are checked first.
 */
export function detectAgentFromSystemPrompt(systemPrompt: string): AgentType | null {
    for (const [agent, signature] of AGENT_SIGNATURES) {
        if (systemPrompt.includes(signature)) {
            return agent;
        }
    }
    return null;
}

const TEMPORAL_AWARENESS_GUIDANCE = `\n**时间感知**：用户消息可能以 HTML 注释开头，如 \`<!-- +12m -->\`、\`<!-- +2h 15m -->\` 或 \`<!-- +3d 4h -->\`，表示自前一条消息完成以来经过的时间。\`<session-history>\` 中的压缩区携带 \`start-date\` 和 \`end-date\` 属性（YYYY-MM-DD），显示实时边界。在推理工作流节奏、日志持续时间、构建时间或某事发生多久之前时使用这些信息。`;

export function buildMagicContextSection(
    agent: AgentType | null,
    protectedTags: number,
    ctxReduceEnabled = true,
    dreamerEnabled = false,
    dropToolStructure = true,
    temporalAwarenessEnabled = false,
): string {
    const smartNoteGuidance = dreamerEnabled
        ? `\n当为 \`write\` 提供 \`surface_condition\` 时，该笔记成为项目范围的智能笔记。\n梦幻者在夜间运行时评估智能笔记的条件，并在条件满足时将其激活。\n示例：\`ctx_note(action="write", content="Implement X because Y", surface_condition="When PR #42 is merged in this repo")\``
        : "";
    const temporalGuidance = temporalAwarenessEnabled ? TEMPORAL_AWARENESS_GUIDANCE : "";

    if (!ctxReduceEnabled) {
        return `## Magic Context\n\n${BASE_INTRO_NO_REDUCE(dropToolStructure)}${smartNoteGuidance}${temporalGuidance}`;
    }
    const section = agent ? AGENT_SECTIONS[agent] : GENERIC_SECTION;
    return `## Magic Context\n\n${BASE_INTRO(protectedTags, dropToolStructure)}${smartNoteGuidance}${temporalGuidance}\n${section}\n\n优先使用多次小范围操作而非一次大范围操作。尽早并经常压缩——不要等待警告。`;
}