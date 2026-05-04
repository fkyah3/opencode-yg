## VisualShaderNodeDerivativeFunc（可视化着色器节点导数函数）<- VisualShaderNode（可视化着色器节点）

此节点仅在 `Fragment` 和 `Light` 可视化着色器中可用。

**属性（Props）：**
- function: int (VisualShaderNodeDerivativeFunc.Function) = 0 —— 函数类型
- op_type: int (VisualShaderNodeDerivativeFunc.OpType) = 0 —— 操作类型
- precision: int (VisualShaderNodeDerivativeFunc.Precision) = 0 —— 精度

**枚举（Enums）：**
**OpType：** OP_TYPE_SCALAR=0 —— 标量, OP_TYPE_VECTOR_2D=1 —— 二维向量, OP_TYPE_VECTOR_3D=2 —— 三维向量, OP_TYPE_VECTOR_4D=3 —— 四维向量, OP_TYPE_MAX=4
**Function：** FUNC_SUM=0 —— 求和, FUNC_X=1 —— X方向, FUNC_Y=2 —— Y方向, FUNC_MAX=3
**Precision：** PRECISION_NONE=0 —— 无精度要求, PRECISION_COARSE=1 —— 粗略精度, PRECISION_FINE=2 —— 精细精度, PRECISION_MAX=3
