## SpringBoneSimulator3D（弹簧骨骼模拟器3D）<- SkeletonModifier3D（骨架修改器3D）

该 SkeletonModifier3D 可用于摆动头发、布料和尾巴。此修改器的行为不同于 PhysicalBoneSimulator3D，因为它尝试在修改后恢复原始姿势。如果设置了 `set_root_bone` 和 `set_end_bone`，则视为一条骨骼链。注意，它不支持像 Y 形链这样的分支链。创建骨骼链时，会根据中间存在的骨骼生成一个数组，并列入关节列表中。可以为每个关节应用多个属性，例如 `set_joint_stiffness`、`set_joint_drag` 和 `set_joint_gravity`。为简化操作，可以使用 Curve 同时为所有关节设置值。如果需要单独指定详细值，请将 `set_individual_config` 设置为 `true`。对于物理模拟，SpringBoneSimulator3D 可以有独立的子级碰撞体，与 PhysicsServer3D 无关，另请参阅 SpringBoneCollision3D。**警告：** 缩放后的 SpringBoneSimulator3D 很可能无法按预期运行。请确保父级 Skeleton3D 及其骨骼未被缩放。

**属性（Props）：**
- external_force: Vector3 = Vector3(0, 0, 0) —— 外力
- mutable_bone_axes: bool = true —— 可变骨骼轴
- setting_count: int = 0 —— 设置数量

