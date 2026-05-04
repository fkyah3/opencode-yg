## PhysicalBoneSimulator3D（物理骨骼模拟器3D） <- SkeletonModifier3D（骨骼修改器3D）

可以作为 PhysicalBone3D 父节点的节点，能够将模拟结果应用到 Skeleton3D。

**方法（Methods）：**
- is_simulating_physics() -> bool —— 是否正在模拟物理
- physical_bones_add_collision_exception(exception: RID) —— 添加碰撞例外
- physical_bones_remove_collision_exception(exception: RID) —— 移除碰撞例外
- physical_bones_start_simulation(bones: StringName[] = []) —— 开始物理骨骼模拟
- physical_bones_stop_simulation() —— 停止物理骨骼模拟
