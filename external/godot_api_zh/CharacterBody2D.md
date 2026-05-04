## CharacterBody2D（角色体2D）<- PhysicsBody2D（物理体2D）

CharacterBody2D 是专用于用户控制的物理体的类。它们完全不受物理影响，但会影响其路径上的其他物理体。它们主要用于提供高级 API，除了 `PhysicsBody2D.move_and_collide` 提供的常规碰撞检测外，还支持带墙壁和斜坡检测的物体移动（`move_and_slide` 方法）。这使得它对于必须以特定方式移动并与世界碰撞的高度可配置物理体非常有用，如用户控制的角色通常所需。对于不需要复杂移动或碰撞检测的游戏对象（如移动平台），AnimatableBody2D 更易于配置。

**属性（Props）：**
- floor_block_on_wall: bool = true —— 墙壁阻挡地面
- floor_constant_speed: bool = false —— 地面恒定速度
- floor_max_angle: float = 0.7853982 —— 最大地面角度
- floor_snap_length: float = 1.0 —— 地面吸附长度
- floor_stop_on_slope: bool = true —— 斜坡上停止
- max_slides: int = 4 —— 最大滑动次数
- motion_mode: int (CharacterBody2D.MotionMode) = 0 —— 运动模式
- platform_floor_layers: int = 4294967295 —— 平台地面层
- platform_on_leave: int (CharacterBody2D.PlatformOnLeave) = 0 —— 离开平台时
- platform_wall_layers: int = 0 —— 平台墙壁层
- safe_margin: float = 0.08 —— 安全边距
- slide_on_ceiling: bool = true —— 在天花板上滑动
- up_direction: Vector2 = Vector2(0, -1) —— 上方方向
- velocity: Vector2 = Vector2(0, 0) —— 速度
- wall_min_slide_angle: float = 0.2617994 —— 墙壁最小滑动角度

**方法（Methods）：**
- apply_floor_snap() —— 应用地面吸附
- get_floor_angle(up_direction: Vector2 = Vector2(0, -1)) -> float —— 获取地面角度
- get_floor_normal() -> Vector2 —— 获取地面法线
- get_last_motion() -> Vector2 —— 获取最后运动
- get_last_slide_collision() -> KinematicCollision2D —— 获取最后一次滑动碰撞
- get_platform_velocity() -> Vector2 —— 获取平台速度
- get_position_delta() -> Vector2 —— 获取位置增量
- get_real_velocity() -> Vector2 —— 获取实际速度
- get_slide_collision(slide_idx: int) -> KinematicCollision2D —— 获取滑动碰撞
- get_slide_collision_count() -> int —— 获取滑动碰撞次数
- get_wall_normal() -> Vector2 —— 获取墙壁法线
- is_on_ceiling() -> bool —— 是否在天花板上
- is_on_ceiling_only() -> bool —— 是否仅在天花板上
- is_on_floor() -> bool —— 是否在地面上
- is_on_floor_only() -> bool —— 是否仅在地面上
- is_on_wall() -> bool —— 是否在墙壁上
- is_on_wall_only() -> bool —— 是否仅在墙壁上
- move_and_slide() -> bool —— 移动并滑动

**枚举（Enums）：**
**MotionMode（运动模式）：** MOTION_MODE_GROUNDED=0 —— 地面模式，MOTION_MODE_FLOATING=1 —— 漂浮模式
**PlatformOnLeave（离开平台时）：** PLATFORM_ON_LEAVE_ADD_VELOCITY=0 —— 增加速度，PLATFORM_ON_LEAVE_ADD_UPWARD_VELOCITY=1 —— 增加向上速度，PLATFORM_ON_LEAVE_DO_NOTHING=2 —— 不做任何事
