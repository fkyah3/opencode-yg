## Expression（表达式）<- RefCounted（引用计数）

表达式可以由任何算术运算、内置数学函数调用、传入实例的方法调用或内置类型构造调用组成。使用内置数学函数的表达式文本示例可以是 `sqrt(pow(3, 2) + pow(4, 2))`。在以下示例中，我们使用 LineEdit 节点编写表达式并显示结果。

**方法（Methods）：**
- execute(inputs: Array = [], base_instance: Object = null, show_error: bool = true, const_calls_only: bool = false) -> Variant —— 执行
- get_error_text() -> String —— 获取错误文本
- has_execute_failed() -> bool —— 是否执行失败
- parse(expression: String, input_names: PackedStringArray = PackedStringArray()) -> int —— 解析
