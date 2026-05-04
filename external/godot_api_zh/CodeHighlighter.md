## CodeHighlighter（代码高亮器）<- SyntaxHighlighter（语法高亮器）

通过调整此资源的各种属性，你可以更改 TextEdit 控件中字符串、注释、数字和其他文本模式的颜色。

**属性（Props）：**
- color_regions: Dictionary = {} —— 颜色区域
- function_color: Color = Color(0, 0, 0, 1) —— 函数颜色
- keyword_colors: Dictionary = {} —— 关键词颜色
- member_keyword_colors: Dictionary = {} —— 成员关键词颜色
- member_variable_color: Color = Color(0, 0, 0, 1) —— 成员变量颜色
- number_color: Color = Color(0, 0, 0, 1) —— 数字颜色
- symbol_color: Color = Color(0, 0, 0, 1) —— 符号颜色

**方法（Methods）：**
- add_color_region(start_key: String, end_key: String, color: Color, line_only: bool = false) —— 添加颜色区域
- add_keyword_color(keyword: String, color: Color) —— 添加关键词颜色
- add_member_keyword_color(member_keyword: String, color: Color) —— 添加成员关键词颜色
- clear_color_regions() —— 清除颜色区域
- clear_keyword_colors() —— 清除关键词颜色
- clear_member_keyword_colors() —— 清除成员关键词颜色
- get_keyword_color(keyword: String) -> Color —— 获取关键词颜色
- get_member_keyword_color(member_keyword: String) -> Color —— 获取成员关键词颜色
- has_color_region(start_key: String) -> bool —— 是否有颜色区域
- has_keyword_color(keyword: String) -> bool —— 是否有关键词颜色
- has_member_keyword_color(member_keyword: String) -> bool —— 是否有成员关键词颜色
- remove_color_region(start_key: String) —— 移除颜色区域
- remove_keyword_color(keyword: String) —— 移除关键词颜色
- remove_member_keyword_color(member_keyword: String) —— 移除成员关键词颜色
