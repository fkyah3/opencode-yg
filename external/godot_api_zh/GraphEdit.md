## GraphEdit（图形编辑器） <- Control（控件）

GraphEdit 提供用于创建、操作和显示各种图形的工具。它在引擎中的主要用途是为可视化编程系统（如可视化着色器）提供支持，但也可用于用户项目。GraphEdit 本身只是一个空容器，表示一个无限网格，可以在其中放置 GraphNode。每个 GraphNode 代表图形中的一个节点，即连接方案中的单个数据单元。GraphEdit 则帮助控制与节点之间以及节点之间的各种交互。当用户尝试连接、断开连接或删除 GraphNode 时，GraphEdit 中会发出信号，但默认情况下不执行任何操作。使用此控件的程序员有责任实现必要的逻辑来确定如何处理每个请求。**性能：** 强烈建议在使用 GraphEdit 时启用低处理器使用模式（参见 `OS.low_processor_usage_mode`）。**注意：** 请注意，由于技术限制，`Node.get_children` 也会返回名为 `_connection_layer` 的连接层节点。此行为可能在将来版本中更改。

**属性（Props）：**
- clip_contents: bool = true —— 裁剪内容
- connection_lines_antialiased: bool = true —— 连接线抗锯齿
- connection_lines_curvature: float = 0.5 —— 连接线曲率
- connection_lines_thickness: float = 4.0 —— 连接线厚度
- connections: Dictionary[] = [] —— 连接列表
- focus_mode: int (Control.FocusMode) = 2 —— 焦点模式
- grid_pattern: int (GraphEdit.GridPattern) = 0 —— 网格图案
- minimap_enabled: bool = true —— 启用小地图
- minimap_opacity: float = 0.65 —— 小地图透明度
- minimap_size: Vector2 = Vector2(240, 160) —— 小地图大小
- panning_scheme: int (GraphEdit.PanningScheme) = 0 —— 平移方案
- right_disconnects: bool = false —— 右键断开
- scroll_offset: Vector2 = Vector2(0, 0) —— 滚动偏移
- show_arrange_button: bool = true —— 显示排列按钮
- show_grid: bool = true —— 显示网格
- show_grid_buttons: bool = true —— 显示网格按钮
- show_menu: bool = true —— 显示菜单
- show_minimap_button: bool = true —— 显示小地图按钮
- show_zoom_buttons: bool = true —— 显示缩放按钮
- show_zoom_label: bool = false —— 显示缩放标签
- snapping_distance: int = 20 —— 吸附距离
- snapping_enabled: bool = true —— 启用吸附
- type_names: Dictionary = {} —— 类型名称
- zoom: float = 1.0 —— 缩放
- zoom_max: float = 2.0736003 —— 最大缩放
- zoom_min: float = 0.23256795 —— 最小缩放
- zoom_step: float = 1.2 —— 缩放步进

**方法（Methods）：**
- add_valid_connection_type(from_type: int, to_type: int) —— 添加有效连接类型
- add_valid_left_disconnect_type(type: int) —— 添加有效左侧断开类型
- add_valid_right_disconnect_type(type: int) —— 添加有效右侧断开类型
- arrange_nodes() —— 排列节点
- attach_graph_element_to_frame(element: StringName, frame: StringName) —— 将图形元素附加到框架
- clear_connections() —— 清除所有连接
- connect_node(from_node: StringName, from_port: int, to_node: StringName, to_port: int, keep_alive: bool = false) -> int —— 连接节点
- detach_graph_element_from_frame(element: StringName) —— 从框架分离图形元素
- disconnect_node(from_node: StringName, from_port: int, to_node: StringName, to_port: int) —— 断开节点
- force_connection_drag_end() —— 强制结束连接拖拽
- get_attached_nodes_of_frame(frame: StringName) -> StringName[] —— 获取框架附带的节点
- get_closest_connection_at_point(point: Vector2, max_distance: float = 4.0) -> Dictionary —— 获取离点最近的连接
- get_connection_count(from_node: StringName, from_port: int) -> int —— 获取连接数量
- get_connection_line(from_node: Vector2, to_node: Vector2) -> PackedVector2Array —— 获取连接线
- get_connection_list_from_node(node: StringName) -> Dictionary[] —— 获取节点的连接列表
- get_connections_intersecting_with_rect(rect: Rect2) -> Dictionary[] —— 获取与矩形相交的连接
- get_element_frame(element: StringName) -> GraphFrame —— 获取元素的框架
- get_menu_hbox() -> HBoxContainer —— 获取菜单水平盒子
- is_node_connected(from_node: StringName, from_port: int, to_node: StringName, to_port: int) -> bool —— 节点是否已连接
- is_valid_connection_type(from_type: int, to_type: int) -> bool —— 是否为有效连接类型
- remove_valid_connection_type(from_type: int, to_type: int) —— 移除有效连接类型
- remove_valid_left_disconnect_type(type: int) —— 移除有效左侧断开类型
- remove_valid_right_disconnect_type(type: int) —— 移除有效右侧断开类型
- set_connection_activity(from_node: StringName, from_port: int, to_node: StringName, to_port: int, amount: float) —— 设置连接活动
- set_selected(node: Node) —— 设置选中节点

**信号（Signals）：**
- begin_node_move —— 开始节点移动
- connection_drag_ended —— 连接拖拽结束
- connection_drag_started(from_node: StringName, from_port: int, is_output: bool) —— 连接拖拽开始
- connection_from_empty(to_node: StringName, to_port: int, release_position: Vector2) —— 从空白处连接
- connection_request(from_node: StringName, from_port: int, to_node: StringName, to_port: int) —— 连接请求
- connection_to_empty(from_node: StringName, from_port: int, release_position: Vector2) —— 连接到空白处
- copy_nodes_request —— 复制节点请求
- cut_nodes_request —— 剪切节点请求
- delete_nodes_request(nodes: StringName[]) —— 删除节点请求
- disconnection_request(from_node: StringName, from_port: int, to_node: StringName, to_port: int) —— 断开连接请求
- duplicate_nodes_request —— 复制节点请求
- end_node_move —— 结束节点移动
- frame_rect_changed(frame: GraphFrame, new_rect: Rect2) —— 框架矩形改变
- graph_elements_linked_to_frame_request(elements: Array, frame: StringName) —— 图形元素链接到框架请求
- node_deselected(node: Node) —— 节点取消选中
- node_selected(node: Node) —— 节点选中
- paste_nodes_request —— 粘贴节点请求
- popup_request(at_position: Vector2) —— 弹出请求
- scroll_offset_changed(offset: Vector2) —— 滚动偏移改变

**枚举（Enums）：**
**PanningScheme（平移方案）：** SCROLL_ZOOMS=0（滚轮缩放）, SCROLL_PANS=1（滚轮平移）
**GridPattern（网格图案）：** GRID_PATTERN_LINES=0（线条）, GRID_PATTERN_DOTS=1（点阵）
