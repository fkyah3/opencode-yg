## VisualShaderNodeIntFunc（可视化着色器节点整数函数） <- VisualShaderNode（可视化着色器节点）

接收整数标量（`x`）输入，并根据 `function` 对其进行变换。

**属性（Props）：**
- function: int (VisualShaderNodeIntFunc.Function) = 2 —— 函数类型

**枚举（Enums）：**
**Function（函数）：** FUNC_ABS=0 —— 绝对值, FUNC_NEGATE=1 —— 取反, FUNC_SIGN=2 —— 符号, FUNC_BITWISE_NOT=3 —— 按位取反, FUNC_MAX=4
