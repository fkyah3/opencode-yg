## VisualShaderNodeTransformVecMult（可视化着色器变换向量乘法节点） <- VisualShaderNode（可视化着色器节点）

对变换矩阵（4×4 矩阵）和向量执行乘法运算，支持不同的乘法运算符。

**属性（Props）：**
- operator: int (VisualShaderNodeTransformVecMult.Operator) = 0 —— 运算符

**枚举（Enums）：**
**Operator（运算符）：** OP_AxB=0 —— A乘B, OP_BxA=1 —— B乘A, OP_3x3_AxB=2 —— 3x3矩阵A乘B, OP_3x3_BxA=3 —— 3x3矩阵B乘A, OP_MAX=4 —— 最大值
