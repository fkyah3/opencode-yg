## Plane（平面）

表示一个归一化的平面方程。`normal` 是平面的法线（a, b, c 归一化），`d` 是从原点到平面的距离（沿法线方向）。"上方"或"之上"指法线指向的平面一侧。**注意：** 在布尔上下文中，如果平面的所有分量都等于 `0`，则求值为 `false`。否则，平面始终求值为 `true`。

**属性（Props）：**
- d: float = 0.0 —— 距离
- normal: Vector3 = Vector3(0, 0, 0) —— 法线
- x: float = 0.0
- y: float = 0.0
- z: float = 0.0

**方法（Methods）：**
- distance_to(point: Vector3) -> float —— 到点的距离
- get_center() -> Vector3 —— 获取中心
- has_point(point: Vector3, tolerance: float = 1e-05) -> bool —— 是否包含点
- intersect_3(b: Plane, c: Plane) -> Variant —— 三个平面相交
- intersects_ray(from: Vector3, dir: Vector3) -> Variant —— 与射线相交
- intersects_segment(from: Vector3, to: Vector3) -> Variant —— 与线段相交
- is_equal_approx(to_plane: Plane) -> bool —— 是否近似相等
- is_finite() -> bool —— 是否为有限值
- is_point_over(point: Vector3) -> bool —— 点是否在平面上方
- normalized() -> Plane —— 归一化
- project(point: Vector3) -> Vector3 —— 投影点

**枚举（Enums）：**
**常量（Constants）：** PLANE_YZ=Plane(1, 0, 0, 0) —— YZ 平面, PLANE_XZ=Plane(0, 1, 0, 0) —— XZ 平面, PLANE_XY=Plane(0, 0, 1, 0) —— XY 平面
