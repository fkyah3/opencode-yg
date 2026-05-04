## TileSetAtlasSource（瓦片集图集源）<- TileSetSource（瓦片集源）

图集是排列在纹理上的瓦片网格。网格中的每个瓦片必须使用 `create_tile` 暴露。这些瓦片然后使用它们在网格中的坐标进行索引。每个瓦片也可以在网格坐标中具有大小，使其在图集中占据更多或更少的单元格。可以使用 `create_alternative_tile` 创建瓦片的替代版本，然后使用替代 ID 进行索引。主瓦片（网格中的那个）使用等于 0 的替代 ID 访问。每个瓦片替代方案具有一组由源的 TileSet 图层定义的属性。这些属性存储在 TileData 对象中，可以使用 `get_tile_data` 访问和修改。由于 TileData 属性直接存储在 TileSetAtlasSource 资源中，它们的属性也可以使用 `TileSetAtlasSource.set("<coords_x>:<coords_y>/<alternative_id>/<tile_data_property>")` 设置。

**属性（Props）：**
- margins: Vector2i = Vector2i(0, 0) —— 边距
- separation: Vector2i = Vector2i(0, 0) —— 间隔
- texture: Texture2D —— 纹理
- texture_region_size: Vector2i = Vector2i(16, 16) —— 纹理区域大小
- use_texture_padding: bool = true —— 使用纹理填充

**方法（Methods）：**
- clear_tiles_outside_texture() —— 清除纹理外的瓦片
- create_alternative_tile(atlas_coords: Vector2i, alternative_id_override: int = -1) -> int —— 创建替代瓦片
- create_tile(atlas_coords: Vector2i, size: Vector2i = Vector2i(1, 1)) —— 创建瓦片
- get_atlas_grid_size() -> Vector2i —— 获取图集网格大小
- get_next_alternative_tile_id(atlas_coords: Vector2i) -> int —— 获取下一个替代瓦片ID
- get_runtime_texture() -> Texture2D —— 获取运行时纹理
- get_runtime_tile_texture_region(atlas_coords: Vector2i, frame: int) -> Rect2i —— 获取运行时瓦片纹理区域
- get_tile_animation_columns(atlas_coords: Vector2i) -> int —— 获取瓦片动画列数
- get_tile_animation_frame_duration(atlas_coords: Vector2i, frame_index: int) -> float —— 获取瓦片动画帧时长
- get_tile_animation_frames_count(atlas_coords: Vector2i) -> int —— 获取瓦片动画帧数
- get_tile_animation_mode(atlas_coords: Vector2i) -> int —— 获取瓦片动画模式
- get_tile_animation_separation(atlas_coords: Vector2i) -> Vector2i —— 获取瓦片动画间隔
- get_tile_animation_speed(atlas_coords: Vector2i) -> float —— 获取瓦片动画速度
- get_tile_animation_total_duration(atlas_coords: Vector2i) -> float —— 获取瓦片动画总时长
- get_tile_at_coords(atlas_coords: Vector2i) -> Vector2i —— 获取指定坐标处的瓦片
- get_tile_data(atlas_coords: Vector2i, alternative_tile: int) -> TileData —— 获取瓦片数据
- get_tile_size_in_atlas(atlas_coords: Vector2i) -> Vector2i —— 获取瓦片在图集中的大小
- get_tile_texture_region(atlas_coords: Vector2i, frame: int = 0) -> Rect2i —— 获取瓦片纹理区域
- get_tiles_to_be_removed_on_change(texture: Texture2D, margins: Vector2i, separation: Vector2i, texture_region_size: Vector2i) -> PackedVector2Array —— 获取变更时需要移除的瓦片
- has_room_for_tile(atlas_coords: Vector2i, size: Vector2i, animation_columns: int, animation_separation: Vector2i, frames_count: int, ignored_tile: Vector2i = Vector2i(-1, -1)) -> bool —— 是否有空间容纳瓦片
- has_tiles_outside_texture() -> bool —— 是否有纹理外的瓦片
- move_tile_in_atlas(atlas_coords: Vector2i, new_atlas_coords: Vector2i = Vector2i(-1, -1), new_size: Vector2i = Vector2i(-1, -1)) —— 在图集中移动瓦片
- remove_alternative_tile(atlas_coords: Vector2i, alternative_tile: int) —— 移除替代瓦片
- remove_tile(atlas_coords: Vector2i) —— 移除瓦片
- set_alternative_tile_id(atlas_coords: Vector2i, alternative_tile: int, new_id: int) —— 设置替代瓦片ID
- set_tile_animation_columns(atlas_coords: Vector2i, frame_columns: int) —— 设置瓦片动画列数
- set_tile_animation_frame_duration(atlas_coords: Vector2i, frame_index: int, duration: float) —— 设置瓦片动画帧时长
- set_tile_animation_frames_count(atlas_coords: Vector2i, frames_count: int) —— 设置瓦片动画帧数
- set_tile_animation_mode(atlas_coords: Vector2i, mode: int) —— 设置瓦片动画模式
- set_tile_animation_separation(atlas_coords: Vector2i, separation: Vector2i) —— 设置瓦片动画间隔
- set_tile_animation_speed(atlas_coords: Vector2i, speed: float) —— 设置瓦片动画速度

**枚举（Enums）：**
**TileAnimationMode（瓦片动画模式）：** TILE_ANIMATION_MODE_DEFAULT=0（默认），TILE_ANIMATION_MODE_RANDOM_START_TIMES=1（随机开始时间），TILE_ANIMATION_MODE_MAX=2
**常量（Constants）：** TRANSFORM_FLIP_H=4096, TRANSFORM_FLIP_V=8192, TRANSFORM_TRANSPOSE=16384
