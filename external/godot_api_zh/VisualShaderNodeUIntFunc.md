## VisualShaderNodeUIntFunc（可视化着色器节点无符号整型函数） <- VisualShaderNode（可视化着色器节点）

接收无符号整数标量（`x`）输入，并根据 `function` 对其进行变换。

**属性（Props）：**
- function: int (VisualShaderNodeUIntFunc.Function) = 0 —— 函数类型

**枚举（Enums）：**
**Function（函数）：** FUNC_NEGATE=0 —— 取反, FUNC_BITWISE_NOT=1 —— 按位取反, FUNC_MAX=2 —— 最大值
