## XRHandTracker <- XRPositionalTracker（位置追踪器）

手部追踪系统将创建此对象的实例并将其添加到 XRServer。然后，此追踪系统将获取骨骼数据，将其转换为 Godot 人形手部骨骼，并将此数据存储在 XRHandTracker 对象上。使用 XRHandModifier3D 通过手部追踪数据驱动手部网格动画。

**属性（Props）：**
- hand: int (XRPositionalTracker.TrackerHand) = 1 —— 手部
- hand_tracking_source: int (XRHandTracker.HandTrackingSource) = 0 —— 手部追踪源
- has_tracking_data: bool = false —— 是否有追踪数据
- type: int (XRServer.TrackerType) = 16 —— 追踪器类型

**方法（Methods）：**
- get_hand_joint_angular_velocity(joint: int) -> Vector3 —— 获取手部关节角速度
- get_hand_joint_flags(joint: int) -> int —— 获取手部关节标志
- get_hand_joint_linear_velocity(joint: int) -> Vector3 —— 获取手部关节线速度
- get_hand_joint_radius(joint: int) -> float —— 获取手部关节半径
- get_hand_joint_transform(joint: int) -> Transform3D —— 获取手部关节变换
- set_hand_joint_angular_velocity(joint: int, angular_velocity: Vector3) —— 设置手部关节角速度
- set_hand_joint_flags(joint: int, flags: int) —— 设置手部关节标志
- set_hand_joint_linear_velocity(joint: int, linear_velocity: Vector3) —— 设置手部关节线速度
- set_hand_joint_radius(joint: int, radius: float) —— 设置手部关节半径
- set_hand_joint_transform(joint: int, transform: Transform3D) —— 设置手部关节变换

**枚举（Enums）：**
**HandTrackingSource（手部追踪源）：** HAND_TRACKING_SOURCE_UNKNOWN=0（未知）, HAND_TRACKING_SOURCE_UNOBSTRUCTED=1（无遮挡）, HAND_TRACKING_SOURCE_CONTROLLER=2（控制器）, HAND_TRACKING_SOURCE_NOT_TRACKED=3（未追踪）, HAND_TRACKING_SOURCE_MAX=4（最大值）
**HandJoint（手部关节）：** HAND_JOINT_PALM=0（手掌）, HAND_JOINT_WRIST=1（手腕）, HAND_JOINT_THUMB_METACARPAL=2（拇指掌骨）, HAND_JOINT_THUMB_PHALANX_PROXIMAL=3（拇指近节指骨）, HAND_JOINT_THUMB_PHALANX_DISTAL=4（拇指远节指骨）, HAND_JOINT_THUMB_TIP=5（拇指尖）, HAND_JOINT_INDEX_FINGER_METACARPAL=6（食指掌骨）, HAND_JOINT_INDEX_FINGER_PHALANX_PROXIMAL=7（食指近节指骨）, HAND_JOINT_INDEX_FINGER_PHALANX_INTERMEDIATE=8（食指中节指骨）, HAND_JOINT_INDEX_FINGER_PHALANX_DISTAL=9（食深远节指骨）, ...
**HandJointFlags（手部关节标志）：** HAND_JOINT_FLAG_ORIENTATION_VALID=1（方向有效）, HAND_JOINT_FLAG_ORIENTATION_TRACKED=2（方向被追踪）, HAND_JOINT_FLAG_POSITION_VALID=4（位置有效）, HAND_JOINT_FLAG_POSITION_TRACKED=8（位置被追踪）, HAND_JOINT_FLAG_LINEAR_VELOCITY_VALID=16（线速度有效）, HAND_JOINT_FLAG_ANGULAR_VELOCITY_VALID=32（角速度有效）
