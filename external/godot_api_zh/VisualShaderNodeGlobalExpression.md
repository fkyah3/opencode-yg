## VisualShaderNodeGlobalExpression（可视化着色器全局表达式节点） <- VisualShaderNodeExpression（可视化着色器表达式节点）

自定义 Godot 着色语言表达式，放置在生成的着色器顶部。你可以在其中定义各种函数，供后续在 VisualShaderNodeExpression（注入到主着色器函数中）中调用。还可以声明 varying、uniform 和全局常量。
