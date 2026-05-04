## VisualShaderNodeCompare（可视化着色器节点比较） <- VisualShaderNode（可视化着色器节点）

用 `function` 比较 `type` 类型的 `a` 和 `b`。返回一个布尔标量。在着色器代码中转换为 `if` 指令。

**属性（Props）：**
- condition: int (VisualShaderNodeCompare.Condition) = 0 —— 条件
- function: int (VisualShaderNodeCompare.Function) = 0 —— 比较函数
- type: int (VisualShaderNodeCompare.ComparisonType) = 0 —— 比较类型

**枚举（Enums）：**
**ComparisonType（比较类型）：** CTYPE_SCALAR=0 —— 标量浮点, CTYPE_SCALAR_INT=1 —— 标量整数, CTYPE_SCALAR_UINT=2 —— 标量无符号整数, CTYPE_VECTOR_2D=3 —— 2D 向量, CTYPE_VECTOR_3D=4 —— 3D 向量, CTYPE_VECTOR_4D=5 —— 4D 向量, CTYPE_BOOLEAN=6 —— 布尔, CTYPE_TRANSFORM=7 —— 变换, CTYPE_MAX=8 —— 最大值
**Function（函数）：** FUNC_EQUAL=0 —— 等于, FUNC_NOT_EQUAL=1 —— 不等于, FUNC_GREATER_THAN=2 —— 大于, FUNC_GREATER_THAN_EQUAL=3 —— 大于等于, FUNC_LESS_THAN=4 —— 小于, FUNC_LESS_THAN_EQUAL=5 —— 小于等于, FUNC_MAX=6 —— 最大值
**Condition（条件）：** COND_ALL=0 —— 全部, COND_ANY=1 —— 任意, COND_MAX=2 —— 最大值
