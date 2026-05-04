## NavigationMesh（导航网格）<- Resource（资源）

导航网格是由多个多边形组成的集合，用于定义环境中哪些区域是可通行的，以帮助代理在复杂空间中进行寻路。

**属性（Props）：**
- agent_height: float = 1.5 —— 代理高度
- agent_max_climb: float = 0.25 —— 代理最大攀爬高度
- agent_max_slope: float = 45.0 —— 代理最大坡度
- agent_radius: float = 0.5 —— 代理半径
- border_size: float = 0.0 —— 边界大小
- cell_height: float = 0.25 —— 体素单元高度
- cell_size: float = 0.25 —— 体素单元大小
- detail_sample_distance: float = 6.0 —— 细节采样距离
- detail_sample_max_error: float = 1.0 —— 细节采样最大误差
- edge_max_error: float = 1.3 —— 边缘最大误差
- edge_max_length: float = 0.0 —— 边缘最大长度
- filter_baking_aabb: AABB = AABB(0, 0, 0, 0, 0, 0) —— 过滤烘焙包围盒
- filter_baking_aabb_offset: Vector3 = Vector3(0, 0, 0) —— 过滤烘焙包围盒偏移
- filter_ledge_spans: bool = false —— 是否过滤 ledge span
- filter_low_hanging_obstacles: bool = false —— 是否过滤低垂障碍物
- filter_walkable_low_height_spans: bool = false —— 是否过滤可通行的低高度 span
- geometry_collision_mask: int = 4294967295 —— 几何碰撞遮罩
- geometry_parsed_geometry_type: int (NavigationMesh.ParsedGeometryType) = 2 —— 解析的几何类型
- geometry_source_geometry_mode: int (NavigationMesh.SourceGeometryMode) = 0 —— 源几何模式
- geometry_source_group_name: StringName = &"navigation_mesh_source_group" —— 源几何组名
- region_merge_size: float = 20.0 —— 区域合并大小
- region_min_size: float = 2.0 —— 区域最小大小
- sample_partition_type: int (NavigationMesh.SamplePartitionType) = 0 —— 采样分区类型
- vertices_per_polygon: float = 6.0 —— 每个多边形的顶点数

**方法（Methods）：**
- add_polygon(polygon: PackedInt32Array) —— 添加多边形
- clear() —— 清除
- clear_polygons() —— 清除所有多边形
- create_from_mesh(mesh: Mesh) —— 从网格创建
- get_collision_mask_value(layer_number: int) -> bool —— 获取碰撞遮罩值
- get_polygon(idx: int) -> PackedInt32Array —— 获取多边形
- get_polygon_count() -> int —— 获取多边形数量
- get_vertices() -> PackedVector3Array —— 获取顶点
- set_collision_mask_value(layer_number: int, value: bool) —— 设置碰撞遮罩值
- set_vertices(vertices: PackedVector3Array) —— 设置顶点

**枚举（Enums）：**
**SamplePartitionType（采样分区类型）：** SAMPLE_PARTITION_WATERSHED=0 —— 分水岭分区, SAMPLE_PARTITION_MONOTONE=1 —— 单调分区, SAMPLE_PARTITION_LAYERS=2 —— 分层分区, SAMPLE_PARTITION_MAX=3
**ParsedGeometryType（解析几何类型）：** PARSED_GEOMETRY_MESH_INSTANCES=0 —— 网格实例, PARSED_GEOMETRY_STATIC_COLLIDERS=1 —— 静态碰撞器, PARSED_GEOMETRY_BOTH=2 —— 两者, PARSED_GEOMETRY_MAX=3
**SourceGeometryMode（源几何模式）：** SOURCE_GEOMETRY_ROOT_NODE_CHILDREN=0 —— 根节点子级, SOURCE_GEOMETRY_GROUPS_WITH_CHILDREN=1 —— 组（含子级）, SOURCE_GEOMETRY_GROUPS_EXPLICIT=2 —— 显式组, SOURCE_GEOMETRY_MAX=3
