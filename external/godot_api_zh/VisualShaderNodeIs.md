## VisualShaderNodeIs（判断节点）<- VisualShaderNode（可视化着色器节点）

返回 `INF` 或 `NaN` 与标量参数比较的布尔结果。

**属性（Props）：**
- function: int (VisualShaderNodeIs.Function) = 0 —— 判断函数

**枚举（Enums）：**
**Function（函数）：** FUNC_IS_INF=0 —— 判断是否为无穷大, FUNC_IS_NAN=1 —— 判断是否为非数值, FUNC_MAX=2 —— 最大值
