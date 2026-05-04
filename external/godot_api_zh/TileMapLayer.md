## TileMapLayer（瓦片地图图层）<- Node2D（节点2D）

用于 2D 基于瓦片的地图的节点。TileMapLayer 使用包含瓦片列表的 TileSet，用于创建基于网格的地图。与已弃用的 TileMap 节点不同，TileMapLayer 只有一层瓦片。您可以使用多个 TileMapLayer 来实现与 TileMap 节点相同的效果。出于性能考虑，所有 TileMap 更新都在帧结束时批量处理。值得注意的是，这意味着 TileSetScenesCollectionSource 中的场景瓦片在其父级之后初始化。这仅在场景树中时才会排队。要更早地强制更新，请调用 `update_internals`。**注意：** 出于性能和兼容性原因，TileMapLayer 序列化的坐标限制为 16 位有符号整数，即 X 和 Y 坐标的范围为 `-32768` 到 `32767`。保存瓦片数据时，此范围之外的瓦片会被包裹。

**属性（Props）：**
- collision_enabled: bool = true —— 启用碰撞
- collision_visibility_mode: int (TileMapLayer.DebugVisibilityMode) = 0 —— 碰撞可见性模式
- enabled: bool = true —— 启用
- navigation_enabled: bool = true —— 启用导航
- navigation_visibility_mode: int (TileMapLayer.DebugVisibilityMode) = 0 —— 导航可见性模式
- occlusion_enabled: bool = true —— 启用遮挡
- physics_quadrant_size: int = 16 —— 物理象限大小
- rendering_quadrant_size: int = 16 —— 渲染象限大小
- tile_map_data: PackedByteArray = PackedByteArray() —— 瓦片地图数据
- tile_set: TileSet —— 瓦片集
- use_kinematic_bodies: bool = false —— 使用运动学体
- x_draw_order_reversed: bool = false —— 反向X绘制顺序
- y_sort_origin: int = 0 —— Y排序原点

**方法（Methods）：**
- clear() —— 清除
- erase_cell(coords: Vector2i) —— 擦除单元格
- fix_invalid_tiles() —— 修复无效瓦片
- get_cell_alternative_tile(coords: Vector2i) -> int —— 获取单元格替代瓦片
- get_cell_atlas_coords(coords: Vector2i) -> Vector2i —— 获取单元格图集坐标
- get_cell_source_id(coords: Vector2i) -> int —— 获取单元格源ID
- get_cell_tile_data(coords: Vector2i) -> TileData —— 获取单元格瓦片数据
- get_coords_for_body_rid(body: RID) -> Vector2i —— 获取物理体对应的坐标
- get_navigation_map() -> RID —— 获取导航地图
- get_neighbor_cell(coords: Vector2i, neighbor: int) -> Vector2i —— 获取相邻单元格
- get_pattern(coords_array: Vector2i[]) -> TileMapPattern —— 获取模式
- get_surrounding_cells(coords: Vector2i) -> Vector2i[] —— 获取周围单元格
- get_used_cells() -> Vector2i[] —— 获取已使用的单元格
- get_used_cells_by_id(source_id: int = -1, atlas_coords: Vector2i = Vector2i(-1, -1), alternative_tile: int = -1) -> Vector2i[] —— 按ID获取已使用的单元格
- get_used_rect() -> Rect2i —— 获取已使用的矩形区域
- has_body_rid(body: RID) -> bool —— 是否有物理体RID
- is_cell_flipped_h(coords: Vector2i) -> bool —— 单元格是否水平翻转
- is_cell_flipped_v(coords: Vector2i) -> bool —— 单元格是否垂直翻转
- is_cell_transposed(coords: Vector2i) -> bool —— 单元格是否转置
- local_to_map(local_position: Vector2) -> Vector2i —— 本地坐标转地图坐标
- map_pattern(position_in_tilemap: Vector2i, coords_in_pattern: Vector2i, pattern: TileMapPattern) -> Vector2i —— 地图模式
- map_to_local(map_position: Vector2i) -> Vector2 —— 地图坐标转本地坐标
- notify_runtime_tile_data_update() —— 通知运行时瓦片数据更新
- set_cell(coords: Vector2i, source_id: int = -1, atlas_coords: Vector2i = Vector2i(-1, -1), alternative_tile: int = 0) —— 设置单元格
- set_cells_terrain_connect(cells: Vector2i[], terrain_set: int, terrain: int, ignore_empty_terrains: bool = true) —— 设置单元格地形连接
- set_cells_terrain_path(path: Vector2i[], terrain_set: int, terrain: int, ignore_empty_terrains: bool = true) —— 设置单元格地形路径
- set_navigation_map(map: RID) —— 设置导航地图
- set_pattern(position: Vector2i, pattern: TileMapPattern) —— 设置模式
- update_internals() —— 更新内部

**信号（Signals）：**
- changed —— 已改变

**枚举（Enums）：**
**DebugVisibilityMode（调试可见性模式）：** DEBUG_VISIBILITY_MODE_DEFAULT=0（默认），DEBUG_VISIBILITY_MODE_FORCE_HIDE=2（强制隐藏），DEBUG_VISIBILITY_MODE_FORCE_SHOW=1（强制显示）
