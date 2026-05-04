## Performance（性能） <- Object（对象）

该类提供对多个性能相关监视器的访问，如内存使用、绘制调用数和 FPS。这些值与编辑器 **调试器（Debugger）** 面板的 **监视器（Monitor）** 选项卡中显示的值相同。通过使用此类的 `get_monitor` 方法，您可以从代码中访问这些数据。您可以使用 `add_custom_monitor` 方法添加自定义监视器。自定义监视器在编辑器 **调试器（Debugger）** 面板的 **监视器（Monitor）** 选项卡中与内置监视器一起显示。**注意：** 某些内置监视器仅在调试模式下可用，在以发布模式导出的项目中始终返回 `0`。**注意：** 出于性能考虑，某些内置监视器不会实时更新，因此更改后可能有最多 1 秒的延迟。**注意：** 自定义监视器不支持负值。负值将被限制为 0。

**方法（Methods）：**
- add_custom_monitor(id: StringName, callable: Callable, arguments: Array = [], type: int = 0) —— 添加自定义监视器
- get_custom_monitor(id: StringName) -> Variant —— 获取自定义监视器
- get_custom_monitor_names() -> StringName[] —— 获取自定义监视器名称列表
- get_custom_monitor_types() -> PackedInt32Array —— 获取自定义监视器类型列表
- get_monitor(monitor: int) -> float —— 获取监视器值
- get_monitor_modification_time() -> int —— 获取监视器修改时间
- has_custom_monitor(id: StringName) -> bool —— 是否有自定义监视器
- remove_custom_monitor(id: StringName) —— 移除自定义监视器

**枚举（Enums）：**
**Monitor（监视器）：** TIME_FPS=0 —— FPS, TIME_PROCESS=1 —— 处理时间, TIME_PHYSICS_PROCESS=2 —— 物理处理时间, TIME_NAVIGATION_PROCESS=3 —— 导航处理时间, MEMORY_STATIC=4 —— 静态内存, MEMORY_STATIC_MAX=5 —— 最大静态内存, MEMORY_MESSAGE_BUFFER_MAX=6 —— 最大消息缓冲区, OBJECT_COUNT=7 —— 对象数量, OBJECT_RESOURCE_COUNT=8 —— 资源数量, OBJECT_NODE_COUNT=9 —— 节点数量, ...
**MonitorType（监视器类型）：** MONITOR_TYPE_QUANTITY=0 —— 数量, MONITOR_TYPE_MEMORY=1 —— 内存, MONITOR_TYPE_TIME=2 —— 时间, MONITOR_TYPE_PERCENTAGE=3 —— 百分比
