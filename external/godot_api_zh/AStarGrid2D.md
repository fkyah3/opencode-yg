## AStarGrid2D（A星网格2D）<- RefCounted

AStarGrid2D 是 AStar2D 的变体，专用于部分 2D 网格。使用更简单，因为不需要手动创建点和连接。此类还支持多种启发式类型、对角线移动模式以及加速计算的跳跃模式。使用 AStarGrid2D，只需设置网格的 `region`，可选设置 `cell_size`，然后调用 `update` 方法：要从寻路网格中移除点，须使用 `set_point_solid` 将其设置为"实心"。

**属性（Props）：**
- cell_shape: int (AStarGrid2D.CellShape) = 0
- cell_size: Vector2 = Vector2(1, 1)
- default_compute_heuristic: int (AStarGrid2D.Heuristic) = 0
- default_estimate_heuristic: int (AStarGrid2D.Heuristic) = 0
- diagonal_mode: int (AStarGrid2D.DiagonalMode) = 0
- jumping_enabled: bool = false
- offset: Vector2 = Vector2(0, 0)
- region: Rect2i = Rect2i(0, 0, 0, 0)
- size: Vector2i = Vector2i(0, 0)

**方法（Methods）：**
- clear()
- fill_solid_region(region: Rect2i, solid: bool = true)
- fill_weight_scale_region(region: Rect2i, weight_scale: float)
- get_id_path(from_id: Vector2i, to_id: Vector2i, allow_partial_path: bool = false) -> Vector2i[]
- get_point_data_in_region(region: Rect2i) -> Dictionary[]
- get_point_path(from_id: Vector2i, to_id: Vector2i, allow_partial_path: bool = false) -> PackedVector2Array
- get_point_position(id: Vector2i) -> Vector2
- get_point_weight_scale(id: Vector2i) -> float
- is_dirty() -> bool
- is_in_bounds(x: int, y: int) -> bool
- is_in_boundsv(id: Vector2i) -> bool
- is_point_solid(id: Vector2i) -> bool
- set_point_solid(id: Vector2i, solid: bool = true)
- set_point_weight_scale(id: Vector2i, weight_scale: float)
- update()

**枚举（Enums）：**
**Heuristic（启发式）：** HEURISTIC_EUCLIDEAN=0, HEURISTIC_MANHATTAN=1, HEURISTIC_OCTILE=2, HEURISTIC_CHEBYSHEV=3, HEURISTIC_MAX=4
**DiagonalMode（对角线模式）：** DIAGONAL_MODE_ALWAYS=0, DIAGONAL_MODE_NEVER=1, DIAGONAL_MODE_AT_LEAST_ONE_WALKABLE=2, DIAGONAL_MODE_ONLY_IF_NO_OBSTACLES=3, DIAGONAL_MODE_MAX=4
**CellShape（单元格形状）：** CELL_SHAPE_SQUARE=0, CELL_SHAPE_ISOMETRIC_RIGHT=1, CELL_SHAPE_ISOMETRIC_DOWN=2, CELL_SHAPE_MAX=3
