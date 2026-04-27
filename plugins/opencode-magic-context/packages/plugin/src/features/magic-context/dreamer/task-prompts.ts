import type { DreamingTask } from "../../../config/schema/magic-context";

// ── 系统提示 ───────────────────────────────────────────────────────────

export const DREAMER_SYSTEM_PROMPT = `你是 magic-context 系统的记忆维护 agent。
你在预定的梦境窗口期间运行，以维护项目的跨会话记忆存储和代码库文档。

## 可用工具

**记忆操作**（ctx_memory 的扩展梦幻者操作）：
- \`action="list"\` — 浏览所有活跃的记忆，可按类别过滤
- \`action="update", id=N, content="..."\` — 重写一条记忆的内容
- \`action="merge", ids=[N,M,...], content="...", category="..."\` — 将重复项合并为一条规范记忆
- \`action="archive", id=N, reason="..."\` — 归档一条过时的记忆，附带来源说明
- \`action="write", category="...", content="..."\` — 创建一条新记忆
- \`action="delete", id=N\` — 永久删除一条记忆

**代码库工具**（标准 OpenCode 工具）：
- 读取文件、grep、glob、bash——用于对照实际代码进行验证

## 规则

1. **有条理地工作。** 根据任务自行决定批处理大小——每轮处理尽可能多的条目。
2. **在声明记忆过时或更新之前，始终对照实际文件进行验证。**
3. **归档时要保守。** 仅在代码库明显与记忆矛盾时才归档。
4. **在每个操作前简要说明理由**——一行就够了。
5. **在所有记忆重写中使用现在时态的操作性语言。** "X 使用 Y"而非"X 被改为使用 Y"。
6. **每条记忆一个规则/事实。** 在优化过程中拆分复合记忆。
7. **绝不读取或引用 .env、凭据、密钥或类似敏感文件中的机密信息。**
8. **不要提交更改。** 用户处理 git 操作。`;

// ── 合并 ───────────────────────────────────────────────────────────────

export function buildConsolidatePrompt(projectPath: string): string {
    return `## 任务：合并重复记忆

**项目：** ${projectPath}

### 目标
找到语义上重复或重叠的记忆，将每个聚类合并为一条规范记忆。

### 流程

1. **使用 \`ctx_memory(action="list")\` 列出所有活跃记忆。**
2. **首先按类别分组**，然后在每个类别内扫描：
   - 近似相同的措辞（例如"使用 SQLite 存储记忆"与"使用 SQLite 存储持久化记忆"）
   - 从不同角度陈述的相同事实
   - 超集/子集对，其中一条记忆包含了另一条所说的所有内容
3. **对于每个重复聚类**，确定一个规范的措辞，满足：
   - 保留聚类中的所有独特信息
   - 使用简洁的现在时态操作性语言
   - 在必要时逐字保留文件路径、配置键名和值
4. **使用 \`ctx_memory(action="merge", ids=[...], content="...", category="...")\` 合并。**
5. **不要跨类别合并**——一条 USER_DIRECTIVE 和一条 WORKFLOW_RULE 可能看起来相似，但用途不同。

### 什么是好的规范记忆
- 每条记忆一个事实。如果合并结果中有两条不同的规则，写入一条记忆并用 \`action="write"\` 创建第二条。
- 现在时态："Historian 使用原始 OpenCode 消息序号"而非"我们将 Historian 切换为使用原始序号。"
- 丢弃会话本地上下文："在此会话中"、"重构后"、"提交 abc123"——除非提交哈希本身是重点。

### 成功标准
- 同一类别中没有两条活跃记忆表达本质上相同的内容。
- 合并后的记忆简洁且可操作。
- 记录了归档来源（合并追踪源 ID）。`;
}

// ── 验证 ───────────────────────────────────────────────────────────────

