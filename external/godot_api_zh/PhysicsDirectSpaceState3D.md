## PhysicsDirectSpaceState3D（3D物理直接空间状态） <- Object（对象）

提供对 PhysicsServer3D 中物理空间的直接访问。主要用于对给定空间中的对象和区域进行查询。**注意：** 此类不应直接实例化。使用 `World3D.direct_space_state` 获取世界的 3D 物理空间状态。

**方法（Methods）：**
- cast_motion(parameters: PhysicsShapeQueryParameters3D) -> PackedFloat32Array —— 投射运动
- collide_shape(parameters: PhysicsShapeQueryParameters3D, max_results: int = 32) -> Vector3[] —— 碰撞形状
- get_rest_info(parameters: PhysicsShapeQueryParameters3D) -> Dictionary —— 获取静止信息
- intersect_point(parameters: PhysicsPointQueryParameters3D, max_results: int = 32) -> Dictionary[] —— 相交点查询
- intersect_ray(parameters: PhysicsRayQueryParameters3D) -> Dictionary —— 相交射线查询
- intersect_shape(parameters: PhysicsShapeQueryParameters3D, max_results: int = 32) -> Dictionary[] —— 相交形状查询
