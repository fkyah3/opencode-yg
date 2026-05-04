## NavigationPathQueryParameters3D（3D导航路径查询参数）<- RefCounted（引用计数）

通过更改此对象的各个属性（如起点和目标位置），可以配置向 NavigationServer3D 的路径查询。

**属性（Props）：**
- excluded_regions: RID[] = [] —— 排除的区域
- included_regions: RID[] = [] —— 包含的区域
- map: RID = RID() —— 导航地图
- metadata_flags: int (NavigationPathQueryParameters3D.PathMetadataFlags) = 7 —— 元数据标志
- navigation_layers: int = 1 —— 导航层
- path_postprocessing: int (NavigationPathQueryParameters3D.PathPostProcessing) = 0 —— 路径后处理
- path_return_max_length: float = 0.0 —— 路径返回最大长度
- path_return_max_radius: float = 0.0 —— 路径返回最大半径
- path_search_max_distance: float = 0.0 —— 路径搜索最大距离
- path_search_max_polygons: int = 4096 —— 路径搜索最大多边形数
- pathfinding_algorithm: int (NavigationPathQueryParameters3D.PathfindingAlgorithm) = 0 —— 寻路算法
- simplify_epsilon: float = 0.0 —— 简化精度
- simplify_path: bool = false —— 是否简化路径
- start_position: Vector3 = Vector3(0, 0, 0) —— 起点位置
- target_position: Vector3 = Vector3(0, 0, 0) —— 目标位置

**枚举（Enums）：**
**PathfindingAlgorithm（寻路算法）：** PATHFINDING_ALGORITHM_ASTAR=0 —— A* 算法
**PathPostProcessing（路径后处理）：** PATH_POSTPROCESSING_CORRIDORFUNNEL=0 —— 走廊漏斗算法, PATH_POSTPROCESSING_EDGECENTERED=1 —— 边缘居中, PATH_POSTPROCESSING_NONE=2 —— 无
**PathMetadataFlags（路径元数据标志）：** PATH_METADATA_INCLUDE_NONE=0 —— 不含元数据, PATH_METADATA_INCLUDE_TYPES=1 —— 包含类型, PATH_METADATA_INCLUDE_RIDS=2 —— 包含 RID, PATH_METADATA_INCLUDE_OWNERS=4 —— 包含所有者, PATH_METADATA_INCLUDE_ALL=7 —— 包含所有
