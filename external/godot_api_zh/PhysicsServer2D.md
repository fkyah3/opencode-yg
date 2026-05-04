## PhysicsServer2D（2D物理服务器） <- Object（对象）

PhysicsServer2D 是负责所有 2D 物理的服务器。它可以直接创建和操作所有物理对象：- **空间（space）** 是物理模拟的自包含世界，包含体、区域和关节。其状态可被查询以获取碰撞和相交信息，模拟的多个参数也可修改。- **形状（shape）** 是几何形状，如圆形、矩形、胶囊体或多边形。可通过将其添加到体/区域来用于碰撞检测，并可相对于体/区域原点添加额外变换。体/区域可添加多个（变换后的）形状，单个形状也可使用不同局部变换多次添加到体/区域。- **体（body）** 是物理对象，可为静态、运动或刚体模式。其状态（如位置和速度）可查询和更新。可设置力积分回调来自定义体的物理行为。- **区域（area）** 是空间中的区域，可用于检测体/区域的进入和离开。可设置体监视回调来报告进入/离开的体形状，类似地可设置区域监视回调。可通过设置区域参数覆盖区域内的重力和阻尼。- **关节（joint）** 是约束，可以是两个体之间的约束，也可以是单个体相对于某点的约束。可调整关节偏置和弹簧关节的静止长度等参数。PhysicsServer2D 中的物理对象可独立创建和操作，不必绑定到场景树中的节点。**注意：** 所有 2D 物理节点都在内部使用物理服务器。将物理节点添加到场景树将在物理服务器中创建相应的物理对象。刚体节点注册一个回调，该回调在每个物理更新中用物理服务器中相应体对象的变换更新节点的变换。区域节点注册一个回调，用于更新...（行截断至 2000 字符）

