## VisualShaderNodeVectorOp（可视化着色器向量运算节点） <- VisualShaderNodeVectorBase（可视化着色器向量基类）

用于向量运算的可视化着色器节点。对向量 `a` 和向量 `b` 进行运算。

**属性（Props）：**
- operator: int (VisualShaderNodeVectorOp.Operator) = 0 —— 运算符

**枚举（Enums）：**
**Operator（运算符）：** OP_ADD=0 —— 加, OP_SUB=1 —— 减, OP_MUL=2 —— 乘, OP_DIV=3 —— 除, OP_MOD=4 —— 取模, OP_POW=5 —— 幂, OP_MAX=6 —— 最大值, OP_MIN=7 —— 最小值, OP_CROSS=8 —— 叉积, OP_ATAN2=9 —— 反正切, ...
