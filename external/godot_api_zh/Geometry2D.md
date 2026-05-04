## Geometry2D（几何2D） <- Object（对象）

提供一组辅助函数，用于创建几何形状、计算形状之间的交集以及处理 2D 中的各种其他几何操作。

**方法（Methods）：**
- bresenham_line(from: Vector2i, to: Vector2i) -> Vector2i[] —— Bresenham 直线算法
- clip_polygons(polygon_a: PackedVector2Array, polygon_b: PackedVector2Array) -> PackedVector2Array[] —— 裁剪多边形
- clip_polyline_with_polygon(polyline: PackedVector2Array, polygon: PackedVector2Array) -> PackedVector2Array[] —— 用多边形裁剪折线
- convex_hull(points: PackedVector2Array) -> PackedVector2Array —— 凸包
- decompose_polygon_in_convex(polygon: PackedVector2Array) -> PackedVector2Array[] —— 分解多边形为凸多边形
- exclude_polygons(polygon_a: PackedVector2Array, polygon_b: PackedVector2Array) -> PackedVector2Array[] —— 排除多边形
- get_closest_point_to_segment(point: Vector2, s1: Vector2, s2: Vector2) -> Vector2 —— 获取线段上最近点
- get_closest_point_to_segment_uncapped(point: Vector2, s1: Vector2, s2: Vector2) -> Vector2 —— 获取无限延伸线段上最近点
- get_closest_points_between_segments(p1: Vector2, q1: Vector2, p2: Vector2, q2: Vector2) -> PackedVector2Array —— 获取两线段间的最近点
- intersect_polygons(polygon_a: PackedVector2Array, polygon_b: PackedVector2Array) -> PackedVector2Array[] —— 多边形交集
- intersect_polyline_with_polygon(polyline: PackedVector2Array, polygon: PackedVector2Array) -> PackedVector2Array[] —— 折线与多边形交集
- is_point_in_circle(point: Vector2, circle_position: Vector2, circle_radius: float) -> bool —— 点是否在圆内
- is_point_in_polygon(point: Vector2, polygon: PackedVector2Array) -> bool —— 点是否在多边形内
- is_polygon_clockwise(polygon: PackedVector2Array) -> bool —— 多边形是否为顺时针
- line_intersects_line(from_a: Vector2, dir_a: Vector2, from_b: Vector2, dir_b: Vector2) -> Variant —— 直线与直线相交
- make_atlas(sizes: PackedVector2Array) -> Dictionary —— 生成图集
- merge_polygons(polygon_a: PackedVector2Array, polygon_b: PackedVector2Array) -> PackedVector2Array[] —— 合并多边形
- offset_polygon(polygon: PackedVector2Array, delta: float, join_type: int = 0) -> PackedVector2Array[] —— 多边形偏移
- offset_polyline(polyline: PackedVector2Array, delta: float, join_type: int = 0, end_type: int = 3) -> PackedVector2Array[] —— 折线偏移
- point_is_inside_triangle(point: Vector2, a: Vector2, b: Vector2, c: Vector2) -> bool —— 点是否在三角形内
- segment_intersects_circle(segment_from: Vector2, segment_to: Vector2, circle_position: Vector2, circle_radius: float) -> float —— 线段与圆相交
- segment_intersects_segment(from_a: Vector2, to_a: Vector2, from_b: Vector2, to_b: Vector2) -> Variant —— 线段与线段相交
- triangulate_delaunay(points: PackedVector2Array) -> PackedInt32Array —— Delaunay 三角剖分
- triangulate_polygon(polygon: PackedVector2Array) -> PackedInt32Array —— 多边形三角剖分

**枚举（Enums）：**
**PolyBooleanOperation（多边形布尔运算）：** OPERATION_UNION=0（并集）, OPERATION_DIFFERENCE=1（差集）, OPERATION_INTERSECTION=2（交集）, OPERATION_XOR=3（异或）
**PolyJoinType（多边形连接类型）：** JOIN_SQUARE=0（直角）, JOIN_ROUND=1（圆角）, JOIN_MITER=2（斜接）
**PolyEndType（多边形端点类型）：** END_POLYGON=0（多边形）, END_JOINED=1（连接）, END_BUTT=2（平头）, END_SQUARE=3（方形）, END_ROUND=4（圆形）
