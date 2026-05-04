## BoneAttachment3D（骨骼附着3D） <- Node3D（节点3D）

此节点选择 Skeleton3D 中的一根骨骼并附着到其上。这意味着 BoneAttachment3D 节点将动态复制或覆盖所选骨骼的 3D 变换。

**Props（属性）：**
- bone_idx: int = -1 —— 骨骼索引
- bone_name: String = "" —— 骨骼名称
- external_skeleton: NodePath —— 外部骨架路径
- override_pose: bool = false —— 是否覆盖姿势
- physics_interpolation_mode: int (Node.PhysicsInterpolationMode) = 2 —— 物理插值模式
- use_external_skeleton: bool = false —— 是否使用外部骨架

**Methods（方法）：**
- get_skeleton() -> Skeleton3D —— 获取骨架
- on_skeleton_update() —— 骨架更新时调用
