## Callable（可调用对象）

Callable 是一种内置 Variant 类型，表示一个函数。它可以是 Object 实例中的方法，也可以是用于不同目的的自定义可调用对象（参见 `is_custom`）。与所有 Variant 类型一样，它可以存储在变量中并传递给其他函数。最常用于信号回调。在 GDScript 中，可以在方法内创建 lambda 函数。Lambda 函数是不与 Object 实例关联的自定义可调用对象。可选地，lambda 函数也可以有名称。该名称将显示在调试器中，或调用 `get_method` 时显示。在 GDScript 中，你可以将方法和全局函数作为 Callable 访问：**注意：** Dictionary 不支持上述方式，因为存在键的歧义。**注意：** 在布尔上下文中，如果 Callable 为 null，则求值为 `false`（参见 `is_null`）。否则，Callable 总是求值为 `true`。

**方法（Methods）：**
- bind() -> Callable —— 绑定参数
- bindv(arguments: Array) -> Callable —— 绑定参数数组
- call() -> Variant —— 调用
- call_deferred() —— 延迟调用
- callv(arguments: Array) -> Variant —— 调用参数数组
- create(variant: Variant, method: StringName) -> Callable —— 创建可调用对象
- get_argument_count() -> int —— 获取参数数量
- get_bound_arguments() -> Array —— 获取已绑定的参数
- get_bound_arguments_count() -> int —— 获取已绑定的参数数量
- get_method() -> StringName —— 获取方法名
- get_object() -> Object —— 获取对象
- get_object_id() -> int —— 获取对象 ID
- get_unbound_arguments_count() -> int —— 获取未绑定的参数数量
- hash() -> int —— 哈希值
- is_custom() -> bool —— 是否为自定义
- is_null() -> bool —— 是否为 null
- is_standard() -> bool —— 是否为标准
- is_valid() -> bool —— 是否有效
- rpc() —— 远程过程调用
- rpc_id(peer_id: int) —— 按对等 ID 远程过程调用
- unbind(argcount: int) -> Callable —— 解绑参数
