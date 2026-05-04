## VisualShaderNodeRemap（视觉着色器节点重映射） <- VisualShaderNode（视觉着色器节点）

Remap 将输入范围转换为输出范围，例如，您可以将 `0..1` 值更改为 `-2..2` 等。更多详情请参阅 `@GlobalScope.remap`。

**属性（Props）：**
- op_type: int (VisualShaderNodeRemap.OpType) = 0 —— 操作类型

**枚举（Enums）：**
**OpType（操作类型）：** OP_TYPE_SCALAR=0 —— 标量, OP_TYPE_VECTOR_2D=1 —— 二维向量, OP_TYPE_VECTOR_2D_SCALAR=2 —— 二维向量标量, OP_TYPE_VECTOR_3D=3 —— 三维向量, OP_TYPE_VECTOR_3D_SCALAR=4 —— 三维向量标量, OP_TYPE_VECTOR_4D=5 —— 四维向量, OP_TYPE_VECTOR_4D_SCALAR=6 —— 四维向量标量, OP_TYPE_MAX=7
