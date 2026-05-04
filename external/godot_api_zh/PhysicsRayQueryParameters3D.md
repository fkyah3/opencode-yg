## PhysicsRayQueryParameters3D（物理射线查询参数3D）<- RefCounted（引用计数）

通过更改此对象的各个属性（如射线位置），你可以配置 `PhysicsDirectSpaceState3D.intersect_ray` 的参数。

**属性（Props）：**
- collide_with_areas: bool = false —— 与区域碰撞
- collide_with_bodies: bool = true —— 与物体碰撞
- collision_mask: int = 4294967295 —— 碰撞掩码
- exclude: RID[] = [] —— 排除列表
- from: Vector3 = Vector3(0, 0, 0) —— 起点
- hit_back_faces: bool = true —— 击中背面
- hit_from_inside: bool = false —— 从内部击出
- to: Vector3 = Vector3(0, 0, 0) —— 终点

**方法（Methods）：**
- create(from: Vector3, to: Vector3, collision_mask: int = 4294967295, exclude: RID[] = []) -> PhysicsRayQueryParameters3D —— 创建射线查询参数
