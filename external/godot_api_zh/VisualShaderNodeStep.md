## VisualShaderNodeStep（视觉着色器节点-Step） <- VisualShaderNode（视觉着色器节点）

在着色器语言中翻译为 `step(edge, x)`。如果 `x` 小于 `edge` 则返回 `0.0`，否则返回 `1.0`。

**属性（Props）：**
- op_type: int (VisualShaderNodeStep.OpType) = 0 —— 操作类型

**枚举（Enums）：**
**OpType（操作类型）：** OP_TYPE_SCALAR=0 —— 标量, OP_TYPE_VECTOR_2D=1 —— 二维向量, OP_TYPE_VECTOR_2D_SCALAR=2 —— 二维向量标量, OP_TYPE_VECTOR_3D=3 —— 三维向量, OP_TYPE_VECTOR_3D_SCALAR=4 —— 三维向量标量, OP_TYPE_VECTOR_4D=5 —— 四维向量, OP_TYPE_VECTOR_4D_SCALAR=6 —— 四维向量标量, OP_TYPE_MAX=7
