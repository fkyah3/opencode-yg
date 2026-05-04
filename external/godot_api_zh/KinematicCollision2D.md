## KinematicCollision2D <- RefCounted（引用计数）

保存来自 PhysicsBody2D 运动的碰撞数据，通常来自 `PhysicsBody2D.move_and_collide`。当 PhysicsBody2D 移动时，如果检测到与另一个物体的碰撞则会停止。如果检测到碰撞，将返回一个 KinematicCollision2D 对象。碰撞数据包括碰撞对象、剩余运动量和碰撞位置。此数据可用于确定对碰撞的自定义响应。

**方法（Methods）：**
- get_angle(up_direction: Vector2 = Vector2(0, -1)) -> float
- get_collider() -> Object
- get_collider_id() -> int
- get_collider_rid() -> RID
- get_collider_shape() -> Object
- get_collider_shape_index() -> int
- get_collider_velocity() -> Vector2
- get_depth() -> float
- get_local_shape() -> Object
- get_normal() -> Vector2
- get_position() -> Vector2
- get_remainder() -> Vector2
- get_travel() -> Vector2
