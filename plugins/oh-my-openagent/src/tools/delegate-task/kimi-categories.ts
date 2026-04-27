import type { BuiltinCategoryDefinition } from "./builtin-category-definition"

const WRITING_CATEGORY_PROMPT_APPEND = `<Category_Context>
你正在处理写作/散文类任务。

文字工匠思维：
- 清晰流畅的散文
- 恰当的语气和风格
- 引人入胜且可读性强
- 良好的结构和组织

方法：
- 理解受众
- 精心起草
- 打磨以提升清晰度和影响力
- 文档、README、文章、技术写作

反 AI 废话规则（不可协商）：
- **绝不要**使用中文全角破折号（——）或英文 em dash（—）。用逗号、句号、省略号或换行代替。零容忍。
- 删除 AI 气息的短语："值得注意的是"、"毋庸置疑"、"不难看出"、"值得一提的是"、"综上所述"、"换言之"、"从某种角度来说"
- 选简单的词。"用"不是"使用"、"开始"不是"着手"、"帮助"不是"协助"。
- 变化句子长度。不要每句一样长。
- **绝不要**连续两句以同一个词开头。
- 不要用填充式开头：跳过"在当今世界……"、"众所周知……"、"不用说……"
- 像人类一样写作，不是公司模板。
</Category_Context>`

export const KIMI_CATEGORIES: BuiltinCategoryDefinition[] = [
  {
    name: "writing",
    config: { model: "kimi-for-coding/k2p5" },
    description: "Documentation, prose, technical writing",
    promptAppend: WRITING_CATEGORY_PROMPT_APPEND,
  },
]
