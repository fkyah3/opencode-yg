## PolygonPathFinder（多边形路径查找器） <- Resource（资源）

**方法（Methods）：**
- find_path(from: Vector2, to: Vector2) -> PackedVector2Array —— 查找路径
- get_bounds() -> Rect2 —— 获取边界
- get_closest_point(point: Vector2) -> Vector2 —— 获取最近点
- get_intersections(from: Vector2, to: Vector2) -> PackedVector2Array —— 获取交点
- get_point_penalty(idx: int) -> float —— 获取点惩罚值
- is_point_inside(point: Vector2) -> bool —— 点是否在内部
- set_point_penalty(idx: int, penalty: float) —— 设置点惩罚值
- setup(points: PackedVector2Array, connections: PackedInt32Array) —— 设置
