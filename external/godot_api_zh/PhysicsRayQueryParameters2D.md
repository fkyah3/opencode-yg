## PhysicsRayQueryParameters2D（物理射线查询参数2D）<- RefCounted（引用计数）

通过更改此对象的各种属性（例如射线位置），你可以为 `PhysicsDirectSpaceState2D.intersect_ray` 配置参数。

**属性（Props）：**
- collide_with_areas: bool = false —— 与区域碰撞
- collide_with_bodies: bool = true —— 与刚体碰撞
- collision_mask: int = 4294967295 —— 碰撞掩码
- exclude: RID[] = [] —— 排除列表
- from: Vector2 = Vector2(0, 0) —— 起点
- hit_from_inside: bool = false —— 从内部击中
- to: Vector2 = Vector2(0, 0) —— 终点

**方法（Methods）：**
- create(from: Vector2, to: Vector2, collision_mask: int = 4294967295, exclude: RID[] = []) -> PhysicsRayQueryParameters2D —— 创建射线查询参数
