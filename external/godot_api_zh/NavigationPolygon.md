## NavigationPolygon（导航多边形）<- Resource（资源）

导航网格可以通过借助 NavigationServer2D 进行烘焙来创建，也可以通过手动添加顶点和凸多边形索引数组来创建。要烘焙导航网格，至少需要添加一个定义烘焙区域外边界的轮廓。手动添加顶点和多边形索引。

**属性（Props）：**
- agent_radius: float = 10.0 —— 代理半径
- baking_rect: Rect2 = Rect2(0, 0, 0, 0) —— 烘焙矩形
- baking_rect_offset: Vector2 = Vector2(0, 0) —— 烘焙矩形偏移
- border_size: float = 0.0 —— 边界大小
- cell_size: float = 1.0 —— 体素单元大小
- parsed_collision_mask: int = 4294967295 —— 解析的碰撞遮罩
- parsed_geometry_type: int (NavigationPolygon.ParsedGeometryType) = 2 —— 解析的几何类型
- sample_partition_type: int (NavigationPolygon.SamplePartitionType) = 0 —— 采样分区类型
- source_geometry_group_name: StringName = &"navigation_polygon_source_geometry_group" —— 源几何组名
- source_geometry_mode: int (NavigationPolygon.SourceGeometryMode) = 0 —— 源几何模式

**方法（Methods）：**
- add_outline(outline: PackedVector2Array) —— 添加轮廓
- add_outline_at_index(outline: PackedVector2Array, index: int) —— 在指定索引添加轮廓
- add_polygon(polygon: PackedInt32Array) —— 添加多边形
- clear() —— 清除
- clear_outlines() —— 清除所有轮廓
- clear_polygons() —— 清除所有多边形
- get_navigation_mesh() -> NavigationMesh —— 获取导航网格
- get_outline(idx: int) -> PackedVector2Array —— 获取轮廓
- get_outline_count() -> int —— 获取轮廓数量
- get_parsed_collision_mask_value(layer_number: int) -> bool —— 获取解析的碰撞遮罩值
- get_polygon(idx: int) -> PackedInt32Array —— 获取多边形
- get_polygon_count() -> int —— 获取多边形数量
- get_vertices() -> PackedVector2Array —— 获取顶点
- make_polygons_from_outlines() —— 从轮廓生成多边形
- remove_outline(idx: int) —— 移除轮廓
- set_outline(idx: int, outline: PackedVector2Array) —— 设置轮廓
- set_parsed_collision_mask_value(layer_number: int, value: bool) —— 设置解析的碰撞遮罩值
- set_vertices(vertices: PackedVector2Array) —— 设置顶点

**枚举（Enums）：**
**SamplePartitionType（采样分区类型）：** SAMPLE_PARTITION_CONVEX_PARTITION=0 —— 凸分区, SAMPLE_PARTITION_TRIANGULATE=1 —— 三角剖分, SAMPLE_PARTITION_MAX=2
**ParsedGeometryType（解析几何类型）：** PARSED_GEOMETRY_MESH_INSTANCES=0 —— 网格实例, PARSED_GEOMETRY_STATIC_COLLIDERS=1 —— 静态碰撞器, PARSED_GEOMETRY_BOTH=2 —— 两者, PARSED_GEOMETRY_MAX=3
**SourceGeometryMode（源几何模式）：** SOURCE_GEOMETRY_ROOT_NODE_CHILDREN=0 —— 根节点子级, SOURCE_GEOMETRY_GROUPS_WITH_CHILDREN=1 —— 组（含子级）, SOURCE_GEOMETRY_GROUPS_EXPLICIT=2 —— 显式组, SOURCE_GEOMETRY_MAX=3
