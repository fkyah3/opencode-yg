## RigidBody3D（刚体3D）<- PhysicsBody3D（物理体3D）

RigidBody3D 实现了完整的 3D 物理模拟。它不能直接被控制，相反，你必须对其施加力（重力、冲量等），物理模拟将计算产生的运动、旋转、对碰撞的反应，并影响其路径上的其他物理体。刚体的行为可以通过 `lock_rotation`、`freeze` 和 `freeze_mode` 进行调整。通过更改对象的各种属性（如 `mass`），你可以控制物理模拟对其的作用方式。即使施加了力，刚体也能始终保持其形状和大小。它适用于环境中可以交互的对象，例如可以被撞倒的树或可以推来推去的板条箱堆。如果需要直接影响刚体，优先使用 `_integrate_forces`，因为它允许你直接访问物理状态。如果需要覆盖默认的物理行为，可以编写自定义的力积分函数。参见 `custom_integrator`。**注意：** 频繁更改 RigidBody3D 的 3D 变换或 `linear_velocity` 可能导致不可预测的行为。当 RigidBody3D 作为持续移动节点（如另一个 RigidBody3D）的后代时也会发生这种情况，因为祖先移动时会设置其全局变换。

**属性（Props）：**
- angular_damp: float = 0.0 —— 角阻尼
- angular_damp_mode: int (RigidBody3D.DampMode) = 0 —— 角阻尼模式
- angular_velocity: Vector3 = Vector3(0, 0, 0) —— 角速度
- can_sleep: bool = true —— 可以休眠
- center_of_mass: Vector3 = Vector3(0, 0, 0) —— 质心
- center_of_mass_mode: int (RigidBody3D.CenterOfMassMode) = 0 —— 质心模式
- constant_force: Vector3 = Vector3(0, 0, 0) —— 恒定力
- constant_torque: Vector3 = Vector3(0, 0, 0) —— 恒定扭矩
- contact_monitor: bool = false —— 接触监测
- continuous_cd: bool = false —— 连续碰撞检测
- custom_integrator: bool = false —— 自定义积分器
- freeze: bool = false —— 冻结
- freeze_mode: int (RigidBody3D.FreezeMode) = 0 —— 冻结模式
- gravity_scale: float = 1.0 —— 重力缩放
- inertia: Vector3 = Vector3(0, 0, 0) —— 惯性
- linear_damp: float = 0.0 —— 线性阻尼
- linear_damp_mode: int (RigidBody3D.DampMode) = 0 —— 线性阻尼模式
- linear_velocity: Vector3 = Vector3(0, 0, 0) —— 线速度
- lock_rotation: bool = false —— 锁定旋转
- mass: float = 1.0 —— 质量
- max_contacts_reported: int = 0 —— 最大报告接触数
- physics_material_override: PhysicsMaterial —— 物理材质覆盖
- sleeping: bool = false —— 是否休眠

**方法（Methods）：**
- add_constant_central_force(force: Vector3) —— 添加恒定中心力
- add_constant_force(force: Vector3, position: Vector3 = Vector3(0, 0, 0)) —— 添加恒定力
- add_constant_torque(torque: Vector3) —— 添加恒定扭矩
- apply_central_force(force: Vector3) —— 应用中心力
- apply_central_impulse(impulse: Vector3) —— 应用中心冲量
- apply_force(force: Vector3, position: Vector3 = Vector3(0, 0, 0)) —— 应用力
- apply_impulse(impulse: Vector3, position: Vector3 = Vector3(0, 0, 0)) —— 应用冲量
- apply_torque(torque: Vector3) —— 应用扭矩
- apply_torque_impulse(impulse: Vector3) —— 应用扭矩冲量
- get_colliding_bodies() -> Node3D[] —— 获取碰撞中的物体
- get_contact_count() -> int —— 获取接触数
- get_inverse_inertia_tensor() -> Basis —— 获取逆惯性张量
- set_axis_velocity(axis_velocity: Vector3) —— 设置轴速度

**信号（Signals）：**
- body_entered(body: Node) —— 物体进入
- body_exited(body: Node) —— 物体退出
- body_shape_entered(body_rid: RID, body: Node, body_shape_index: int, local_shape_index: int) —— 物体形状进入
- body_shape_exited(body_rid: RID, body: Node, body_shape_index: int, local_shape_index: int) —— 物体形状退出
- sleeping_state_changed —— 休眠状态改变

**枚举（Enums）：**
**FreezeMode（冻结模式）：** FREEZE_MODE_STATIC=0 —— 静态冻结, FREEZE_MODE_KINEMATIC=1 —— 运动学冻结
**CenterOfMassMode（质心模式）：** CENTER_OF_MASS_MODE_AUTO=0 —— 自动质心, CENTER_OF_MASS_MODE_CUSTOM=1 —— 自定义质心
**DampMode（阻尼模式）：** DAMP_MODE_COMBINE=0 —— 组合阻尼, DAMP_MODE_REPLACE=1 —— 替换阻尼
