## VisualShaderNodeMix（可视化着色器混合节点） <- VisualShaderNode（可视化着色器节点）

对应着色器语言中的 `mix(a, b, weight)`。

**属性（Props）：**
- op_type: int (VisualShaderNodeMix.OpType) = 0 —— 操作类型

**枚举（Enums）：**
**OpType（操作类型）：** OP_TYPE_SCALAR=0 —— 标量, OP_TYPE_VECTOR_2D=1 —— 2D向量, OP_TYPE_VECTOR_2D_SCALAR=2 —— 2D向量+标量权重, OP_TYPE_VECTOR_3D=3 —— 3D向量, OP_TYPE_VECTOR_3D_SCALAR=4 —— 3D向量+标量权重, OP_TYPE_VECTOR_4D=5 —— 4D向量, OP_TYPE_VECTOR_4D_SCALAR=6 —— 4D向量+标量权重, OP_TYPE_MAX=7 —— 最大值
