## ShaderMaterial（着色器材质） <- Material（材质）

使用自定义 Shader 程序来渲染视觉项（画布项、网格、天空、雾）或处理粒子的一种材质。与其他材质相比，ShaderMaterial 对生成的着色器代码提供了更深层次的控制。更多信息请参见下方的着色器文档索引。多个 ShaderMaterial 可以使用同一着色器并为着色器 uniform 配置不同的值。**注意：** 出于性能原因，`Resource.changed` 信号仅在 `Resource.resource_name` 改变时发出。仅在编辑器中，它也会在 `shader` 改变时发出。

**属性（Props）：**
- shader: Shader —— 着色器

**方法（Methods）：**
- get_shader_parameter(param: StringName) -> Variant —— 获取着色器参数
- set_shader_parameter(param: StringName, value: Variant) —— 设置着色器参数
