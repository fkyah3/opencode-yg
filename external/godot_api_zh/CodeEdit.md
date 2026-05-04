## CodeEdit（代码编辑器）<- TextEdit（文本编辑器）

CodeEdit 是一个专门用于编辑纯文本代码文件的 TextEdit。它具有许多代码编辑器中常见的功能，如行号、代码折叠、代码补全、缩进管理和字符串/注释管理。**注意：** 无论区域设置如何，CodeEdit 默认始终使用从左到右的文本方向以正确显示源代码。

**属性（Props）：**
- auto_brace_completion_enabled: bool = false —— 启用自动括号补全
- auto_brace_completion_highlight_matching: bool = false —— 高亮匹配的括号
- auto_brace_completion_pairs: Dictionary = { "\"": "\"", "'": "'", "(": ")", "[": "]", "{": "}" } —— 自动括号补全对
- code_completion_enabled: bool = false —— 启用代码补全
- code_completion_prefixes: String[] = [] —— 代码补全前缀
- delimiter_comments: String[] = [] —— 注释分隔符
- delimiter_strings: String[] = ["' '", "\" \""] —— 字符串分隔符
- gutters_draw_bookmarks: bool = false —— 绘制书签
- gutters_draw_breakpoints_gutter: bool = false —— 绘制断点
- gutters_draw_executing_lines: bool = false —— 绘制执行行
- gutters_draw_fold_gutter: bool = false —— 绘制折叠标记
- gutters_draw_line_numbers: bool = false —— 绘制行号
- gutters_line_numbers_min_digits: int = 3 —— 行号最小位数
- gutters_zero_pad_line_numbers: bool = false —— 行号补零
- indent_automatic: bool = false —— 自动缩进
- indent_automatic_prefixes: String[] = [":", "{", "[", "("] —— 自动缩进前缀
- indent_size: int = 4 —— 缩进大小
- indent_use_spaces: bool = false —— 使用空格缩进
- layout_direction: int (Control.LayoutDirection) = 2 —— 布局方向
- line_folding: bool = false —— 行折叠
- line_length_guidelines: int[] = [] —— 行长指南
- symbol_lookup_on_click: bool = false —— 点击符号查找
- symbol_tooltip_on_hover: bool = false —— 悬停符号提示
- text_direction: int (Control.TextDirection) = 1 —— 文本方向

