## GraphElement（图形元素）<- Container（容器）

GraphElement 允许为 GraphEdit 图形创建自定义元素。默认情况下，此类元素可以被选中、调整大小和重新定位，但不能被连接。有关允许连接的图形元素，请参阅 GraphNode。

**属性（Props）：**
- draggable: bool = true —— 可拖动
- position_offset: Vector2 = Vector2(0, 0) —— 位置偏移
- resizable: bool = false —— 可调整大小
- scaling_menus: bool = false —— 缩放菜单
- selectable: bool = true —— 可选择
- selected: bool = false —— 已选中

**信号（Signals）：**
- delete_request —— 删除请求
- dragged(from: Vector2, to: Vector2) —— 已拖动
- node_deselected —— 节点取消选中
- node_selected —— 节点已选中
- position_offset_changed —— 位置偏移已更改
- raise_request —— 提升请求
- resize_end(new_size: Vector2) —— 调整大小结束
- resize_request(new_size: Vector2) —— 调整大小请求
