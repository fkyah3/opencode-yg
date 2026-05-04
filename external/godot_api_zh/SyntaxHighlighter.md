## SyntaxHighlighter（语法高亮器） <- Resource（资源）

语法高亮器的基类。为 TextEdit 提供语法高亮数据。关联的 TextEdit 将按需调用 SyntaxHighlighter。**注意：** 一个 SyntaxHighlighter 实例不应跨多个 TextEdit 节点使用。

**方法（Methods）：**
- clear_highlighting_cache() —— 清除高亮缓存
- get_line_syntax_highlighting(line: int) -> Dictionary —— 获取行语法高亮
- get_text_edit() -> TextEdit —— 获取 TextEdit
- update_cache() —— 更新缓存
