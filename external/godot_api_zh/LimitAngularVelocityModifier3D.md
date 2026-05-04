## LimitAngularVelocityModifier3D <- SkeletonModifier3D（骨架修改器3D）

此修改器通过比较前一帧和当前帧之间的姿态来限制骨骼旋转角速度。您可以通过指定根骨骼和末端骨骼来添加骨骼链，然后将它们之间的骨骼添加到列表中。修改器根据选项 `exclude` 处理该列表或排除列表中的骨骼。

**属性（Props）：**
- chain_count: int = 0
- exclude: bool = false
- joint_count: int = 0
- max_angular_velocity: float = 6.2831855

**方法（Methods）：**
- clear_chains()
- get_end_bone(index: int) -> int
- get_end_bone_name(index: int) -> String
- get_root_bone(index: int) -> int
- get_root_bone_name(index: int) -> String
- reset()
- set_end_bone(index: int, bone: int)
- set_end_bone_name(index: int, bone_name: String)
- set_root_bone(index: int, bone: int)
- set_root_bone_name(index: int, bone_name: String)
