## Vector3i（三维整数向量）

一个包含 3 个元素的结构，可用于表示 3D 网格坐标或任何其他整数三元组。它使用整数坐标，因此在需要精确精度时比 Vector3 更合适。注意这些值限制为 32 位，与 Vector3 不同，这不能通过引擎构建选项配置。如果需要 64 位值，请使用 [int] 或 PackedInt64Array。**注意：** 在布尔上下文中，如果 Vector3i 等于 `Vector3i(0, 0, 0)`，则计算结果为 `false`。否则，Vector3i 始终计算结果为 `true`。

**属性（Props）：**
- x: int = 0
- y: int = 0
- z: int = 0

**方法（Methods）：**
- abs() -> Vector3i —— 绝对值
- clamp(min: Vector3i, max: Vector3i) -> Vector3i —— 限制范围
- clampi(min: int, max: int) -> Vector3i —— 按整数限制范围
- distance_squared_to(to: Vector3i) -> int —— 到目标的距离平方
- distance_to(to: Vector3i) -> float —— 到目标的距离
- length() -> float —— 长度
- length_squared() -> int —— 长度平方
- max(with: Vector3i) -> Vector3i —— 最大值
- max_axis_index() -> int —— 最大轴索引
- maxi(with: int) -> Vector3i —— 按整数最大值
- min(with: Vector3i) -> Vector3i —— 最小值
- min_axis_index() -> int —— 最小轴索引
- mini(with: int) -> Vector3i —— 按整数最小值
- sign() -> Vector3i —— 符号
- snapped(step: Vector3i) -> Vector3i —— 按向量步进对齐
- snappedi(step: int) -> Vector3i —— 按整数步进对齐

**枚举（Enums）：**
**Axis（轴）：** AXIS_X=0（X轴）, AXIS_Y=1（Y轴）, AXIS_Z=2（Z轴）
**Constants（常量）：** ZERO=Vector3i(0, 0, 0)（零向量）, ONE=Vector3i(1, 1, 1)（单位向量）, MIN=Vector3i(-2147483648, -2147483648, -2147483648)（最小值）, MAX=Vector3i(2147483647, 2147483647, 2147483647)（最大值）, LEFT=Vector3i(-1, 0, 0)（左）, RIGHT=Vector3i(1, 0, 0)（右）, UP=Vector3i(0, 1, 0)（上）, DOWN=Vector3i(0, -1, 0)（下）, FORWARD=Vector3i(0, 0, -1)（前）, BACK=Vector3i(0, 0, 1)（后）
