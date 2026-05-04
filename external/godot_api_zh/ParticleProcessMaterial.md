## ParticleProcessMaterial（粒子过程材质） <- Material（材质）

ParticleProcessMaterial 定义粒子的属性和行为。它用于 GPUParticles2D 和 GPUParticles3D 节点的 `process_material`。此材质的某些属性在粒子发射时应用于每个粒子，而其他属性可以应用 CurveTexture 或 GradientTexture1D 来在粒子生命周期内改变数值或颜色。

**属性（Props）：**
- alpha_curve: Texture2D —— 透明度曲线
- angle_curve: Texture2D —— 角度曲线
- angle_max: float = 0.0 —— 最大角度
- angle_min: float = 0.0 —— 最小角度
- angular_velocity_curve: Texture2D —— 角速度曲线
- angular_velocity_max: float = 0.0 —— 最大角速度
- angular_velocity_min: float = 0.0 —— 最小角速度
- anim_offset_curve: Texture2D —— 动画偏移曲线
- anim_offset_max: float = 0.0 —— 最大动画偏移
- anim_offset_min: float = 0.0 —— 最小动画偏移
- anim_speed_curve: Texture2D —— 动画速度曲线
- anim_speed_max: float = 0.0 —— 最大动画速度
- anim_speed_min: float = 0.0 —— 最小动画速度
- attractor_interaction_enabled: bool = true —— 是否启用吸引子交互
- collision_bounce: float —— 碰撞反弹
- collision_friction: float —— 碰撞摩擦
- collision_mode: int (ParticleProcessMaterial.CollisionMode) = 0 —— 碰撞模式
- collision_use_scale: bool = false —— 碰撞是否使用缩放
- color: Color = Color(1, 1, 1, 1) —— 颜色
- color_initial_ramp: Texture2D —— 初始颜色渐变
- color_ramp: Texture2D —— 颜色渐变
- damping_curve: Texture2D —— 阻尼曲线
- damping_max: float = 0.0 —— 最大阻尼
- damping_min: float = 0.0 —— 最小阻尼
- direction: Vector3 = Vector3(1, 0, 0) —— 方向
- directional_velocity_curve: Texture2D —— 方向速度曲线
- directional_velocity_max: float —— 最大方向速度
- directional_velocity_min: float —— 最小方向速度
- emission_box_extents: Vector3 —— 发射盒范围
- emission_color_texture: Texture2D —— 发射颜色纹理
- emission_curve: Texture2D —— 发射曲线
- emission_normal_texture: Texture2D —— 发射法线纹理
- emission_point_count: int —— 发射点数量
- emission_point_texture: Texture2D —— 发射点纹理
- emission_ring_axis: Vector3 —— 发射环轴
- emission_ring_cone_angle: float —— 发射环锥角
- emission_ring_height: float —— 发射环高度
- emission_ring_inner_radius: float —— 发射环内半径
- emission_ring_radius: float —— 发射环半径
- emission_shape: int (ParticleProcessMaterial.EmissionShape) = 0 —— 发射形状
- emission_shape_offset: Vector3 = Vector3(0, 0, 0) —— 发射形状偏移
- emission_shape_scale: Vector3 = Vector3(1, 1, 1) —— 发射形状缩放
- emission_sphere_radius: float —— 发射球体半径
- flatness: float = 0.0 —— 平坦度
- gravity: Vector3 = Vector3(0, -9.8, 0) —— 重力
- hue_variation_curve: Texture2D —— 色相变化曲线
- hue_variation_max: float = 0.0 —— 最大色相变化
- hue_variation_min: float = 0.0 —— 最小色相变化
- inherit_velocity_ratio: float = 0.0 —— 继承速度比例
- initial_velocity_max: float = 0.0 —— 最大初始速度
- initial_velocity_min: float = 0.0 —— 最小初始速度
- lifetime_randomness: float = 0.0 —— 生命周期随机性
- linear_accel_curve: Texture2D —— 线性加速度曲线
- linear_accel_max: float = 0.0 —— 最大线性加速度
- linear_accel_min: float = 0.0 —— 最小线性加速度
- orbit_velocity_curve: Texture2D —— 轨道速度曲线
- orbit_velocity_max: float = 0.0 —— 最大轨道速度
- orbit_velocity_min: float = 0.0 —— 最小轨道速度
- particle_flag_align_y: bool = false —— 粒子标志：对齐Y轴
- particle_flag_damping_as_friction: bool = false —— 粒子标志：阻尼作为摩擦
- particle_flag_disable_z: bool = false —— 粒子标志：禁用Z轴
- particle_flag_rotate_y: bool = false —— 粒子标志：绕Y轴旋转
- radial_accel_curve: Texture2D —— 径向加速度曲线
- radial_accel_max: float = 0.0 —— 最大径向加速度
- radial_accel_min: float = 0.0 —— 最小径向加速度
- radial_velocity_curve: Texture2D —— 径向速度曲线
- radial_velocity_max: float = 0.0 —— 最大径向速度
- radial_velocity_min: float = 0.0 —— 最小径向速度
- scale_curve: Texture2D —— 缩放曲线
- scale_max: float = 1.0 —— 最大缩放
- scale_min: float = 1.0 —— 最小缩放
- scale_over_velocity_curve: Texture2D —— 按速度缩放曲线
- scale_over_velocity_max: float = 0.0 —— 按速度最大缩放
- scale_over_velocity_min: float = 0.0 —— 按速度最小缩放
- spread: float = 45.0 —— 扩散角度
- sub_emitter_amount_at_collision: int —— 碰撞时子发射器数量
- sub_emitter_amount_at_end: int —— 结束时子发射器数量
- sub_emitter_amount_at_start: int —— 开始时子发射器数量
- sub_emitter_frequency: float —— 子发射器频率
- sub_emitter_keep_velocity: bool = false —— 子发射器是否保持速度
- sub_emitter_mode: int (ParticleProcessMaterial.SubEmitterMode) = 0 —— 子发射器模式
- tangential_accel_curve: Texture2D —— 切向加速度曲线
- tangential_accel_max: float = 0.0 —— 最大切向加速度
- tangential_accel_min: float = 0.0 —— 最小切向加速度
- turbulence_enabled: bool = false —— 是否启用湍流
- turbulence_influence_max: float = 0.1 —— 最大湍流影响
- turbulence_influence_min: float = 0.1 —— 最小湍流影响
- turbulence_influence_over_life: Texture2D —— 生命周期湍流影响曲线
- turbulence_initial_displacement_max: float = 0.0 —— 最大湍流初始位移
- turbulence_initial_displacement_min: float = 0.0 —— 最小湍流初始位移
- turbulence_noise_scale: float = 9.0 —— 湍流噪声缩放
- turbulence_noise_speed: Vector3 = Vector3(0, 0, 0) —— 湍流噪声速度
- turbulence_noise_speed_random: float = 0.2 —— 湍流噪声速度随机性
- turbulence_noise_strength: float = 1.0 —— 湍流噪声强度
- velocity_limit_curve: Texture2D —— 速度限制曲线
- velocity_pivot: Vector3 = Vector3(0, 0, 0) —— 速度枢轴

