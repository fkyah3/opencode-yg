## VisualShaderNodeTransformFunc（变换函数节点）<- VisualShaderNode（可视化着色器节点）

对传入的 Transform3D 计算逆矩阵或转置矩阵。

**属性（Props）：**
- function: int (VisualShaderNodeTransformFunc.Function) = 0 —— 变换函数

**枚举（Enums）：**
**Function（函数）：** FUNC_INVERSE=0 —— 逆矩阵, FUNC_TRANSPOSE=1 —— 转置矩阵, FUNC_MAX=2 —— 最大值
