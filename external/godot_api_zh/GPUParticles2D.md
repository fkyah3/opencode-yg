## GPUParticles2D（GPU粒子2D） <- Node2D（节点2D）

用于创建各种粒子系统和效果的 2D 粒子节点。GPUParticles2D 具有一个发射器，以给定速率生成一定数量的粒子。使用 `process_material` 属性添加 ParticleProcessMaterial 来配置粒子的外观和行为。或者，你可以添加一个 ShaderMaterial，它将应用于所有粒子。2D 粒子可以选择与 LightOccluder2D 碰撞，但不会与 PhysicsBody2D 节点碰撞。

**属性（Props）：**
- amount: int = 8 —— 粒子数量
- amount_ratio: float = 1.0 —— 粒子数量比例
- collision_base_size: float = 1.0 —— 碰撞基础大小
- draw_order: int (GPUParticles2D.DrawOrder) = 1 —— 绘制顺序
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
- texture: Texture2D —— 纹理
- trail_enabled: bool = false —— 尾迹启用
- trail_lifetime: float = 0.3 —— 尾迹生命周期
- trail_section_subdivisions: int = 4 —— 尾迹段细分
- trail_sections: int = 8 —— 尾迹段数
- use_fixed_seed: bool = false —— 使用固定种子
- visibility_rect: Rect2 = Rect2(-100, -100, 200, 200) —— 可见矩形

**方法（Methods）：**
- capture_rect() -> Rect2 —— 捕获矩形
- convert_from_particles(particles: Node) —— 从粒子转换
- emit_particle(xform: Transform2D, velocity: Vector2, color: Color, custom: Color, flags: int) —— 发射粒子
- request_particles_process(process_time: float) —— 请求粒子处理
- restart(keep_seed: bool = false) —— 重启

**信号（Signals）：**
- finished —— 已完成

**枚举（Enums）：**
**DrawOrder（绘制顺序）：** DRAW_ORDER_INDEX=0（索引顺序）, DRAW_ORDER_LIFETIME=1（生命周期顺序）, DRAW_ORDER_REVERSE_LIFETIME=2（生命周期反向顺序）
**EmitFlags（发射标志）：** EMIT_FLAG_POSITION=1（位置）, EMIT_FLAG_ROTATION_SCALE=2（旋转缩放）, EMIT_FLAG_VELOCITY=4（速度）, EMIT_FLAG_COLOR=8（颜色）, EMIT_FLAG_CUSTOM=16（自定义）
