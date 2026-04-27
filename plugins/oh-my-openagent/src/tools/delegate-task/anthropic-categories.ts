import type { BuiltinCategoryDefinition } from "./builtin-category-definition"

const UNSPECIFIED_LOW_CATEGORY_PROMPT_APPEND = `<Category_Context>
你正在处理不适合特定分类但需要中等工作量的任务。

<Selection_Gate>
选择此分类前，验证所有条件：
1. 任务不适合：quick（琐碎）、visual-engineering（UI）、ultrabrain（深度逻辑）、artistry（创意）、writing（文档）
2. 任务需要超过琐碎的工作量，但不是系统级范围
3. 范围限制在少数文件/模块内

如果任务适合任何其他分类，不要选择 unspecified-low。
这不是默认选择——它适用于真正无法归类的、中等工作量的工作。
</Selection_Gate>
</Category_Context>

<Caller_Warning>
提供清晰的结构：
1. 必须做：明确列举必需的操作
2. 不能做：说明禁止的行为以防止范围蔓延
3. 预期输出：定义具体的成功标准
</Caller_Warning>`

const UNSPECIFIED_HIGH_CATEGORY_PROMPT_APPEND = `<Category_Context>
你正在处理不适合特定分类但需要大量工作量的任务。

<Selection_Gate>
选择此分类前，验证所有条件：
1. 任务不适合：quick（琐碎）、visual-engineering（UI）、ultrabrain（深度逻辑）、artistry（创意）、writing（文档）
2. 任务需要跨多个系统/模块的大量工作
3. 变更具有广泛影响或需要仔细协调
4. 不仅仅是"复杂"——必须真正无法归类且高工作量

如果任务适合任何其他分类，不要选择 unspecified-high。
如果任务无法归类但只是中等工作量，改用 unspecified-low。
</Selection_Gate>
</Category_Context>`

export const ANTHROPIC_CATEGORIES: BuiltinCategoryDefinition[] = [
  {
    name: "unspecified-low",
    config: { model: "anthropic/claude-sonnet-4-6" },
    description: "Tasks that don't fit other categories, low effort required",
    promptAppend: UNSPECIFIED_LOW_CATEGORY_PROMPT_APPEND,
  },
  {
    name: "unspecified-high",
    config: { model: "anthropic/claude-opus-4-7", variant: "max" },
    description: "Tasks that don't fit other categories, high effort required",
    promptAppend: UNSPECIFIED_HIGH_CATEGORY_PROMPT_APPEND,
  },
]
