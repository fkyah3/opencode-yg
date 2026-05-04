## PhysicsServer3D（3D物理服务器） <- Object（对象）

PhysicsServer3D 是负责所有 3D 物理的服务器。它可以直接创建和操作所有物理对象：- **空间（space）** 是物理模拟的自包含世界，包含体、区域和关节。其状态可被查询以获取碰撞和相交信息，模拟的多个参数也可修改。- **形状（shape）** 是几何形状，如球体、盒体、圆柱体或多边形。可通过将其添加到体/区域来用于碰撞检测，并可相对于体/区域原点添加额外变换。体/区域可添加多个（变换后的）形状，单个形状也可使用不同局部变换多次添加到体/区域。- **体（body）** 是物理对象，可为静态、运动或刚体模式。其状态（如位置和速度）可查询和更新。可设置力积分回调来自定义体的物理行为。- **区域（area）** 是空间中的区域，可用于检测体/区域的进入和离开。可设置体监视回调来报告进入/离开的体形状，类似地可设置区域监视回调。可通过设置区域参数覆盖区域内的重力和阻尼。- **关节（joint）** 是约束，可以是两个体之间的约束，也可以是单个体相对于某点的约束。可调整关节偏置和弹簧关节的静止长度等参数。PhysicsServer3D 中的物理对象可独立创建和操作，不必绑定到场景树中的节点。**注意：** 所有 3D 物理节点都在内部使用物理服务器。将物理节点添加到场景树将在物理服务器中创建相应的物理对象。刚体节点注册一个回调，该回调在每个物理更新中用物理服务器中相应体对象的变换更新节点的变换。区域节点注册一个回调...（行截断至 2000 字符）