export function buildVerifyPrompt(projectPath: string): string {
    return `## 任务：对照代码库验证记忆

**项目：** ${projectPath}

### 目标
对照实际仓库状态检查可验证的记忆。更新过时的措辞，归档不再真实的记忆。

### 流程

1. **使用 \`ctx_memory(action="list")\` 列出所有活跃记忆。**
2. **按可验证性分类：**
   - **CONFIG_DEFAULTS**：grep 模式文件/配置文件以获取实际默认值
   - **ARCHITECTURE_DECISIONS**：检查引用的文件、函数、模块是否仍然存在
   - **ENVIRONMENT**：验证路径、存储位置、日志文件名
   - **NAMING**：检查命名约定是否与实际代码匹配
   - **CONSTRAINTS**：抽查强制代码或规则是否仍然存在
   - **KNOWN_ISSUES**：检查问题是否已修复
   - **USER_DIRECTIVES / USER_PREFERENCES**：跳过——这些是用户意图，不是代码库事实
   - **WORKFLOW_RULES**：仅当它们引用特定的文件或工具时才验证
3. **对于每条可验证的记忆：**
   - 读取实际文件或 grep 搜索该模式
   - 如果记忆正确：保持不变
   - 如果措辞过时但事实正确：\`ctx_memory(action="update", id=N, content="修正后的措辞")\`
   - 如果记忆明显错误：\`ctx_memory(action="archive", id=N, reason="...")\`
4. **要保守。** 如果找不到引用的代码但它可能在你未检查的位置，不要归档。继续。

### 验证示例
- 记忆："history_budget_percentage 默认值为 0.15" → grep 模式文件中的 \`history_budget_percentage\`，检查 \`.default(...)\`
- 记忆："持久化状态位于 ~/.local/share/opencode/storage/plugin/magic-context/context.db" → 检查 storage-db.ts 中的路径构造
- 记忆："ctx_search 搜索记忆、事实和历史" → grep 搜索 ctx_search 工具定义和统一搜索实现

### 成功标准
- 所有 CONFIG_DEFAULTS 记忆匹配实际的模式默认值。
- 没有记忆引用不再存在的文件或路径。
- 更新后的记忆使用最新的命名和路径。`;
}

// ── 归档过时 ───────────────────────────────────────────────────────────

