## VisualShaderNodeSwitch（可视化着色器节点开关） <- VisualShaderNode（可视化着色器节点）

根据提供的布尔值为 `true` 或 `false`，返回 `op_type` 类型的相应值。

**属性（Props）：**
- op_type: int (VisualShaderNodeSwitch.OpType) = 0 —— 操作类型

**枚举（Enums）：**
**OpType（操作类型）：** OP_TYPE_FLOAT=0（浮点）, OP_TYPE_INT=1（整数）, OP_TYPE_UINT=2（无符号整数）, OP_TYPE_VECTOR_2D=3（二维向量）, OP_TYPE_VECTOR_3D=4（三维向量）, OP_TYPE_VECTOR_4D=5（四维向量）, OP_TYPE_BOOLEAN=6（布尔）, OP_TYPE_TRANSFORM=7（变换）, OP_TYPE_MAX=8（最大值）
