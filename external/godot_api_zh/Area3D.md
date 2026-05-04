## Area3D（区域3D）<- CollisionObject3D

Area3D 是由一个或多个 CollisionShape3D 或 CollisionPolygon3D 子节点定义的 3D 空间区域。它检测其他 CollisionObject3D 何时进入或退出该区域，并跟踪尚未退出的碰撞对象（即重叠中的对象）。此节点还可以局部更改或覆盖物理参数（重力、阻尼）以及将音频路由到自定义音频总线。**注意：** 使用 PhysicsServer3D 创建的 Area 和 body 可能无法与 Area3D 按预期交互，可能不会发出信号或正确跟踪对象。**警告：** 在此节点的 CollisionShape3D 子节点中使用 ConcavePolygonShape3D（例如通过在选中 MeshInstance3D 节点后使用**网格**菜单中的**创建 Trimesh 碰撞同级**选项创建）可能会产生意外结果，因为这种碰撞形状是中空的。如果不需要这种效果，必须将其拆分为多个 ConvexPolygonShape3D 或基本形状（如 BoxShape3D），或者在某些情况下可以使用 CollisionPolygon3D 替代。

**属性（Props）：**
- angular_damp: float = 0.1
- angular_damp_space_override: int (Area3D.SpaceOverride) = 0
- audio_bus_name: StringName = &"Master"
- audio_bus_override: bool = false
- gravity: float = 9.8
- gravity_direction: Vector3 = Vector3(0, -1, 0)
- gravity_point: bool = false
- gravity_point_center: Vector3 = Vector3(0, -1, 0)
- gravity_point_unit_distance: float = 0.0
- gravity_space_override: int (Area3D.SpaceOverride) = 0
- linear_damp: float = 0.1
- linear_damp_space_override: int (Area3D.SpaceOverride) = 0
- monitorable: bool = true
- monitoring: bool = true
- priority: int = 0
- reverb_bus_amount: float = 0.0
- reverb_bus_enabled: bool = false
- reverb_bus_name: StringName = &"Master"
- reverb_bus_uniformity: float = 0.0
- wind_attenuation_factor: float = 0.0
- wind_force_magnitude: float = 0.0
- wind_source_path: NodePath = NodePath("")

**方法（Methods）：**
- get_overlapping_areas() -> Area3D[]
- get_overlapping_bodies() -> Node3D[]
- has_overlapping_areas() -> bool
- has_overlapping_bodies() -> bool
- overlaps_area(area: Node) -> bool
- overlaps_body(body: Node) -> bool

**信号（Signals）：**
- area_entered(area: Area3D)
- area_exited(area: Area3D)
- area_shape_entered(area_rid: RID, area: Area3D, area_shape_index: int, local_shape_index: int)
- area_shape_exited(area_rid: RID, area: Area3D, area_shape_index: int, local_shape_index: int)
- body_entered(body: Node3D)
- body_exited(body: Node3D)
- body_shape_entered(body_rid: RID, body: Node3D, body_shape_index: int, local_shape_index: int)
- body_shape_exited(body_rid: RID, body: Node3D, body_shape_index: int, local_shape_index: int)

**枚举（Enums）：**
**SpaceOverride（空间覆盖）：** SPACE_OVERRIDE_DISABLED=0, SPACE_OVERRIDE_COMBINE=1, SPACE_OVERRIDE_COMBINE_REPLACE=2, SPACE_OVERRIDE_REPLACE=3, SPACE_OVERRIDE_REPLACE_COMBINE=4
