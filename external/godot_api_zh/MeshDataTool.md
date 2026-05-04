## MeshDataTool <- RefCounted（引用计数）

MeshDataTool 提供对 Mesh 中各个顶点的访问。它允许用户读取和编辑网格的顶点数据。它还创建面和边的数组。要使用 MeshDataTool，请使用 `create_from_surface` 加载网格。完成数据编辑后，使用 `commit_to_surface` 将数据提交到网格。以下是 MeshDataTool 的使用示例。另请参见 ArrayMesh、ImmediateMesh 和 SurfaceTool 以了解程序化几何体生成。**注意：** Godot 使用顺时针方向作为三角形基本模式的前面。

**方法（Methods）：**
- clear()
- commit_to_surface(mesh: ArrayMesh, compression_flags: int = 0) -> int
- create_from_surface(mesh: ArrayMesh, surface: int) -> int
- get_edge_count() -> int
- get_edge_faces(idx: int) -> PackedInt32Array
- get_edge_meta(idx: int) -> Variant
- get_edge_vertex(idx: int, vertex: int) -> int
- get_face_count() -> int
- get_face_edge(idx: int, edge: int) -> int
- get_face_meta(idx: int) -> Variant
- get_face_normal(idx: int) -> Vector3
- get_face_vertex(idx: int, vertex: int) -> int
- get_format() -> int
- get_material() -> Material
- get_vertex(idx: int) -> Vector3
- get_vertex_bones(idx: int) -> PackedInt32Array
- get_vertex_color(idx: int) -> Color
- get_vertex_count() -> int
- get_vertex_edges(idx: int) -> PackedInt32Array
- get_vertex_faces(idx: int) -> PackedInt32Array
- get_vertex_meta(idx: int) -> Variant
- get_vertex_normal(idx: int) -> Vector3
- get_vertex_tangent(idx: int) -> Plane
- get_vertex_uv(idx: int) -> Vector2
- get_vertex_uv2(idx: int) -> Vector2
- get_vertex_weights(idx: int) -> PackedFloat32Array
- set_edge_meta(idx: int, meta: Variant)
- set_face_meta(idx: int, meta: Variant)
- set_material(material: Material)
- set_vertex(idx: int, vertex: Vector3)
- set_vertex_bones(idx: int, bones: PackedInt32Array)
- set_vertex_color(idx: int, color: Color)
- set_vertex_meta(idx: int, meta: Variant)
- set_vertex_normal(idx: int, normal: Vector3)
- set_vertex_tangent(idx: int, tangent: Plane)
- set_vertex_uv(idx: int, uv: Vector2)
- set_vertex_uv2(idx: int, uv2: Vector2)
- set_vertex_weights(idx: int, weights: PackedFloat32Array)
