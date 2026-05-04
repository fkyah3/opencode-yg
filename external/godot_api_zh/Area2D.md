## Area2D（区域2D）<- CollisionObject2D

Area2D 是由一个或多个 CollisionShape2D 或 CollisionPolygon2D 子节点定义的 2D 空间区域。它检测其他 CollisionObject2D 何时进入或退出该区域，并跟踪尚未退出的碰撞对象（即重叠中的对象）。此节点还可以局部更改或覆盖物理参数（重力、阻尼）以及将音频路由到自定义音频总线。**注意：** 使用 PhysicsServer2D 创建的 Area 和 body 可能无法与 Area2D 按预期交互，可能不会发出信号或正确跟踪对象。

**属性（Props）：**
- angular_damp: float = 1.0
- angular_damp_space_override: int (Area2D.SpaceOverride) = 0
- audio_bus_name: StringName = &"Master"
- audio_bus_override: bool = false
- gravity: float = 980.0
- gravity_direction: Vector2 = Vector2(0, 1)
- gravity_point: bool = false
- gravity_point_center: Vector2 = Vector2(0, 1)
- gravity_point_unit_distance: float = 0.0
- gravity_space_override: int (Area2D.SpaceOverride) = 0
- linear_damp: float = 0.1
- linear_damp_space_override: int (Area2D.SpaceOverride) = 0
- monitorable: bool = true
- monitoring: bool = true
- priority: int = 0

**方法（Methods）：**
- get_overlapping_areas() -> Area2D[]
- get_overlapping_bodies() -> Node2D[]
- has_overlapping_areas() -> bool
- has_overlapping_bodies() -> bool
- overlaps_area(area: Node) -> bool
- overlaps_body(body: Node) -> bool

**信号（Signals）：**
- area_entered(area: Area2D)
- area_exited(area: Area2D)
- area_shape_entered(area_rid: RID, area: Area2D, area_shape_index: int, local_shape_index: int)
- area_shape_exited(area_rid: RID, area: Area2D, area_shape_index: int, local_shape_index: int)
- body_entered(body: Node2D)
- body_exited(body: Node2D)
- body_shape_entered(body_rid: RID, body: Node2D, body_shape_index: int, local_shape_index: int)
- body_shape_exited(body_rid: RID, body: Node2D, body_shape_index: int, local_shape_index: int)

**枚举（Enums）：**
**SpaceOverride（空间覆盖）：** SPACE_OVERRIDE_DISABLED=0, SPACE_OVERRIDE_COMBINE=1, SPACE_OVERRIDE_COMBINE_REPLACE=2, SPACE_OVERRIDE_REPLACE=3, SPACE_OVERRIDE_REPLACE_COMBINE=4
