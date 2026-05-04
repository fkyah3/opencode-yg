## VisualShaderNodeMultiplyAdd（可视化着色器节点乘加） <- VisualShaderNode（可视化着色器节点）

使用三个操作数计算 `(a * b + c)` 表达式。

**属性（Props）：**
- op_type: int (VisualShaderNodeMultiplyAdd.OpType) = 0 —— 操作类型

**枚举（Enums）：**
**OpType（操作类型）：** OP_TYPE_SCALAR=0 —— 标量, OP_TYPE_VECTOR_2D=1 —— 二维向量, OP_TYPE_VECTOR_3D=2 —— 三维向量, OP_TYPE_VECTOR_4D=3 —— 四维向量, OP_TYPE_MAX=4
