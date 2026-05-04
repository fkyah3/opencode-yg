## PhysicalBone2D（2D物理骨骼） <- RigidBody2D（2D刚体）

PhysicalBone2D 节点是一个基于 RigidBody2D 的节点，可用于使 Skeleton2D 中的 Bone2D 对物理产生反应。**注意：** 要使 Bone2D 在视觉上跟随 PhysicalBone2D 节点，请在 Skeleton2D 父节点上使用 SkeletonModification2DPhysicalBones 修改器。**注意：** PhysicalBone2D 节点不会自动创建 Joint2D 节点来将 PhysicalBone2D 节点连接在一起。必须手动创建。大多数情况下，您需要使用 PinJoint2D 节点。一旦将 Joint2D 节点添加为子节点，PhysicalBone2D 节点将自动配置该 Joint2D 节点。

**属性（Props）：**
- auto_configure_joint: bool = true —— 自动配置关节
- bone2d_index: int = -1 —— Bone2D 索引
- bone2d_nodepath: NodePath = NodePath("") —— Bone2D 节点路径
- follow_bone_when_simulating: bool = false —— 模拟时是否跟随骨骼
- simulate_physics: bool = false —— 是否模拟物理

**方法（Methods）：**
- get_joint() -> Joint2D —— 获取关节
- is_simulating_physics() -> bool —— 是否正在模拟物理
