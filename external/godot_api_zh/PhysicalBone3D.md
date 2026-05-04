## PhysicalBone3D（3D物理骨骼） <- PhysicsBody3D（3D物理体）

PhysicalBone3D 节点是一个物理体，可用于使 Skeleton3D 中的骨骼对物理产生反应。**注意：** 要通过射线检测检测物理骨骼，父节点 PhysicalBoneSimulator3D 的 `SkeletonModifier3D.active` 属性必须为 `true`，并且 Skeleton3D 的骨骼必须正确分配给 PhysicalBone3D；这意味着 `get_bone_id` 应返回有效的 ID（`>= 0`）。

**属性（Props）：**
- angular_damp: float = 0.0 —— 角阻尼
- angular_damp_mode: int (PhysicalBone3D.DampMode) = 0 —— 角阻尼模式
- angular_velocity: Vector3 = Vector3(0, 0, 0) —— 角速度
- body_offset: Transform3D = Transform3D(1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0) —— 体偏移
- bounce: float = 0.0 —— 反弹
- can_sleep: bool = true —— 是否可以休眠
- custom_integrator: bool = false —— 自定义积分器
- friction: float = 1.0 —— 摩擦
- gravity_scale: float = 1.0 —— 重力缩放
- joint_offset: Transform3D = Transform3D(1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0) —— 关节偏移
- joint_rotation: Vector3 = Vector3(0, 0, 0) —— 关节旋转
- joint_type: int (PhysicalBone3D.JointType) = 0 —— 关节类型
- linear_damp: float = 0.0 —— 线性阻尼
- linear_damp_mode: int (PhysicalBone3D.DampMode) = 0 —— 线性阻尼模式
- linear_velocity: Vector3 = Vector3(0, 0, 0) —— 线速度
- mass: float = 1.0 —— 质量

**方法（Methods）：**
- apply_central_impulse(impulse: Vector3) —— 应用中心冲量
- apply_impulse(impulse: Vector3, position: Vector3 = Vector3(0, 0, 0)) —— 应用冲量
- get_bone_id() -> int —— 获取骨骼 ID
- get_simulate_physics() -> bool —— 获取物理模拟状态
- is_simulating_physics() -> bool —— 是否正在模拟物理

**枚举（Enums）：**
**DampMode（阻尼模式）：** DAMP_MODE_COMBINE=0 —— 组合, DAMP_MODE_REPLACE=1 —— 替换
**JointType（关节类型）：** JOINT_TYPE_NONE=0 —— 无, JOINT_TYPE_PIN=1 —— 销, JOINT_TYPE_CONE=2 —— 锥, JOINT_TYPE_HINGE=3 —— 铰链, JOINT_TYPE_SLIDER=4 —— 滑块, JOINT_TYPE_6DOF=5 —— 六自由度
