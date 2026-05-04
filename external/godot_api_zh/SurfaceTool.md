## SurfaceTool（表面工具）<- RefCounted（引用计数）

SurfaceTool 用于通过单独指定顶点属性来构建 Mesh。它可以从脚本构建 Mesh。除索引外的所有属性都需要在调用 `add_vertex` 之前添加。例如，要添加顶点颜色和 UV：上述 SurfaceTool 现在包含三角形的一个顶点，该顶点具有 UV 坐标和指定的 Color。如果在不调用 `set_uv` 或 `set_color` 的情况下添加另一个顶点，则将使用最后的值。顶点属性**必须**在调用 `add_vertex` **之前**传递。否则，在将顶点信息提交到网格时会导致错误。此外，添加第一个顶点之前使用的属性决定了网格的格式。例如，如果只向第一个顶点添加了 UV，则不能向后续任何顶点添加颜色。另请参阅 ArrayMesh、ImmediateMesh 和 MeshDataTool 以了解过程几何体生成。**注意：** Godot 将顺时针方向用于三角形图元模式的正面。

**方法（Methods）：**
- add_index(index: int) —— 添加索引
- add_triangle_fan(vertices: PackedVector3Array, uvs: PackedVector2Array = PackedVector2Array(), colors: PackedColorArray = PackedColorArray(), uv2s: PackedVector2Array = PackedVector2Array(), normals: PackedVector3Array = PackedVector3Array(), tangents: Plane[] = []) —— 添加三角形扇
- add_vertex(vertex: Vector3) —— 添加顶点
- append_from(existing: Mesh, surface: int, transform: Transform3D) —— 从现有网格追加
- begin(primitive: int) —— 开始
- clear() —— 清除
- commit(existing: ArrayMesh = null, flags: int = 0) -> ArrayMesh —— 提交
- commit_to_arrays() -> Array —— 提交到数组
- create_from(existing: Mesh, surface: int) —— 从现有网格创建
- create_from_arrays(arrays: Array, primitive_type: int = 3) —— 从数组创建
- create_from_blend_shape(existing: Mesh, surface: int, blend_shape: String) —— 从混合形状创建
- deindex() —— 去索引化
- generate_lod(nd_threshold: float, target_index_count: int = 3) -> PackedInt32Array —— 生成LOD
- generate_normals(flip: bool = false) —— 生成法线
- generate_tangents() —— 生成切线
- get_aabb() -> AABB —— 获取轴对齐包围盒
- get_custom_format(channel_index: int) -> int —— 获取自定义格式
- get_primitive_type() -> int —— 获取图元类型
- get_skin_weight_count() -> int —— 获取蒙皮权重数量
- index() —— 索引化
- optimize_indices_for_cache() —— 优化索引缓存
- set_bones(bones: PackedInt32Array) —— 设置骨骼
- set_color(color: Color) —— 设置颜色
- set_custom(channel_index: int, custom_color: Color) —— 设置自定义数据
- set_custom_format(channel_index: int, format: int) —— 设置自定义格式
- set_material(material: Material) —— 设置材质
- set_normal(normal: Vector3) —— 设置法线
- set_skin_weight_count(count: int) —— 设置蒙皮权重数量
- set_smooth_group(index: int) —— 设置平滑组
- set_tangent(tangent: Plane) —— 设置切线
- set_uv(uv: Vector2) —— 设置UV
- set_uv2(uv2: Vector2) —— 设置UV2
- set_weights(weights: PackedFloat32Array) —— 设置权重

**枚举（Enums）：**
**CustomFormat（自定义格式）：** CUSTOM_RGBA8_UNORM=0, CUSTOM_RGBA8_SNORM=1, CUSTOM_RG_HALF=2, CUSTOM_RGBA_HALF=3, CUSTOM_R_FLOAT=4, CUSTOM_RG_FLOAT=5, CUSTOM_RGB_FLOAT=6, CUSTOM_RGBA_FLOAT=7, CUSTOM_MAX=8
**SkinWeightCount（蒙皮权重数量）：** SKIN_4_WEIGHTS=0（4个权重），SKIN_8_WEIGHTS=1（8个权重）
