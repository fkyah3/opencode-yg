## VisualShaderNodeVectorFunc（可视化着色器节点向量函数） <- VisualShaderNodeVectorBase（可视化着色器节点向量基类）

能够对向量执行不同函数的可视化着色器节点。

**属性（Props）：**
- function: int (VisualShaderNodeVectorFunc.Function) = 0 —— 函数类型

**枚举（Enums）：**
**Function（函数）：** FUNC_NORMALIZE=0（归一化）, FUNC_SATURATE=1（饱和）, FUNC_NEGATE=2（取反）, FUNC_RECIPROCAL=3（倒数）, FUNC_ABS=4（绝对值）, FUNC_ACOS=5（反余弦）, FUNC_ACOSH=6（反双曲余弦）, FUNC_ASIN=7（反正弦）, FUNC_ASINH=8（反双曲正弦）, FUNC_ATAN=9（反正切）, ...
