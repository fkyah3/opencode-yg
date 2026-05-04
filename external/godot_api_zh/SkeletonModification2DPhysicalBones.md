## SkeletonModification2DPhysicalBones（骨架修改2D物理骨骼）<- SkeletonModification2D（骨架修改2D）

此修改获取 PhysicalBone2D 节点的变换并将其应用于 Bone2D 节点。这使得 Bone2D 节点能够通过链接的 PhysicalBone2D 节点对物理作出反应。

**属性（Props）：**
- physical_bone_chain_length: int = 0 —— 物理骨骼链长度

**方法（Methods）：**
- fetch_physical_bones() —— 获取物理骨骼
- get_physical_bone_node(joint_idx: int) -> NodePath —— 获取物理骨骼节点
- set_physical_bone_node(joint_idx: int, physicalbone2d_node: NodePath) —— 设置物理骨骼节点
- start_simulation(bones: StringName[] = []) —— 开始模拟
- stop_simulation(bones: StringName[] = []) —— 停止模拟
