## XRBodyTracker <- XRPositionalTracker（位置追踪器）

人体追踪系统将创建此对象的实例并将其添加到 XRServer。然后，此追踪系统将获取骨骼数据，将其转换为 Godot 人形骨骼，并将此数据存储在 XRBodyTracker 对象上。使用 XRBodyModifier3D 通过身体追踪数据驱动身体网格动画。

**属性（Props）：**
- body_flags: int (XRBodyTracker.BodyFlags) = 0 —— 身体标志
- has_tracking_data: bool = false —— 是否有追踪数据
- type: int (XRServer.TrackerType) = 32 —— 追踪器类型

**方法（Methods）：**
- get_joint_flags(joint: int) -> int —— 获取关节标志
- get_joint_transform(joint: int) -> Transform3D —— 获取关节变换
- set_joint_flags(joint: int, flags: int) —— 设置关节标志
- set_joint_transform(joint: int, transform: Transform3D) —— 设置关节变换

**枚举（Enums）：**
**BodyFlags（身体标志）：** BODY_FLAG_UPPER_BODY_SUPPORTED=1（上半身）, BODY_FLAG_LOWER_BODY_SUPPORTED=2（下半身）, BODY_FLAG_HANDS_SUPPORTED=4（手部）
**Joint（关节）：** JOINT_ROOT=0（根）, JOINT_HIPS=1（髋部）, JOINT_SPINE=2（脊椎）, JOINT_CHEST=3（胸部）, JOINT_UPPER_CHEST=4（上胸部）, JOINT_NECK=5（颈部）, JOINT_HEAD=6（头部）, JOINT_HEAD_TIP=7（头顶）, JOINT_LEFT_SHOULDER=8（左肩）, JOINT_LEFT_UPPER_ARM=9（左上臂）, ...
**JointFlags（关节标志）：** JOINT_FLAG_ORIENTATION_VALID=1（方向有效）, JOINT_FLAG_ORIENTATION_TRACKED=2（方向被追踪）, JOINT_FLAG_POSITION_VALID=4（位置有效）, JOINT_FLAG_POSITION_TRACKED=8（位置被追踪）
