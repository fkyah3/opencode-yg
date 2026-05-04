## TileSetScenesCollectionSource（瓦片集场景集合源）<- TileSetSource（瓦片集源）

当放置在 TileMapLayer 上时，来自 TileSetScenesCollectionSource 的瓦片将自动在 TileMapLayer 中单元格的位置实例化关联的场景。场景在 TileMapLayer 进入场景树后，在帧结束时实例化（它们的创建是延迟的）。如果您在已在场景树中的 TileMapLayer 中添加/移除场景瓦片，TileMapLayer 将自动相应地实例化/释放场景。**注意：** 场景瓦片全部占用一个瓦片槽，并使用替代瓦片 ID 来标识场景索引。`TileSetSource.get_tiles_count` 将始终返回 `1`。使用 `get_scene_tiles_count` 获取 TileSetScenesCollectionSource 中的场景数量。如果要在 TileMapLayer 中查找给定瓦片的场景路径，请使用以下代码：

**方法（Methods）：**
- create_scene_tile(packed_scene: PackedScene, id_override: int = -1) -> int —— 创建场景瓦片
- get_next_scene_tile_id() -> int —— 获取下一个场景瓦片ID
- get_scene_tile_display_placeholder(id: int) -> bool —— 获取场景瓦片是否显示占位符
- get_scene_tile_id(index: int) -> int —— 获取场景瓦片ID
- get_scene_tile_scene(id: int) -> PackedScene —— 获取场景瓦片的场景
- get_scene_tiles_count() -> int —— 获取场景瓦片数量
- has_scene_tile_id(id: int) -> bool —— 是否有指定场景瓦片ID
- remove_scene_tile(id: int) —— 移除场景瓦片
- set_scene_tile_display_placeholder(id: int, display_placeholder: bool) —— 设置场景瓦片显示占位符
- set_scene_tile_id(id: int, new_id: int) —— 设置场景瓦片ID
- set_scene_tile_scene(id: int, packed_scene: PackedScene) —— 设置场景瓦片的场景
