## VisualShaderNodeFloatParameter（可视化着色器节点浮点参数） <- VisualShaderNodeParameter（可视化着色器节点参数）

在着色器语言中翻译为 `uniform float`。

**属性（Props）：**
- default_value: float = 0.0 —— 默认值
- default_value_enabled: bool = false —— 是否启用默认值
- hint: int (VisualShaderNodeFloatParameter.Hint) = 0 —— 提示类型
- max: float = 1.0 —— 最大值
- min: float = 0.0 —— 最小值
- step: float = 0.1 —— 步长

**枚举（Enums）：**
**Hint（提示）：** HINT_NONE=0（无）, HINT_RANGE=1（范围）, HINT_RANGE_STEP=2（范围步进）, HINT_MAX=3（最大）
