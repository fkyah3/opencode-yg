## MultiMesh <- Resource（资源）

MultiMesh 提供低级网格实例化。绘制数千个 MeshInstance3D 节点可能很慢，因为每个对象都提交到 GPU 然后单独绘制。MultiMesh 快得多，因为它可以通过单个绘制调用绘制数千个实例，从而减少 API 开销。缺点是，如果实例彼此相距太远，性能可能会降低，因为每个单独的实例始终会渲染（它们作为一个整体进行空间索引）。由于实例可能有任何行为，因此用于可见性的 AABB 必须由用户提供。**注意：** MultiMesh 是单个对象，因此适用于每个对象的最大灯光数限制同样适用。这意味着一旦一个或多个实例消耗了最大灯光数，其余的 MultiMesh 实例将**不会**接收到任何光照。**注意：** 如果在 MultiMesh 中使用，混合形状（Blend Shapes）将被忽略。

**属性（Props）：**
- buffer: PackedFloat32Array = PackedFloat32Array()
- color_array: PackedColorArray
- custom_aabb: AABB = AABB(0, 0, 0, 0, 0, 0)
- custom_data_array: PackedColorArray
- instance_count: int = 0
- mesh: Mesh
- physics_interpolation_quality: int (MultiMesh.PhysicsInterpolationQuality) = 0
- transform_2d_array: PackedVector2Array
- transform_array: PackedVector3Array
- transform_format: int (MultiMesh.TransformFormat) = 0
- use_colors: bool = false
- use_custom_data: bool = false
- visible_instance_count: int = -1

**方法（Methods）：**
- get_aabb() -> AABB
- get_instance_color(instance: int) -> Color
- get_instance_custom_data(instance: int) -> Color
- get_instance_transform(instance: int) -> Transform3D
- get_instance_transform_2d(instance: int) -> Transform2D
- reset_instance_physics_interpolation(instance: int)
- reset_instances_physics_interpolation()
- set_buffer_interpolated(buffer_curr: PackedFloat32Array, buffer_prev: PackedFloat32Array)
- set_instance_color(instance: int, color: Color)
- set_instance_custom_data(instance: int, custom_data: Color)
- set_instance_transform(instance: int, transform: Transform3D)
- set_instance_transform_2d(instance: int, transform: Transform2D)

**枚举（Enums）：**
**TransformFormat：** TRANSFORM_2D=0, TRANSFORM_3D=1
**PhysicsInterpolationQuality：** INTERP_QUALITY_FAST=0, INTERP_QUALITY_HIGH=1
