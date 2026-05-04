## RayCast2D（2D射线检测） <- Node2D（2D节点）

射线检测表示一条从原点延伸到 `target_position` 的射线，如果与任何物体相交，则找到其路径上最近的物体。RayCast2D 可以通过将物体添加到例外列表、使检测报告忽略 Area2D（`collide_with_areas`）或 PhysicsBody2D（`collide_with_bodies`），或配置物理层来忽略某些物体。RayCast2D 在每个物理帧计算相交，并保存结果直到下一个物理帧。如果需要即时射线检测，或者要在同一个物理帧内多次配置 RayCast2D，请使用 `force_raycast_update`。要扫描 2D 空间的某个区域，可以使用多个 RayCast2D 近似该区域，或使用 ShapeCast2D。

**属性（Props）：**
- collide_with_areas: bool = false —— 是否与区域碰撞
- collide_with_bodies: bool = true —— 是否与物理体碰撞
- collision_mask: int = 1 —— 碰撞掩码
- enabled: bool = true —— 是否启用
- exclude_parent: bool = true —— 排除父节点
- hit_from_inside: bool = false —— 从内部命中
- target_position: Vector2 = Vector2(0, 50) —— 目标位置

**方法（Methods）：**
- add_exception(node: CollisionObject2D) —— 添加例外
- add_exception_rid(rid: RID) —— 添加例外 RID
- clear_exceptions() —— 清除例外
- force_raycast_update() —— 强制更新射线检测
- get_collider() -> Object —— 获取碰撞体
- get_collider_rid() -> RID —— 获取碰撞体 RID
- get_collider_shape() -> int —— 获取碰撞体形状
- get_collision_mask_value(layer_number: int) -> bool —— 获取碰撞掩码值
- get_collision_normal() -> Vector2 —— 获取碰撞法线
- get_collision_point() -> Vector2 —— 获取碰撞点
- is_colliding() -> bool —— 是否碰撞
- remove_exception(node: CollisionObject2D) —— 移除例外
- remove_exception_rid(rid: RID) —— 移除例外 RID
- set_collision_mask_value(layer_number: int, value: bool) —— 设置碰撞掩码值
