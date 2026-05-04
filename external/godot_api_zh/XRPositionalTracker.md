## XRPositionalTracker <- XRTracker（追踪器）

此对象的实例表示一个被追踪的设备，如控制器或锚点。头戴式显示器不在此处表示，因为它们由内部处理。当控制器开启且 XRInterface 检测到它们时，此对象的实例会自动添加到通过 XRServer 可访问的活动追踪对象列表中。XRNode3D 和 XRAnchor3D 都使用此类型的对象，应在项目中使用。位置追踪器只是使这一切工作的底层对象。它们主要被暴露是为了让基于 GDExtension 的接口能够与之交互。

**属性（Props）：**
- hand: int (XRPositionalTracker.TrackerHand) = 0 —— 手部
- profile: String = "" —— 配置文件

**方法（Methods）：**
- get_input(name: StringName) -> Variant —— 获取输入
- get_pose(name: StringName) -> XRPose —— 获取姿态
- has_pose(name: StringName) -> bool —— 是否有姿态
- invalidate_pose(name: StringName) —— 使姿态失效
- set_input(name: StringName, value: Variant) —— 设置输入
- set_pose(name: StringName, transform: Transform3D, linear_velocity: Vector3, angular_velocity: Vector3, tracking_confidence: int) —— 设置姿态

**信号（Signals）：**
- button_pressed(name: String) —— 按钮按下
- button_released(name: String) —— 按钮释放
- input_float_changed(name: String, value: float) —— 浮点输入变化
- input_vector2_changed(name: String, vector: Vector2) —— Vector2输入变化
- pose_changed(pose: XRPose) —— 姿态变更
- pose_lost_tracking(pose: XRPose) —— 姿态丢失追踪
- profile_changed(role: String) —— 配置文件变更

**枚举（Enums）：**
**TrackerHand（追踪器手部）：** TRACKER_HAND_UNKNOWN=0（未知）, TRACKER_HAND_LEFT=1（左手）, TRACKER_HAND_RIGHT=2（右手）, TRACKER_HAND_MAX=3（最大值）
