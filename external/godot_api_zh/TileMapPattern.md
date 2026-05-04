## TileMapPattern（瓦片地图图案） <- Resource（资源）

此资源保存一组单元格，用于 TileMap 的批量操作。图案始终从 `(0, 0)` 坐标开始，且不能包含负坐标的单元格。

**方法（Methods）：**
- get_cell_alternative_tile(coords: Vector2i) -> int —— 获取单元格的替代瓦片
- get_cell_atlas_coords(coords: Vector2i) -> Vector2i —— 获取单元格的图集坐标
- get_cell_source_id(coords: Vector2i) -> int —— 获取单元格的源 ID
- get_size() -> Vector2i —— 获取尺寸
- get_used_cells() -> Vector2i[] —— 获取所有已使用的单元格
- has_cell(coords: Vector2i) -> bool —— 是否存在指定坐标的单元格
- is_empty() -> bool —— 是否为空
- remove_cell(coords: Vector2i, update_size: bool) —— 移除单元格
- set_cell(coords: Vector2i, source_id: int = -1, atlas_coords: Vector2i = Vector2i(-1, -1), alternative_tile: int = -1) —— 设置单元格
- set_size(size: Vector2i) —— 设置尺寸