**方法（Methods）：**
- area_add_shape(area: RID, shape: RID, transform: Transform3D = Transform3D(1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0), disabled: bool = false) —— 区域添加形状
- area_attach_object_instance_id(area: RID, id: int) —— 区域附加对象实例 ID
- area_clear_shapes(area: RID) —— 区域清除形状
- area_create() -> RID —— 创建区域
- area_get_collision_layer(area: RID) -> int —— 获取区域碰撞层
- area_get_collision_mask(area: RID) -> int —— 获取区域碰撞掩码
- area_get_object_instance_id(area: RID) -> int —— 获取区域对象实例 ID
- area_get_param(area: RID, param: int) -> Variant —— 获取区域参数
- area_get_shape(area: RID, shape_idx: int) -> RID —— 获取区域形状
- area_get_shape_count(area: RID) -> int —— 获取区域形状数量
- area_get_shape_transform(area: RID, shape_idx: int) -> Transform3D —— 获取区域形状变换
- area_get_space(area: RID) -> RID —— 获取区域空间
- area_get_transform(area: RID) -> Transform3D —— 获取区域变换
- area_remove_shape(area: RID, shape_idx: int) —— 区域移除形状
- area_set_area_monitor_callback(area: RID, callback: Callable) —— 区域设置区域监视回调
- area_set_collision_layer(area: RID, layer: int) —— 区域设置碰撞层
- area_set_collision_mask(area: RID, mask: int) —— 区域设置碰撞掩码
- area_set_monitor_callback(area: RID, callback: Callable) —— 区域设置监视回调
- area_set_monitorable(area: RID, monitorable: bool) —— 区域设置可监视
- area_set_param(area: RID, param: int, value: Variant) —— 区域设置参数
- area_set_ray_pickable(area: RID, enable: bool) —— 区域设置射线可拾取
- area_set_shape(area: RID, shape_idx: int, shape: RID) —— 区域设置形状
- area_set_shape_disabled(area: RID, shape_idx: int, disabled: bool) —— 区域设置形状禁用
- area_set_shape_transform(area: RID, shape_idx: int, transform: Transform3D) —— 区域设置形状变换
- area_set_space(area: RID, space: RID) —— 区域设置空间
- area_set_transform(area: RID, transform: Transform3D) —— 区域设置变换
- body_add_collision_exception(body: RID, excepted_body: RID) —— 体添加碰撞例外
- body_add_constant_central_force(body: RID, force: Vector3) —— 体添加恒定中心力
- body_add_constant_force(body: RID, force: Vector3, position: Vector3 = Vector3(0, 0, 0)) —— 体添加恒定力
- body_add_constant_torque(body: RID, torque: Vector3) —— 体添加恒定扭矩
- body_add_shape(body: RID, shape: RID, transform: Transform3D = Transform3D(1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0), disabled: bool = false) —— 体添加形状
- body_apply_central_force(body: RID, force: Vector3) —— 体应用中心力
- body_apply_central_impulse(body: RID, impulse: Vector3) —— 体应用中心冲量
- body_apply_force(body: RID, force: Vector3, position: Vector3 = Vector3(0, 0, 0)) —— 体应用力
- body_apply_impulse(body: RID, impulse: Vector3, position: Vector3 = Vector3(0, 0, 0)) —— 体应用冲量
- body_apply_torque(body: RID, torque: Vector3) —— 体应用扭矩
- body_apply_torque_impulse(body: RID, impulse: Vector3) —— 体应用扭矩冲量
- body_attach_object_instance_id(body: RID, id: int) —— 体附加对象实例 ID
- body_clear_shapes(body: RID) —— 体清除形状
- body_create() -> RID —— 创建体
- body_get_collision_layer(body: RID) -> int —— 获取体碰撞层
- body_get_collision_mask(body: RID) -> int —— 获取体碰撞掩码
- body_get_collision_priority(body: RID) -> float —— 获取体碰撞优先级
- body_get_constant_force(body: RID) -> Vector3 —— 获取体恒定力
- body_get_constant_torque(body: RID) -> Vector3 —— 获取体恒定扭矩
- body_get_direct_state(body: RID) -> PhysicsDirectBodyState3D —— 获取体直接状态
- body_get_max_contacts_reported(body: RID) -> int —— 获取体最大报告接触数
- body_get_mode(body: RID) -> int —— 获取体模式
- body_get_object_instance_id(body: RID) -> int —— 获取体对象实例 ID
- body_get_param(body: RID, param: int) -> Variant —— 获取体参数
- body_get_shape(body: RID, shape_idx: int) -> RID —— 获取体形状
- body_get_shape_count(body: RID) -> int —— 获取体形状数量
- body_get_shape_transform(body: RID, shape_idx: int) -> Transform3D —— 获取体形状变换
- body_get_space(body: RID) -> RID —— 获取体空间
- body_get_state(body: RID, state: int) -> Variant —— 获取体状态
- body_is_axis_locked(body: RID, axis: int) -> bool —— 体轴是否锁定
- body_is_continuous_collision_detection_enabled(body: RID) -> bool —— 体是否启用连续碰撞检测
- body_is_omitting_force_integration(body: RID) -> bool —— 体是否省略力积分
- body_remove_collision_exception(body: RID, excepted_body: RID) —— 体移除碰撞例外
- body_remove_shape(body: RID, shape_idx: int) —— 体移除形状
- body_reset_mass_properties(body: RID) —— 体重置质量属性
- body_set_axis_lock(body: RID, axis: int, lock: bool) —— 体设置轴锁定
- body_set_axis_velocity(body: RID, axis_velocity: Vector3) —— 体设置轴速度
- body_set_collision_layer(body: RID, layer: int) —— 体设置碰撞层
- body_set_collision_mask(body: RID, mask: int) —— 体设置碰撞掩码
- body_set_collision_priority(body: RID, priority: float) —— 体设置碰撞优先级
- body_set_constant_force(body: RID, force: Vector3) —— 体设置恒定力
- body_set_constant_torque(body: RID, torque: Vector3) —— 体设置恒定扭矩
- body_set_enable_continuous_collision_detection(body: RID, enable: bool) —— 体设置启用连续碰撞检测
- body_set_force_integration_callback(body: RID, callable: Callable, userdata: Variant = null) —— 体设置力积分回调
- body_set_max_contacts_reported(body: RID, amount: int) —— 体设置最大报告接触数
- body_set_mode(body: RID, mode: int) —— 体设置模式
- body_set_omit_force_integration(body: RID, enable: bool) —— 体设置省略力积分
- body_set_param(body: RID, param: int, value: Variant) —— 体设置参数
- body_set_ray_pickable(body: RID, enable: bool) —— 体设置射线可拾取
- body_set_shape(body: RID, shape_idx: int, shape: RID) —— 体设置形状
- body_set_shape_disabled(body: RID, shape_idx: int, disabled: bool) —— 体设置形状禁用
- body_set_shape_transform(body: RID, shape_idx: int, transform: Transform3D) —— 体设置形状变换
- body_set_space(body: RID, space: RID) —— 体设置空间
- body_set_state(body: RID, state: int, value: Variant) —— 体设置状态
- body_set_state_sync_callback(body: RID, callable: Callable) —— 体设置状态同步回调
- body_test_motion(body: RID, parameters: PhysicsTestMotionParameters3D, result: PhysicsTestMotionResult3D = null) -> bool —— 体测试运动
- box_shape_create() -> RID —— 创建盒体形状
- capsule_shape_create() -> RID —— 创建胶囊体形状
- concave_polygon_shape_create() -> RID —— 创建凹多边形形状
- cone_twist_joint_get_param(joint: RID, param: int) -> float —— 获取锥形扭曲关节参数
- cone_twist_joint_set_param(joint: RID, param: int, value: float) —— 设置锥形扭曲关节参数
- convex_polygon_shape_create() -> RID —— 创建凸多边形形状
- custom_shape_create() -> RID —— 创建自定义形状
- cylinder_shape_create() -> RID —— 创建圆柱体形状
- free_rid(rid: RID) —— 释放 RID
- generic_6dof_joint_get_flag(joint: RID, axis: int, flag: int) -> bool —— 获取通用六自由度关节标志
- generic_6dof_joint_get_param(joint: RID, axis: int, param: int) -> float —— 获取通用六自由度关节参数
- generic_6dof_joint_set_flag(joint: RID, axis: int, flag: int, enable: bool) —— 设置通用六自由度关节标志
- generic_6dof_joint_set_param(joint: RID, axis: int, param: int, value: float) —— 设置通用六自由度关节参数
- get_process_info(process_info: int) -> int —— 获取进程信息
- heightmap_shape_create() -> RID —— 创建高度图形状
- hinge_joint_get_flag(joint: RID, flag: int) -> bool —— 获取铰链关节标志
- hinge_joint_get_param(joint: RID, param: int) -> float —— 获取铰链关节参数
- hinge_joint_set_flag(joint: RID, flag: int, enabled: bool) —— 设置铰链关节标志
- hinge_joint_set_param(joint: RID, param: int, value: float) —— 设置铰链关节参数
- joint_clear(joint: RID) —— 清除关节
- joint_create() -> RID —— 创建关节
- joint_disable_collisions_between_bodies(joint: RID, disable: bool) —— 关节禁用体间碰撞
- joint_get_solver_priority(joint: RID) -> int —— 获取关节求解器优先级
- joint_get_type(joint: RID) -> int —— 获取关节类型
- joint_is_disabled_collisions_between_bodies(joint: RID) -> bool —— 关节是否禁用了体间碰撞
- joint_make_cone_twist(joint: RID, body_A: RID, local_ref_A: Transform3D, body_B: RID, local_ref_B: Transform3D) —— 创建锥形扭曲关节
- joint_make_generic_6dof(joint: RID, body_A: RID, local_ref_A: Transform3D, body_B: RID, local_ref_B: Transform3D) —— 创建通用六自由度关节
- joint_make_hinge(joint: RID, body_A: RID, hinge_A: Transform3D, body_B: RID, hinge_B: Transform3D) —— 创建铰链关节
- joint_make_pin(joint: RID, body_A: RID, local_A: Vector3, body_B: RID, local_B: Vector3) —— 创建销关节
- joint_make_slider(joint: RID, body_A: RID, local_ref_A: Transform3D, body_B: RID, local_ref_B: Transform3D) —— 创建滑块关节
- joint_set_solver_priority(joint: RID, priority: int) —— 设置关节求解器优先级
- pin_joint_get_local_a(joint: RID) -> Vector3 —— 获取销关节局部 A
- pin_joint_get_local_b(joint: RID) -> Vector3 —— 获取销关节局部 B
- pin_joint_get_param(joint: RID, param: int) -> float —— 获取销关节参数
- pin_joint_set_local_a(joint: RID, local_A: Vector3) —— 设置销关节局部 A
- pin_joint_set_local_b(joint: RID, local_B: Vector3) —— 设置销关节局部 B
- pin_joint_set_param(joint: RID, param: int, value: float) —— 设置销关节参数
- separation_ray_shape_create() -> RID —— 创建分离射线形状
- set_active(active: bool) —— 设置激活
- shape_get_data(shape: RID) -> Variant —— 获取形状数据
- shape_get_margin(shape: RID) -> float —— 获取形状边距
- shape_get_type(shape: RID) -> int —— 获取形状类型
- shape_set_data(shape: RID, data: Variant) —— 设置形状数据
- shape_set_margin(shape: RID, margin: float) —— 设置形状边距
- slider_joint_get_param(joint: RID, param: int) -> float —— 获取滑块关节参数
- slider_joint_set_param(joint: RID, param: int, value: float) —— 设置滑块关节参数
- soft_body_add_collision_exception(body: RID, body_b: RID) —— 软体添加碰撞例外
- soft_body_apply_central_force(body: RID, force: Vector3) —— 软体应用中心力
- soft_body_apply_central_impulse(body: RID, impulse: Vector3) —— 软体应用中心冲量
- soft_body_apply_point_force(body: RID, point_index: int, force: Vector3) —— 软体应用点力
- soft_body_apply_point_impulse(body: RID, point_index: int, impulse: Vector3) —— 软体应用点冲量
- soft_body_create() -> RID —— 创建软体
- soft_body_get_bounds(body: RID) -> AABB —— 获取软体边界
- soft_body_get_collision_layer(body: RID) -> int —— 获取软体碰撞层
- soft_body_get_collision_mask(body: RID) -> int —— 获取软体碰撞掩码
- soft_body_get_damping_coefficient(body: RID) -> float —— 获取软体阻尼系数
- soft_body_get_drag_coefficient(body: RID) -> float —— 获取软体阻力系数
- soft_body_get_linear_stiffness(body: RID) -> float —— 获取软体线性刚度
- soft_body_get_point_global_position(body: RID, point_index: int) -> Vector3 —— 获取软体点全局位置
- soft_body_get_pressure_coefficient(body: RID) -> float —— 获取软体压力系数
- soft_body_get_shrinking_factor(body: RID) -> float —— 获取软体收缩因子
- soft_body_get_simulation_precision(body: RID) -> int —— 获取软体模拟精度
- soft_body_get_space(body: RID) -> RID —— 获取软体空间
- soft_body_get_state(body: RID, state: int) -> Variant —— 获取软体状态
- soft_body_get_total_mass(body: RID) -> float —— 获取软体总质量
- soft_body_is_point_pinned(body: RID, point_index: int) -> bool —— 软体点是否固定
- soft_body_move_point(body: RID, point_index: int, global_position: Vector3) —— 移动软体点
- soft_body_pin_point(body: RID, point_index: int, pin: bool) —— 固定软体点
- soft_body_remove_all_pinned_points(body: RID) —— 移除所有固定点
- soft_body_remove_collision_exception(body: RID, body_b: RID) —— 软体移除碰撞例外
- soft_body_set_collision_layer(body: RID, layer: int) —— 设置软体碰撞层
- soft_body_set_collision_mask(body: RID, mask: int) —— 设置软体碰撞掩码
- soft_body_set_damping_coefficient(body: RID, damping_coefficient: float) —— 设置软体阻尼系数
- soft_body_set_drag_coefficient(body: RID, drag_coefficient: float) —— 设置软体阻力系数
- soft_body_set_linear_stiffness(body: RID, stiffness: float) —— 设置软体线性刚度
- soft_body_set_mesh(body: RID, mesh: RID) —— 设置软体网格
- soft_body_set_pressure_coefficient(body: RID, pressure_coefficient: float) —— 设置软体压力系数
- soft_body_set_ray_pickable(body: RID, enable: bool) —— 设置软体射线可拾取
- soft_body_set_shrinking_factor(body: RID, shrinking_factor: float) —— 设置软体收缩因子
- soft_body_set_simulation_precision(body: RID, simulation_precision: int) —— 设置软体模拟精度
- soft_body_set_space(body: RID, space: RID) —— 设置软体空间
- soft_body_set_state(body: RID, state: int, variant: Variant) —— 设置软体状态
- soft_body_set_total_mass(body: RID, total_mass: float) —— 设置软体总质量
- soft_body_set_transform(body: RID, transform: Transform3D) —— 设置软体变换
- soft_body_update_rendering_server(body: RID, rendering_server_handler: PhysicsServer3DRenderingServerHandler) —— 更新软体渲染服务器
- space_create() -> RID —— 创建空间
- space_get_direct_state(space: RID) -> PhysicsDirectSpaceState3D —— 获取空间直接状态
- space_get_param(space: RID, param: int) -> float —— 获取空间参数
- space_is_active(space: RID) -> bool —— 空间是否激活
- space_set_active(space: RID, active: bool) —— 设置空间激活
- space_set_param(space: RID, param: int, value: float) —— 设置空间参数
- sphere_shape_create() -> RID —— 创建球体形状
- world_boundary_shape_create() -> RID —— 创建世界边界形状

