## XRNode3D（XR节点3D）<- Node3D（节点3D）

此节点可以绑定到 XRPositionalTracker 的特定姿势，其 `Node3D.transform` 将由 XRServer 自动更新。此类型的节点必须作为 XROrigin3D 节点的子节点添加。

**属性（Props）：**
- physics_interpolation_mode: int (Node.PhysicsInterpolationMode) = 2 —— 物理插值模式
- pose: StringName = &"default" —— 姿势
- show_when_tracked: bool = false —— 追踪时显示
- tracker: StringName = &"" —— 追踪器

**方法（Methods）：**
- get_has_tracking_data() -> bool —— 是否有追踪数据
- get_is_active() -> bool —— 是否激活
- get_pose() -> XRPose —— 获取姿势
- trigger_haptic_pulse(action_name: String, frequency: float, amplitude: float, duration_sec: float, delay_sec: float) —— 触发触觉脉冲

**信号（Signals）：**
- tracking_changed(tracking: bool) —— 追踪已更改
