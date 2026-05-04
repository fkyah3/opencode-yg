## TileSet（瓦片集）<- Resource（资源）

TileSet 是 TileMapLayer 的瓦片库。一个 TileSet 管理一个 TileSetSource 列表，每个源存储一组瓦片。瓦片可以来自 TileSetAtlasSource（从纹理渲染瓦片，支持物理、导航等），或来自 TileSetScenesCollectionSource（公开基于场景的瓦片）。瓦片通过三个 ID 引用：源 ID、图集坐标 ID 和替代瓦片 ID。可以配置 TileSet 使其瓦片暴露更多或更少的属性。为此，TileSet 资源使用属性图层，您可以根据需要添加或移除。例如，添加物理图层可以为瓦片提供碰撞形状。每个图层都有专用属性（物理图层和遮罩），因此可以根据需要的每种碰撞类型添加多个 TileSet 物理图层。有关详细信息，请参阅添加新图层的函数。

**属性（Props）：**
- tile_layout: int (TileSet.TileLayout) = 0 —— 瓦片布局
- tile_offset_axis: int (TileSet.TileOffsetAxis) = 0 —— 瓦片偏移轴
- tile_shape: int (TileSet.TileShape) = 0 —— 瓦片形状
- tile_size: Vector2i = Vector2i(16, 16) —— 瓦片大小
- uv_clipping: bool = false —— UV裁剪

**方法（Methods）：**
- add_custom_data_layer(to_position: int = -1) —— 添加自定义数据图层
- add_navigation_layer(to_position: int = -1) —— 添加导航图层
- add_occlusion_layer(to_position: int = -1) —— 添加遮挡图层
- add_pattern(pattern: TileMapPattern, index: int = -1) -> int —— 添加模式
- add_physics_layer(to_position: int = -1) —— 添加物理图层
- add_source(source: TileSetSource, atlas_source_id_override: int = -1) -> int —— 添加源
- add_terrain(terrain_set: int, to_position: int = -1) —— 添加地形
- add_terrain_set(to_position: int = -1) —— 添加地形集
- cleanup_invalid_tile_proxies() —— 清理无效的瓦片代理
- clear_tile_proxies() —— 清除瓦片代理
- get_alternative_level_tile_proxy(source_from: int, coords_from: Vector2i, alternative_from: int) -> Array —— 获取替代级别瓦片代理
- get_coords_level_tile_proxy(source_from: int, coords_from: Vector2i) -> Array —— 获取坐标级别瓦片代理
- get_custom_data_layer_by_name(layer_name: String) -> int —— 按名称获取自定义数据图层
- get_custom_data_layer_name(layer_index: int) -> String —— 获取自定义数据图层名称
- get_custom_data_layer_type(layer_index: int) -> int —— 获取自定义数据图层类型
- get_custom_data_layers_count() -> int —— 获取自定义数据图层数量
- get_navigation_layer_layer_value(layer_index: int, layer_number: int) -> bool —— 获取导航图层图层值
- get_navigation_layer_layers(layer_index: int) -> int —— 获取导航图层
- get_navigation_layers_count() -> int —— 获取导航图层数量
- get_next_source_id() -> int —— 获取下一个源ID
- get_occlusion_layer_light_mask(layer_index: int) -> int —— 获取遮挡图层光照遮罩
- get_occlusion_layer_sdf_collision(layer_index: int) -> bool —— 获取遮挡图层SDF碰撞
- get_occlusion_layers_count() -> int —— 获取遮挡图层数量
- get_pattern(index: int = -1) -> TileMapPattern —— 获取模式
- get_patterns_count() -> int —— 获取模式数量
- get_physics_layer_collision_layer(layer_index: int) -> int —— 获取物理图层碰撞层
- get_physics_layer_collision_mask(layer_index: int) -> int —— 获取物理图层碰撞遮罩
- get_physics_layer_collision_priority(layer_index: int) -> float —— 获取物理图层碰撞优先级
- get_physics_layer_physics_material(layer_index: int) -> PhysicsMaterial —— 获取物理图层物理材质
- get_physics_layers_count() -> int —— 获取物理图层数量
- get_source(source_id: int) -> TileSetSource —— 获取源
- get_source_count() -> int —— 获取源数量
- get_source_id(index: int) -> int —— 获取源ID
- get_source_level_tile_proxy(source_from: int) -> int —— 获取源级别瓦片代理
- get_terrain_color(terrain_set: int, terrain_index: int) -> Color —— 获取地形颜色
- get_terrain_name(terrain_set: int, terrain_index: int) -> String —— 获取地形名称
- get_terrain_set_mode(terrain_set: int) -> int —— 获取地形集模式
- get_terrain_sets_count() -> int —— 获取地形集数量
- get_terrains_count(terrain_set: int) -> int —— 获取地形数量
- has_alternative_level_tile_proxy(source_from: int, coords_from: Vector2i, alternative_from: int) -> bool —— 是否有替代级别瓦片代理
- has_coords_level_tile_proxy(source_from: int, coords_from: Vector2i) -> bool —— 是否有坐标级别瓦片代理
- has_custom_data_layer_by_name(layer_name: String) -> bool —— 是否有指定名称的自定义数据图层
- has_source(source_id: int) -> bool —— 是否有指定源
- has_source_level_tile_proxy(source_from: int) -> bool —— 是否有源级别瓦片代理
- map_tile_proxy(source_from: int, coords_from: Vector2i, alternative_from: int) -> Array —— 映射瓦片代理
- move_custom_data_layer(layer_index: int, to_position: int) —— 移动自定义数据图层
- move_navigation_layer(layer_index: int, to_position: int) —— 移动导航图层
- move_occlusion_layer(layer_index: int, to_position: int) —— 移动遮挡图层
- move_physics_layer(layer_index: int, to_position: int) —— 移动物理图层
- move_terrain(terrain_set: int, terrain_index: int, to_position: int) —— 移动地形
- move_terrain_set(terrain_set: int, to_position: int) —— 移动地形集
- remove_alternative_level_tile_proxy(source_from: int, coords_from: Vector2i, alternative_from: int) —— 移除替代级别瓦片代理
- remove_coords_level_tile_proxy(source_from: int, coords_from: Vector2i) —— 移除坐标级别瓦片代理
- remove_custom_data_layer(layer_index: int) —— 移除自定义数据图层
- remove_navigation_layer(layer_index: int) —— 移除导航图层
- remove_occlusion_layer(layer_index: int) —— 移除遮挡图层
- remove_pattern(index: int) —— 移除模式
- remove_physics_layer(layer_index: int) —— 移除物理图层
- remove_source(source_id: int) —— 移除源
- remove_source_level_tile_proxy(source_from: int) —— 移除源级别瓦片代理
- remove_terrain(terrain_set: int, terrain_index: int) —— 移除地形
- remove_terrain_set(terrain_set: int) —— 移除地形集
- set_alternative_level_tile_proxy(source_from: int, coords_from: Vector2i, alternative_from: int, source_to: int, coords_to: Vector2i, alternative_to: int) —— 设置替代级别瓦片代理
- set_coords_level_tile_proxy(p_source_from: int, coords_from: Vector2i, source_to: int, coords_to: Vector2i) —— 设置坐标级别瓦片代理
- set_custom_data_layer_name(layer_index: int, layer_name: String) —— 设置自定义数据图层名称
- set_custom_data_layer_type(layer_index: int, layer_type: int) —— 设置自定义数据图层类型
- set_navigation_layer_layer_value(layer_index: int, layer_number: int, value: bool) —— 设置导航图层图层值
- set_navigation_layer_layers(layer_index: int, layers: int) —— 设置导航图层
- set_occlusion_layer_light_mask(layer_index: int, light_mask: int) —— 设置遮挡图层光照遮罩
- set_occlusion_layer_sdf_collision(layer_index: int, sdf_collision: bool) —— 设置遮挡图层SDF碰撞
- set_physics_layer_collision_layer(layer_index: int, layer: int) —— 设置物理图层碰撞层
- set_physics_layer_collision_mask(layer_index: int, mask: int) —— 设置物理图层碰撞遮罩
- set_physics_layer_collision_priority(layer_index: int, priority: float) —— 设置物理图层碰撞优先级
- set_physics_layer_physics_material(layer_index: int, physics_material: PhysicsMaterial) —— 设置物理图层物理材质
- set_source_id(source_id: int, new_source_id: int) —— 设置源ID
- set_source_level_tile_proxy(source_from: int, source_to: int) —— 设置源级别瓦片代理
- set_terrain_color(terrain_set: int, terrain_index: int, color: Color) —— 设置地形颜色
- set_terrain_name(terrain_set: int, terrain_index: int, name: String) —— 设置地形名称
- set_terrain_set_mode(terrain_set: int, mode: int) —— 设置地形集模式

