## GraphNode（图形节点） <- GraphElement（图形元素）

GraphNode 允许为 GraphEdit 图形创建具有基于其子控件的可自定义内容的节点。GraphNode 派生自 Container，负责将其子控件放置在屏幕上。这类似于 VBoxContainer 的工作方式。子控件则为 GraphNode 提供所谓的插槽（slot），每个插槽可以在任一侧有一个连接端口。每个 GraphNode 插槽由其索引定义，并且可以为节点提供最多两个端口：一个在左侧，一个在右侧。按照惯例，左侧端口也称为**输入端口**，右侧端口称为**输出端口**。每个端口可以分别启用和配置，使用不同的类型和颜色。类型是你可以根据自己的考量定义的自定义值。父级 GraphEdit 将在每个连接和断开连接请求时接收此信息。一旦添加了至少一个子控件，就可以在检查器面板的"Slot"部分配置插槽。属性按每个插槽的索引分组。**注意：** 虽然 GraphNode 使用插槽和插槽索引进行设置，但连接是在启用的端口之间进行的。因此，GraphEdit 使用端口的索引而不是插槽的索引。你可以使用 `get_input_port_slot` 和 `get_output_port_slot` 从端口索引获取插槽索引。

**属性（Props）：**
- focus_mode: int (Control.FocusMode) = 3 —— 焦点模式
- ignore_invalid_connection_type: bool = false —— 忽略无效连接类型
- mouse_filter: int (Control.MouseFilter) = 0 —— 鼠标过滤
- slots_focus_mode: int (Control.FocusMode) = 3 —— 插槽焦点模式
- title: String = "" —— 标题

**方法（Methods）：**
- clear_all_slots() —— 清除所有插槽
- clear_slot(slot_index: int) —— 清除插槽
- get_input_port_color(port_idx: int) -> Color —— 获取输入端口颜色
- get_input_port_count() -> int —— 获取输入端口数量
- get_input_port_position(port_idx: int) -> Vector2 —— 获取输入端口位置
- get_input_port_slot(port_idx: int) -> int —— 获取输入端口对应的插槽索引
- get_input_port_type(port_idx: int) -> int —— 获取输入端口类型
- get_output_port_color(port_idx: int) -> Color —— 获取输出端口颜色
- get_output_port_count() -> int —— 获取输出端口数量
- get_output_port_position(port_idx: int) -> Vector2 —— 获取输出端口位置
- get_output_port_slot(port_idx: int) -> int —— 获取输出端口对应的插槽索引
- get_output_port_type(port_idx: int) -> int —— 获取输出端口类型
- get_slot_color_left(slot_index: int) -> Color —— 获取插槽左侧颜色
- get_slot_color_right(slot_index: int) -> Color —— 获取插槽右侧颜色
- get_slot_custom_icon_left(slot_index: int) -> Texture2D —— 获取插槽左侧自定义图标
- get_slot_custom_icon_right(slot_index: int) -> Texture2D —— 获取插槽右侧自定义图标
- get_slot_metadata_left(slot_index: int) -> Variant —— 获取插槽左侧元数据
- get_slot_metadata_right(slot_index: int) -> Variant —— 获取插槽右侧元数据
- get_slot_type_left(slot_index: int) -> int —— 获取插槽左侧类型
- get_slot_type_right(slot_index: int) -> int —— 获取插槽右侧类型
- get_titlebar_hbox() -> HBoxContainer —— 获取标题栏水平盒子
- is_slot_draw_stylebox(slot_index: int) -> bool —— 插槽是否绘制样式框
- is_slot_enabled_left(slot_index: int) -> bool —— 插槽左侧是否启用
- is_slot_enabled_right(slot_index: int) -> bool —— 插槽右侧是否启用
- set_slot(slot_index: int, enable_left_port: bool, type_left: int, color_left: Color, enable_right_port: bool, type_right: int, color_right: Color, custom_icon_left: Texture2D = null, custom_icon_right: Texture2D = null, draw_stylebox: bool = true) —— 设置插槽
- set_slot_color_left(slot_index: int, color: Color) —— 设置插槽左侧颜色
- set_slot_color_right(slot_index: int, color: Color) —— 设置插槽右侧颜色
- set_slot_custom_icon_left(slot_index: int, custom_icon: Texture2D) —— 设置插槽左侧自定义图标
- set_slot_custom_icon_right(slot_index: int, custom_icon: Texture2D) —— 设置插槽右侧自定义图标
- set_slot_draw_stylebox(slot_index: int, enable: bool) —— 设置插槽绘制样式框
- set_slot_enabled_left(slot_index: int, enable: bool) —— 设置插槽左侧启用
- set_slot_enabled_right(slot_index: int, enable: bool) —— 设置插槽右侧启用
- set_slot_metadata_left(slot_index: int, value: Variant) —— 设置插槽左侧元数据
- set_slot_metadata_right(slot_index: int, value: Variant) —— 设置插槽右侧元数据
- set_slot_type_left(slot_index: int, type: int) —— 设置插槽左侧类型
- set_slot_type_right(slot_index: int, type: int) —— 设置插槽右侧类型

**信号（Signals）：**
- slot_sizes_changed —— 插槽大小改变
- slot_updated(slot_index: int) —— 插槽已更新