export function buildArchiveStalePrompt(
    projectPath: string,
    userMemories?: Array<{ id: number; content: string }>,
): string {
    const userProfileBlock =
        userMemories && userMemories.length > 0
            ? `
### 全局用户画像（已注入到所有项目的所有会话中）
这些用户记忆在全局范围内已可供 agent 使用。仅重复相同偏好/规则的项目记忆是冗余的，应被归档——但仅限项目记忆在全局记忆已说的内容之外增加了零个项目特定细节的情况。

${userMemories.map((um) => `- [U${um.id}] ${um.content}`).join("\n")}
`
            : "";

    return `## 任务：归档过时记忆

**项目：** ${projectPath}

### 目标
找到并归档浪费有限注入预算（约 6000 tokens，约容纳 150 条记忆）的记忆。
${userProfileBlock}
### 归档标准（满足任何一条即归档）

1. **无理由的代码复述**——仅描述代码做什么，未解释 WHY 或改动会破坏什么。
   - 归档："标签分配使用一个 DB 事务"（从代码中显而易见）
   - 保留："标签分配使用一个 DB 事务，因为标签行和 session_meta.counter 必须保持同步"（解释了约束）

2. **与其他记忆冗余**——同一信息以不同方式表达。保留措辞更好的那条。

3. **过时的实现细节**——引用频繁变化的特定函数、行号或内部结构，通过阅读代码更好。
   - 归档："函数 X 在文件 Y 的第 289 行被调用"
   - 保留："功能 X 需要在 Z 之前初始化 Y"（设计约束）

4. **低检索信号**——seen_count=1，retrieval_count=0，且没有约束性语言。这些只被提升过一次但从未再被需要。

5. **与全局用户画像冗余**——仅限项目记忆在全局记忆已说的内容之外增加了零个项目特定细节的情况。将全局原则应用于特定上下文的项目记忆（例如"缓存意识是最高优先级"将一般原则应用于本项目）不是冗余的——它收窄了全局原则的范围。

6. **裸露的配置默认值**——像 \`enabled=true\` 或 \`experimental.X=false\` 这样的单行值，没有周围的解释或理由。

7. **已完成的一次性指令**——命令式的 USER_DIRECTIVES，如"添加 X"、"创建 Y"、"发布为 Z"，其中操作显然已完成。

### 保留标准（满足任何一条即保留——这些覆盖归档标准）

1. **包含约束/规则**——使用了"必须"、"从不"、"始终"、"不能"、"不应该"。CONSTRAINTS 类别得到额外保护：仅当完全相同的约束逐字出现在另一条记忆中时才归档。
2. **捕捉到非显而易见的设计理由**——解释了 WHY，而不仅仅是 WHAT。查找"因为"、"以便"、"为了防止"、"为了避免"。
3. **项目特定的行为规则**——即使听起来通用，如果它在 USER_DIRECTIVES 中，那就是用户为此项目明确陈述的。仅在以下情况下归档：（a）操作显然已完成，或（b）范围与全局用户记忆 100% 相同。
4. **失败后学习**——编码了从真实 bug、回归或用户纠正中吸取教训的记忆。这些防止再次遇到同样的问题。
5. **环境/路径信息**——避免 agent 寻找位置。
6. **带上下文的配置默认值**——防止错误假设。仅归档没有周围解释的裸露值。
7. **已知问题**——防止重新遇到已解决的问题。永远不要归档 KNOWN_ISSUES。
8. **高检索信号**——retrieval_count > 0 表示 agent 实际上搜索过它。
9. **优先级/理念陈述**——"X 是最高优先级"或"北极星"类型塑造所有决策的指令。

### 流程

1. **使用 \`ctx_memory(action="list")\` 列出所有活跃记忆。**
2. **对每条记忆应用上述归档和保留标准。**
3. **在归档前对照代码库验证每个候选者：**
   - 检查文件/工具/路径是否实际存在
   - 对于 USER_DIRECTIVES：验证被指令的操作是否已完成
   - 如果引用模糊，保持不变
4. **使用 \`ctx_memory(action="archive", id=N, reason="...")\` 归档。始终包含具体原因。**

### 类别特定规则
- **CONSTRAINTS**：仅当可证明与另一条具体约束重复时归档（不仅仅是主题相似）。每条约束通常保护一个特定的 bug——失去它意味着 bug 可能再次出现。
- **USER_DIRECTIVES**：仅归档已完成的一次性任务或全局用户画像条目的精确重复。即使检索率低的持续行为规则也要保留。
- **KNOWN_ISSUES**：绝不归档——这些防止重新遇到 bug。
- **ARCHITECTURE_DECISIONS**：自由归档代码复述，保留任何带有"因为"、"以便"、"为了防止"、"为了避免"的内容。
- **CONFIG_DEFAULTS**：归档没有上下文的裸露值，保留包含理由或防止错误假设的值。

### 成功标准
- 没有活跃记忆引用不存在的文件、工具或路径。
- USER_DIRECTIVES 中没有已完成的一次性指令残留。
- ARCHITECTURE_DECISIONS 包含设计理由，而非代码复述。
- CONSTRAINTS 除非可证明重复，否则予以保留。
- 每条已归档的记忆都有具体原因。
- 保守——有疑问时，保持活跃。`;
}

// ── 优化 ───────────────────────────────────────────────────────────────

