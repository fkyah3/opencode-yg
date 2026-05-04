## XRBodyModifier3D（XR身体修改器3D） <- SkeletonModifier3D（骨骼修改器3D）

此节点使用来自 XRBodyTracker 的身体追踪数据来设置身体网格的骨骼姿势。身体的定位通过创建一个由同一 XRBodyTracker 驱动的身体网格的 XRNode3D 祖先来执行。身体追踪位置数据在应用到骨骼时按 `Skeleton3D.motion_scale` 缩放，可用于调整追踪身体以匹配身体模型的比例。

**属性（Props）：**
- body_tracker: StringName = &"/user/body_tracker" —— 身体追踪器
- body_update: int (XRBodyModifier3D.BodyUpdate) = 7 —— 身体更新
- bone_update: int (XRBodyModifier3D.BoneUpdate) = 0 —— 骨骼更新

**枚举（Enums）：**
**BodyUpdate（身体更新）：** BODY_UPDATE_UPPER_BODY=1, BODY_UPDATE_LOWER_BODY=2, BODY_UPDATE_HANDS=4
**BoneUpdate（骨骼更新）：** BONE_UPDATE_FULL=0, BONE_UPDATE_ROTATION_ONLY=1, BONE_UPDATE_MAX=2
