## AStar3D（A星算法3D）<- RefCounted

A*（A star）是一种用于寻路和图遍历的计算机算法，用于在顶点（点）之间规划短路径，通过一组给定的边（线段）。因其性能和准确性而得到广泛应用。Godot 的 A* 实现默认使用 3D 空间中的点和欧几里得距离。必须使用 `add_point` 手动添加点，使用 `connect_points` 手动创建线段。完成后，可以使用 `are_points_connected` 函数测试两点之间是否存在路径，使用 `get_id_path` 获取包含索引的路径，或使用 `get_point_path` 获取包含实际坐标的路径。也可以使用非欧几里得距离。为此，创建一个继承 AStar3D 的脚本并重写 `_compute_cost` 和 `_estimate_cost` 方法。两者都应接受两个点 ID 并返回对应点之间的距离。**示例：** 使用曼哈顿距离代替欧几里得距离：`_estimate_cost` 应返回距离的下界，即 `_estimate_cost(u, v) <= _compute_cost(u, v)`。这作为算法的提示，因为自定义的 `_compute_cost` 可能计算量大。如果不是这样，让 `_estimate_cost` 返回与 `_compute_cost` 相同的值，以为算法提供最准确的信息。如果使用默认的 `_estimate_cost` 和 `_compute_cost` 方法，或提供的 `_estimate_cost` 方法返回成本的下界，则 A* 返回的路径将是最低成本路径。此处，路径的成本等于路径中所有线段的 `_compute_cost` 结果乘以对应线段端点的 `weight_scale` 之和。如果使用默认方法且所有点的 `weight_scale` 设置为 `1.0`，则这等于路径中所有线段的欧几里得距离之和。

**属性（Props）：**
- neighbor_filter_enabled: bool = false

**方法（Methods）：**
- add_point(id: int, position: Vector3, weight_scale: float = 1.0)
- are_points_connected(id: int, to_id: int, bidirectional: bool = true) -> bool
- clear()
- connect_points(id: int, to_id: int, bidirectional: bool = true)
- disconnect_points(id: int, to_id: int, bidirectional: bool = true)
- get_available_point_id() -> int
- get_closest_point(to_position: Vector3, include_disabled: bool = false) -> int
- get_closest_position_in_segment(to_position: Vector3) -> Vector3
- get_id_path(from_id: int, to_id: int, allow_partial_path: bool = false) -> PackedInt64Array
- get_point_capacity() -> int
- get_point_connections(id: int) -> PackedInt64Array
- get_point_count() -> int
- get_point_ids() -> PackedInt64Array
- get_point_path(from_id: int, to_id: int, allow_partial_path: bool = false) -> PackedVector3Array
- get_point_position(id: int) -> Vector3
- get_point_weight_scale(id: int) -> float
- has_point(id: int) -> bool
- is_point_disabled(id: int) -> bool
- remove_point(id: int)
- reserve_space(num_nodes: int)
- set_point_disabled(id: int, disabled: bool = true)
- set_point_position(id: int, position: Vector3)
- set_point_weight_scale(id: int, weight_scale: float)
