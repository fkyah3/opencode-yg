## RayCast3D（3D射线检测） <- Node3D（3D节点）

射线检测表示一条从原点延伸到 `target_position` 的射线，如果与任何物体相交，则找到其路径上最近的物体。RayCast3D 可以通过将物体添加到例外列表、使检测报告忽略 Area3D（`collide_with_areas`）或 PhysicsBody3D（`collide_with_bodies`），或配置物理层来忽略某些物体。RayCast3D 在每个物理帧计算相交，并保存结果直到下一个物理帧。如果需要即时射线检测，或者要在同一个物理帧内多次配置 RayCast3D，请使用 `force_raycast_update`。要扫描 3D 空间的某个区域，可以使用多个 RayCast3D 近似该区域，或使用 ShapeCast3D。

**属性（Props）：**
- collide_with_areas: bool = false —— 是否与区域碰撞
- collide_with_bodies: bool = true —— 是否与物理体碰撞
- collision_mask: int = 1 —— 碰撞掩码
- debug_shape_custom_color: Color = Color(0, 0, 0, 1) —— 调试形状自定义颜色
- debug_shape_thickness: int = 2 —— 调试形状粗细
- enabled: bool = true —— 是否启用
- exclude_parent: bool = true —— 排除父节点
- hit_back_faces: bool = true —— 命中背面
- hit_from_inside: bool = false —— 从内部命中
- target_position: Vector3 = Vector3(0, -1, 0) —— 目标位置

**方法（Methods）：**
- add_exception(node: CollisionObject3D) —— 添加例外
- add_exception_rid(rid: RID) —— 添加例外 RID
- clear_exceptions() —— 清除例外
- force_raycast_update() —— 强制更新射线检测
- get_collider() -> Object —— 获取碰撞体
- get_collider_rid() -> RID —— 获取碰撞体 RID
- get_collider_shape() -> int —— 获取碰撞体形状
- get_collision_face_index() -> int —— 获取碰撞面索引
- get_collision_mask_value(layer_number: int) -> bool —— 获取碰撞掩码值
- get_collision_normal() -> Vector3 —— 获取碰撞法线
- get_collision_point() -> Vector3 —— 获取碰撞点
- is_colliding() -> bool —— 是否碰撞
- remove_exception(node: CollisionObject3D) —— 移除例外
- remove_exception_rid(rid: RID) —— 移除例外 RID
- set_collision_mask_value(layer_number: int, value: bool) —— 设置碰撞掩码值
