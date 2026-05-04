## KinematicCollision3D <- RefCounted（引用计数）

保存来自 PhysicsBody3D 运动的碰撞数据，通常来自 `PhysicsBody3D.move_and_collide`。当 PhysicsBody3D 移动时，如果检测到与另一个物体的碰撞则会停止。如果检测到碰撞，将返回一个 KinematicCollision3D 对象。碰撞数据包括碰撞对象、剩余运动量和碰撞位置。此数据可用于确定对碰撞的自定义响应。

**方法（Methods）：**
- get_angle(collision_index: int = 0, up_direction: Vector3 = Vector3(0, 1, 0)) -> float
- get_collider(collision_index: int = 0) -> Object
- get_collider_id(collision_index: int = 0) -> int
- get_collider_rid(collision_index: int = 0) -> RID
- get_collider_shape(collision_index: int = 0) -> Object
- get_collider_shape_index(collision_index: int = 0) -> int
- get_collider_velocity(collision_index: int = 0) -> Vector3
- get_collision_count() -> int
- get_depth() -> float
- get_local_shape(collision_index: int = 0) -> Object
- get_normal(collision_index: int = 0) -> Vector3
- get_position(collision_index: int = 0) -> Vector3
- get_remainder() -> Vector3
- get_travel() -> Vector3
