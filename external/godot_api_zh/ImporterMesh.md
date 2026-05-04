## ImporterMesh <- Resource（资源）

ImporterMesh 是一种类似 ArrayMesh 的资源类型。它包含基于顶点数组的几何体，被划分为多个*surface*（表面）。每个表面包含一个完全独立的数组和用于绘制它的材质。从设计角度看，包含多个表面的网格优于单个表面，因为 3D 编辑软件创建的对象通常包含多种材质。与其运行时对应版本不同，ImporterMesh 包含各种导入步骤（如 LOD 和阴影网格生成）发生之前的网格数据。通过调用 `clear`，然后为每个表面调用 `add_surface` 来修改表面数据。

**方法（Methods）：**
- add_blend_shape(name: String)
- add_surface(primitive: int, arrays: Array, blend_shapes: Array[] = [], lods: Dictionary = {}, material: Material = null, name: String = "", flags: int = 0)
- clear()
- from_mesh(mesh: Mesh) -> ImporterMesh
- generate_lods(normal_merge_angle: float, normal_split_angle: float, bone_transform_array: Array)
- get_blend_shape_count() -> int
- get_blend_shape_mode() -> int
- get_blend_shape_name(blend_shape_idx: int) -> String
- get_lightmap_size_hint() -> Vector2i
- get_mesh(base_mesh: ArrayMesh = null) -> ArrayMesh
- get_surface_arrays(surface_idx: int) -> Array
- get_surface_blend_shape_arrays(surface_idx: int, blend_shape_idx: int) -> Array
- get_surface_count() -> int
- get_surface_format(surface_idx: int) -> int
- get_surface_lod_count(surface_idx: int) -> int
- get_surface_lod_indices(surface_idx: int, lod_idx: int) -> PackedInt32Array
- get_surface_lod_size(surface_idx: int, lod_idx: int) -> float
- get_surface_material(surface_idx: int) -> Material
- get_surface_name(surface_idx: int) -> String
- get_surface_primitive_type(surface_idx: int) -> int
- set_blend_shape_mode(mode: int)
- set_lightmap_size_hint(size: Vector2i)
- set_surface_material(surface_idx: int, material: Material)
- set_surface_name(surface_idx: int, name: String)
