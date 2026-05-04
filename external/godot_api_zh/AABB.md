## AABB（轴对齐包围盒）

AABB 内置 Variant 类型表示 3D 空间中的轴对齐包围盒。它由 `position`（位置）和 `size`（大小）两个 Vector3 定义，常用于快速重叠测试（参见 `intersects`）。虽然 AABB 本身是轴对齐的，但可以结合 Transform3D 表示旋转或倾斜的包围盒。它使用浮点坐标。AABB 在 2D 中的对应类型是 Rect2。没有使用整数坐标的 AABB 版本。**注意：** `size` 不支持负值。使用负 size 时，大多数 AABB 方法无法正常工作。请使用 `abs` 获取等效的非负 size AABB。**注意：** 在布尔上下文中，当 `position` 和 `size` 都为零（等于 `Vector3.ZERO`）时，AABB 求值为 `false`，否则始终求值为 `true`。

**属性（Props）：**
- end: Vector3 = Vector3(0, 0, 0)
- position: Vector3 = Vector3(0, 0, 0)
- size: Vector3 = Vector3(0, 0, 0)

**方法（Methods）：**
- abs() -> AABB
- encloses(with: AABB) -> bool
- expand(to_point: Vector3) -> AABB
- get_center() -> Vector3
- get_endpoint(idx: int) -> Vector3
- get_longest_axis() -> Vector3
- get_longest_axis_index() -> int
- get_longest_axis_size() -> float
- get_shortest_axis() -> Vector3
- get_shortest_axis_index() -> int
- get_shortest_axis_size() -> float
- get_support(direction: Vector3) -> Vector3
- get_volume() -> float
- grow(by: float) -> AABB
- has_point(point: Vector3) -> bool
- has_surface() -> bool
- has_volume() -> bool
- intersection(with: AABB) -> AABB
- intersects(with: AABB) -> bool
- intersects_plane(plane: Plane) -> bool
- intersects_ray(from: Vector3, dir: Vector3) -> Variant
- intersects_segment(from: Vector3, to: Vector3) -> Variant
- is_equal_approx(aabb: AABB) -> bool
- is_finite() -> bool
- merge(with: AABB) -> AABB