**方法（Methods）：**
- are_all_child_collisions_enabled(index: int) -> bool —— 所有子级碰撞是否已启用
- clear_collisions(index: int) —— 清除碰撞
- clear_exclude_collisions(index: int) —— 清除排除碰撞
- clear_settings() —— 清除设置
- get_center_bone(index: int) -> int —— 获取中心骨骼
- get_center_bone_name(index: int) -> String —— 获取中心骨骼名称
- get_center_from(index: int) -> int —— 获取中心来源
- get_center_node(index: int) -> NodePath —— 获取中心节点
- get_collision_count(index: int) -> int —— 获取碰撞数量
- get_collision_path(index: int, collision: int) -> NodePath —— 获取碰撞路径
- get_drag(index: int) -> float —— 获取阻力
- get_drag_damping_curve(index: int) -> Curve —— 获取阻力阻尼曲线
- get_end_bone(index: int) -> int —— 获取末端骨骼
- get_end_bone_direction(index: int) -> int —— 获取末端骨骼方向
- get_end_bone_length(index: int) -> float —— 获取末端骨骼长度
- get_end_bone_name(index: int) -> String —— 获取末端骨骼名称
- get_exclude_collision_count(index: int) -> int —— 获取排除碰撞数量
- get_exclude_collision_path(index: int, collision: int) -> NodePath —— 获取排除碰撞路径
- get_gravity(index: int) -> float —— 获取重力
- get_gravity_damping_curve(index: int) -> Curve —— 获取重力阻尼曲线
- get_gravity_direction(index: int) -> Vector3 —— 获取重力方向
- get_joint_bone(index: int, joint: int) -> int —— 获取关节骨骼
- get_joint_bone_name(index: int, joint: int) -> String —— 获取关节骨骼名称
- get_joint_count(index: int) -> int —— 获取关节数量
- get_joint_drag(index: int, joint: int) -> float —— 获取关节阻力
- get_joint_gravity(index: int, joint: int) -> float —— 获取关节重力
- get_joint_gravity_direction(index: int, joint: int) -> Vector3 —— 获取关节重力方向
- get_joint_radius(index: int, joint: int) -> float —— 获取关节半径
- get_joint_rotation_axis(index: int, joint: int) -> int —— 获取关节旋转轴
- get_joint_rotation_axis_vector(index: int, joint: int) -> Vector3 —— 获取关节旋转轴向量
- get_joint_stiffness(index: int, joint: int) -> float —— 获取关节刚度
- get_radius(index: int) -> float —— 获取半径
- get_radius_damping_curve(index: int) -> Curve —— 获取半径阻尼曲线
- get_root_bone(index: int) -> int —— 获取根骨骼
- get_root_bone_name(index: int) -> String —— 获取根骨骼名称
- get_rotation_axis(index: int) -> int —— 获取旋转轴
- get_rotation_axis_vector(index: int) -> Vector3 —— 获取旋转轴向量
- get_stiffness(index: int) -> float —— 获取刚度
- get_stiffness_damping_curve(index: int) -> Curve —— 获取刚度阻尼曲线
- is_config_individual(index: int) -> bool —— 是否为独立配置
- is_end_bone_extended(index: int) -> bool —— 末端骨骼是否已扩展
- reset() —— 重置
- set_center_bone(index: int, bone: int) —— 设置中心骨骼
- set_center_bone_name(index: int, bone_name: String) —— 设置中心骨骼名称
- set_center_from(index: int, center_from: int) —— 设置中心来源
- set_center_node(index: int, node_path: NodePath) —— 设置中心节点
- set_collision_count(index: int, count: int) —— 设置碰撞数量
- set_collision_path(index: int, collision: int, node_path: NodePath) —— 设置碰撞路径
- set_drag(index: int, drag: float) —— 设置阻力
- set_drag_damping_curve(index: int, curve: Curve) —— 设置阻力阻尼曲线
- set_enable_all_child_collisions(index: int, enabled: bool) —— 启用所有子级碰撞
- set_end_bone(index: int, bone: int) —— 设置末端骨骼
- set_end_bone_direction(index: int, bone_direction: int) —— 设置末端骨骼方向
- set_end_bone_length(index: int, length: float) —— 设置末端骨骼长度
- set_end_bone_name(index: int, bone_name: String) —— 设置末端骨骼名称
- set_exclude_collision_count(index: int, count: int) —— 设置排除碰撞数量
- set_exclude_collision_path(index: int, collision: int, node_path: NodePath) —— 设置排除碰撞路径
- set_extend_end_bone(index: int, enabled: bool) —— 设置扩展末端骨骼
- set_gravity(index: int, gravity: float) —— 设置重力
- set_gravity_damping_curve(index: int, curve: Curve) —— 设置重力阻尼曲线
- set_gravity_direction(index: int, gravity_direction: Vector3) —— 设置重力方向
- set_individual_config(index: int, enabled: bool) —— 设置独立配置
- set_joint_drag(index: int, joint: int, drag: float) —— 设置关节阻力
- set_joint_gravity(index: int, joint: int, gravity: float) —— 设置关节重力
- set_joint_gravity_direction(index: int, joint: int, gravity_direction: Vector3) —— 设置关节重力方向
- set_joint_radius(index: int, joint: int, radius: float) —— 设置关节半径
- set_joint_rotation_axis(index: int, joint: int, axis: int) —— 设置关节旋转轴
- set_joint_rotation_axis_vector(index: int, joint: int, vector: Vector3) —— 设置关节旋转轴向量
- set_joint_stiffness(index: int, joint: int, stiffness: float) —— 设置关节刚度
- set_radius(index: int, radius: float) —— 设置半径
- set_radius_damping_curve(index: int, curve: Curve) —— 设置半径阻尼曲线
- set_root_bone(index: int, bone: int) —— 设置根骨骼
- set_root_bone_name(index: int, bone_name: String) —— 设置根骨骼名称
- set_rotation_axis(index: int, axis: int) —— 设置旋转轴
- set_rotation_axis_vector(index: int, vector: Vector3) —— 设置旋转轴向量
- set_stiffness(index: int, stiffness: float) —— 设置刚度
- set_stiffness_damping_curve(index: int, curve: Curve) —— 设置刚度阻尼曲线

**枚举（Enums）：**
**CenterFrom（中心来源）：** CENTER_FROM_WORLD_ORIGIN=0（世界原点），CENTER_FROM_NODE=1（节点），CENTER_FROM_BONE=2（骨骼）
