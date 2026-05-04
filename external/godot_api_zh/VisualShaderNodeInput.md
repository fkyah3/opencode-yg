## VisualShaderNodeInput（可视化着色器输入节点） <- VisualShaderNode（可视化着色器节点）

提供对着色器可用输入变量（内置变量）的访问。每种着色器类型可用的内置变量列表，请参阅着色参考文档（查看 `Tutorials` 章节获取链接）。

**属性（Props）：**
- input_name: String = "[None]" —— 输入变量名称

**方法（Methods）：**
- get_input_real_name() -> String —— 获取输入的实际名称

**信号（Signals）：**
- input_type_changed —— 输入类型改变时触发
