## SkeletonModification2DFABRIK（骨架修改2D FABRIK）<- SkeletonModification2D（骨架修改2D）

此 SkeletonModification2D 使用称为前向后向 reaching 逆运动学（FABRIK）的算法来旋转骨骼链，使其到达目标。FABRIK 通过知道一系列骨骼（通常称为"骨骼链"）的位置和长度来工作。它首先运行前向传递，将最终骨骼放置在目标位置。然后所有其他骨骼向尖端骨骼移动，使它们保持在定义的骨骼长度处。然后执行后向传递，将 FABRIK 链中的根/第一块骨骼放回原点。然后所有其他骨骼移动，使它们保持在定义的骨骼长度处。这样定位骨骼链，使其在可能时到达目标，同时所有骨骼保持正确的间距。由于 FABRIK 的工作原理，它通常比 SkeletonModification2DCCDIK 产生更自然的结果。**注意：** FABRIK 修改器具有 `fabrik_joints`，这些是保存 FABRIK 链中每个关节数据的数据对象。这不同于 Bone2D 节点！FABRIK 关节保存 FABRIK 使用的骨骼链中每个 Bone2D 所需的数据。为了帮助控制 FABRIK 关节的运动，可以传递磁力向量，它在求解之前将骨骼推向特定方向，从而对最终结果提供一定程度的控制。

**属性（Props）：**
- fabrik_data_chain_length: int = 0 —— FABRIK 数据链长度
- target_nodepath: NodePath = NodePath("") —— 目标节点路径

**方法（Methods）：**
- get_fabrik_joint_bone2d_node(joint_idx: int) -> NodePath —— 获取 FABRIK 关节的 Bone2D 节点
- get_fabrik_joint_bone_index(joint_idx: int) -> int —— 获取 FABRIK 关节的骨骼索引
- get_fabrik_joint_magnet_position(joint_idx: int) -> Vector2 —— 获取 FABRIK 关节磁力位置
- get_fabrik_joint_use_target_rotation(joint_idx: int) -> bool —— 获取 FABRIK 关节是否使用目标旋转
- set_fabrik_joint_bone2d_node(joint_idx: int, bone2d_nodepath: NodePath) —— 设置 FABRIK 关节的 Bone2D 节点
- set_fabrik_joint_bone_index(joint_idx: int, bone_idx: int) —— 设置 FABRIK 关节的骨骼索引
- set_fabrik_joint_magnet_position(joint_idx: int, magnet_position: Vector2) —— 设置 FABRIK 关节磁力位置
- set_fabrik_joint_use_target_rotation(joint_idx: int, use_target_rotation: bool) —— 设置 FABRIK 关节是否使用目标旋转
