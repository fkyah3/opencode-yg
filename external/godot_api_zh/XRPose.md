## XRPose（XR姿态） <- RefCounted（引用计数）

XR 运行时通常会识别控制器等设备上的多个空间追踪位置。XR 运行时为每个姿态提供了朝向、位置、线速度和角速度。此对象包含一个姿态的状态。

**属性（Props）：**
- angular_velocity: Vector3 = Vector3(0, 0, 0) —— 角速度
- has_tracking_data: bool = false —— 是否有追踪数据
- linear_velocity: Vector3 = Vector3(0, 0, 0) —— 线速度
- name: StringName = &"" —— 名称
- tracking_confidence: int (XRPose.TrackingConfidence) = 0 —— 追踪置信度
- transform: Transform3D = Transform3D(1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0) —— 变换

**方法（Methods）：**
- get_adjusted_transform() -> Transform3D —— 获取调整后的变换

**枚举（Enums）：**
**TrackingConfidence（追踪置信度）：** XR_TRACKING_CONFIDENCE_NONE=0, XR_TRACKING_CONFIDENCE_LOW=1, XR_TRACKING_CONFIDENCE_HIGH=2
