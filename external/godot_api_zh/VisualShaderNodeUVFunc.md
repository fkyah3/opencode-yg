## VisualShaderNodeUVFunc（可视化着色器节点UV函数） <- VisualShaderNode（可视化着色器节点）

UV 函数类似于 Vector2 函数，但该节点的输入端口默认使用着色器的 UV 值。

**属性（Props）：**
- function: int (VisualShaderNodeUVFunc.Function) = 0 —— 函数类型

**枚举（Enums）：**
**Function（函数）：** FUNC_PANNING=0 —— 平移, FUNC_SCALING=1 —— 缩放, FUNC_MAX=2
