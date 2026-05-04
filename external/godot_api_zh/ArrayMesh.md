## ArrayMesh（数组网格）<- Mesh

ArrayMesh 用于通过将属性指定为数组来构建网格。最基本的示例是创建单个三角形：MeshInstance3D 准备好添加到 SceneTree 中显示。另请参见 ImmediateMesh、MeshDataTool 和 SurfaceTool 以了解程序化几何体生成。**注意：** Godot 对三角形图元模式的面方向使用顺时针顺序。

**属性（Props）：**
- blend_shape_mode: int (Mesh.BlendShapeMode) = 1
- custom_aabb: AABB = AABB(0, 0, 0, 0, 0, 0)
- shadow_mesh: ArrayMesh

**方法（Methods）：**
- add_blend_shape(name: StringName)
- add_surface_from_arrays(primitive: int, arrays: Array, blend_shapes: Array[] = [], lods: Dictionary = {}, flags: int = 0)
- clear_blend_shapes()
- clear_surfaces()
- get_blend_shape_count() -> int
- get_blend_shape_name(index: int) -> StringName
- lightmap_unwrap(transform: Transform3D, texel_size: float) -> int
- regen_normal_maps()
- set_blend_shape_name(index: int, name: StringName)
- surface_find_by_name(name: String) -> int
- surface_get_array_index_len(surf_idx: int) -> int
- surface_get_array_len(surf_idx: int) -> int
- surface_get_format(surf_idx: int) -> int
- surface_get_name(surf_idx: int) -> String
- surface_get_primitive_type(surf_idx: int) -> int
- surface_remove(surf_idx: int)
- surface_set_name(surf_idx: int, name: String)
- surface_update_attribute_region(surf_idx: int, offset: int, data: PackedByteArray)
- surface_update_skin_region(surf_idx: int, offset: int, data: PackedByteArray)
- surface_update_vertex_region(surf_idx: int, offset: int, data: PackedByteArray)