**方法（Methods）：**
- get_param(param: int) -> Vector2 —— 获取参数
- get_param_max(param: int) -> float —— 获取参数最大值
- get_param_min(param: int) -> float —— 获取参数最小值
- get_param_texture(param: int) -> Texture2D —— 获取参数纹理
- get_particle_flag(particle_flag: int) -> bool —— 获取粒子标志
- set_param(param: int, value: Vector2) —— 设置参数
- set_param_max(param: int, value: float) —— 设置参数最大值
- set_param_min(param: int, value: float) —— 设置参数最小值
- set_param_texture(param: int, texture: Texture2D) —— 设置参数纹理
- set_particle_flag(particle_flag: int, enable: bool) —— 设置粒子标志

**信号（Signals）：**
- emission_shape_changed —— 发射形状已更改

**枚举（Enums）：**
**Parameter（参数）：** PARAM_INITIAL_LINEAR_VELOCITY=0 —— 初始线性速度, PARAM_ANGULAR_VELOCITY=1 —— 角速度, PARAM_ORBIT_VELOCITY=2 —— 轨道速度, PARAM_LINEAR_ACCEL=3 —— 线性加速度, PARAM_RADIAL_ACCEL=4 —— 径向加速度, PARAM_TANGENTIAL_ACCEL=5 —— 切向加速度, PARAM_DAMPING=6 —— 阻尼, PARAM_ANGLE=7 —— 角度, PARAM_SCALE=8 —— 缩放, PARAM_HUE_VARIATION=9 —— 色相变化, ...
**ParticleFlags（粒子标志）：** PARTICLE_FLAG_ALIGN_Y_TO_VELOCITY=0 —— Y轴对齐速度, PARTICLE_FLAG_ROTATE_Y=1 —— 绕Y轴旋转, PARTICLE_FLAG_DISABLE_Z=2 —— 禁用Z轴, PARTICLE_FLAG_DAMPING_AS_FRICTION=3 —— 阻尼作为摩擦, PARTICLE_FLAG_MAX=4
**EmissionShape（发射形状）：** EMISSION_SHAPE_POINT=0 —— 点, EMISSION_SHAPE_SPHERE=1 —— 球体, EMISSION_SHAPE_SPHERE_SURFACE=2 —— 球体表面, EMISSION_SHAPE_BOX=3 —— 盒体, EMISSION_SHAPE_POINTS=4 —— 点集, EMISSION_SHAPE_DIRECTED_POINTS=5 —— 定向点集, EMISSION_SHAPE_RING=6 —— 环, EMISSION_SHAPE_MAX=7
**SubEmitterMode（子发射器模式）：** SUB_EMITTER_DISABLED=0 —— 禁用, SUB_EMITTER_CONSTANT=1 —— 持续发射, SUB_EMITTER_AT_END=2 —— 结束时发射, SUB_EMITTER_AT_COLLISION=3 —— 碰撞时发射, SUB_EMITTER_AT_START=4 —— 开始时发射, SUB_EMITTER_MAX=5
**CollisionMode（碰撞模式）：** COLLISION_DISABLED=0 —— 禁用, COLLISION_RIGID=1 —— 刚体, COLLISION_HIDE_ON_CONTACT=2 —— 接触时隐藏, COLLISION_MAX=3