**枚举（Enums）：**
**JointType（关节类型）：** JOINT_TYPE_PIN=0 —— 销, JOINT_TYPE_HINGE=1 —— 铰链, JOINT_TYPE_SLIDER=2 —— 滑块, JOINT_TYPE_CONE_TWIST=3 —— 锥形扭曲, JOINT_TYPE_6DOF=4 —— 六自由度, JOINT_TYPE_MAX=5
**PinJointParam（销关节参数）：** PIN_JOINT_BIAS=0 —— 偏置, PIN_JOINT_DAMPING=1 —— 阻尼, PIN_JOINT_IMPULSE_CLAMP=2 —— 冲量钳制
**HingeJointParam（铰链关节参数）：** HINGE_JOINT_BIAS=0 —— 偏置, HINGE_JOINT_LIMIT_UPPER=1 —— 上限, HINGE_JOINT_LIMIT_LOWER=2 —— 下限, HINGE_JOINT_LIMIT_BIAS=3 —— 限制偏置, ...
**HingeJointFlag（铰链关节标志）：** HINGE_JOINT_FLAG_USE_LIMIT=0 —— 使用限制, HINGE_JOINT_FLAG_ENABLE_MOTOR=1 —— 启用电机
**SliderJointParam（滑块关节参数）：** SLIDER_JOINT_LINEAR_LIMIT_UPPER=0 —— 线性上限, SLIDER_JOINT_LINEAR_LIMIT_LOWER=1 —— 线性下限, ...
**ConeTwistJointParam（锥形扭曲关节参数）：** CONE_TWIST_JOINT_SWING_SPAN=0 —— 摆动范围, CONE_TWIST_JOINT_TWIST_SPAN=1 —— 扭曲范围, CONE_TWIST_JOINT_BIAS=2 —— 偏置, ...
**G6DOFJointAxisParam（六自由度关节轴参数）：** G6DOF_JOINT_LINEAR_LOWER_LIMIT=0 —— 线性下限, G6DOF_JOINT_LINEAR_UPPER_LIMIT=1 —— 线性上限, ...
**G6DOFJointAxisFlag（六自由度关节轴标志）：** G6DOF_JOINT_FLAG_ENABLE_LINEAR_LIMIT=0 —— 启用线性限制, G6DOF_JOINT_FLAG_ENABLE_ANGULAR_LIMIT=1 —— 启用角度限制, ...
**ShapeType（形状类型）：** SHAPE_WORLD_BOUNDARY=0 —— 世界边界, SHAPE_SEPARATION_RAY=1 —— 分离射线, SHAPE_SPHERE=2 —— 球体, SHAPE_BOX=3 —— 盒体, SHAPE_CAPSULE=4 —— 胶囊体, SHAPE_CYLINDER=5 —— 圆柱体, SHAPE_CONVEX_POLYGON=6 —— 凸多边形, SHAPE_CONCAVE_POLYGON=7 —— 凹多边形, SHAPE_HEIGHTMAP=8 —— 高度图, SHAPE_SOFT_BODY=9 —— 软体, ...
**AreaParameter（区域参数）：** AREA_PARAM_GRAVITY_OVERRIDE_MODE=0 —— 重力覆盖模式, AREA_PARAM_GRAVITY=1 —— 重力, ...
**AreaSpaceOverrideMode（区域空间覆盖模式）：** AREA_SPACE_OVERRIDE_DISABLED=0 —— 禁用, AREA_SPACE_OVERRIDE_COMBINE=1 —— 组合, ...
**BodyMode（体模式）：** BODY_MODE_STATIC=0 —— 静态, BODY_MODE_KINEMATIC=1 —— 运动, BODY_MODE_RIGID=2 —— 刚体, BODY_MODE_RIGID_LINEAR=3 —— 线性刚体
**BodyParameter（体参数）：** BODY_PARAM_BOUNCE=0 —— 反弹, BODY_PARAM_FRICTION=1 —— 摩擦, BODY_PARAM_MASS=2 —— 质量, ...
**BodyDampMode（体阻尼模式）：** BODY_DAMP_MODE_COMBINE=0 —— 组合, BODY_DAMP_MODE_REPLACE=1 —— 替换
**BodyState（体状态）：** BODY_STATE_TRANSFORM=0 —— 变换, BODY_STATE_LINEAR_VELOCITY=1 —— 线速度, BODY_STATE_ANGULAR_VELOCITY=2 —— 角速度, BODY_STATE_SLEEPING=3 —— 休眠, BODY_STATE_CAN_SLEEP=4 —— 可休眠
**AreaBodyStatus（区域体状态）：** AREA_BODY_ADDED=0 —— 体添加, AREA_BODY_REMOVED=1 —— 体移除
**ProcessInfo（进程信息）：** INFO_ACTIVE_OBJECTS=0 —— 活跃对象数, INFO_COLLISION_PAIRS=1 —— 碰撞对数, INFO_ISLAND_COUNT=2 —— 孤岛数
**SpaceParameter（空间参数）：** SPACE_PARAM_CONTACT_RECYCLE_RADIUS=0 —— 接触回收半径, SPACE_PARAM_CONTACT_MAX_SEPARATION=1 —— 最大接触分离, ...
**BodyAxis（体轴）：** BODY_AXIS_LINEAR_X=1 —— 线性 X 轴, BODY_AXIS_LINEAR_Y=2 —— 线性 Y 轴, BODY_AXIS_LINEAR_Z=4 —— 线性 Z 轴, BODY_AXIS_ANGULAR_X=8 —— 角度 X 轴, BODY_AXIS_ANGULAR_Y=16 —— 角度 Y 轴, BODY_AXIS_ANGULAR_Z=32 —— 角度 Z 轴