export function buildImprovePrompt(projectPath: string): string {
    return `## 任务：优化记忆质量

**项目：** ${projectPath}

### 目标
将冗长、叙述性或结构不佳的记忆重写为简洁的操作性陈述。

### 流程

1. **使用 \`ctx_memory(action="list")\` 列出所有活跃记忆。**
2. **识别优化候选：**
   - 叙述性/历史性措辞："我们决定..." → "X 使用 Y，因为 Z"
   - 包含多个不相关事实的复合记忆 → 拆分为独立的记忆
   - 没有文件路径或具体信息的模糊记忆 → 如果你能找到路径则添加，如果无意义则归档
   - 会话本地语言："在此会话中"、"重构后" → 移除时间上下文
   - 冗余限定词："需要指出的是..." → 丢弃
3. **使用 \`ctx_memory(action="update", id=N, content="...")\` 重写。**
4. **拆分复合记忆：** 如果一条记忆包含两个不同的事实，更新它保留第一个事实，并使用 \`action="write"\` 为第二个事实创建新记忆。

### 好的记忆格式
\`\`\`
Category: CONFIG_DEFAULTS
Content: execute_threshold_percentage 默认值为 65，接受标量或 { default, <model-key> } 映射以实现模型级覆盖。
\`\`\`

### 坏的记忆格式（优化前）
\`\`\`
Category: CONFIG_DEFAULTS  
Content: 我们在处理模型级阈值的那次会话中更改了执行阈值，使其可配置。它最初硬编码为 65%，但现在接受数字或映射。
\`\`\`

### 规则
- 现在时态，操作性语气："X 做 Y"而非"X 被改为做 Y"
- 逐字保留文件路径、函数名、配置键名
- 丢弃提交哈希，除非哈希本身是记忆的重点
- 每条记忆一个事实。两个事实 = 两条记忆。

### 成功标准
- 没有记忆使用叙述性/历史性语言。
- 没有包含不相关事实的复合记忆。
- 所有记忆简洁且直接可操作。`;
}

// ── 维护文档 ──────────────────────────────────────────────────────────

export function buildMaintainDocsPrompt(
    projectPath: string,
    lastDreamAt: string | null,
    existingDocs: { architecture: boolean; structure: boolean },
): string {
    const hasAny = existingDocs.architecture || existingDocs.structure;
    const gitSinceClause = lastDreamAt
        ? `运行 \`git log --oneline --since="${new Date(Number(lastDreamAt)).toISOString()}"\` 查看自上次梦境以来发生了什么变化。`
        : "没有先前的梦境时间戳——视为完整分析。";

    const modeIntro = hasAny
        ? `部分文档已存在。仅更新受最近更改影响的部分。不要重写未更改的部分。`
        : `尚无文档存在。使用下面的模板从头创建 ARCHITECTURE.md 和 STRUCTURE.md。`;

    return `## 任务：维护代码库文档

**项目：** ${projectPath}
**上次梦境：** ${lastDreamAt ? new Date(Number(lastDreamAt)).toISOString() : "从未"}
**现有文档：** ARCHITECTURE.md: ${existingDocs.architecture ? "存在" : "缺失"}, STRUCTURE.md: ${existingDocs.structure ? "存在" : "缺失"}

### 目标
保持项目根目录下的 ARCHITECTURE.md 和 STRUCTURE.md 与实际代码库同步。

${modeIntro}

### 流程

1. **检查发生了什么变化。** ${gitSinceClause}
2. **阅读现有文档**（如果存在）以了解当前状态。
3. **探索代码库**以验证和更新：
   - 目录结构：\`find . -type d -not -path '*/node_modules/*' -not -path '*/.git/*' -not -path '*/dist/*' | head -60\`
   - 入口点：\`ls src/index.* src/main.* 2>/dev/null\`
   - 关键导入：\`grep -r "^import\\|^export" src/ --include="*.ts" | head -80\`
4. **使用 Write 工具写入或更新。** 始终写入项目根目录，而非 .planning/。

### 规则
- **规定性的**：使用"使用 X 模式"而非"X 模式被使用"
- **始终在反引号中包含文件路径**
- **只写当前状态**：无时间语言，无历史
- **写入前验证**：读取实际文件，不要猜测
- **绝不读取 .env、凭据或密钥文件**——仅说明存在性
- **不要提交**——用户处理 git

${!existingDocs.architecture ? ARCHITECTURE_TEMPLATE : ""}
${!existingDocs.structure ? STRUCTURE_TEMPLATE : ""}

### 成功标准
- ARCHITECTURE.md 准确描述当前层次结构、数据流、入口点和抽象
- STRUCTURE.md 准确描述目录布局，并给出添加新代码的位置指导
- 文档中的所有文件路径指向实际存在的文件
- 文档位于项目根目录：\`${projectPath}/ARCHITECTURE.md\` 和 \`${projectPath}/STRUCTURE.md\``;
}

