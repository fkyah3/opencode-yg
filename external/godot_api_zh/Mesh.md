## Mesh <- Resource（资源）

Mesh 是一种包含基于顶点数组的几何体的资源类型，被划分为多个*surface*（表面）。每个表面包含一个完全独立的数组和用于绘制它的材质。从设计角度看，包含多个表面的网格优于单个表面，因为 3D 编辑软件创建的对象通常包含多种材质。每个网格的最大表面数为 `RenderingServer.MAX_MESH_SURFACES`。

**属性（Props）：**
- lightmap_size_hint: Vector2i = Vector2i(0, 0)

**方法（Methods）：**
- create_convex_shape(clean: bool = true, simplify: bool = false) -> ConvexPolygonShape3D
- create_outline(margin: float) -> Mesh
- create_placeholder() -> Resource
- create_trimesh_shape() -> ConcavePolygonShape3D
- generate_triangle_mesh() -> TriangleMesh
- get_aabb() -> AABB
- get_faces() -> PackedVector3Array
- get_surface_count() -> int
- surface_get_arrays(surf_idx: int) -> Array
- surface_get_blend_shape_arrays(surf_idx: int) -> Array[]
- surface_get_material(surf_idx: int) -> Material
- surface_set_material(surf_idx: int, material: Material)

**枚举（Enums）：**
**PrimitiveType：** PRIMITIVE_POINTS=0, PRIMITIVE_LINES=1, PRIMITIVE_LINE_STRIP=2, PRIMITIVE_TRIANGLES=3, PRIMITIVE_TRIANGLE_STRIP=4
**ArrayType：** ARRAY_VERTEX=0, ARRAY_NORMAL=1, ARRAY_TANGENT=2, ARRAY_COLOR=3, ARRAY_TEX_UV=4, ARRAY_TEX_UV2=5, ARRAY_CUSTOM0=6, ARRAY_CUSTOM1=7, ARRAY_CUSTOM2=8, ARRAY_CUSTOM3=9, ...
**ArrayCustomFormat：** ARRAY_CUSTOM_RGBA8_UNORM=0, ARRAY_CUSTOM_RGBA8_SNORM=1, ARRAY_CUSTOM_RG_HALF=2, ARRAY_CUSTOM_RGBA_HALF=3, ARRAY_CUSTOM_R_FLOAT=4, ARRAY_CUSTOM_RG_FLOAT=5, ARRAY_CUSTOM_RGB_FLOAT=6, ARRAY_CUSTOM_RGBA_FLOAT=7, ARRAY_CUSTOM_MAX=8
**ArrayFormat：** ARRAY_FORMAT_VERTEX=1, ARRAY_FORMAT_NORMAL=2, ARRAY_FORMAT_TANGENT=4, ARRAY_FORMAT_COLOR=8, ARRAY_FORMAT_TEX_UV=16, ARRAY_FORMAT_TEX_UV2=32, ARRAY_FORMAT_CUSTOM0=64, ARRAY_FORMAT_CUSTOM1=128, ARRAY_FORMAT_CUSTOM2=256, ARRAY_FORMAT_CUSTOM3=512, ...
**BlendShapeMode：** BLEND_SHAPE_MODE_NORMALIZED=0, BLEND_SHAPE_MODE_RELATIVE=1
