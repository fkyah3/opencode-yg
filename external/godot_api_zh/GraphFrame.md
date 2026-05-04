## GraphFrame（图形框架） <- GraphElement（图形元素）

GraphFrame 是一种特殊的 GraphElement，其他 GraphElement 可以附加到其上。它可以配置为自动调整大小以包围所有附加的 GraphElement。如果移动框架，其内部所有附加的 GraphElement 也会随之移动。GraphFrame 始终保持在连接层和 GraphEdit 中其他 GraphElement 的后面。

**属性（Props）：**
- autoshrink_enabled: bool = true —— 是否启用自动收缩
- autoshrink_margin: int = 40 —— 自动收缩边距
- drag_margin: int = 16 —— 拖动边距
- mouse_filter: int (Control.MouseFilter) = 0 —— 鼠标过滤
- tint_color: Color = Color(0.3, 0.3, 0.3, 0.75) —— 色调颜色
- tint_color_enabled: bool = false —— 是否启用色调颜色
- title: String = "" —— 标题

**方法（Methods）：**
- get_titlebar_hbox() -> HBoxContainer —— 获取标题栏的水平盒子容器

**信号（Signals）：**
- autoshrink_changed —— 自动收缩属性已改变
