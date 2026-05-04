## VisualShaderNodeFloatOp（可视化着色器节点浮点运算） <- VisualShaderNode（可视化着色器节点）

对两个浮点输入 `a` 和 `b` 应用 `operator` 运算。

**属性（Props）：**
- operator: int (VisualShaderNodeFloatOp.Operator) = 0 —— 运算符

**枚举（Enums）：**
**Operator（运算符）：** OP_ADD=0 —— 加, OP_SUB=1 —— 减, OP_MUL=2 —— 乘, OP_DIV=3 —— 除, OP_MOD=4 —— 取模, OP_POW=5 —— 幂, OP_MAX=6 —— 最大值, OP_MIN=7 —— 最小值, OP_ATAN2=8 —— 反正切2, OP_STEP=9 —— 阶跃, ...
