## VisualShaderNodeIntParameter（可视化着色器节点整数参数） <- VisualShaderNodeParameter（可视化着色器节点参数）

[int] 类型的 VisualShaderNodeParameter。提供对可接受值范围的额外自定义。

**Props（属性）：**
- default_value: int = 0 —— 默认值
- default_value_enabled: bool = false —— 是否启用默认值
- enum_names: PackedStringArray = PackedStringArray() —— 枚举名称列表
- hint: int (VisualShaderNodeIntParameter.Hint) = 0 —— 提示类型
- max: int = 100 —— 最大值
- min: int = 0 —— 最小值
- step: int = 1 —— 步长

**Enums（枚举）：**
**Hint（提示）：** HINT_NONE=0 —— 无，HINT_RANGE=1 —— 范围，HINT_RANGE_STEP=2 —— 范围步长，HINT_ENUM=3 —— 枚举，HINT_MAX=4 —— 最大值
