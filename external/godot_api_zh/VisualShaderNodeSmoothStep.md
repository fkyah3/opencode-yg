## VisualShaderNodeSmoothStep（可视化着色器节点平滑步进）<- VisualShaderNode（可视化着色器节点）

在着色器语言中对应 `smoothstep(edge0, edge1, x)`。如果 `x` 小于 `edge0` 则返回 `0.0`，如果 `x` 大于 `edge1` 则返回 `1.0`。否则，返回值使用 Hermite 多项式在 `0.0` 和 `1.0` 之间插值。

**属性（Props）：**
- op_type: int (VisualShaderNodeSmoothStep.OpType) = 0 —— 操作类型

**枚举（Enums）：**
**OpType：** OP_TYPE_SCALAR=0 —— 标量, OP_TYPE_VECTOR_2D=1 —— 二维向量, OP_TYPE_VECTOR_2D_SCALAR=2 —— 二维向量标量, OP_TYPE_VECTOR_3D=3 —— 三维向量, OP_TYPE_VECTOR_3D_SCALAR=4 —— 三维向量标量, OP_TYPE_VECTOR_4D=5 —— 四维向量, OP_TYPE_VECTOR_4D_SCALAR=6 —— 四维向量标量, OP_TYPE_MAX=7
