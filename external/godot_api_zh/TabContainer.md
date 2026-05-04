## TabContainer（标签容器）<- Container（容器）

将子控件排列成标签视图，为每个子控件创建一个标签。活动选项卡对应的控件变为可见，而所有其他子控件被隐藏。忽略非 Control 子级。**注意：** 可点击标签的绘制由此节点处理；不需要 TabBar。

**属性（Props）：**
- all_tabs_in_front: bool = false —— 所有标签在前
- clip_tabs: bool = true —— 裁剪标签
- current_tab: int = -1 —— 当前标签
- deselect_enabled: bool = false —— 允许取消选择
- drag_to_rearrange_enabled: bool = false —— 拖拽重新排列
- switch_on_drag_hover: bool = true —— 拖拽悬停时切换
- tab_alignment: int (TabBar.AlignmentMode) = 0 —— 标签对齐方式
- tab_focus_mode: int (Control.FocusMode) = 2 —— 标签焦点模式
- tabs_position: int (TabContainer.TabPosition) = 0 —— 标签位置
- tabs_rearrange_group: int = -1 —— 标签重新排列组
- tabs_visible: bool = true —— 标签可见
- use_hidden_tabs_for_min_size: bool = false —— 使用隐藏标签计算最小尺寸

**方法（Methods）：**
- get_current_tab_control() -> Control —— 获取当前标签控件
- get_popup() -> Popup —— 获取弹出菜单
- get_previous_tab() -> int —— 获取上一个标签
- get_tab_bar() -> TabBar —— 获取标签栏
- get_tab_button_icon(tab_idx: int) -> Texture2D —— 获取标签按钮图标
- get_tab_control(tab_idx: int) -> Control —— 获取标签控件
- get_tab_count() -> int —— 获取标签数量
- get_tab_icon(tab_idx: int) -> Texture2D —— 获取标签图标
- get_tab_icon_max_width(tab_idx: int) -> int —— 获取标签图标最大宽度
- get_tab_idx_at_point(point: Vector2) -> int —— 获取指定点的标签索引
- get_tab_idx_from_control(control: Control) -> int —— 从控件获取标签索引
- get_tab_metadata(tab_idx: int) -> Variant —— 获取标签元数据
- get_tab_title(tab_idx: int) -> String —— 获取标签标题
- get_tab_tooltip(tab_idx: int) -> String —— 获取标签工具提示
- is_tab_disabled(tab_idx: int) -> bool —— 标签是否禁用
- is_tab_hidden(tab_idx: int) -> bool —— 标签是否隐藏
- select_next_available() -> bool —— 选择下一个可用标签
- select_previous_available() -> bool —— 选择上一个可用标签
- set_popup(popup: Node) —— 设置弹出菜单
- set_tab_button_icon(tab_idx: int, icon: Texture2D) —— 设置标签按钮图标
- set_tab_disabled(tab_idx: int, disabled: bool) —— 设置标签禁用
- set_tab_hidden(tab_idx: int, hidden: bool) —— 设置标签隐藏
- set_tab_icon(tab_idx: int, icon: Texture2D) —— 设置标签图标
- set_tab_icon_max_width(tab_idx: int, width: int) —— 设置标签图标最大宽度
- set_tab_metadata(tab_idx: int, metadata: Variant) —— 设置标签元数据
- set_tab_title(tab_idx: int, title: String) —— 设置标签标题
- set_tab_tooltip(tab_idx: int, tooltip: String) —— 设置标签工具提示

**信号（Signals）：**
- active_tab_rearranged(idx_to: int) —— 活动标签重新排列
- pre_popup_pressed —— 弹出菜单按下前
- tab_button_pressed(tab: int) —— 标签按钮按下
- tab_changed(tab: int) —— 标签改变
- tab_clicked(tab: int) —— 标签点击
- tab_hovered(tab: int) —— 标签悬停
- tab_selected(tab: int) —— 标签选中

**枚举（Enums）：**
**TabPosition（标签位置）：** POSITION_TOP=0（顶部），POSITION_BOTTOM=1（底部），POSITION_MAX=2
