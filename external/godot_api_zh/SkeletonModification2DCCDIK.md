## SkeletonModification2DCCDIK（骨架修改2D CCDIK）<- SkeletonModification2D（骨架修改2D）

此 SkeletonModification2D 使用称为循环坐标下降逆运动学（CCDIK）的算法来操纵 Skeleton2D 中的骨骼链，使其达到定义的目标。CCDIK 的工作原理是在单个轴上旋转一组骨骼（通常称为"骨骼链"）。默认情况下，每个骨骼从尖端旋转朝向目标，通过骨骼链使其正确旋转以到达目标。由于骨骼仅在单个轴上旋转，CCDIK *可能*看起来比其他 IK 求解器更机械。**注意：** CCDIK 修改器具有 `ccdik_joints`，这些是保存 CCDIK 链中每个关节数据的数据对象。这不同于骨骼！CCDIK 关节保存 CCDIK 使用的骨骼链中每个骨骼所需的数据。CCDIK 还完全支持角度约束，从而可以更好地控制求解方式。

**属性（Props）：**
- ccdik_data_chain_length: int = 0 —— CCDIK 数据链长度
- target_nodepath: NodePath = NodePath("") —— 目标节点路径
- tip_nodepath: NodePath = NodePath("") —— 尖端节点路径

**方法（Methods）：**
- get_ccdik_joint_bone2d_node(joint_idx: int) -> NodePath —— 获取 CCDIK 关节的 Bone2D 节点
- get_ccdik_joint_bone_index(joint_idx: int) -> int —— 获取 CCDIK 关节的骨骼索引
- get_ccdik_joint_constraint_angle_invert(joint_idx: int) -> bool —— 获取 CCDIK 关节约束角度是否反转
- get_ccdik_joint_constraint_angle_max(joint_idx: int) -> float —— 获取 CCDIK 关节约束最大角度
- get_ccdik_joint_constraint_angle_min(joint_idx: int) -> float —— 获取 CCDIK 关节约束最小角度
- get_ccdik_joint_enable_constraint(joint_idx: int) -> bool —— 获取 CCDIK 关节是否启用约束
- get_ccdik_joint_rotate_from_joint(joint_idx: int) -> bool —— 获取 CCDIK 关节是否从关节处旋转
- set_ccdik_joint_bone2d_node(joint_idx: int, bone2d_nodepath: NodePath) —— 设置 CCDIK 关节的 Bone2D 节点
- set_ccdik_joint_bone_index(joint_idx: int, bone_idx: int) —— 设置 CCDIK 关节的骨骼索引
- set_ccdik_joint_constraint_angle_invert(joint_idx: int, invert: bool) —— 设置 CCDIK 关节约束角度反转
- set_ccdik_joint_constraint_angle_max(joint_idx: int, angle_max: float) —— 设置 CCDIK 关节约束最大角度
- set_ccdik_joint_constraint_angle_min(joint_idx: int, angle_min: float) —— 设置 CCDIK 关节约束最小角度
- set_ccdik_joint_enable_constraint(joint_idx: int, enable_constraint: bool) —— 设置 CCDIK 关节是否启用约束
- set_ccdik_joint_rotate_from_joint(joint_idx: int, rotate_from_joint: bool) —— 设置 CCDIK 关节是否从关节处旋转
