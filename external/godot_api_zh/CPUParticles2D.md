## CPUParticles2D（CPU粒子2D）<- Node2D

基于 CPU 的 2D 粒子节点，用于创建各种粒子系统和效果。另请参见 GPUParticles2D，它提供相同但带有硬件加速的功能，可能不适用于较旧的设备。

**属性（Props）：**
- amount: int = 8 —— 粒子数量
- angle_curve: Curve —— 角度曲线
- angle_max: float = 0.0 —— 最大角度
- angle_min: float = 0.0 —— 最小角度
- angular_velocity_curve: Curve —— 角速度曲线
- angular_velocity_max: float = 0.0 —— 最大角速度
- angular_velocity_min: float = 0.0 —— 最小角速度
- anim_offset_curve: Curve —— 动画偏移曲线
- anim_offset_max: float = 0.0 —— 最大动画偏移
- anim_offset_min: float = 0.0 —— 最小动画偏移
- anim_speed_curve: Curve —— 动画速度曲线
- anim_speed_max: float = 0.0 —— 最大动画速度
- anim_speed_min: float = 0.0 —— 最小动画速度
- color: Color = Color(1, 1, 1, 1) —— 颜色
- color_initial_ramp: Gradient —— 初始颜色渐变
- color_ramp: Gradient —— 颜色渐变
- damping_curve: Curve —— 阻尼曲线
- damping_max: float = 0.0 —— 最大阻尼
- damping_min: float = 0.0 —— 最小阻尼
- direction: Vector2 = Vector2(1, 0) —— 方向
- draw_order: int (CPUParticles2D.DrawOrder) = 0 —— 绘制顺序
- emission_colors: PackedColorArray —— 发射颜色
- emission_normals: PackedVector2Array —— 发射法线
- emission_points: PackedVector2Array —— 发射点
- emission_rect_extents: Vector2 —— 发射矩形范围
- emission_ring_inner_radius: float —— 发射环内径
- emission_ring_radius: float —— 发射环半径
- emission_shape: int (CPUParticles2D.EmissionShape) = 0 —— 发射形状
- emission_sphere_radius: float —— 发射球体半径
- emitting: bool = true —— 正在发射
- explosiveness: float = 0.0 —— 爆发性
- fixed_fps: int = 0 —— 固定帧率
- fract_delta: bool = true —— 分数增量
- gravity: Vector2 = Vector2(0, 980) —— 重力
- hue_variation_curve: Curve —— 色相变化曲线
- hue_variation_max: float = 0.0 —— 最大色相变化
- hue_variation_min: float = 0.0 —— 最小色相变化
- initial_velocity_max: float = 0.0 —— 最大初始速度
- initial_velocity_min: float = 0.0 —— 最小初始速度
- lifetime: float = 1.0 —— 生命周期
- lifetime_randomness: float = 0.0 —— 生命周期随机性
- linear_accel_curve: Curve —— 线性加速度曲线
- linear_accel_max: float = 0.0 —— 最大线性加速度
- linear_accel_min: float = 0.0 —— 最小线性加速度
- local_coords: bool = false —— 局部坐标
- one_shot: bool = false —— 单次发射
- orbit_velocity_curve: Curve —— 轨道速度曲线
- orbit_velocity_max: float = 0.0 —— 最大轨道速度
- orbit_velocity_min: float = 0.0 —— 最小轨道速度
- particle_flag_align_y: bool = false —— 粒子标志 Y 轴对齐
- physics_interpolation_mode: int (Node.PhysicsInterpolationMode) = 2 —— 物理插值模式
- preprocess: float = 0.0 —— 预处理
- radial_accel_curve: Curve —— 径向加速度曲线
- radial_accel_max: float = 0.0 —— 最大径向加速度
- radial_accel_min: float = 0.0 —— 最小径向加速度
- randomness: float = 0.0 —— 随机性
- scale_amount_curve: Curve —— 缩放量曲线
- scale_amount_max: float = 1.0 —— 最大缩放量
- scale_amount_min: float = 1.0 —— 最小缩放量
- scale_curve_x: Curve —— X 缩放曲线
- scale_curve_y: Curve —— Y 缩放曲线
- seed: int = 0 —— 随机种子
- speed_scale: float = 1.0 —— 速度缩放
- split_scale: bool = false —— 分离缩放
- spread: float = 45.0 —— 扩散角度
- tangential_accel_curve: Curve —— 切向加速度曲线
- tangential_accel_max: float = 0.0 —— 最大切向加速度
- tangential_accel_min: float = 0.0 —— 最小切向加速度
- texture: Texture2D —— 纹理
- use_fixed_seed: bool = false —— 使用固定种子

**方法（Methods）：**
- convert_from_particles(particles: Node) —— 从粒子节点转换
- get_param_curve(param: int) -> Curve —— 获取参数曲线
- get_param_max(param: int) -> float —— 获取参数最大值
- get_param_min(param: int) -> float —— 获取参数最小值
- get_particle_flag(particle_flag: int) -> bool —— 获取粒子标志
- request_particles_process(process_time: float) —— 请求粒子处理
- restart(keep_seed: bool = false) —— 重启
- set_param_curve(param: int, curve: Curve) —— 设置参数曲线
- set_param_max(param: int, value: float) —— 设置参数最大值
- set_param_min(param: int, value: float) —— 设置参数最小值
- set_particle_flag(particle_flag: int, enable: bool) —— 设置粒子标志

**信号（Signals）：**
- finished —— 已完成

**枚举（Enums）：**
**DrawOrder（绘制顺序）：** DRAW_ORDER_INDEX=0 —— 按索引，DRAW_ORDER_LIFETIME=1 —— 按生命周期
**Parameter（参数）：** PARAM_INITIAL_LINEAR_VELOCITY=0 —— 初始线性速度，PARAM_ANGULAR_VELOCITY=1 —— 角速度，PARAM_ORBIT_VELOCITY=2 —— 轨道速度，PARAM_LINEAR_ACCEL=3 —— 线性加速度，PARAM_RADIAL_ACCEL=4 —— 径向加速度，PARAM_TANGENTIAL_ACCEL=5 —— 切向加速度，PARAM_DAMPING=6 —— 阻尼，PARAM_ANGLE=7 —— 角度，PARAM_SCALE=8 —— 缩放，PARAM_HUE_VARIATION=9 —— 色相变化，...
**ParticleFlags（粒子标志）：** PARTICLE_FLAG_ALIGN_Y_TO_VELOCITY=0 —— Y 轴对齐速度，PARTICLE_FLAG_ROTATE_Y=1 —— 绕 Y 轴旋转，PARTICLE_FLAG_DISABLE_Z=2 —— 禁用 Z，PARTICLE_FLAG_MAX=3
**EmissionShape（发射形状）：** EMISSION_SHAPE_POINT=0 —— 点，EMISSION_SHAPE_SPHERE=1 —— 球体，EMISSION_SHAPE_SPHERE_SURFACE=2 —— 球体表面，EMISSION_SHAPE_RECTANGLE=3 —— 矩形，EMISSION_SHAPE_POINTS=4 —— 多点，EMISSION_SHAPE_DIRECTED_POINTS=5 —— 有向点，EMISSION_SHAPE_RING=6 —— 环，EMISSION_SHAPE_MAX=7