**方法（Methods）：**
- add_auto_brace_completion_pair(start_key: String, end_key: String) —— 添加自动括号补全对
- add_code_completion_option(type: int, display_text: String, insert_text: String, text_color: Color = Color(1, 1, 1, 1), icon: Resource = null, value: Variant = null, location: int = 1024) —— 添加代码补全选项
- add_comment_delimiter(start_key: String, end_key: String, line_only: bool = false) —— 添加注释分隔符
- add_string_delimiter(start_key: String, end_key: String, line_only: bool = false) —— 添加字符串分隔符
- can_fold_line(line: int) -> bool —— 行是否可以折叠
- cancel_code_completion() —— 取消代码补全
- clear_bookmarked_lines() —— 清除书签行
- clear_breakpointed_lines() —— 清除断点行
- clear_comment_delimiters() —— 清除注释分隔符
- clear_executing_lines() —— 清除执行行
- clear_string_delimiters() —— 清除字符串分隔符
- confirm_code_completion(replace: bool = false) —— 确认代码补全
- convert_indent(from_line: int = -1, to_line: int = -1) —— 转换缩进
- create_code_region() —— 创建代码区域
- delete_lines() —— 删除行
- do_indent() —— 执行缩进
- duplicate_lines() —— 复制行
- duplicate_selection() —— 复制选择
- fold_all_lines() —— 折叠所有行
- fold_line(line: int) —— 折叠行
- get_auto_brace_completion_close_key(open_key: String) -> String —— 获取自动括号补全关闭键
- get_bookmarked_lines() -> PackedInt32Array —— 获取书签行
- get_breakpointed_lines() -> PackedInt32Array —— 获取断点行
- get_code_completion_option(index: int) -> Dictionary —— 获取代码补全选项
- get_code_completion_options() -> Dictionary[] —— 获取所有代码补全选项
- get_code_completion_selected_index() -> int —— 获取代码补全选中索引
- get_code_region_end_tag() -> String —— 获取代码区域结束标签
- get_code_region_start_tag() -> String —— 获取代码区域开始标签
- get_delimiter_end_key(delimiter_index: int) -> String —— 获取分隔符结束键
- get_delimiter_end_position(line: int, column: int) -> Vector2 —— 获取分隔符结束位置
- get_delimiter_start_key(delimiter_index: int) -> String —— 获取分隔符开始键
- get_delimiter_start_position(line: int, column: int) -> Vector2 —— 获取分隔符开始位置
- get_executing_lines() -> PackedInt32Array —— 获取执行行
- get_folded_lines() -> int[] —— 获取折叠行
- get_text_for_code_completion() -> String —— 获取用于代码补全的文本
- get_text_for_symbol_lookup() -> String —— 获取用于符号查找的文本
- get_text_with_cursor_char(line: int, column: int) -> String —— 获取带光标字符的文本
- has_auto_brace_completion_close_key(close_key: String) -> bool —— 是否有自动括号补全关闭键
- has_auto_brace_completion_open_key(open_key: String) -> bool —— 是否有自动括号补全开始键
- has_comment_delimiter(start_key: String) -> bool —— 是否有注释分隔符
- has_string_delimiter(start_key: String) -> bool —— 是否有字符串分隔符
- indent_lines() —— 缩进行
- is_in_comment(line: int, column: int = -1) -> int —— 是否在注释中
- is_in_string(line: int, column: int = -1) -> int —— 是否在字符串中
- is_line_bookmarked(line: int) -> bool —— 行是否已书签
- is_line_breakpointed(line: int) -> bool —— 行是否有断点
- is_line_code_region_end(line: int) -> bool —— 行是否为代码区域结束
- is_line_code_region_start(line: int) -> bool —— 行是否为代码区域开始
- is_line_executing(line: int) -> bool —— 行是否正在执行
- is_line_folded(line: int) -> bool —— 行是否已折叠
- move_lines_down() —— 下移行
- move_lines_up() —— 上移行
- remove_comment_delimiter(start_key: String) —— 移除注释分隔符
- remove_string_delimiter(start_key: String) —— 移除字符串分隔符
- request_code_completion(force: bool = false) —— 请求代码补全
- set_code_completion_selected_index(index: int) —— 设置代码补全选中索引
- set_code_hint(code_hint: String) —— 设置代码提示
- set_code_hint_draw_below(draw_below: bool) —— 设置代码提示绘制在下方
- set_code_region_tags(start: String = "region", end: String = "endregion") —— 设置代码区域标签
- set_line_as_bookmarked(line: int, bookmarked: bool) —— 设置行为书签
- set_line_as_breakpoint(line: int, breakpointed: bool) —— 设置行为断点
- set_line_as_executing(line: int, executing: bool) —— 设置行为执行中
- set_symbol_lookup_word_as_valid(valid: bool) —— 设置符号查找词为有效
- toggle_foldable_line(line: int) —— 切换行折叠
- toggle_foldable_lines_at_carets() —— 切换光标处折叠
- unfold_all_lines() —— 展开所有行
- unfold_line(line: int) —— 展开行
- unindent_lines() —— 取消缩进行
- update_code_completion_options(force: bool) —— 更新代码补全选项

**信号（Signals）：**
- breakpoint_toggled(line: int) —— 断点切换
- code_completion_requested —— 请求代码补全
- symbol_hovered(symbol: String, line: int, column: int) —— 符号悬停
- symbol_lookup(symbol: String, line: int, column: int) —— 符号查找
- symbol_validate(symbol: String) —— 符号验证

**枚举（Enums）：**
**CodeCompletionKind（代码补全类型）：** KIND_CLASS=0 —— 类，KIND_FUNCTION=1 —— 函数，KIND_SIGNAL=2 —— 信号，KIND_VARIABLE=3 —— 变量，KIND_MEMBER=4 —— 成员，KIND_ENUM=5 —— 枚举，KIND_CONSTANT=6 —— 常量，KIND_NODE_PATH=7 —— 节点路径，KIND_FILE_PATH=8 —— 文件路径，KIND_PLAIN_TEXT=9 —— 纯文本
**CodeCompletionLocation（代码补全位置）：** LOCATION_LOCAL=0 —— 本地，LOCATION_PARENT_MASK=256 —— 父级掩码，LOCATION_OTHER_USER_CODE=512 —— 其他用户代码，LOCATION_OTHER=1024 —— 其他
