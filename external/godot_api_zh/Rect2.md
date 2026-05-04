## Rect2（2D矩形）

Rect2 内置 Variant 类型表示 2D 空间中的轴对齐矩形。由其 `position` 和 `size` 定义，均为 Vector2。常用于快速重叠测试（参见 `intersects`）。虽然 Rect2 本身是轴对齐的，但可与 Transform2D 结合表示旋转或倾斜的矩形。对于整数坐标，请使用 Rect2i。Rect2 的 3D 等效类型为 AABB。**注意：** 不支持负值的 `size`。使用负大小时，大多数 Rect2 方法无法正常工作。使用 `abs` 获取等效的非负大小 Rect2。**注意：** 在布尔上下文中，如果 `position` 和 `size` 都为零（等于 `Vector2.ZERO`），则 Rect2 求值为 `false`。否则始终求值为 `true`。

**属性（Props）：**
- end: Vector2 = Vector2(0, 0) —— 终点
- position: Vector2 = Vector2(0, 0) —— 位置
- size: Vector2 = Vector2(0, 0) —— 大小

**方法（Methods）：**
- abs() -> Rect2 —— 绝对值
- encloses(b: Rect2) -> bool —— 是否包含另一矩形
- expand(to: Vector2) -> Rect2 —— 扩展以包含点
- get_area() -> float —— 获取面积
- get_center() -> Vector2 —— 获取中心
- get_support(direction: Vector2) -> Vector2 —— 获取支撑点
- grow(amount: float) -> Rect2 —— 向外扩展
- grow_individual(left: float, top: float, right: float, bottom: float) -> Rect2 —— 分别扩展各边
- grow_side(side: int, amount: float) -> Rect2 —— 扩展单边
- has_area() -> bool —— 是否有面积
- has_point(point: Vector2) -> bool —— 是否包含点
- intersection(b: Rect2) -> Rect2 —— 交集
- intersects(b: Rect2, include_borders: bool = false) -> bool —— 是否相交
- is_equal_approx(rect: Rect2) -> bool —— 是否近似相等
- is_finite() -> bool —— 是否为有限值
- merge(b: Rect2) -> Rect2 —— 合并
