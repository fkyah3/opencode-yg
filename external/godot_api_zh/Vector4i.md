## Vector4i（四维整数向量）

一个包含 4 个元素的结构，可用于表示 4D 网格坐标或任何其他整数四元组。它使用整数坐标，因此在需要精确精度时比 Vector4 更合适。注意这些值限制为 32 位，与 Vector4 不同，这不能通过引擎构建选项配置。如果需要 64 位值，请使用 [int] 或 PackedInt64Array。**注意：** 在布尔上下文中，如果 Vector4i 等于 `Vector4i(0, 0, 0, 0)`，则计算结果为 `false`。否则，Vector4i 始终计算结果为 `true`。

**属性（Props）：**
- w: int = 0
- x: int = 0
- y: int = 0
- z: int = 0

**方法（Methods）：**
- abs() -> Vector4i —— 绝对值
- clamp(min: Vector4i, max: Vector4i) -> Vector4i —— 限制范围
- clampi(min: int, max: int) -> Vector4i —— 按整数限制范围
- distance_squared_to(to: Vector4i) -> int —— 到目标的距离平方
- distance_to(to: Vector4i) -> float —— 到目标的距离
- length() -> float —— 长度
- length_squared() -> int —— 长度平方
- max(with: Vector4i) -> Vector4i —— 最大值
- max_axis_index() -> int —— 最大轴索引
- maxi(with: int) -> Vector4i —— 按整数最大值
- min(with: Vector4i) -> Vector4i —— 最小值
- min_axis_index() -> int —— 最小轴索引
- mini(with: int) -> Vector4i —— 按整数最小值
- sign() -> Vector4i —— 符号
- snapped(step: Vector4i) -> Vector4i —— 按向量步进对齐
- snappedi(step: int) -> Vector4i —— 按整数步进对齐

**枚举（Enums）：**
**Axis（轴）：** AXIS_X=0（X轴）, AXIS_Y=1（Y轴）, AXIS_Z=2（Z轴）, AXIS_W=3（W轴）
**Constants（常量）：** ZERO=Vector4i(0, 0, 0, 0)（零向量）, ONE=Vector4i(1, 1, 1, 1)（单位向量）, MIN=Vector4i(-2147483648, -2147483648, -2147483648, -2147483648)（最小值）, MAX=Vector4i(2147483647, 2147483647, 2147483647, 2147483647)（最大值）
