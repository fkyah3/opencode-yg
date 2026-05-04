## ModifierBoneTarget3D（修饰器骨骼目标3D） <- SkeletonModifier3D（骨骼修饰器3D）

该节点在 Skeleton3D 中选择一根骨骼并附加到其上。这意味着 ModifierBoneTarget3D 节点将动态复制所选骨骼的 3D 变换。功能类似于 BoneAttachment3D，但此节点采用 SkeletonModifier3D 周期，旨在用作另一个 SkeletonModifier3D 的目标。

**属性（Props）：**
- bone: int = -1 —— 骨骼索引
- bone_name: String = "" —— 骨骼名称
