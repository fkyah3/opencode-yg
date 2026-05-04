## TileMap（瓦片地图）<- Node2D（节点2D）

用于 2D 基于瓦片的地图的节点。TileMap 使用包含瓦片列表的 TileSet，用于创建基于网格的地图。TileMap 可以有多个图层，将瓦片层层叠放。出于性能考虑，所有 TileMap 更新都在帧结束时批量处理。值得注意的是，这意味着 TileSetScenesCollectionSource 中的场景瓦片可能在其父级之后初始化。这仅在场景树中时才会排队。要更早地强制更新，请调用 `update_internals`。**注意：** 出于性能和兼容性原因，TileMap 序列化的坐标限制为 16 位有符号整数，即 X 和 Y 坐标的范围为 `-32768` 到 `32767`。保存瓦片数据时，此范围之外的瓦片会被包裹。

**属性（Props）：**
- collision_animatable: bool = false —— 碰撞可动画
- collision_visibility_mode: int (TileMap.VisibilityMode) = 0 —— 碰撞可见性模式
- navigation_visibility_mode: int (TileMap.VisibilityMode) = 0 —— 导航可见性模式
- rendering_quadrant_size: int = 16 —— 渲染象限大小
- tile_set: TileSet —— 瓦片集

**方法（Methods）：**
- add_layer(to_position: int) —— 添加图层
- clear() —— 清除
- clear_layer(layer: int) —— 清除图层
- erase_cell(layer: int, coords: Vector2i) —— 擦除单元格
- fix_invalid_tiles() —— 修复无效瓦片
- force_update(layer: int = -1) —— 强制更新
- get_cell_alternative_tile(layer: int, coords: Vector2i, use_proxies: bool = false) -> int —— 获取单元格替代瓦片
- get_cell_atlas_coords(layer: int, coords: Vector2i, use_proxies: bool = false) -> Vector2i —— 获取单元格图集坐标
- get_cell_source_id(layer: int, coords: Vector2i, use_proxies: bool = false) -> int —— 获取单元格源ID
- get_cell_tile_data(layer: int, coords: Vector2i, use_proxies: bool = false) -> TileData —— 获取单元格瓦片数据
- get_coords_for_body_rid(body: RID) -> Vector2i —— 获取物理体对应的坐标
- get_layer_for_body_rid(body: RID) -> int —— 获取物理体对应的图层
- get_layer_modulate(layer: int) -> Color —— 获取图层调制颜色
- get_layer_name(layer: int) -> String —— 获取图层名称
- get_layer_navigation_map(layer: int) -> RID —— 获取图层导航地图
- get_layer_y_sort_origin(layer: int) -> int —— 获取图层Y排序原点
- get_layer_z_index(layer: int) -> int —— 获取图层Z索引
- get_layers_count() -> int —— 获取图层数量
- get_navigation_map(layer: int) -> RID —— 获取导航地图
- get_neighbor_cell(coords: Vector2i, neighbor: int) -> Vector2i —— 获取相邻单元格
- get_pattern(layer: int, coords_array: Vector2i[]) -> TileMapPattern —— 获取模式
- get_surrounding_cells(coords: Vector2i) -> Vector2i[] —— 获取周围单元格
- get_used_cells(layer: int) -> Vector2i[] —— 获取已使用的单元格
- get_used_cells_by_id(layer: int, source_id: int = -1, atlas_coords: Vector2i = Vector2i(-1, -1), alternative_tile: int = -1) -> Vector2i[] —— 按ID获取已使用的单元格
- get_used_rect() -> Rect2i —— 获取已使用的矩形区域
- is_cell_flipped_h(layer: int, coords: Vector2i, use_proxies: bool = false) -> bool —— 单元格是否水平翻转
- is_cell_flipped_v(layer: int, coords: Vector2i, use_proxies: bool = false) -> bool —— 单元格是否垂直翻转
- is_cell_transposed(layer: int, coords: Vector2i, use_proxies: bool = false) -> bool —— 单元格是否转置
- is_layer_enabled(layer: int) -> bool —— 图层是否启用
- is_layer_navigation_enabled(layer: int) -> bool —— 图层导航是否启用
- is_layer_y_sort_enabled(layer: int) -> bool —— 图层Y排序是否启用
- local_to_map(local_position: Vector2) -> Vector2i —— 本地坐标转地图坐标
- map_pattern(position_in_tilemap: Vector2i, coords_in_pattern: Vector2i, pattern: TileMapPattern) -> Vector2i —— 地图模式
- map_to_local(map_position: Vector2i) -> Vector2 —— 地图坐标转本地坐标
- move_layer(layer: int, to_position: int) —— 移动图层
- notify_runtime_tile_data_update(layer: int = -1) —— 通知运行时瓦片数据更新
- remove_layer(layer: int) —— 移除图层
- set_cell(layer: int, coords: Vector2i, source_id: int = -1, atlas_coords: Vector2i = Vector2i(-1, -1), alternative_tile: int = 0) —— 设置单元格
- set_cells_terrain_connect(layer: int, cells: Vector2i[], terrain_set: int, terrain: int, ignore_empty_terrains: bool = true) —— 设置单元格地形连接
- set_cells_terrain_path(layer: int, path: Vector2i[], terrain_set: int, terrain: int, ignore_empty_terrains: bool = true) —— 设置单元格地形路径
- set_layer_enabled(layer: int, enabled: bool) —— 设置图层启用
- set_layer_modulate(layer: int, modulate: Color) —— 设置图层调制颜色
- set_layer_name(layer: int, name: String) —— 设置图层名称
- set_layer_navigation_enabled(layer: int, enabled: bool) —— 设置图层导航启用
- set_layer_navigation_map(layer: int, map: RID) —— 设置图层导航地图
- set_layer_y_sort_enabled(layer: int, y_sort_enabled: bool) —— 设置图层Y排序启用
- set_layer_y_sort_origin(layer: int, y_sort_origin: int) —— 设置图层Y排序原点
- set_layer_z_index(layer: int, z_index: int) —— 设置图层Z索引
- set_navigation_map(layer: int, map: RID) —— 设置导航地图
- set_pattern(layer: int, position: Vector2i, pattern: TileMapPattern) —— 设置模式
- update_internals() —— 更新内部

**信号（Signals）：**
- changed —— 已改变

**枚举（Enums）：**
**VisibilityMode（可见性模式）：** VISIBILITY_MODE_DEFAULT=0（默认），VISIBILITY_MODE_FORCE_HIDE=2（强制隐藏），VISIBILITY_MODE_FORCE_SHOW=1（强制显示）
