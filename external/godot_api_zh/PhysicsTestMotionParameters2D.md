## PhysicsTestMotionParameters2D（物理测试运动参数2D） <- RefCounted（引用计数）

通过更改此对象的各项属性（如运动参数），可以配置 `PhysicsServer2D.body_test_motion` 的参数。

**属性（Props）：**
- collide_separation_ray: bool = false —— 碰撞分离射线
- exclude_bodies: RID[] = [] —— 排除的物理体
- exclude_objects: int[] = [] —— 排除的对象
- from: Transform2D = Transform2D(1, 0, 0, 1, 0, 0) —— 起始变换
- margin: float = 0.08 —— 边距
- motion: Vector2 = Vector2(0, 0) —— 运动向量
- recovery_as_collision: bool = false —— 恢复作为碰撞
