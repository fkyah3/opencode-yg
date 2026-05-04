## SplitContainer（分割容器）<- Container（容器）

一种容器，可水平或垂直排列子控件并在它们之间创建拖拽手柄。可以拖动手柄来更改子控件之间的大小关系。

**属性（Props）：**
- collapsed: bool = false —— 折叠
- drag_area_highlight_in_editor: bool = false —— 编辑器中拖拽区域高亮
- drag_area_margin_begin: int = 0 —— 拖拽区域起始边距
- drag_area_margin_end: int = 0 —— 拖拽区域结束边距
- drag_area_offset: int = 0 —— 拖拽区域偏移
- dragger_visibility: int (SplitContainer.DraggerVisibility) = 0 —— 拖拽手柄可见性
- dragging_enabled: bool = true —— 启用拖拽
- split_offset: int = 0 —— 分割偏移
- split_offsets: PackedInt32Array = PackedInt32Array(0) —— 分割偏移数组
- touch_dragger_enabled: bool = false —— 触摸拖拽启用
- vertical: bool = false —— 是否垂直

**方法（Methods）：**
- clamp_split_offset(priority_index: int = 0) —— 限制分割偏移
- get_drag_area_control() -> Control —— 获取拖拽区域控件
- get_drag_area_controls() -> Control[] —— 获取所有拖拽区域控件

**信号（Signals）：**
- drag_ended —— 拖拽结束
- drag_started —— 拖拽开始
- dragged(offset: int) —— 拖拽中

**枚举（Enums）：**
**DraggerVisibility（拖拽手柄可见性）：** DRAGGER_VISIBLE=0 —— 可见, DRAGGER_HIDDEN=1 —— 隐藏, DRAGGER_HIDDEN_COLLAPSED=2 —— 隐藏并折叠
