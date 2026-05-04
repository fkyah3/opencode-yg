## Path3D（3D路径） <- Node3D（3D节点）

可以拥有沿 Curve3D 移动的 PathFollow3D 子节点。用法详见 PathFollow3D。注意路径被视为相对于移动的节点（PathFollow3D 的子节点），因此曲线通常应以零向量 `(0, 0, 0)` 开始。

**属性（Props）：**
- curve: Curve3D —— 曲线
- debug_custom_color: Color = Color(0, 0, 0, 1) —— 调试自定义颜色

**信号（Signals）：**
- curve_changed —— 曲线改变时触发
- debug_color_changed —— 调试颜色改变时触发
