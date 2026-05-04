## GPUParticles3D（GPU粒子3D） <- GeometryInstance3D（几何实例3D）

用于创建各种粒子系统和效果的 3D 粒子节点。GPUParticles3D 具有一个发射器，以给定速率生成一定数量的粒子。使用 `process_material` 添加 ParticleProcessMaterial 来配置粒子的外观和行为。或者，你可以添加一个 ShaderMaterial，它将应用于所有粒子。

**属性（Props）：**
- amount: int = 8 —— 粒子数量
- amount_ratio: float = 1.0 —— 粒子数量比例
- collision_base_size: float = 0.01 —— 碰撞基础大小
- draw_order: int (GPUParticles3D.DrawOrder) = 0 —— 绘制顺序
- draw_pass_1: Mesh —— 绘制通道 1
- draw_pass_2: Mesh —— 绘制通道 2
- draw_pass_3: Mesh —— 绘制通道 3
- draw_pass_4: Mesh —— 绘制通道 4
- draw_passes: int = 1 —— 绘制通道数
- draw_skin: Skin —— 绘制皮肤
- emitting: bool = true —— 是否发射中
- explosiveness: float = 0.0 —— 爆发性
- fixed_fps: int = 30 —— 固定 FPS
- fract_delta: bool = true —— 分数增量
- interp_to_end: float = 0.0 —— 插值到结束
- interpolate: bool = true —— 插值
- lifetime: float = 1.0 —— 生命周期
- local_coords: bool = false —— 局部坐标
- one_shot: bool = false —— 一次性
- preprocess: float = 0.0 —— 预处理
- process_material: Material —— 粒子处理材质
- randomness: float = 0.0 —— 随机性
- seed: int = 0 —— 种子
- speed_scale: float = 1.0 —— 速度缩放
- sub_emitter: NodePath = NodePath("") —— 子发射器
- trail_enabled: bool = false —— 尾迹启用
- trail_lifetime: float = 0.3 —— 尾迹生命周期
- transform_align: int (GPUParticles3D.TransformAlign) = 0 —— 变换对齐
- use_fixed_seed: bool = false —— 使用固定种子
- visibility_aabb: AABB = AABB(-4, -4, -4, 8, 8, 8) —— 可见性 AABB

**方法（Methods）：**
- capture_aabb() -> AABB —— 捕获 AABB
- convert_from_particles(particles: Node) —— 从粒子转换
- emit_particle(xform: Transform3D, velocity: Vector3, color: Color, custom: Color, flags: int) —— 发射粒子
- get_draw_pass_mesh(pass: int) -> Mesh —— 获取绘制通道网格
- request_particles_process(process_time: float) —— 请求粒子处理
- restart(keep_seed: bool = false) —— 重启
- set_draw_pass_mesh(pass: int, mesh: Mesh) —— 设置绘制通道网格

**信号（Signals）：**
- finished —— 已完成

**枚举（Enums）：**
**DrawOrder（绘制顺序）：** DRAW_ORDER_INDEX=0（索引顺序）, DRAW_ORDER_LIFETIME=1（生命周期顺序）, DRAW_ORDER_REVERSE_LIFETIME=2（生命周期反向顺序）, DRAW_ORDER_VIEW_DEPTH=3（视图深度顺序）
**EmitFlags（发射标志）：** EMIT_FLAG_POSITION=1（位置）, EMIT_FLAG_ROTATION_SCALE=2（旋转缩放）, EMIT_FLAG_VELOCITY=4（速度）, EMIT_FLAG_COLOR=8（颜色）, EMIT_FLAG_CUSTOM=16（自定义）
**常量（Constants）：** MAX_DRAW_PASSES=4（最大绘制通道数）
**TransformAlign（变换对齐）：** TRANSFORM_ALIGN_DISABLED=0（禁用）, TRANSFORM_ALIGN_Z_BILLBOARD=1（Z 轴公告板）, TRANSFORM_ALIGN_Y_TO_VELOCITY=2（Y 轴对齐速度）, TRANSFORM_ALIGN_Z_BILLBOARD_Y_TO_VELOCITY=3（Z 轴公告板 Y 轴对齐速度）
