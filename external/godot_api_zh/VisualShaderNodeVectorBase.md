## VisualShaderNodeVectorBase（可视化着色器节点向量基类） <- VisualShaderNode（可视化着色器节点）

这是一个抽象类。有关可能操作的描述，请参见派生类型。

**属性（Props）：**
- op_type: int (VisualShaderNodeVectorBase.OpType) = 1 —— 操作类型

**枚举（Enums）：**
**OpType（操作类型）：** OP_TYPE_VECTOR_2D=0 —— 二维向量, OP_TYPE_VECTOR_3D=1 —— 三维向量, OP_TYPE_VECTOR_4D=2 —— 四维向量, OP_TYPE_MAX=3
