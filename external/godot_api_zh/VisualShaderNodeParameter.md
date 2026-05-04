## VisualShaderNodeParameter（可视化着色器节点参数） <- VisualShaderNode（可视化着色器节点）

参数代表着色器中从外部（即从 ShaderMaterial）设置的变量。参数作为 ShaderMaterial 的属性暴露出来，可以从检视器或脚本中赋值。

**Props（属性）：**
- instance_index: int = 0 —— 实例索引
- parameter_name: String = "" —— 参数名称
- qualifier: int (VisualShaderNodeParameter.Qualifier) = 0 —— 限定符

**Enums（枚举）：**
**Qualifier（限定符）：** QUAL_NONE=0 —— 无，QUAL_GLOBAL=1 —— 全局，QUAL_INSTANCE=2 —— 实例，QUAL_INSTANCE_INDEX=3 —— 实例索引，QUAL_MAX=4 —— 最大值
