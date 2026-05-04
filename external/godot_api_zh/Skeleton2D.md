## Skeleton2D（骨架2D）<- Node2D（节点2D）

Skeleton2D 作为 Bone2D 节点层次结构的父级。它持有每个 Bone2D 静止姿势的引用，并作为对其骨骼的单一访问点。要为给定的 Skeleton2D 设置不同类型的反向运动学，应创建 SkeletonModificationStack2D。通过增加 `SkeletonModificationStack2D.modification_count` 并创建所需数量的修改来应用反向运动学。

**方法（Methods）：**
- execute_modifications(delta: float, execution_mode: int) —— 执行修改
- get_bone(idx: int) -> Bone2D —— 获取骨骼
- get_bone_count() -> int —— 获取骨骼数量
- get_bone_local_pose_override(bone_idx: int) -> Transform2D —— 获取骨骼局部姿势覆盖
- get_modification_stack() -> SkeletonModificationStack2D —— 获取修改栈
- get_skeleton() -> RID —— 获取骨架 RID
- set_bone_local_pose_override(bone_idx: int, override_pose: Transform2D, strength: float, persistent: bool) —— 设置骨骼局部姿势覆盖
- set_modification_stack(modification_stack: SkeletonModificationStack2D) —— 设置修改栈

**信号（Signals）：**
- bone_setup_changed —— 骨骼设置已更改
