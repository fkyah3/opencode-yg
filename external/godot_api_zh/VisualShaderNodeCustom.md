## VisualShaderNodeCustom（可视化着色器节点自定义） <- VisualShaderNode（可视化着色器节点）

通过继承此类，您可以创建自定义可视化着色器脚本插件，该插件将自动添加到可视化着色器编辑器中。VisualShaderNode 的行为通过覆盖提供的虚方法来定义。为了使节点注册为编辑器插件，您必须使用 `@tool` 注解并为自定义脚本提供 `class_name`。例如：

**Methods（方法）：**
- get_option_index(option: int) -> int —— 获取选项索引
