## TileData（瓦片数据）<- Object（对象）

TileData 对象表示 TileSet 中的单个瓦片。通常使用瓦片集编辑器编辑，但可以在运行时使用 `TileMapLayer._tile_data_runtime_update` 修改。

**属性（Props）：**
- flip_h: bool = false —— 水平翻转
- flip_v: bool = false —— 垂直翻转
- material: Material —— 材质
- modulate: Color = Color(1, 1, 1, 1) —— 调制颜色
- probability: float = 1.0 —— 概率
- terrain: int = -1 —— 地形
- terrain_set: int = -1 —— 地形集
- texture_origin: Vector2i = Vector2i(0, 0) —— 纹理原点
- transpose: bool = false —— 转置
- y_sort_origin: int = 0 —— Y排序原点
- z_index: int = 0 —— Z索引

**方法（Methods）：**
- add_collision_polygon(layer_id: int) —— 添加碰撞多边形
- add_occluder_polygon(layer_id: int) —— 添加遮挡多边形
- get_collision_polygon_one_way_margin(layer_id: int, polygon_index: int) -> float —— 获取碰撞多边形单向边距
- get_collision_polygon_points(layer_id: int, polygon_index: int) -> PackedVector2Array —— 获取碰撞多边形点集
- get_collision_polygons_count(layer_id: int) -> int —— 获取碰撞多边形数量
- get_constant_angular_velocity(layer_id: int) -> float —— 获取恒定角速度
- get_constant_linear_velocity(layer_id: int) -> Vector2 —— 获取恒定线速度
- get_custom_data(layer_name: String) -> Variant —— 获取自定义数据
- get_custom_data_by_layer_id(layer_id: int) -> Variant —— 按图层ID获取自定义数据
- get_navigation_polygon(layer_id: int, flip_h: bool = false, flip_v: bool = false, transpose: bool = false) -> NavigationPolygon —— 获取导航多边形
- get_occluder(layer_id: int, flip_h: bool = false, flip_v: bool = false, transpose: bool = false) -> OccluderPolygon2D —— 获取遮挡器
- get_occluder_polygon(layer_id: int, polygon_index: int, flip_h: bool = false, flip_v: bool = false, transpose: bool = false) -> OccluderPolygon2D —— 获取遮挡多边形
- get_occluder_polygons_count(layer_id: int) -> int —— 获取遮挡多边形数量
- get_terrain_peering_bit(peering_bit: int) -> int —— 获取地形相邻位
- has_custom_data(layer_name: String) -> bool —— 是否有自定义数据
- is_collision_polygon_one_way(layer_id: int, polygon_index: int) -> bool —— 碰撞多边形是否为单向
- is_valid_terrain_peering_bit(peering_bit: int) -> bool —— 是否为有效地形相邻位
- remove_collision_polygon(layer_id: int, polygon_index: int) —— 移除碰撞多边形
- remove_occluder_polygon(layer_id: int, polygon_index: int) —— 移除遮挡多边形
- set_collision_polygon_one_way(layer_id: int, polygon_index: int, one_way: bool) —— 设置碰撞多边形单向
- set_collision_polygon_one_way_margin(layer_id: int, polygon_index: int, one_way_margin: float) —— 设置碰撞多边形单向边距
- set_collision_polygon_points(layer_id: int, polygon_index: int, polygon: PackedVector2Array) —— 设置碰撞多边形点集
- set_collision_polygons_count(layer_id: int, polygons_count: int) —— 设置碰撞多边形数量
- set_constant_angular_velocity(layer_id: int, velocity: float) —— 设置恒定角速度
- set_constant_linear_velocity(layer_id: int, velocity: Vector2) —— 设置恒定线速度
- set_custom_data(layer_name: String, value: Variant) —— 设置自定义数据
- set_custom_data_by_layer_id(layer_id: int, value: Variant) —— 按图层ID设置自定义数据
- set_navigation_polygon(layer_id: int, navigation_polygon: NavigationPolygon) —— 设置导航多边形
- set_occluder(layer_id: int, occluder_polygon: OccluderPolygon2D) —— 设置遮挡器
- set_occluder_polygon(layer_id: int, polygon_index: int, polygon: OccluderPolygon2D) —— 设置遮挡多边形
- set_occluder_polygons_count(layer_id: int, polygons_count: int) —— 设置遮挡多边形数量
- set_terrain_peering_bit(peering_bit: int, terrain: int) —— 设置地形相邻位

**信号（Signals）：**
- changed —— 已改变
