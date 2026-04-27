import type {
  AvailableCategory,
  AvailableSkill,
} from "./dynamic-agent-prompt-types"

function buildSkillsSection(skills: AvailableSkill[]): string {
  const builtinSkills = skills.filter((skill) => skill.location === "plugin")
  const customSkills = skills.filter((skill) => skill.location !== "plugin")

  const builtinNames = builtinSkills.map((skill) => skill.name).join(", ")
  const customNames = customSkills
    .map((skill) => {
      const source = skill.location === "project" ? "project" : "user"
      return `${skill.name} (${source})`
    })
    .join(", ")

  if (customSkills.length > 0 && builtinSkills.length > 0) {
    return `#### 可用技能（通过 \`skill\` 工具）

**内置**: ${builtinNames}
**⚡ 你的技能（高优先级）**: ${customNames}

> 用户安装的技能覆盖内置默认值。领域匹配时始终优先使用你的技能。
> 完整技能描述 → 每次委派前使用 \`skill\` 工具检查。`
  }

  if (customSkills.length > 0) {
    return `#### 可用技能（通过 \`skill\` 工具）

**⚡ 你的技能（高优先级）**: ${customNames}

> 用户安装的技能覆盖内置默认值。领域匹配时始终优先使用你的技能。
> 完整技能描述 → 每次委派前使用 \`skill\` 工具检查。`
  }

  if (builtinSkills.length > 0) {
    return `#### 可用技能（通过 \`skill\` 工具）

**内置**: ${builtinNames}

> 完整技能描述 → 每次委派前使用 \`skill\` 工具检查。`
  }

  return ""
}

export function buildCategorySkillsDelegationGuide(
  categories: AvailableCategory[],
  skills: AvailableSkill[],
): string {
  if (categories.length === 0 && skills.length === 0) {
    return ""
  }

  const categoryRows = categories.map((category) => {
    const description = category.description || category.name
    return `- \`${category.name}\` - ${description}`
  })

  const customSkills = skills.filter((skill) => skill.location !== "plugin")
  const skillsSection = buildSkillsSection(skills)
  const customPriorityNote =
    customSkills.length > 0
      ? `
> **User-installed skills get PRIORITY.** When in doubt, INCLUDE rather than omit.`
      : ""

  return `### Category + Skills 委派系统

**task() 将分类与技能结合以实现最佳任务执行。**

#### 可用分类（领域优化模型）

每个分类都配置了针对该领域优化的模型。阅读描述以了解何时使用。

${categoryRows.join("\n")}

${skillsSection}

---

### 强制性：分类 + 技能选择协议

**第1步：选择分类**
- 阅读每个分类的描述
- 将任务需求匹配到分类领域
- 选择领域**最适合**该任务的分类

**第2步：评估所有技能**
使用 \`skill\` 工具检查可用技能及其描述。对每个技能问：
> "这个技能的专业领域与我的任务重叠吗？"

- 是 → 包含在 \`load_skills=[...]\` 中
- 否 → 省略（无需解释）${customPriorityNote}

---

### 委派模式

\`\`\`typescript
task(
  category="[selected-category]",
  load_skills=["skill-1", "skill-2"],  // 包含所有相关技能 —— 特别是用户安装的技能
  prompt="..."
)
\`\`\`

**反模式（会产生差的结果）：**
\`\`\`typescript
task(category="...", load_skills=[], run_in_background=false, prompt="...")  // 空的 load_skills 且无理由
\`\`\`

---

### 分类领域匹配（零容忍）

每次委派必须使用与该任务领域匹配的分类。不匹配的分类会产生明显更差的输出，因为每个分类运行在针对该特定领域优化的模型上。

**可视化工作 = 始终用 \`visual-engineering\`。没有例外。**

任何涉及 UI、UX、CSS、样式、布局、动画、设计或前端的任务必须使用 \`visual-engineering\`。永远不要将可视化工作委派给 \`quick\`、\`unspecified-*\` 或其他任何分类。

\`\`\`typescript
// 正确：可视化工作 → visual-engineering 分类
task(category="visual-engineering", load_skills=["frontend-ui-ux"], prompt="用新的间距重新设计侧边栏布局...")

// 错误：可视化工作在错误的分类中 —— 会产生较差的结果
task(category="quick", load_skills=[], prompt="用新的间距重新设计侧边栏布局...")
\`\`\`

| 任务领域 | 必须使用的分类 |
|---|---|
| UI、样式、动画、布局、设计 | \`visual-engineering\` |
| 硬逻辑、架构决策、算法 | \`ultrabrain\` |
| 自主研究 + 端到端实施 | \`deep\` |
| 单文件 typo、琐碎配置变更 | \`quick\` |

**当不确定分类时，几乎从来不是 \`quick\` 或 \`unspecified-*\`。匹配领域。**`
}