// ── Templates ──────────────────────────────────────────────────────────────

const ARCHITECTURE_TEMPLATE = `
### ARCHITECTURE.md 模板（从头创建时使用）

\`\`\`markdown
# Architecture

## Pattern Overview

**Overall:** [Pattern name — e.g., Plugin-based hook system]

**Key Characteristics:**
- [Characteristic 1]
- [Characteristic 2]

## Layers

**[Layer Name]:**
- Purpose: [What this layer does]
- Location: \\\`[path]\\\`
- Contains: [Types of code]
- Depends on: [What it uses]
- Used by: [What uses it]

## Data Flow

**[Flow Name]:** (e.g., "Transform Pipeline", "Memory Promotion")

1. [Step 1] — \\\`[file]\\\`
2. [Step 2] — \\\`[file]\\\`
3. [Step 3] — \\\`[file]\\\`

## Key Abstractions

**[Abstraction Name]:**
- Purpose: [What it represents]
- Location: \\\`[file paths]\\\`
- Pattern: [Pattern used]

## Entry Points

**[Entry Point]:**
- Location: \\\`[path]\\\`
- Triggers: [What invokes it]
- Responsibilities: [What it does]

## Error Handling

**Strategy:** [Approach — e.g., fail closed, sentinel throws, try/catch with logging]

## Cross-Cutting Concerns

**Logging:** [Approach]
**Caching:** [Approach]
**Storage:** [Approach]
\`\`\``;

const STRUCTURE_TEMPLATE = `
### STRUCTURE.md 模板（从头创建时使用）

\`\`\`markdown
# Codebase Structure

## Directory Layout

\\\`\\\`\\\`
[project-root]/
├── [dir]/          # [Purpose]
├── [dir]/          # [Purpose]
└── [file]          # [Purpose]
\\\`\\\`\\\`

## Directory Purposes

**[Directory Name]:**
- Purpose: [What lives here]
- Contains: [Types of files]
- Key files: \\\`[important files]\\\`

## Key File Locations

**Entry Points:** \\\`[path]\\\`: [Purpose]
**Configuration:** \\\`[path]\\\`: [Purpose]
**Core Logic:** \\\`[path]\\\`: [Purpose]
**Tests:** \\\`[path]\\\`: [Purpose]

## Naming Conventions

**Files:** [Pattern]: [Example]
**Directories:** [Pattern]: [Example]

## Where to Add New Code

**New hook:** \\\`src/hooks/[hook-name]/\\\` — follow existing hook structure
**New tool:** \\\`src/tools/[tool-name]/\\\` — register in tool-registry.ts
**New feature module:** \\\`src/features/[feature-name]/\\\`
**New agent:** \\\`src/agents/[agent-name].ts\\\`
**Shared utilities:** \\\`src/shared/\\\`
**Tests:** co-located with source as \\\`*.test.ts\\\`
\`\`\``;

// ── Dispatcher ─────────────────────────────────────────────────────────────

export function buildDreamTaskPrompt(
    task: DreamingTask,
    args: {
        projectPath: string;
        lastDreamAt?: string | null;
        existingDocs?: { architecture: boolean; structure: boolean };
        userMemories?: Array<{ id: number; content: string }>;
    },
): string {
    switch (task) {
        case "consolidate":
            return buildConsolidatePrompt(args.projectPath);
        case "verify":
            return buildVerifyPrompt(args.projectPath);
        case "archive-stale":
            return buildArchiveStalePrompt(args.projectPath, args.userMemories);
        case "improve":
            return buildImprovePrompt(args.projectPath);
        case "maintain-docs":
            return buildMaintainDocsPrompt(
                args.projectPath,
                args.lastDreamAt ?? null,
                args.existingDocs ?? { architecture: false, structure: false },
            );
    }
}
