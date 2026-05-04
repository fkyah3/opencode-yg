## PhysicsTestMotionParameters3D（物理测试运动参数3D） <- RefCounted（引用计数）

通过更改此对象的各种属性（如运动向量），可以为 `PhysicsServer3D.body_test_motion` 配置参数。

**Props（属性）：**
- collide_separation_ray: bool = false —— 是否与分离射线碰撞
- exclude_bodies: RID[] = [] —— 排除的物体RID列表
- exclude_objects: int[] = [] —— 排除的对象ID列表
- from: Transform3D = Transform3D(1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0) —— 起始变换
- margin: float = 0.001 —— 边距
- max_collisions: int = 1 —— 最大碰撞数
- motion: Vector3 = Vector3(0, 0, 0) —— 运动向量
- recovery_as_collision: bool = false —— 是否将恢复视为碰撞
