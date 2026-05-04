## TileSetSource（瓦片集源）<- Resource（资源）

为 TileSet 资源暴露一组瓦片。源中的瓦片使用两个 ID 索引：坐标 ID（Vector2i 类型）和替代 ID（int 类型），根据它们在 TileSetAtlasSource 类中的用途命名。根据 TileSet 源类型，这些 ID 可能对其值有限制，这就是基础 TileSetSource 类仅为它们公开 getter 的原因。您可以通过首先使用 `get_tiles_count` 和 `get_tile_id` 遍历坐标 ID，然后使用 `get_alternative_tiles_count` 和 `get_alternative_tile_id` 遍历替代 ID，来遍历 TileSetSource 暴露的所有瓦片。**警告：** TileSetSource 一次只能添加到一个 TileSet。在第二个 TileSet 上调用 `TileSet.add_source` 将从第一个 TileSet 中移除该源。

**方法（Methods）：**
- get_alternative_tile_id(atlas_coords: Vector2i, index: int) -> int —— 获取替代瓦片ID
- get_alternative_tiles_count(atlas_coords: Vector2i) -> int —— 获取替代瓦片数量
- get_tile_id(index: int) -> Vector2i —— 获取瓦片ID
- get_tiles_count() -> int —— 获取瓦片数量
- has_alternative_tile(atlas_coords: Vector2i, alternative_tile: int) -> bool —— 是否有替代瓦片
- has_tile(atlas_coords: Vector2i) -> bool —— 是否有瓦片