**枚举（Enums）：**
**TileShape（瓦片形状）：** TILE_SHAPE_SQUARE=0（正方形），TILE_SHAPE_ISOMETRIC=1（等轴测），TILE_SHAPE_HALF_OFFSET_SQUARE=2（半偏移正方形），TILE_SHAPE_HEXAGON=3（六边形）
**TileLayout（瓦片布局）：** TILE_LAYOUT_STACKED=0（堆叠），TILE_LAYOUT_STACKED_OFFSET=1（偏移堆叠），TILE_LAYOUT_STAIRS_RIGHT=2（向右阶梯），TILE_LAYOUT_STAIRS_DOWN=3（向下阶梯），TILE_LAYOUT_DIAMOND_RIGHT=4（向右菱形），TILE_LAYOUT_DIAMOND_DOWN=5（向下菱形）
**TileOffsetAxis（瓦片偏移轴）：** TILE_OFFSET_AXIS_HORIZONTAL=0（水平），TILE_OFFSET_AXIS_VERTICAL=1（垂直）
**CellNeighbor（单元格邻居）：** CELL_NEIGHBOR_RIGHT_SIDE=0（右侧边），CELL_NEIGHBOR_RIGHT_CORNER=1（右角），CELL_NEIGHBOR_BOTTOM_RIGHT_SIDE=2（右下侧边），CELL_NEIGHBOR_BOTTOM_RIGHT_CORNER=3（右下角），CELL_NEIGHBOR_BOTTOM_SIDE=4（下侧边），CELL_NEIGHBOR_BOTTOM_CORNER=5（下角），CELL_NEIGHBOR_BOTTOM_LEFT_SIDE=6（左下侧边），CELL_NEIGHBOR_BOTTOM_LEFT_CORNER=7（左下角），CELL_NEIGHBOR_LEFT_SIDE=8（左侧边），CELL_NEIGHBOR_LEFT_CORNER=9（左角），...
**TerrainMode（地形模式）：** TERRAIN_MODE_MATCH_CORNERS_AND_SIDES=0（匹配角和边），TERRAIN_MODE_MATCH_CORNERS=1（匹配角），TERRAIN_MODE_MATCH_SIDES=2（匹配边）
