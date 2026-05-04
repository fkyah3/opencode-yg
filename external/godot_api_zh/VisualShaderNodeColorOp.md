## VisualShaderNodeColorOp（可视化着色器节点颜色运算） <- VisualShaderNode（可视化着色器节点）

对两个颜色输入应用 `operator` 运算。

**属性（Props）：**
- operator: int (VisualShaderNodeColorOp.Operator) = 0 —— 运算符

**枚举（Enums）：**
**Operator（运算符）：** OP_SCREEN=0 —— 滤色, OP_DIFFERENCE=1 —— 差值, OP_DARKEN=2 —— 变暗, OP_LIGHTEN=3 —— 变亮, OP_OVERLAY=4 —— 叠加, OP_DODGE=5 —— 减淡, OP_BURN=6 —— 烧灼, OP_SOFT_LIGHT=7 —— 柔光, OP_HARD_LIGHT=8 —— 强光, OP_MAX=9