**方法（Methods）：**
- area_add_shape(area: RID, shape: RID, transform: Transform2D = Transform2D(1, 0, 0, 1, 0, 0), disabled: bool = false) —— 区域添加形状
- area_attach_canvas_instance_id(area: RID, id: int) —— 区域附加画布实例 ID
- area_attach_object_instance_id(area: RID, id: int) —— 区域附加对象实例 ID
- area_clear_shapes(area: RID) —— 区域清除形状
- area_create() -> RID —— 创建区域
- area_get_canvas_instance_id(area: RID) -> int —— 获取区域画布实例 ID
- area_get_collision_layer(area: RID) -> int —— 获取区域碰撞层
- area_get_collision_mask(area: RID) -> int —— 获取区域碰撞掩码
- area_get_object_instance_id(area: RID) -> int —— 获取区域对象实例 ID
- area_get_param(area: RID, param: int) -> Variant —— 获取区域参数
- area_get_shape(area: RID, shape_idx: int) -> RID —— 获取区域形状
- area_get_shape_count(area: RID) -> int —— 获取区域形状数量
- area_get_shape_transform(area: RID, shape_idx: int) -> Transform2D —— 获取区域形状变换
- area_get_space(area: RID) -> RID —— 获取区域空间
- area_get_transform(area: RID) -> Transform2D —— 获取区域变换
- area_remove_shape(area: RID, shape_idx: int) —— 区域移除形状
- area_set_area_monitor_callback(area: RID, callback: Callable) —— 区域设置区域监视回调
- area_set_collision_layer(area: RID, layer: int) —— 区域设置碰撞层
- area_set_collision_mask(area: RID, mask: int) —— 区域设置碰撞掩码
- area_set_monitor_callback(area: RID, callback: Callable) —— 区域设置监视回调
- area_set_monitorable(area: RID, monitorable: bool) —— 区域设置可监视
- area_set_param(area: RID, param: int, value: Variant) —— 区域设置参数
- area_set_shape(area: RID, shape_idx: int, shape: RID) —— 区域设置形状
- area_set_shape_disabled(area: RID, shape_idx: int, disabled: bool) —— 区域设置形状禁用
- area_set_shape_transform(area: RID, shape_idx: int, transform: Transform2D) —— 区域设置形状变换
- area_set_space(area: RID, space: RID) —— 区域设置空间
- area_set_transform(area: RID, transform: Transform2D) —— 区域设置变换
- body_add_collision_exception(body: RID, excepted_body: RID) —— 体添加碰撞例外
- body_add_constant_central_force(body: RID, force: Vector2) —— 体添加恒定中心力
- body_add_constant_force(body: RID, force: Vector2, position: Vector2 = Vector2(0, 0)) —— 体添加恒定力
- body_add_constant_torque(body: RID, torque: float) —— 体添加恒定扭矩
- body_add_shape(body: RID, shape: RID, transform: Transform2D = Transform2D(1, 0, 0, 1, 0, 0), disabled: bool = false) —— 体添加形状
- body_apply_central_force(body: RID, force: Vector2) —— 体应用中心力
- body_apply_central_impulse(body: RID, impulse: Vector2) —— 体应用中心冲量
- body_apply_force(body: RID, force: Vector2, position: Vector2 = Vector2(0, 0)) —— 体应用力
- body_apply_impulse(body: RID, impulse: Vector2, position: Vector2 = Vector2(0, 0)) —— 体应用冲量
- body_apply_torque(body: RID, torque: float) —— 体应用扭矩
- body_apply_torque_impulse(body: RID, impulse: float) —— 体应用扭矩冲量
- body_attach_canvas_instance_id(body: RID, id: int) —— 体附加画布实例 ID
- body_attach_object_instance_id(body: RID, id: int) —— 体附加对象实例 ID
- body_clear_shapes(body: RID) —— 体清除形状
- body_create() -> RID —— 创建体
- body_get_canvas_instance_id(body: RID) -> int —— 获取体画布实例 ID
- body_get_collision_layer(body: RID) -> int —— 获取体碰撞层
- body_get_collision_mask(body: RID) -> int —— 获取体碰撞掩码
- body_get_collision_priority(body: RID) -> float —— 获取体碰撞优先级
- body_get_constant_force(body: RID) -> Vector2 —— 获取体恒定力
- body_get_constant_torque(body: RID) -> float —— 获取体恒定扭矩
- body_get_continuous_collision_detection_mode(body: RID) -> int —— 获取体连续碰撞检测模式
- body_get_direct_state(body: RID) -> PhysicsDirectBodyState2D —— 获取体直接状态
- body_get_max_contacts_reported(body: RID) -> int —— 获取体最大报告接触数
- body_get_mode(body: RID) -> int —— 获取体模式
- body_get_object_instance_id(body: RID) -> int —— 获取体对象实例 ID
- body_get_param(body: RID, param: int) -> Variant —— 获取体参数
- body_get_shape(body: RID, shape_idx: int) -> RID —— 获取体形状
- body_get_shape_count(body: RID) -> int —— 获取体形状数量
- body_get_shape_transform(body: RID, shape_idx: int) -> Transform2D —— 获取体形状变换
- body_get_space(body: RID) -> RID —— 获取体空间
- body_get_state(body: RID, state: int) -> Variant —— 获取体状态
- body_is_omitting_force_integration(body: RID) -> bool —— 体是否省略力积分
- body_remove_collision_exception(body: RID, excepted_body: RID) —— 体移除碰撞例外
- body_remove_shape(body: RID, shape_idx: int) —— 体移除形状
- body_reset_mass_properties(body: RID) —— 体重置质量属性
- body_set_axis_velocity(body: RID, axis_velocity: Vector2) —— 体设置轴速度
- body_set_collision_layer(body: RID, layer: int) —— 体设置碰撞层
- body_set_collision_mask(body: RID, mask: int) —— 体设置碰撞掩码
- body_set_collision_priority(body: RID, priority: float) —— 体设置碰撞优先级
- body_set_constant_force(body: RID, force: Vector2) —— 体设置恒定力
- body_set_constant_torque(body: RID, torque: float) —— 体设置恒定扭矩
- body_set_continuous_collision_detection_mode(body: RID, mode: int) —— 体设置连续碰撞检测模式
- body_set_force_integration_callback(body: RID, callable: Callable, userdata: Variant = null) —— 体设置力积分回调
- body_set_max_contacts_reported(body: RID, amount: int) —— 体设置最大报告接触数
- body_set_mode(body: RID, mode: int) —— 体设置模式
- body_set_omit_force_integration(body: RID, enable: bool) —— 体设置省略力积分
- body_set_param(body: RID, param: int, value: Variant) —— 体设置参数
- body_set_shape(body: RID, shape_idx: int, shape: RID) —— 体设置形状
- body_set_shape_as_one_way_collision(body: RID, shape_idx: int, enable: bool, margin: float, direction: Vector2 = Vector2(0, 1)) —— 体设置形状为单向碰撞
- body_set_shape_disabled(body: RID, shape_idx: int, disabled: bool) —— 体设置形状禁用
- body_set_shape_transform(body: RID, shape_idx: int, transform: Transform2D) —— 体设置形状变换
- body_set_space(body: RID, space: RID) —— 体设置空间
- body_set_state(body: RID, state: int, value: Variant) —— 体设置状态
- body_set_state_sync_callback(body: RID, callable: Callable) —— 体设置状态同步回调
- body_test_motion(body: RID, parameters: PhysicsTestMotionParameters2D, result: PhysicsTestMotionResult2D = null) -> bool —— 体测试运动
- capsule_shape_create() -> RID —— 创建胶囊体形状
- circle_shape_create() -> RID —— 创建圆形形状
- concave_polygon_shape_create() -> RID —— 创建凹多边形形状
- convex_polygon_shape_create() -> RID —— 创建凸多边形形状
- damped_spring_joint_get_param(joint: RID, param: int) -> float —— 获取阻尼弹簧关节参数
- damped_spring_joint_set_param(joint: RID, param: int, value: float) —— 设置阻尼弹簧关节参数
- free_rid(rid: RID) —— 释放 RID
- get_process_info(process_info: int) -> int —— 获取进程信息
- joint_clear(joint: RID) —— 清除关节
- joint_create() -> RID —— 创建关节
- joint_disable_collisions_between_bodies(joint: RID, disable: bool) —— 关节禁用体间碰撞
- joint_get_param(joint: RID, param: int) -> float —— 获取关节参数
- joint_get_type(joint: RID) -> int —— 获取关节类型
- joint_is_disabled_collisions_between_bodies(joint: RID) -> bool —— 关节是否禁用了体间碰撞
- joint_make_damped_spring(joint: RID, anchor_a: Vector2, anchor_b: Vector2, body_a: RID, body_b: RID = RID()) —— 创建阻尼弹簧关节
- joint_make_groove(joint: RID, groove1_a: Vector2, groove2_a: Vector2, anchor_b: Vector2, body_a: RID = RID(), body_b: RID = RID()) —— 创建凹槽关节
- joint_make_pin(joint: RID, anchor: Vector2, body_a: RID, body_b: RID = RID()) —— 创建销关节
- joint_set_param(joint: RID, param: int, value: float) —— 设置关节参数
- pin_joint_get_flag(joint: RID, flag: int) -> bool —— 获取销关节标志
- pin_joint_get_param(joint: RID, param: int) -> float —— 获取销关节参数
- pin_joint_set_flag(joint: RID, flag: int, enabled: bool) —— 设置销关节标志
- pin_joint_set_param(joint: RID, param: int, value: float) —— 设置销关节参数
- rectangle_shape_create() -> RID —— 创建矩形形状
- segment_shape_create() -> RID —— 创建线段形状
- separation_ray_shape_create() -> RID —— 创建分离射线形状
- set_active(active: bool) —— 设置激活
- shape_get_data(shape: RID) -> Variant —— 获取形状数据
- shape_get_type(shape: RID) -> int —— 获取形状类型
- shape_set_data(shape: RID, data: Variant) —— 设置形状数据
- space_create() -> RID —— 创建空间
- space_get_direct_state(space: RID) -> PhysicsDirectSpaceState2D —— 获取空间直接状态
- space_get_param(space: RID, param: int) -> float —— 获取空间参数
- space_is_active(space: RID) -> bool —— 空间是否激活
- space_set_active(space: RID, active: bool) —— 设置空间激活
- space_set_param(space: RID, param: int, value: float) —— 设置空间参数
- world_boundary_shape_create() -> RID —— 创建世界边界形状

