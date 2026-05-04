## PhysicsTestMotionResult3D（物理测试运动结果3D） <- RefCounted（引用计数）

描述来自 `PhysicsServer3D.body_test_motion` 的运动和碰撞结果。

**方法（Methods）：**
- get_collider(collision_index: int = 0) -> Object —— 获取碰撞器
- get_collider_id(collision_index: int = 0) -> int —— 获取碰撞器ID
- get_collider_rid(collision_index: int = 0) -> RID —— 获取碰撞器RID
- get_collider_shape(collision_index: int = 0) -> int —— 获取碰撞器形状
- get_collider_velocity(collision_index: int = 0) -> Vector3 —— 获取碰撞器速度
- get_collision_count() -> int —— 获取碰撞次数
- get_collision_depth(collision_index: int = 0) -> float —— 获取碰撞深度
- get_collision_local_shape(collision_index: int = 0) -> int —— 获取碰撞本地形状
- get_collision_normal(collision_index: int = 0) -> Vector3 —— 获取碰撞法线
- get_collision_point(collision_index: int = 0) -> Vector3 —— 获取碰撞点
- get_collision_safe_fraction() -> float —— 获取安全碰撞比例
- get_collision_unsafe_fraction() -> float —— 获取不安全碰撞比例
- get_remainder() -> Vector3 —— 获取剩余位移
- get_travel() -> Vector3 —— 获取行进距离
