## SoftBody3D（软体3D）<- MeshInstance3D（网格实例3D）

可变形 3D 物理网格。用于创建弹性或可变形物体，如布料、橡胶或其他柔性材料。此外，SoftBody3D 会受到 Area3D 中定义的风力影响（参见 `Area3D.wind_source_path`、`Area3D.wind_force_magnitude` 和 `Area3D.wind_attenuation_factor`）。**注意：** 使用 SoftBody3D 时，建议使用 Jolt Physics 而非默认的 GodotPhysics3D，因为 Jolt Physics 的软体实现更快且更可靠。可以通过 `ProjectSettings.physics/3d/physics_engine` 项目设置切换物理引擎。

**属性（Props）：**
- collision_layer: int = 1 —— 碰撞层
- collision_mask: int = 1 —— 碰撞掩码
- damping_coefficient: float = 0.01 —— 阻尼系数
- disable_mode: int (SoftBody3D.DisableMode) = 0 —— 禁用模式
- drag_coefficient: float = 0.0 —— 阻力系数
- linear_stiffness: float = 0.5 —— 线性刚度
- parent_collision_ignore: NodePath = NodePath("") —— 父级碰撞忽略
- pressure_coefficient: float = 0.0 —— 压力系数
- ray_pickable: bool = true —— 可通过射线拾取
- shrinking_factor: float = 0.0 —— 收缩因子
- simulation_precision: int = 5 —— 模拟精度
- total_mass: float = 1.0 —— 总质量

**方法（Methods）：**
- add_collision_exception_with(body: Node) —— 添加碰撞例外
- apply_central_force(force: Vector3) —— 应用中心力
- apply_central_impulse(impulse: Vector3) —— 应用中心冲量
- apply_force(point_index: int, force: Vector3) —— 应用力到指定点
- apply_impulse(point_index: int, impulse: Vector3) —— 应用冲量到指定点
- get_collision_exceptions() -> PhysicsBody3D[] —— 获取碰撞例外列表
- get_collision_layer_value(layer_number: int) -> bool —— 获取碰撞层值
- get_collision_mask_value(layer_number: int) -> bool —— 获取碰撞掩码层值
- get_physics_rid() -> RID —— 获取物理 RID
- get_point_transform(point_index: int) -> Vector3 —— 获取点的变换
- is_point_pinned(point_index: int) -> bool —— 点是否固定
- remove_collision_exception_with(body: Node) —— 移除碰撞例外
- set_collision_layer_value(layer_number: int, value: bool) —— 设置碰撞层值
- set_collision_mask_value(layer_number: int, value: bool) —— 设置碰撞掩码层值
- set_point_pinned(point_index: int, pinned: bool, attachment_path: NodePath = NodePath(""), insert_at: int = -1) —— 设置点固定

**枚举（Enums）：**
**DisableMode（禁用模式）：** DISABLE_MODE_REMOVE=0 —— 移除, DISABLE_MODE_KEEP_ACTIVE=1 —— 保持激活
