## Tree <- Control（控件）

用于在层次结构中显示一组内部 TreeItem 的控件。树形项目可以被选择、展开和折叠。树可以有多列，每列可包含 LineEdit、按钮和弹出菜单等自定义控件。适用于结构化显示和交互。树通过代码构建，使用 TreeItem 对象创建结构。它有一个根节点，可以通过 `hide_root` 模拟多个根节点。要遍历 Tree 对象中的所有 TreeItem，在通过 `get_root` 获取根节点后，使用 `TreeItem.get_next` 和 `TreeItem.get_first_child`。可以使用 `Object.free` 从树中移除 TreeItem。**增量搜索：** 与 ItemList 和 PopupMenu 类似，Tree 在控件聚焦时支持在列表内搜索。按下与项目名称首字母匹配的键，可选择以该字母开头的第一个项目。之后有两种方式执行增量搜索：1) 在超时时间前再次按下同一键，选择以相同字母开头的下一个项目。2) 在超时时间前按下匹配单词其余部分的字母键，直接选择该项目。如果自上次按键以来已超过超时时间，这两种操作都将重置为列表开头。可通过修改 `ProjectSettings.gui/timers/incremental_search_max_interval_msec` 来调整超时时间。

**属性（Props）：**
- allow_reselect: bool = false —— 允许重新选择
- allow_rmb_select: bool = false —— 允许右键选择
- allow_search: bool = true —— 允许搜索
- auto_tooltip: bool = true —— 自动显示工具提示
- clip_contents: bool = true —— 裁剪内容
- column_titles_visible: bool = false —— 列标题可见
- columns: int = 1 —— 列数
- drop_mode_flags: int = 0 —— 拖放模式标志
- enable_drag_unfolding: bool = true —— 启用拖拽展开
- enable_recursive_folding: bool = true —— 启用递归折叠
- focus_mode: int (Control.FocusMode) = 2 —— 焦点模式
- hide_folding: bool = false —— 隐藏折叠
- hide_root: bool = false —— 隐藏根节点
- scroll_hint_mode: int (Tree.ScrollHintMode) = 0 —— 滚动提示模式
- scroll_horizontal_enabled: bool = true —— 启用水平滚动
- scroll_vertical_enabled: bool = true —— 启用垂直滚动
- select_mode: int (Tree.SelectMode) = 0 —— 选择模式
- tile_scroll_hint: bool = false —— 平铺滚动提示

**方法（Methods）：**
- clear() —— 清空树
- create_item(parent: TreeItem = null, index: int = -1) -> TreeItem —— 创建项目
- deselect_all() —— 取消全选
- edit_selected(force_edit: bool = false) -> bool —— 编辑选中的项目
- ensure_cursor_is_visible() —— 确保光标可见
- get_button_id_at_position(position: Vector2) -> int —— 获取指定位置的按钮 ID
- get_column_at_position(position: Vector2) -> int —— 获取指定位置的列
- get_column_expand_ratio(column: int) -> int —— 获取列扩展比例
- get_column_title(column: int) -> String —— 获取列标题
- get_column_title_alignment(column: int) -> int —— 获取列标题对齐方式
- get_column_title_direction(column: int) -> int —— 获取列标题方向
- get_column_title_language(column: int) -> String —— 获取列标题语言
- get_column_title_tooltip_text(column: int) -> String —— 获取列标题工具提示文本
- get_column_width(column: int) -> int —— 获取列宽
- get_custom_popup_rect() -> Rect2 —— 获取自定义弹出矩形
- get_drop_section_at_position(position: Vector2) -> int —— 获取指定位置的拖放区域
- get_edited() -> TreeItem —— 获取正在编辑的项目
- get_edited_column() -> int —— 获取正在编辑的列
- get_item_area_rect(item: TreeItem, column: int = -1, button_index: int = -1) -> Rect2 —— 获取项目区域矩形
- get_item_at_position(position: Vector2) -> TreeItem —— 获取指定位置的项目
- get_next_selected(from: TreeItem) -> TreeItem —— 获取下一个选中的项目
- get_pressed_button() -> int —— 获取按下的按钮
- get_root() -> TreeItem —— 获取根节点
- get_scroll() -> Vector2 —— 获取滚动位置
- get_selected() -> TreeItem —— 获取选中的项目
- get_selected_column() -> int —— 获取选中的列
- is_column_clipping_content(column: int) -> bool —— 列是否裁剪内容
- is_column_expanding(column: int) -> bool —— 列是否扩展
- scroll_to_item(item: TreeItem, center_on_item: bool = false) —— 滚动到指定项目
- set_column_clip_content(column: int, enable: bool) —— 设置列裁剪内容
- set_column_custom_minimum_width(column: int, min_width: int) —— 设置列自定义最小宽度
- set_column_expand(column: int, expand: bool) —— 设置列扩展
- set_column_expand_ratio(column: int, ratio: int) —— 设置列扩展比例
- set_column_title(column: int, title: String) —— 设置列标题
- set_column_title_alignment(column: int, title_alignment: int) —— 设置列标题对齐方式
- set_column_title_direction(column: int, direction: int) —— 设置列标题方向
- set_column_title_language(column: int, language: String) —— 设置列标题语言
- set_column_title_tooltip_text(column: int, tooltip_text: String) —— 设置列标题工具提示文本
- set_selected(item: TreeItem, column: int) —— 设置选中的项目

**信号（Signals）：**
- button_clicked(item: TreeItem, column: int, id: int, mouse_button_index: int) —— 按钮被点击
- cell_selected —— 单元格被选中
- check_propagated_to_item(item: TreeItem, column: int) —— 复选框传播到项目
- column_title_clicked(column: int, mouse_button_index: int) —— 列标题被点击
- custom_item_clicked(mouse_button_index: int) —— 自定义项目被点击
- custom_popup_edited(arrow_clicked: bool) —— 自定义弹出被编辑
- empty_clicked(click_position: Vector2, mouse_button_index: int) —— 空白区域被点击
- item_activated —— 项目被激活
- item_collapsed(item: TreeItem) —— 项目被折叠
- item_edited —— 项目被编辑
- item_icon_double_clicked —— 项目图标被双击
- item_mouse_selected(mouse_position: Vector2, mouse_button_index: int) —— 项目被鼠标选择
- item_selected —— 项目被选中
- multi_selected(item: TreeItem, column: int, selected: bool) —— 多项选择
- nothing_selected —— 未选择任何项目

**枚举（Enums）：**
**SelectMode（选择模式）：** SELECT_SINGLE=0（单选）, SELECT_ROW=1（行选）, SELECT_MULTI=2（多选）
**DropModeFlags（拖放模式标志）：** DROP_MODE_DISABLED=0（禁用拖放）, DROP_MODE_ON_ITEM=1（拖放到项目上）, DROP_MODE_INBETWEEN=2（拖放到项目之间）
**ScrollHintMode（滚动提示模式）：** SCROLL_HINT_MODE_DISABLED=0（禁用）, SCROLL_HINT_MODE_BOTH=1（双向）, SCROLL_HINT_MODE_TOP=2（顶部）, SCROLL_HINT_MODE_BOTTOM=3（底部）
