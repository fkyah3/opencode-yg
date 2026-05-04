## VisualShaderNodeTransformOp（可视化着色器变换运算节点） <- VisualShaderNode（可视化着色器节点）

对两个变换矩阵（4×4 矩阵）输入应用 `operator` 运算。

**属性（Props）：**
- operator: int (VisualShaderNodeTransformOp.Operator) = 0 —— 运算符

**枚举（Enums）：**
**Operator（运算符）：** OP_AxB=0 —— A乘B, OP_BxA=1 —— B乘A, OP_AxB_COMP=2 —— A乘B（分量）, OP_BxA_COMP=3 —— B乘A（分量）, OP_ADD=4 —— 加, OP_A_MINUS_B=5 —— A减B, OP_B_MINUS_A=6 —— B减A, OP_A_DIV_B=7 —— A除以B, OP_B_DIV_A=8 —— B除以A, OP_MAX=9 —— 最大值
