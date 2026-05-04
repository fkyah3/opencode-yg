## SkeletonModifier3D（骨架修改器3D）<- Node3D（节点3D）

SkeletonModifier3D 通过具有 Skeleton3D 父级来获取目标 Skeleton3D。如果存在 AnimationMixer，修改总是在 AnimationMixer 的回放过程之后执行。此节点应被用于实现自定义 IK 求解器、约束或骨架物理。

**属性（Props）：**
- active: bool = true —— 激活
- influence: float = 1.0 —— 影响程度

**方法（Methods）：**
- get_skeleton() -> Skeleton3D —— 获取骨架

**信号（Signals）：**
- modification_processed —— 修改已处理

**枚举（Enums）：**
**BoneAxis（骨骼轴）：** BONE_AXIS_PLUS_X=0 —— X 正轴, BONE_AXIS_MINUS_X=1 —— X 负轴, BONE_AXIS_PLUS_Y=2 —— Y 正轴, BONE_AXIS_MINUS_Y=3 —— Y 负轴, BONE_AXIS_PLUS_Z=4 —— Z 正轴, BONE_AXIS_MINUS_Z=5 —— Z 负轴
**BoneDirection（骨骼方向）：** BONE_DIRECTION_PLUS_X=0 —— X 正方向, BONE_DIRECTION_MINUS_X=1 —— X 负方向, BONE_DIRECTION_PLUS_Y=2 —— Y 正方向, BONE_DIRECTION_MINUS_Y=3 —— Y 负方向, BONE_DIRECTION_PLUS_Z=4 —— Z 正方向, BONE_DIRECTION_MINUS_Z=5 —— Z 负方向, BONE_DIRECTION_FROM_PARENT=6 —— 来自父级方向
**SecondaryDirection（次方向）：** SECONDARY_DIRECTION_NONE=0 —— 无, SECONDARY_DIRECTION_PLUS_X=1 —— X 正方向, SECONDARY_DIRECTION_MINUS_X=2 —— X 负方向, SECONDARY_DIRECTION_PLUS_Y=3 —— Y 正方向, SECONDARY_DIRECTION_MINUS_Y=4 —— Y 负方向, SECONDARY_DIRECTION_PLUS_Z=5 —— Z 正方向, SECONDARY_DIRECTION_MINUS_Z=6 —— Z 负方向, SECONDARY_DIRECTION_CUSTOM=7 —— 自定义
**RotationAxis（旋转轴）：** ROTATION_AXIS_X=0 —— X 轴, ROTATION_AXIS_Y=1 —— Y 轴, ROTATION_AXIS_Z=2 —— Z 轴, ROTATION_AXIS_ALL=3 —— 所有轴, ROTATION_AXIS_CUSTOM=4 —— 自定义
