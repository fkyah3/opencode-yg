## VisualShaderNodeExpression（视觉着色器节点表达式） <- VisualShaderNodeGroupBase（视觉着色器节点组基类）

自定义 Godot 着色语言表达式，具有自定义数量的输入和输出端口。提供的代码直接注入到图形的匹配着色器函数（`vertex`、`fragment` 或 `light`）中，因此不能用于声明函数、varying 变量、uniform 变量或全局常量。请参阅 VisualShaderNodeGlobalExpression 以了解此类全局定义。

**属性（Props）：**
- expression: String = "" —— 表达式
