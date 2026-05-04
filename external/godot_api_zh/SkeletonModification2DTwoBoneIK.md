## SkeletonModification2DTwoBoneIK（骨架修改2D双骨IK）<- SkeletonModification2D（骨架修改2D）

此 SkeletonModification2D 使用通常称为 TwoBoneIK 的算法。该算法利用余弦定理和骨骼长度来计算骨骼当前的旋转角度以及它们需要达到的旋转角度，以形成一个完整的三角形，其中第一根骨骼、第二根骨骼和目标构成三角形的三个顶点。由于该算法通过构建三角形工作，因此它只能操作两根骨骼。TwoBoneIK 非常适合手臂、腿以及任何可以用两根骨骼弯曲以到达目标的关节。此求解器比 SkeletonModification2DFABRIK 更轻量，但能产生类似、自然的结果。

**属性（Props）：**
- flip_bend_direction: bool = false —— 翻转弯曲方向
- target_maximum_distance: float = 0.0 —— 目标最大距离
- target_minimum_distance: float = 0.0 —— 目标最小距离
- target_nodepath: NodePath = NodePath("") —— 目标节点路径

**方法（Methods）：**
- get_joint_one_bone2d_node() -> NodePath —— 获取关节一的 Bone2D 节点
- get_joint_one_bone_idx() -> int —— 获取关节一的骨骼索引
- get_joint_two_bone2d_node() -> NodePath —— 获取关节二的 Bone2D 节点
- get_joint_two_bone_idx() -> int —— 获取关节二的骨骼索引
- set_joint_one_bone2d_node(bone2d_node: NodePath) —— 设置关节一的 Bone2D 节点
- set_joint_one_bone_idx(bone_idx: int) —— 设置关节一的骨骼索引
- set_joint_two_bone2d_node(bone2d_node: NodePath) —— 设置关节二的 Bone2D 节点
- set_joint_two_bone_idx(bone_idx: int) —— 设置关节二的骨骼索引
