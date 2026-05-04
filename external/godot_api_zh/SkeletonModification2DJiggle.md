## SkeletonModification2DJiggle（骨架修改2D抖动）<- SkeletonModification2D（骨架修改2D）

此修改将一系列骨骼（通常称为骨骼链）移向目标。此修改的特殊之处在于它计算骨骼链中每个骨骼的速度和加速度，并使用输入值运行非常轻量的类物理计算。这使骨骼能够超过目标并"抖动"。它可以配置为更像弹簧，或像布料一样摆动。此修改对于为头发、衣物边缘等添加额外运动非常有用。它有几个设置，用于控制关节在目标移动时的行为。**注意：** Jiggle 修改器具有 `jiggle_joints`，这些是保存 Jiggle 链中每个关节数据的数据对象。这不同于 Bone2D 节点！Jiggle 关节保存 Jiggle 修改使用的骨骼链中每个 Bone2D 所需的数据。

**属性（Props）：**
- damping: float = 0.75 —— 阻尼
- gravity: Vector2 = Vector2(0, 6) —— 重力
- jiggle_data_chain_length: int = 0 —— 抖动数据链长度
- mass: float = 0.75 —— 质量
- stiffness: float = 3.0 —— 刚度
- target_nodepath: NodePath = NodePath("") —— 目标节点路径
- use_gravity: bool = false —— 使用重力

**方法（Methods）：**
- get_collision_mask() -> int —— 获取碰撞掩码
- get_jiggle_joint_bone2d_node(joint_idx: int) -> NodePath —— 获取抖动关节的 Bone2D 节点
- get_jiggle_joint_bone_index(joint_idx: int) -> int —— 获取抖动关节的骨骼索引
- get_jiggle_joint_damping(joint_idx: int) -> float —— 获取抖动关节阻尼
- get_jiggle_joint_gravity(joint_idx: int) -> Vector2 —— 获取抖动关节重力
- get_jiggle_joint_mass(joint_idx: int) -> float —— 获取抖动关节质量
- get_jiggle_joint_override(joint_idx: int) -> bool —— 获取抖动关节是否覆盖
- get_jiggle_joint_stiffness(joint_idx: int) -> float —— 获取抖动关节刚度
- get_jiggle_joint_use_gravity(joint_idx: int) -> bool —— 获取抖动关节是否使用重力
- get_use_colliders() -> bool —— 是否使用碰撞器
- set_collision_mask(collision_mask: int) —— 设置碰撞掩码
- set_jiggle_joint_bone2d_node(joint_idx: int, bone2d_node: NodePath) —— 设置抖动关节的 Bone2D 节点
- set_jiggle_joint_bone_index(joint_idx: int, bone_idx: int) —— 设置抖动关节的骨骼索引
- set_jiggle_joint_damping(joint_idx: int, damping: float) —— 设置抖动关节阻尼
- set_jiggle_joint_gravity(joint_idx: int, gravity: Vector2) —— 设置抖动关节重力
- set_jiggle_joint_mass(joint_idx: int, mass: float) —— 设置抖动关节质量
- set_jiggle_joint_override(joint_idx: int, override: bool) —— 设置抖动关节覆盖
- set_jiggle_joint_stiffness(joint_idx: int, stiffness: float) —— 设置抖动关节刚度
- set_jiggle_joint_use_gravity(joint_idx: int, use_gravity: bool) —— 设置抖动关节是否使用重力
- set_use_colliders(use_colliders: bool) —— 设置是否使用碰撞器
