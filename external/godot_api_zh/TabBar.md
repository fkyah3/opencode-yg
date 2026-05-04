## TabBar（标签栏）<- Control（控件）

提供带有标签的水平栏的控件。类似于 TabContainer，但仅负责绘制标签，不负责与子级交互。

**属性（Props）：**
- clip_tabs: bool = true —— 裁剪标签
- close_with_middle_mouse: bool = true —— 鼠标中键关闭
- current_tab: int = -1 —— 当前标签
- deselect_enabled: bool = false —— 允许取消选择
- drag_to_rearrange_enabled: bool = false —— 拖拽重新排列
- focus_mode: int (Control.FocusMode) = 2 —— 焦点模式
- max_tab_width: int = 0 —— 最大标签宽度
- scroll_to_selected: bool = true —— 滚动到选中项
- scrolling_enabled: bool = true —— 启用滚动
- select_with_rmb: bool = false —— 鼠标右键选择
- switch_on_drag_hover: bool = true —— 拖拽悬停时切换
- tab_alignment: int (TabBar.AlignmentMode) = 0 —— 标签对齐方式
- tab_close_display_policy: int (TabBar.CloseButtonDisplayPolicy) = 0 —— 标签关闭按钮显示策略
- tab_count: int = 0 —— 标签数量
- tabs_rearrange_group: int = -1 —— 标签重新排列组

**方法（Methods）：**
- add_tab(title: String = "", icon: Texture2D = null) —— 添加标签
- clear_tabs() —— 清除标签
- ensure_tab_visible(idx: int) —— 确保标签可见
- get_offset_buttons_visible() -> bool —— 获取偏移按钮是否可见
- get_previous_tab() -> int —— 获取上一个标签
- get_tab_button_icon(tab_idx: int) -> Texture2D —— 获取标签按钮图标
- get_tab_icon(tab_idx: int) -> Texture2D —— 获取标签图标
- get_tab_icon_max_width(tab_idx: int) -> int —— 获取标签图标最大宽度
- get_tab_idx_at_point(point: Vector2) -> int —— 获取指定点的标签索引
- get_tab_language(tab_idx: int) -> String —— 获取标签语言
- get_tab_metadata(tab_idx: int) -> Variant —— 获取标签元数据
- get_tab_offset() -> int —— 获取标签偏移
- get_tab_rect(tab_idx: int) -> Rect2 —— 获取标签矩形
- get_tab_text_direction(tab_idx: int) -> int —— 获取标签文本方向
- get_tab_title(tab_idx: int) -> String —— 获取标签标题
- get_tab_tooltip(tab_idx: int) -> String —— 获取标签工具提示
- is_tab_disabled(tab_idx: int) -> bool —— 标签是否禁用
- is_tab_hidden(tab_idx: int) -> bool —— 标签是否隐藏
- move_tab(from: int, to: int) —— 移动标签
- remove_tab(tab_idx: int) —— 移除标签
- select_next_available() -> bool —— 选择下一个可用标签
- select_previous_available() -> bool —— 选择上一个可用标签
- set_tab_button_icon(tab_idx: int, icon: Texture2D) —— 设置标签按钮图标
- set_tab_disabled(tab_idx: int, disabled: bool) —— 设置标签禁用
- set_tab_hidden(tab_idx: int, hidden: bool) —— 设置标签隐藏
- set_tab_icon(tab_idx: int, icon: Texture2D) —— 设置标签图标
- set_tab_icon_max_width(tab_idx: int, width: int) —— 设置标签图标最大宽度
- set_tab_language(tab_idx: int, language: String) —— 设置标签语言
- set_tab_metadata(tab_idx: int, metadata: Variant) —— 设置标签元数据
- set_tab_text_direction(tab_idx: int, direction: int) —— 设置标签文本方向
- set_tab_title(tab_idx: int, title: String) —— 设置标签标题
- set_tab_tooltip(tab_idx: int, tooltip: String) —— 设置标签工具提示

**信号（Signals）：**
- active_tab_rearranged(idx_to: int) —— 活动标签重新排列
- tab_button_pressed(tab: int) —— 标签按钮按下
- tab_changed(tab: int) —— 标签改变
- tab_clicked(tab: int) —— 标签点击
- tab_close_pressed(tab: int) —— 标签关闭按下
- tab_hovered(tab: int) —— 标签悬停
- tab_rmb_clicked(tab: int) —— 标签右键点击
- tab_selected(tab: int) —— 标签选中

**枚举（Enums）：**
**AlignmentMode（对齐模式）：** ALIGNMENT_LEFT=0（左对齐），ALIGNMENT_CENTER=1（居中），ALIGNMENT_RIGHT=2（右对齐），ALIGNMENT_MAX=3
**CloseButtonDisplayPolicy（关闭按钮显示策略）：** CLOSE_BUTTON_SHOW_NEVER=0（从不显示），CLOSE_BUTTON_SHOW_ACTIVE_ONLY=1（仅活动标签显示），CLOSE_BUTTON_SHOW_ALWAYS=2（始终显示），CLOSE_BUTTON_MAX=3
