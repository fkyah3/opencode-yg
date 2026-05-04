## AStar2D（A星算法2D）<- RefCounted

A* 算法的实现，用于在 2D 空间中查找连接图上两个顶点之间的最短路径。参见 AStar3D 了解如何使用此类的更详细说明。AStar2D 是对 AStar3D 的封装，强制使用 2D 坐标。

**属性（Props）：**
- neighbor_filter_enabled: bool = false

**方法（Methods）：**
- add_point(id: int, position: Vector2, weight_scale: float = 1.0)
- are_points_connected(id: int, to_id: int, bidirectional: bool = true) -> bool
- clear()
- connect_points(id: int, to_id: int, bidirectional: bool = true)
- disconnect_points(id: int, to_id: int, bidirectional: bool = true)
- get_available_point_id() -> int
- get_closest_point(to_position: Vector2, include_disabled: bool = false) -> int
- get_closest_position_in_segment(to_position: Vector2) -> Vector2
- get_id_path(from_id: int, to_id: int, allow_partial_path: bool = false) -> PackedInt64Array
- get_point_capacity() -> int
- get_point_connections(id: int) -> PackedInt64Array
- get_point_count() -> int
- get_point_ids() -> PackedInt64Array
- get_point_path(from_id: int, to_id: int, allow_partial_path: bool = false) -> PackedVector2Array
- get_point_position(id: int) -> Vector2
- get_point_weight_scale(id: int) -> float
- has_point(id: int) -> bool
- is_point_disabled(id: int) -> bool
- remove_point(id: int)
- reserve_space(num_nodes: int)
- set_point_disabled(id: int, disabled: bool = true)
- set_point_position(id: int, position: Vector2)
- set_point_weight_scale(id: int, weight_scale: float)
