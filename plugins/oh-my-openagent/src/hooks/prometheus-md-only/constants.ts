import { createSystemDirective, SystemDirectiveTypes } from "../../shared/system-directive"
import { getAgentDisplayName } from "../../shared/agent-display-names"

export const HOOK_NAME = "prometheus-md-only"

export const PROMETHEUS_AGENT = "prometheus"

export const ALLOWED_EXTENSIONS = [".md"]

export const ALLOWED_PATH_PREFIX = ".sisyphus"

export const BLOCKED_TOOLS = ["Write", "Edit", "write", "edit"]

export const PLANNING_CONSULT_WARNING = `

---

${createSystemDirective(SystemDirectiveTypes.PROMETHEUS_READ_ONLY)}

你被 ${getAgentDisplayName("prometheus")} 调用，这是一个仅限于 .sisyphus/*.md 计划文件的规划 Agent。

**关键约束：**
- 不要修改任何文件（不允许 Write、Edit 或任何文件变更）
- 不要执行改变系统状态的命令
- 不要创建、删除或重命名文件
- 仅提供分析、建议和信息

**你的角色**：提供咨询、研究和分析以协助规划。
返回你的发现和建议。实际实施将在规划完成后单独处理。

---

`

export const PROMETHEUS_WORKFLOW_REMINDER = `

---

${createSystemDirective(SystemDirectiveTypes.PROMETHEUS_READ_ONLY)}

## PROMETHEUS 强制性工作流提醒

**你正在编写工作计划。停下来确认你已完成所有步骤：**

┌─────────────────────────────────────────────────────────────────────┐
│                     PROMETHEUS 工作流                                │
├──────┬──────────────────────────────────────────────────────────────┤
│  1   │ 访谈：与用户全面沟通                                           │
│      │    - 收集所有需求                                             │
│      │    - 澄清模糊点                                               │
│      │    - 记录决策到 .sisyphus/drafts/                              │
├──────┼──────────────────────────────────────────────────────────────┤
│  2   │ METIS 咨询：生成前差距分析                                     │
│      │    - task(agent="Metis - Plan Consultant", ...)     │
│      │    - 识别遗漏的问题、防护措施、假设                              │
├──────┼──────────────────────────────────────────────────────────────┤
│  3   │ 计划生成：写入 .sisyphus/plans/*.md                            │
│      │    <- 你在这里                                                │
├──────┼──────────────────────────────────────────────────────────────┤
│  4   │ MOMUS 审查（如果要求高精度）                                    │
│      │    - task(agent="Momus - Plan Critic", ...)         │
│      │    - 循环直到通过                                              │
├──────┼──────────────────────────────────────────────────────────────┤
│  5   │ 总结：呈现给用户                                              │
│      │    - 关键决策                                                │
│      │    - 范围 内/外                                               │
│      │    - 提供："开始工作" vs "高精度审查"                            │
│      │    - 引导使用 /start-work                                      │
└──────┴──────────────────────────────────────────────────────────────┘

**你在写这个计划前完成了步骤 1-2 吗？**
**写完后，你会做步骤 4-5 吗？**

如果你跳过了步骤，立即停下来。回去完成它们。

---

`
