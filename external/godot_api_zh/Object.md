## Object（对象）

一个高级 Variant 类型。引擎中的所有类都继承自 Object。每个类可以定义新的属性、方法或信号，这些对所有继承类可用。例如，Sprite2D 实例能够调用 `Node.add_child`，因为它继承自 Node。您可以使用 GDScript 中的 `Object.new()` 或 C# 中的 `new GodotObject` 创建新实例。要删除 Object 实例，请调用 `free`。这对于大多数继承自 Object 的类是必需的，因为它们不自行管理内存，在不再使用时会导致内存泄漏。有少数类会进行内存管理。例如，RefCounted（及其子类 Resource）在不再被引用时自动删除自身，Node 在释放时删除其子节点。对象可以附加脚本（Script）。一旦脚本被实例化，它实际上充当基类的扩展，允许定义和继承新的属性、方法和信号。在脚本内部，可以重写 `_get_property_list` 以多种方式自定义属性。这使它们对编辑器可用，显示为选项列表，细分为组，保存到磁盘等。脚本语言提供了更简单的方法来自定义属性，例如使用 [annotation @GDScript.@export] 注解。Godot 非常动态。对象的脚本及其属性、方法和信号可以在运行时更改。因此，有时可能会出现方法所需的属性不存在的情况。要防止运行时错误，请参见 `set`、`get`、`call`、`has_method`、`has_signal` 等方法。请注意，这些方法比直接引用**慢得多**。在 GDScript 中，您也可以使用 `in` 运算符检查对象中是否存在给定的属性、方法或信号名称：通知是对象通常发送和接收的 [int] 常量。例如，在每个渲染帧上，SceneTree 会使用 `Node.NOTIFICATION_ENTER_TREE` 和 `Node.NOTIFICATION_EXIT_TREE` 通知树内的节点。

**方法（Methods）：**
- add_user_signal(signal: String, arguments: Array = []) —— 添加用户信号
- call(method: StringName) -> Variant —— 调用方法
- call_deferred(method: StringName) -> Variant —— 延迟调用方法
- callv(method: StringName, arg_array: Array) -> Variant —— 以数组为参数调用方法
- can_translate_messages() -> bool —— 是否可以翻译消息
- cancel_free() —— 取消释放
- connect(signal: StringName, callable: Callable, flags: int = 0) -> int —— 连接信号
- disconnect(signal: StringName, callable: Callable) —— 断开信号连接
- emit_signal(signal: StringName) -> int —— 发射信号
- free() —— 释放对象
- get(property: StringName) -> Variant —— 获取属性
- get_class() -> String —— 获取类名
- get_incoming_connections() -> Dictionary[] —— 获取传入连接
- get_indexed(property_path: NodePath) -> Variant —— 通过索引路径获取属性
- get_instance_id() -> int —— 获取实例 ID
- get_meta(name: StringName, default: Variant = null) -> Variant —— 获取元数据
- get_meta_list() -> StringName[] —— 获取元数据名称列表
- get_method_argument_count(method: StringName) -> int —— 获取方法参数数量
- get_method_list() -> Dictionary[] —— 获取方法列表
- get_property_list() -> Dictionary[] —— 获取属性列表
- get_script() -> Variant —— 获取脚本
- get_signal_connection_list(signal: StringName) -> Dictionary[] —— 获取信号连接列表
- get_signal_list() -> Dictionary[] —— 获取信号列表
- get_translation_domain() -> StringName —— 获取翻译域
- has_connections(signal: StringName) -> bool —— 是否有信号连接
- has_meta(name: StringName) -> bool —— 是否有元数据
- has_method(method: StringName) -> bool —— 是否有方法
- has_signal(signal: StringName) -> bool —— 是否有信号
- has_user_signal(signal: StringName) -> bool —— 是否有用户信号
- is_blocking_signals() -> bool —— 是否阻塞信号
- is_class(class: String) -> bool —— 是否是指定类
- is_connected(signal: StringName, callable: Callable) -> bool —— 信号是否已连接
- is_queued_for_deletion() -> bool —— 是否排队等待删除
- notification(what: int, reversed: bool = false) —— 发送通知
- notify_property_list_changed() —— 通知属性列表已更改
- property_can_revert(property: StringName) -> bool —— 属性是否可以还原
- property_get_revert(property: StringName) -> Variant —— 获取属性还原值
- remove_meta(name: StringName) —— 移除元数据
- remove_user_signal(signal: StringName) —— 移除用户信号
- set(property: StringName, value: Variant) —— 设置属性
- set_block_signals(enable: bool) —— 设置阻塞信号
- set_deferred(property: StringName, value: Variant) —— 延迟设置属性
- set_indexed(property_path: NodePath, value: Variant) —— 通过索引路径设置属性
- set_message_translation(enable: bool) —— 设置消息翻译
- set_meta(name: StringName, value: Variant) —— 设置元数据
- set_script(script: Variant) —— 设置脚本
- set_translation_domain(domain: StringName) —— 设置翻译域
- to_string() -> String —— 转换为字符串
- tr(message: StringName, context: StringName = &"") -> String —— 翻译消息
- tr_n(message: StringName, plural_message: StringName, n: int, context: StringName = &"") -> String —— 翻译复数消息

**信号（Signals）：**
- property_list_changed —— 属性列表改变时触发
- script_changed —— 脚本改变时触发

**枚举（Enums）：**
**常量（Constants）：** NOTIFICATION_POSTINITIALIZE=0 —— 后初始化通知, NOTIFICATION_PREDELETE=1 —— 预删除通知, NOTIFICATION_EXTENSION_RELOADED=2 —— 扩展重载通知
**ConnectFlags（连接标志）：** CONNECT_DEFERRED=1 —— 延迟连接, CONNECT_PERSIST=2 —— 持久连接, CONNECT_ONE_SHOT=4 —— 单次连接, CONNECT_REFERENCE_COUNTED=8 —— 引用计数连接, CONNECT_APPEND_SOURCE_OBJECT=16 —— 附加源对象