**枚举（Enums）：**
**SpaceParameter（空间参数）：** SPACE_PARAM_CONTACT_RECYCLE_RADIUS=0 —— 接触回收半径, SPACE_PARAM_CONTACT_MAX_SEPARATION=1 —— 最大接触分离, SPACE_PARAM_CONTACT_MAX_ALLOWED_PENETRATION=2 —— 最大允许穿透, SPACE_PARAM_CONTACT_DEFAULT_BIAS=3 —— 默认接触偏置, SPACE_PARAM_BODY_LINEAR_VELOCITY_SLEEP_THRESHOLD=4 —— 体线速度休眠阈值, ...
**ShapeType（形状类型）：** SHAPE_WORLD_BOUNDARY=0 —— 世界边界, SHAPE_SEPARATION_RAY=1 —— 分离射线, SHAPE_SEGMENT=2 —— 线段, SHAPE_CIRCLE=3 —— 圆形, SHAPE_RECTANGLE=4 —— 矩形, SHAPE_CAPSULE=5 —— 胶囊体, SHAPE_CONVEX_POLYGON=6 —— 凸多边形, SHAPE_CONCAVE_POLYGON=7 —— 凹多边形, SHAPE_CUSTOM=8 —— 自定义
**AreaParameter（区域参数）：** AREA_PARAM_GRAVITY_OVERRIDE_MODE=0 —— 重力覆盖模式, AREA_PARAM_GRAVITY=1 —— 重力, AREA_PARAM_GRAVITY_VECTOR=2 —— 重力向量, AREA_PARAM_GRAVITY_IS_POINT=3 —— 重力是否为点, ...
**AreaSpaceOverrideMode（区域空间覆盖模式）：** AREA_SPACE_OVERRIDE_DISABLED=0 —— 禁用, AREA_SPACE_OVERRIDE_COMBINE=1 —— 组合, AREA_SPACE_OVERRIDE_COMBINE_REPLACE=2 —— 组合替换, AREA_SPACE_OVERRIDE_REPLACE=3 —— 替换, AREA_SPACE_OVERRIDE_REPLACE_COMBINE=4 —— 替换组合
**BodyMode（体模式）：** BODY_MODE_STATIC=0 —— 静态, BODY_MODE_KINEMATIC=1 —— 运动, BODY_MODE_RIGID=2 —— 刚体, BODY_MODE_RIGID_LINEAR=3 —— 线性刚体
**BodyParameter（体参数）：** BODY_PARAM_BOUNCE=0 —— 反弹, BODY_PARAM_FRICTION=1 —— 摩擦, BODY_PARAM_MASS=2 —— 质量, BODY_PARAM_INERTIA=3 —— 惯性, ...
**BodyDampMode（体阻尼模式）：** BODY_DAMP_MODE_COMBINE=0 —— 组合, BODY_DAMP_MODE_REPLACE=1 —— 替换
**BodyState（体状态）：** BODY_STATE_TRANSFORM=0 —— 变换, BODY_STATE_LINEAR_VELOCITY=1 —— 线速度, BODY_STATE_ANGULAR_VELOCITY=2 —— 角速度, BODY_STATE_SLEEPING=3 —— 休眠, BODY_STATE_CAN_SLEEP=4 —— 可休眠
**JointType（关节类型）：** JOINT_TYPE_PIN=0 —— 销, JOINT_TYPE_GROOVE=1 —— 凹槽, JOINT_TYPE_DAMPED_SPRING=2 —— 阻尼弹簧, JOINT_TYPE_MAX=3
**JointParam（关节参数）：** JOINT_PARAM_BIAS=0 —— 偏置, JOINT_PARAM_MAX_BIAS=1 —— 最大偏置, JOINT_PARAM_MAX_FORCE=2 —— 最大力
**PinJointParam（销关节参数）：** PIN_JOINT_SOFTNESS=0 —— 柔软度, PIN_JOINT_LIMIT_UPPER=1 —— 上限, PIN_JOINT_LIMIT_LOWER=2 —— 下限, PIN_JOINT_MOTOR_TARGET_VELOCITY=3 —— 电机目标速度
**PinJointFlag（销关节标志）：** PIN_JOINT_FLAG_ANGULAR_LIMIT_ENABLED=0 —— 启用角度限制, PIN_JOINT_FLAG_MOTOR_ENABLED=1 —— 启用电机
**DampedSpringParam（阻尼弹簧参数）：** DAMPED_SPRING_REST_LENGTH=0 —— 静止长度, DAMPED_SPRING_STIFFNESS=1 —— 刚度, DAMPED_SPRING_DAMPING=2 —— 阻尼
**CCDMode（连续碰撞检测模式）：** CCD_MODE_DISABLED=0 —— 禁用, CCD_MODE_CAST_RAY=1 —— 投射射线, CCD_MODE_CAST_SHAPE=2 —— 投射形状
**AreaBodyStatus（区域体状态）：** AREA_BODY_ADDED=0 —— 体添加, AREA_BODY_REMOVED=1 —— 体移除
**ProcessInfo（进程信息）：** INFO_ACTIVE_OBJECTS=0 —— 活跃对象数, INFO_COLLISION_PAIRS=1 —— 碰撞对数, INFO_ISLAND_COUNT=2 —— 孤岛数
