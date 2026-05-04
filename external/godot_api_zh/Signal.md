## Signal（信号）

Signal 是一种内置 Variant 类型，表示 Object 实例的信号。与所有 Variant 类型一样，它可以存储在变量中并传递给函数。信号允许所有连接的 Callable（以及扩展的各自对象）监听和响应事件，而无需直接引用彼此。这保持了代码的灵活性和可管理性。你可以使用 `Object.has_signal` 检查对象是否具有给定的信号名称。在 GDScript 中，信号可以使用 `signal` 关键字声明。在 C# 中，你可以在委托上使用 `Signal` 属性。连接信号是 Godot 中最常见的操作之一，API 提供了多种方式来实现，如下所述。下面的代码块展示了推荐的方法。**[code skip-lint]Object.connect()[/code] 还是 [code skip-lint]Signal.connect()[/code]？** 如上所述，推荐的信号连接方法不是 `Object.connect`。下面的代码块展示了连接信号的四种选项，使用此旧方法或推荐的 `Signal.connect`，以及使用隐式 Callable 或手动定义的 Callable。虽然所有选项的结果相同（`button` 的 `BaseButton.button_down` 信号将连接到 `_on_button_down`），但**选项 3** 提供了最佳验证：如果 `button_down` 信号或 `_on_button_down` Callable 未定义，它将在编译时打印错误。而**选项 2** 仅依赖于字符串名称，只能在运行时验证名称：如果 `"button_down"` 不是信号，或者 `"_on_button_down"` 不是对象 `self` 中的方法，它将在运行时生成错误。使用选项 1、2 或 4 的主要原因是你确实需要使用字符串（例如，根据配置文件读取的字符串以编程方式连接信号）。否则，选项 3 是推荐的（也是最快的）方法。**绑定和传递参数：** 绑定参数的语法是通过 `bind` 方法（在 Callable 上）。当信号触发时，绑定的参数将附加到信号参数之后。

**方法（Methods）：**
- connect(callable: Callable, flags: int = 0) -> int —— 连接信号
- disconnect(callable: Callable) —— 断开连接
- emit() —— 发射信号
- get_connections() -> Array —— 获取所有连接
- get_name() -> StringName —— 获取信号名称
- get_object() -> Object —— 获取所属对象
- get_object_id() -> int —— 获取对象 ID
- has_connections() -> bool —— 是否有连接
- is_connected(callable: Callable) -> bool —— 是否已连接
- is_null() -> bool —— 是否为空
