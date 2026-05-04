## PhysicsShapeQueryParameters3D（物理形状查询参数3D） <- RefCounted（引用计数）

通过更改此对象的各种属性（如形状），可以为 PhysicsDirectSpaceState3D 的方法配置参数。

**Props（属性）：**
- collide_with_areas: bool = false —— 是否与区域碰撞
- collide_with_bodies: bool = true —— 是否与物体碰撞
- collision_mask: int = 4294967295 —— 碰撞掩码
- exclude: RID[] = [] —— 排除的物体RID列表
- margin: float = 0.0 —— 边距
- motion: Vector3 = Vector3(0, 0, 0) —— 运动向量
- shape: Resource —— 形状资源
- shape_rid: RID = RID() —— 形状RID
- transform: Transform3D = Transform3D(1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0) —— 变换
