## PhysicsDirectBodyState2D（2D物理直接体状态） <- Object（对象）

提供对 PhysicsServer2D 中物理体的直接访问，允许安全地修改物理属性。该对象通过 RigidBody2D 的直接状态回调传递，用于更改该体的直接状态。请参见 `RigidBody2D._integrate_forces`。

**属性（Props）：**
- angular_velocity: float —— 角速度
- center_of_mass: Vector2 —— 质心
- center_of_mass_local: Vector2 —— 局部质心
- collision_layer: int —— 碰撞层
- collision_mask: int —— 碰撞掩码
- inverse_inertia: float —— 惯性倒数
- inverse_mass: float —— 质量倒数
- linear_velocity: Vector2 —— 线速度
- sleeping: bool —— 是否休眠
- step: float —— 步长
- total_angular_damp: float —— 总角阻尼
- total_gravity: Vector2 —— 总重力
- total_linear_damp: float —— 总线性阻尼
- transform: Transform2D —— 变换

**方法（Methods）：**
- add_constant_central_force(force: Vector2 = Vector2(0, 0)) —— 添加恒定中心力
- add_constant_force(force: Vector2, position: Vector2 = Vector2(0, 0)) —— 添加恒定力
- add_constant_torque(torque: float) —— 添加恒定扭矩
- apply_central_force(force: Vector2 = Vector2(0, 0)) —— 应用中心力
- apply_central_impulse(impulse: Vector2) —— 应用中心冲量
- apply_force(force: Vector2, position: Vector2 = Vector2(0, 0)) —— 应用力
- apply_impulse(impulse: Vector2, position: Vector2 = Vector2(0, 0)) —— 应用冲量
- apply_torque(torque: float) —— 应用扭矩
- apply_torque_impulse(impulse: float) —— 应用扭矩冲量
- get_constant_force() -> Vector2 —— 获取恒定力
- get_constant_torque() -> float —— 获取恒定扭矩
- get_contact_collider(contact_idx: int) -> RID —— 获取接触碰撞体
- get_contact_collider_id(contact_idx: int) -> int —— 获取接触碰撞体 ID
- get_contact_collider_object(contact_idx: int) -> Object —— 获取接触碰撞体对象
- get_contact_collider_position(contact_idx: int) -> Vector2 —— 获取接触碰撞体位置
- get_contact_collider_shape(contact_idx: int) -> int —— 获取接触碰撞体形状
- get_contact_collider_velocity_at_position(contact_idx: int) -> Vector2 —— 获取接触碰撞体在位置处的速度
- get_contact_count() -> int —— 获取接触数量
- get_contact_impulse(contact_idx: int) -> Vector2 —— 获取接触冲量
- get_contact_local_normal(contact_idx: int) -> Vector2 —— 获取接触局部法线
- get_contact_local_position(contact_idx: int) -> Vector2 —— 获取接触局部位置
- get_contact_local_shape(contact_idx: int) -> int —— 获取接触局部形状
- get_contact_local_velocity_at_position(contact_idx: int) -> Vector2 —— 获取接触局部在位置处的速度
- get_space_state() -> PhysicsDirectSpaceState2D —— 获取空间状态
- get_velocity_at_local_position(local_position: Vector2) -> Vector2 —— 获取局部位置处的速度
- integrate_forces() —— 积分力
- set_constant_force(force: Vector2) —— 设置恒定力
- set_constant_torque(torque: float) —— 设置恒定扭矩
