## XRController3D <- XRNode3D（XR节点3D）

这是一个辅助 3D 节点，与控制器的追踪相关联。它还提供了几个方便的通道，用于获取控制器按钮等状态。控制器通过其 ID 进行关联。可以在控制器可用之前创建控制器节点。如果你的游戏总是使用两个控制器（每只手一个），可以预定义 ID 为 1 和 2 的控制器；一旦识别到控制器，它们就会变为活动状态。如果预计会使用额外的控制器，应响应信号并将 XRController3D 节点添加到场景中。控制器节点的位置由 XRServer 自动更新。这使得此节点非常适合添加子节点来可视化控制器。当前的 XRInterface 定义了输入的名称。对于 OpenXR，这些是 OpenXR 动作映射中当前动作集的名称。

**方法（Methods）：**
- get_float(name: StringName) -> float —— 获取浮点输入
- get_input(name: StringName) -> Variant —— 获取输入
- get_tracker_hand() -> int —— 获取追踪器手部
- get_vector2(name: StringName) -> Vector2 —— 获取Vector2输入
- is_button_pressed(name: StringName) -> bool —— 按钮是否按下

**信号（Signals）：**
- button_pressed(name: String) —— 按钮按下
- button_released(name: String) —— 按钮释放
- input_float_changed(name: String, value: float) —— 浮点输入变化
- input_vector2_changed(name: String, value: Vector2) —— Vector2输入变化
- profile_changed(role: String) —— 配置文件变更
