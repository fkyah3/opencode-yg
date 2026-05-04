## XRHandModifier3D（XR手部修改器3D）<- SkeletonModifier3D（骨架修改器3D）

此节点使用 XRHandTracker 的手部追踪数据来摆出人手网格的骨架姿势。手部定位通过创建由同一 XRHandTracker 驱动的手部网格的 XRNode3D 祖先来执行。手部追踪位置数据在应用到骨骼时按 `Skeleton3D.motion_scale` 缩放，可用于调整追踪手部以匹配手部模型的比例。

**属性（Props）：**
- bone_update: int (XRHandModifier3D.BoneUpdate) = 0 —— 骨骼更新模式
- hand_tracker: StringName = &"/user/hand_tracker/left" —— 手部追踪器

**枚举（Enums）：**
**BoneUpdate（骨骼更新）：** BONE_UPDATE_FULL=0 —— 完全更新，BONE_UPDATE_ROTATION_ONLY=1 —— 仅旋转，BONE_UPDATE_MAX=2
