## StyleBox（样式盒）<- Resource（资源）

StyleBox 是用于绘制 UI 元素样式化盒子的抽象基类。它用于面板、按钮、LineEdit 背景、Tree 背景等，也用于测试指针信号的透明遮罩。如果对作为遮罩分配给控件的 StyleBox 进行遮罩测试失败，则点击和移动信号将穿透到下方的控件。**注意：** 对于具有*主题属性*的控件节点，`focus` 样式盒显示在 `normal`、`hover` 或 `pressed` 样式盒之上。这使得 `focus` 样式盒在不同节点之间更易复用。

**属性（Props）：**
- content_margin_bottom: float = -1.0 —— 内容底部边距
- content_margin_left: float = -1.0 —— 内容左边距
- content_margin_right: float = -1.0 —— 内容右边距
- content_margin_top: float = -1.0 —— 内容顶部边距

**方法（Methods）：**
- draw(canvas_item: RID, rect: Rect2) —— 绘制
- get_content_margin(margin: int) -> float —— 获取内容边距
- get_current_item_drawn() -> CanvasItem —— 获取当前绘制的项目
- get_margin(margin: int) -> float —— 获取边距
- get_minimum_size() -> Vector2 —— 获取最小尺寸
- get_offset() -> Vector2 —— 获取偏移
- set_content_margin(margin: int, offset: float) —— 设置内容边距
- set_content_margin_all(offset: float) —— 设置所有内容边距
- test_mask(point: Vector2, rect: Rect2) -> bool —— 测试遮罩
