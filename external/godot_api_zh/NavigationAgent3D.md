## NavigationAgent3D（3D导航代理）<- Node（节点）

一个 3D 导航代理，用于在避开静态和动态障碍物的同时寻路到某位置。父节点可以使用计算结果沿路径动态移动。需要导航数据才能正常工作。动态障碍物通过 RVO 碰撞避免来回避。避障计算在物理处理之前完成，因此寻路信息可以安全地在物理步骤中使用。**注意：** 设置 `target_position` 属性后，每个物理帧必须使用一次 `get_next_path_position` 方法来更新导航代理的内部路径逻辑。它返回的向量位置应作为代理父节点的下一个移动位置。**注意：** 该类的几个方法（如 `get_next_path_position`）可能会触发新的路径计算。在代理信号（如 `waypoint_reached`）的回调中调用这些方法可能导致无限递归。建议在物理步骤中调用这些方法，或者将调用延迟到帧末尾（参见 `Object.call_deferred` 或 `Object.CONNECT_DEFERRED`）。

**属性（Props）：**
- avoidance_enabled: bool = false —— 是否启用避障
- avoidance_layers: int = 1 —— 避障层
- avoidance_mask: int = 1 —— 避障遮罩
- avoidance_priority: float = 1.0 —— 避障优先级
- debug_enabled: bool = false —— 是否启用调试
- debug_path_custom_color: Color = Color(1, 1, 1, 1) —— 调试路径自定义颜色
- debug_path_custom_point_size: float = 4.0 —— 调试路径自定义点大小
- debug_use_custom: bool = false —— 是否使用自定义调试
- height: float = 1.0 —— 代理高度
- keep_y_velocity: bool = true —— 是否保持 Y 轴速度
- max_neighbors: int = 10 —— 最大邻居数量
- max_speed: float = 10.0 —— 最大速度
- navigation_layers: int = 1 —— 导航层
- neighbor_distance: float = 50.0 —— 邻居检测距离
- path_desired_distance: float = 1.0 —— 路径期望距离
- path_height_offset: float = 0.0 —— 路径高度偏移
- path_max_distance: float = 5.0 —— 路径最大距离
- path_metadata_flags: int (NavigationPathQueryParameters3D.PathMetadataFlags) = 7 —— 路径元数据标志
- path_postprocessing: int (NavigationPathQueryParameters3D.PathPostProcessing) = 0 —— 路径后处理
- path_return_max_length: float = 0.0 —— 路径返回最大长度
- path_return_max_radius: float = 0.0 —— 路径返回最大半径
- path_search_max_distance: float = 0.0 —— 路径搜索最大距离
- path_search_max_polygons: int = 4096 —— 路径搜索最大多边形数
- pathfinding_algorithm: int (NavigationPathQueryParameters3D.PathfindingAlgorithm) = 0 —— 寻路算法
- radius: float = 0.5 —— 代理半径
- simplify_epsilon: float = 0.0 —— 简化精度
- simplify_path: bool = false —— 是否简化路径
- target_desired_distance: float = 1.0 —— 目标期望距离
- target_position: Vector3 = Vector3(0, 0, 0) —— 目标位置
- time_horizon_agents: float = 1.0 —— 代理时间视界
- time_horizon_obstacles: float = 0.0 —— 障碍物时间视界
- use_3d_avoidance: bool = false —— 是否使用 3D 避障
- velocity: Vector3 = Vector3(0, 0, 0) —— 当前速度

**方法（Methods）：**
- distance_to_target() -> float —— 返回到目标的距离
- get_avoidance_layer_value(layer_number: int) -> bool —— 获取避障层值
- get_avoidance_mask_value(mask_number: int) -> bool —— 获取避障遮罩值
- get_current_navigation_path() -> PackedVector3Array —— 获取当前导航路径
- get_current_navigation_path_index() -> int —— 获取当前导航路径索引
- get_current_navigation_result() -> NavigationPathQueryResult3D —— 获取当前导航查询结果
- get_final_position() -> Vector3 —— 获取最终位置
- get_navigation_layer_value(layer_number: int) -> bool —— 获取导航层值
- get_navigation_map() -> RID —— 获取导航地图
- get_next_path_position() -> Vector3 —— 获取下一个路径位置
- get_path_length() -> float —— 获取路径长度
- get_rid() -> RID —— 获取 RID
- is_navigation_finished() -> bool —— 导航是否完成
- is_target_reachable() -> bool —— 目标是否可达
- is_target_reached() -> bool —— 是否已到达目标
- set_avoidance_layer_value(layer_number: int, value: bool) —— 设置避障层值
- set_avoidance_mask_value(mask_number: int, value: bool) —— 设置避障遮罩值
- set_navigation_layer_value(layer_number: int, value: bool) —— 设置导航层值
- set_navigation_map(navigation_map: RID) —— 设置导航地图
- set_velocity_forced(velocity: Vector3) —— 强制设置速度

**信号（Signals）：**
- link_reached(details: Dictionary) —— 到达链接时触发
- navigation_finished —— 导航完成时触发
- path_changed —— 路径改变时触发
- target_reached —— 到达目标时触发
- velocity_computed(safe_velocity: Vector3) —— 速度计算完成时触发
- waypoint_reached(details: Dictionary) —— 到达路径点时触发
