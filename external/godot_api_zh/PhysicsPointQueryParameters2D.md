## PhysicsPointQueryParameters2D（物理点查询参数2D） <- RefCounted（引用计数）

通过修改此对象的各项属性（如点的位置），可以为 `PhysicsDirectSpaceState2D.intersect_point` 配置参数。

**属性（Props）：**
- canvas_instance_id: int = 0 —— 画布实例 ID
- collide_with_areas: bool = false —— 是否与区域碰撞
- collide_with_bodies: bool = true —— 是否与刚体碰撞
- collision_mask: int = 4294967295 —— 碰撞掩码
- exclude: RID[] = [] —— 排除的 RID 列表
- position: Vector2 = Vector2(0, 0) —— 点位置
