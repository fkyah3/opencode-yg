## PhysicsBody3D（3D物理体） <- CollisionObject3D（3D碰撞对象）

PhysicsBody3D 是所有受物理影响的 3D 游戏对象的抽象基类。所有 3D 物理体都继承自它。**警告：** 如果使用非均匀缩放，此节点可能无法按预期工作。建议保持各轴缩放一致，改为调整碰撞形状。

**属性（Props）：**
- axis_lock_angular_x: bool = false —— 锁定绕X轴旋转
- axis_lock_angular_y: bool = false —— 锁定绕Y轴旋转
- axis_lock_angular_z: bool = false —— 锁定绕Z轴旋转
- axis_lock_linear_x: bool = false —— 锁定X轴移动
- axis_lock_linear_y: bool = false —— 锁定Y轴移动
- axis_lock_linear_z: bool = false —— 锁定Z轴移动

**方法（Methods）：**
- add_collision_exception_with(body: Node) —— 添加碰撞例外
- get_axis_lock(axis: int) -> bool —— 获取轴锁定状态
- get_collision_exceptions() -> PhysicsBody3D[] —— 获取碰撞例外列表
- get_gravity() -> Vector3 —— 获取重力
- move_and_collide(motion: Vector3, test_only: bool = false, safe_margin: float = 0.001, recovery_as_collision: bool = false, max_collisions: int = 1) -> KinematicCollision3D —— 移动并碰撞检测
- remove_collision_exception_with(body: Node) —— 移除碰撞例外
- set_axis_lock(axis: int, lock: bool) —— 设置轴锁定
- test_move(from: Transform3D, motion: Vector3, collision: KinematicCollision3D = null, safe_margin: float = 0.001, recovery_as_collision: bool = false, max_collisions: int = 1) -> bool —— 测试移动
