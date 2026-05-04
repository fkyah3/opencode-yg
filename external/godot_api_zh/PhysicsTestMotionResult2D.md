## PhysicsTestMotionResult2D（物理测试运动结果2D）<- RefCounted（引用计数）

描述 `PhysicsServer2D.body_test_motion` 的运动和碰撞结果。

**方法（Methods）：**
- get_collider() -> Object —— 获取碰撞器
- get_collider_id() -> int —— 获取碰撞器 ID
- get_collider_rid() -> RID —— 获取碰撞器 RID
- get_collider_shape() -> int —— 获取碰撞器形状索引
- get_collider_velocity() -> Vector2 —— 获取碰撞器速度
- get_collision_depth() -> float —— 获取碰撞深度
- get_collision_local_shape() -> int —— 获取本地碰撞形状索引
- get_collision_normal() -> Vector2 —— 获取碰撞法线
- get_collision_point() -> Vector2 —— 获取碰撞点
- get_collision_safe_fraction() -> float —— 获取安全运动比例
- get_collision_unsafe_fraction() -> float —— 获取不安全运动比例
- get_remainder() -> Vector2 —— 获取剩余运动
- get_travel() -> Vector2 —— 获取实际运动
