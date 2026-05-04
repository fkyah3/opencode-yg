## VisualShaderNodeUIntOp（可视化着色器无符号整数运算节点） <- VisualShaderNode（可视化着色器节点）

对两个无符号整数输入 `a` 和 `b` 应用 `operator` 运算。

**属性（Props）：**
- operator: int (VisualShaderNodeUIntOp.Operator) = 0 —— 运算符

**枚举（Enums）：**
**Operator（运算符）：** OP_ADD=0 —— 加, OP_SUB=1 —— 减, OP_MUL=2 —— 乘, OP_DIV=3 —— 除, OP_MOD=4 —— 取模, OP_MAX=5 —— 最大值, OP_MIN=6 —— 最小值, OP_BITWISE_AND=7 —— 按位与, OP_BITWISE_OR=8 —— 按位或, OP_BITWISE_XOR=9 —— 按位异或, ...
