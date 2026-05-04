## RichTextLabel（富文本标签）<- Control（控件）

用于显示可包含自定义字体、图像和基本格式的文本的控件。RichTextLabel 将这些内容作为内部标签栈管理。它还能自适应给定的宽度/高度。**注意：** `newline`、`push_paragraph`、`"\n"`、`"\r\n"`、`p` 标签和对齐标签会开始新段落。每个段落独立处理，拥有自己的 BiDi 上下文。如果要在段落内强制换行，可以使用其他换行符，例如换页符（U+000C）、下一行（U+0085）、行分隔符（U+2028）。**注意：** 对 `text` 的赋值会清除标签栈并从属性内容重建。对 `text` 的任何编辑都会擦除之前从其他手动来源（如 `append_text` 和 `push_*`/`pop` 方法）所做的编辑。**注意：** RichTextLabel 不支持纠缠的 BBCode 标签。例如，不要使用 [code skip-lint]**bold*bold italic**italic*[/code]，而应使用 [code skip-lint]**bold*bold italic****italic*[/code]。**注意：** `push_*/pop_*` 函数不会影响 BBCode。**注意：** 当启用 `bbcode_enabled` 时，对齐标签（如 [code skip-lint][center][/code]）将优先于 `horizontal_alignment` 设置（该设置决定默认文本对齐方式）。

**属性（Props）：**
- autowrap_mode: int (TextServer.AutowrapMode) = 3 —— 自动换行模式
- autowrap_trim_flags: int (TextServer.LineBreakFlag) = 192 —— 自动换行修剪标志
- bbcode_enabled: bool = false —— 启用 BBCode
- clip_contents: bool = true —— 裁剪内容
- context_menu_enabled: bool = false —— 启用上下文菜单
- custom_effects: Array = [] —— 自定义效果
- deselect_on_focus_loss_enabled: bool = true —— 失去焦点时取消选择
- drag_and_drop_selection_enabled: bool = true —— 启用拖拽选择
- fit_content: bool = false —— 适应内容
- focus_mode: int (Control.FocusMode) = 3 —— 焦点模式
- hint_underlined: bool = true —— 提示带下划线
- horizontal_alignment: int (HorizontalAlignment) = 0 —— 水平对齐
- justification_flags: int (TextServer.JustificationFlag) = 163 —— 对齐标志
- language: String = "" —— 语言
- meta_underlined: bool = true —— Meta 带下划线
- progress_bar_delay: int = 1000 —— 进度条延迟
- scroll_active: bool = true —— 滚动激活
- scroll_following: bool = false —— 滚动跟随
- scroll_following_visible_characters: bool = false —— 滚动跟随可见字符
- selection_enabled: bool = false —— 启用选择
- shortcut_keys_enabled: bool = true —— 启用快捷键
- structured_text_bidi_override: int (TextServer.StructuredTextParser) = 0 —— 结构化文本 BiDi 覆盖
- structured_text_bidi_override_options: Array = [] —— 结构化文本 BiDi 覆盖选项
- tab_size: int = 4 —— 制表符大小
- tab_stops: PackedFloat32Array = PackedFloat32Array() —— 制表位
- text: String = "" —— 文本
- text_direction: int (Control.TextDirection) = 0 —— 文本方向
- threaded: bool = false —— 启用线程
- vertical_alignment: int (VerticalAlignment) = 0 —— 垂直对齐
- visible_characters: int = -1 —— 可见字符数
- visible_characters_behavior: int (TextServer.VisibleCharactersBehavior) = 0 —— 可见字符行为
- visible_ratio: float = 1.0 —— 可见比例

