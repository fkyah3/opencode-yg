## ShapeCast2D（形状投射2D）<- Node2D（节点2D）

形状投射允许通过沿 `target_position` 确定的投射方向扫掠其 `shape` 来检测碰撞对象。这类似于 RayCast2D，但它允许扫掠一个空间区域，而不仅仅是直线。ShapeCast2D 可以检测多个碰撞对象。它适用于宽激光束或将简单形状捕捉到地面等场景。通过将 `target_position` 设置为 `Vector2(0, 0)` 并在同一物理帧内调用 `force_shapecast_update` 可以执行即时碰撞重叠检测。这有助于克服 Area2D 作为瞬时检测区域时的一些限制，因为碰撞信息不能立即可用。**注意：** 形状投射的计算成本比射线投射更高。

**属性（Props）：**
- collide_with_areas: bool = false —— 与区域碰撞
- collide_with_bodies: bool = true —— 与物体碰撞
- collision_mask: int = 1 —— 碰撞掩码
- collision_result: Array = [] —— 碰撞结果
- enabled: bool = true —— 启用
- exclude_parent: bool = true —— 排除父级
- margin: float = 0.0 —— 边距
- max_results: int = 32 —— 最大结果数
- shape: Shape2D —— 形状
- target_position: Vector2 = Vector2(0, 50) —— 目标位置

**方法（Methods）：**
- add_exception(node: CollisionObject2D) —— 添加例外节点
- add_exception_rid(rid: RID) —— 添加例外 RID
- clear_exceptions() —— 清除例外
- force_shapecast_update() —— 强制更新形状投射
- get_closest_collision_safe_fraction() -> float —— 获取最近碰撞安全比例
- get_closest_collision_unsafe_fraction() -> float —— 获取最近碰撞不安全比例
- get_collider(index: int) -> Object —— 获取碰撞者
- get_collider_rid(index: int) -> RID —— 获取碰撞者 RID
- get_collider_shape(index: int) -> int —— 获取碰撞者形状索引
- get_collision_count() -> int —— 获取碰撞数
- get_collision_mask_value(layer_number: int) -> bool —— 获取碰撞掩码层值
- get_collision_normal(index: int) -> Vector2 —— 获取碰撞法线
- get_collision_point(index: int) -> Vector2 —— 获取碰撞点
- is_colliding() -> bool —— 是否正在碰撞
- remove_exception(node: CollisionObject2D) —— 移除例外节点
- remove_exception_rid(rid: RID) —— 移除例外 RID
- set_collision_mask_value(layer_number: int, value: bool) —— 设置碰撞掩码层值
