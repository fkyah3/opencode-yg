## MeshInstance3D <- GeometryInstance3D（几何体实例3D）

MeshInstance3D 是一个节点，它获取 Mesh 资源并通过创建其实例将其添加到当前场景中。这是最常用于渲染 3D 几何体的类，可用于在多个位置实例化单个 Mesh。这样可以重用几何体，从而节省资源。当需要实例化数千个靠近的 Mesh 时，请考虑在 MultiMeshInstance3D 中使用 MultiMesh。

**属性（Props）：**
- mesh: Mesh
- skeleton: NodePath = NodePath("")
- skin: Skin

**方法（Methods）：**
- bake_mesh_from_current_blend_shape_mix(existing: ArrayMesh = null) -> ArrayMesh
- bake_mesh_from_current_skeleton_pose(existing: ArrayMesh = null) -> ArrayMesh
- create_convex_collision(clean: bool = true, simplify: bool = false)
- create_debug_tangents()
- create_multiple_convex_collisions(settings: MeshConvexDecompositionSettings = null)
- create_trimesh_collision()
- find_blend_shape_by_name(name: StringName) -> int
- get_active_material(surface: int) -> Material
- get_blend_shape_count() -> int
- get_blend_shape_value(blend_shape_idx: int) -> float
- get_skin_reference() -> SkinReference
- get_surface_override_material(surface: int) -> Material
- get_surface_override_material_count() -> int
- set_blend_shape_value(blend_shape_idx: int, value: float)
- set_surface_override_material(surface: int, material: Material)
