## PhysicsBody2D（2D 物理体） <- CollisionObject2D（碰撞对象 2D）

PhysicsBody2D 是受物理影响的 2D 游戏对象的抽象基类。所有 2D 物理体都继承自它。

**属性（Props）：**
- input_pickable: bool = false —— 是否可被输入拾取

**方法（Methods）：**
- add_collision_exception_with(body: Node) —— 添加碰撞例外
- get_collision_exceptions() -> PhysicsBody2D[] —— 获取碰撞例外列表
- get_gravity() -> Vector2 —— 获取重力
- move_and_collide(motion: Vector2, test_only: bool = false, safe_margin: float = 0.08, recovery_as_collision: bool = false) -> KinematicCollision2D —— 移动并检测碰撞
- remove_collision_exception_with(body: Node) —— 移除碰撞例外
- test_move(from: Transform2D, motion: Vector2, collision: KinematicCollision2D = null, safe_margin: float = 0.08, recovery_as_collision: bool = false) -> bool —— 测试移动
