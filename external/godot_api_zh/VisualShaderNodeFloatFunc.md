## VisualShaderNodeFloatFunc（可视化着色器浮点函数节点） <- VisualShaderNode（可视化着色器节点）

接收浮点标量（`x`）到输入端口，并根据 `function` 进行变换。

**属性（Props）：**
- function: int (VisualShaderNodeFloatFunc.Function) = 13 —— 函数类型

**枚举（Enums）：**
**Function（函数）：** FUNC_SIN=0 —— 正弦, FUNC_COS=1 —— 余弦, FUNC_TAN=2 —— 正切, FUNC_ASIN=3 —— 反正弦, FUNC_ACOS=4 —— 反余弦, FUNC_ATAN=5 —— 反正切, FUNC_SINH=6 —— 双曲正弦, FUNC_COSH=7 —— 双曲余弦, FUNC_TANH=8 —— 双曲正切, FUNC_LOG=9 —— 自然对数, ...