**方法（Methods）：**
- add_hr(width: int = 90, height: int = 2, color: Color = Color(1, 1, 1, 1), alignment: int = 1, width_in_percent: bool = true, height_in_percent: bool = false) —— 添加水平分割线
- add_image(image: Texture2D, width: int = 0, height: int = 0, color: Color = Color(1, 1, 1, 1), inline_align: int = 5, region: Rect2 = Rect2(0, 0, 0, 0), key: Variant = null, pad: bool = false, tooltip: String = "", width_in_percent: bool = false, height_in_percent: bool = false, alt_text: String = "") —— 添加图像
- add_text(text: String) —— 添加文本
- append_text(bbcode: String) —— 追加 BBCode 文本
- clear() —— 清除
- deselect() —— 取消选择
- get_character_line(character: int) -> int —— 获取字符所在行
- get_character_paragraph(character: int) -> int —— 获取字符所在段落
- get_content_height() -> int —— 获取内容高度
- get_content_width() -> int —— 获取内容宽度
- get_line_count() -> int —— 获取行数
- get_line_height(line: int) -> int —— 获取行高
- get_line_offset(line: int) -> float —— 获取行偏移
- get_line_range(line: int) -> Vector2i —— 获取行范围
- get_line_width(line: int) -> int —— 获取行宽
- get_menu() -> PopupMenu —— 获取菜单
- get_paragraph_count() -> int —— 获取段落数
- get_paragraph_offset(paragraph: int) -> float —— 获取段落偏移
- get_parsed_text() -> String —— 获取解析后的文本
- get_selected_text() -> String —— 获取选中的文本
- get_selection_from() -> int —— 获取选择起点
- get_selection_line_offset() -> float —— 获取选择行偏移
- get_selection_to() -> int —— 获取选择终点
- get_total_character_count() -> int —— 获取总字符数
- get_v_scroll_bar() -> VScrollBar —— 获取垂直滚动条
- get_visible_content_rect() -> Rect2i —— 获取可见内容矩形
- get_visible_line_count() -> int —— 获取可见行数
- get_visible_paragraph_count() -> int —— 获取可见段落数
- install_effect(effect: Variant) —— 安装效果
- invalidate_paragraph(paragraph: int) -> bool —— 使段落失效
- is_finished() -> bool —— 是否完成
- is_menu_visible() -> bool —— 菜单是否可见
- is_ready() -> bool —— 是否就绪
- menu_option(option: int) —— 菜单选项
- newline() —— 换行
- parse_bbcode(bbcode: String) —— 解析 BBCode
- parse_expressions_for_values(expressions: PackedStringArray) -> Dictionary —— 解析表达式获取值
- pop() —— 弹出
- pop_all() —— 弹出全部
- pop_context() —— 弹出上下文
- push_bgcolor(bgcolor: Color) —— 推入背景色
- push_bold() —— 推入粗体
- push_bold_italics() —— 推入粗斜体
- push_cell() —— 推入单元格
- push_color(color: Color) —— 推入颜色
- push_context() —— 推入上下文
- push_customfx(effect: RichTextEffect, env: Dictionary) —— 推入自定义效果
- push_dropcap(string: String, font: Font, size: int, dropcap_margins: Rect2 = Rect2(0, 0, 0, 0), color: Color = Color(1, 1, 1, 1), outline_size: int = 0, outline_color: Color = Color(0, 0, 0, 0)) —— 推入首字下沉
- push_fgcolor(fgcolor: Color) —— 推入前景色
- push_font(font: Font, font_size: int = 0) —— 推入字体
- push_font_size(font_size: int) —— 推入字号
- push_hint(description: String) —— 推入提示
- push_indent(level: int) —— 推入缩进
- push_italics() —— 推入斜体
- push_language(language: String) —— 推入语言
- push_list(level: int, type: int, capitalize: bool, bullet: String = "•") —— 推入列表
- push_meta(data: Variant, underline_mode: int = 1, tooltip: String = "") —— 推入 Meta 数据
- push_mono() —— 推入等宽字体
- push_normal() —— 推入普通样式
- push_outline_color(color: Color) —— 推入轮廓颜色
- push_outline_size(outline_size: int) —— 推入轮廓大小
- push_paragraph(alignment: int, base_direction: int = 0, language: String = "", st_parser: int = 0, justification_flags: int = 163, tab_stops: PackedFloat32Array = PackedFloat32Array()) —— 推入段落
- push_strikethrough(color: Color = Color(0, 0, 0, 0)) —— 推入删除线
- push_table(columns: int, inline_align: int = 0, align_to_row: int = -1, name: String = "") —— 推入表格
- push_underline(color: Color = Color(0, 0, 0, 0)) —— 推入下划线
- reload_effects() —— 重新加载效果
- remove_paragraph(paragraph: int, no_invalidate: bool = false) -> bool —— 移除段落
- scroll_to_line(line: int) —— 滚动到指定行
- scroll_to_paragraph(paragraph: int) —— 滚动到指定段落
- scroll_to_selection() —— 滚动到选择区域
- select_all() —— 全选
- set_cell_border_color(color: Color) —— 设置单元格边框颜色
- set_cell_padding(padding: Rect2) —— 设置单元格内边距
- set_cell_row_background_color(odd_row_bg: Color, even_row_bg: Color) —— 设置单元格行背景色
- set_cell_size_override(min_size: Vector2, max_size: Vector2) —— 设置单元格大小覆盖
- set_table_column_expand(column: int, expand: bool, ratio: int = 1, shrink: bool = true) —— 设置表格列扩展
- set_table_column_name(column: int, name: String) —— 设置表格列名
- update_image(key: Variant, mask: int, image: Texture2D, width: int = 0, height: int = 0, color: Color = Color(1, 1, 1, 1), inline_align: int = 5, region: Rect2 = Rect2(0, 0, 0, 0), pad: bool = false, tooltip: String = "", width_in_percent: bool = false, height_in_percent: bool = false) —— 更新图像

**信号（Signals）：**
- finished —— 完成
- meta_clicked(meta: Variant) —— Meta 被点击
- meta_hover_ended(meta: Variant) —— Meta 悬停结束
- meta_hover_started(meta: Variant) —— Meta 悬停开始

**枚举（Enums）：**
**ListType（列表类型）：** LIST_NUMBERS=0 —— 数字列表, LIST_LETTERS=1 —— 字母列表, LIST_ROMAN=2 —— 罗马数字列表, LIST_DOTS=3 —— 圆点列表
**MenuItems（菜单项）：** MENU_COPY=0 —— 复制, MENU_SELECT_ALL=1 —— 全选, MENU_MAX=2 —— 最大
**MetaUnderline（Meta 下划线）：** META_UNDERLINE_NEVER=0 —— 从不, META_UNDERLINE_ALWAYS=1 —— 总是, META_UNDERLINE_ON_HOVER=2 —— 悬停时
**ImageUpdateMask（图像更新掩码）：** UPDATE_TEXTURE=1 —— 更新纹理, UPDATE_SIZE=2 —— 更新大小, UPDATE_COLOR=4 —— 更新颜色, UPDATE_ALIGNMENT=8 —— 更新对齐, UPDATE_REGION=16 —— 更新区域, UPDATE_PAD=32 —— 更新填充, UPDATE_TOOLTIP=64 —— 更新提示, UPDATE_WIDTH_IN_PERCENT=128 —— 更新宽度百分比
