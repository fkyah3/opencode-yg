## Rect2i（2D整数矩形）

Rect2i 内置 Variant 类型表示 2D 空间中的轴对齐矩形，使用整数坐标。由其 `position` 和 `size` 定义，均为 Vector2i。因为它不旋转，所以常用于快速重叠测试（参见 `intersects`）。对于浮点坐标，请参见 Rect2。**注意：** 不支持负值的 `size`。使用负大小时，大多数 Rect2i 方法无法正常工作。使用 `abs` 获取等效的非负大小 Rect2i。**注意：** 在布尔上下文中，如果 `position` 和 `size` 都为零（等于 `Vector2i.ZERO`），则 Rect2i 求值为 `false`。否则始终求值为 `true`。

**属性（Props）：**
- end: Vector2i = Vector2i(0, 0) —— 终点
- position: Vector2i = Vector2i(0, 0) —— 位置
- size: Vector2i = Vector2i(0, 0) —— 大小

**方法（Methods）：**
- abs() -> Rect2i —— 绝对值
- encloses(b: Rect2i) -> bool —— 是否包含另一矩形
- expand(to: Vector2i) -> Rect2i —— 扩展以包含点
- get_area() -> int —— 获取面积
- get_center() -> Vector2i —— 获取中心
- grow(amount: int) -> Rect2i —— 向外扩展
- grow_individual(left: int, top: int, right: int, bottom: int) -> Rect2i —— 分别扩展各边
- grow_side(side: int, amount: int) -> Rect2i —— 扩展单边
- has_area() -> bool —— 是否有面积
- has_point(point: Vector2i) -> bool —— 是否包含点
- intersection(b: Rect2i) -> Rect2i —— 交集
- intersects(b: Rect2i) -> bool —— 是否相交
- merge(b: Rect2i) -> Rect2i —— 合并
