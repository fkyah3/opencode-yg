## VisualShaderNodeFrame（可视化着色器节点框架）<- VisualShaderNodeResizableBase（可视化着色器节点可调整大小基类）

一个矩形框架，用于将可视化着色器节点分组以改善组织性。附加到框架的节点在拖动时会随框架移动，并且框架可以自动调整大小以包围所有附加节点。其标题、描述和颜色可自定义。

**属性（Props）：**
- attached_nodes: PackedInt32Array = PackedInt32Array() —— 附加节点
- autoshrink: bool = true —— 自动收缩
- tint_color: Color = Color(0.3, 0.3, 0.3, 0.75) —— 色调颜色
- tint_color_enabled: bool = false —— 启用色调颜色
- title: String = "Title" —— 标题

**方法（Methods）：**
- add_attached_node(node: int) —— 添加附加节点
- remove_attached_node(node: int) —— 移除附加节点
