## Vector4（四维向量）

一个包含 4 个元素的结构，可用于表示 4D 坐标或任何其他数值四元组。它使用浮点坐标。默认情况下，这些浮点值使用 32 位精度，而 [float] 始终是 64 位。如果需要双精度，使用 `precision=double` 选项编译引擎。参见 Vector4i 以获取其整数版本。**注意：** 在布尔上下文中，如果 Vector4 等于 `Vector4(0, 0, 0, 0)`，则计算结果为 `false`。否则，Vector4 始终计算结果为 `true`。

**属性（Props）：**
- w: float = 0.0
- x: float = 0.0
- y: float = 0.0
- z: float = 0.0

**方法（Methods）：**
- abs() -> Vector4 —— 绝对值
- ceil() -> Vector4 —— 向上取整
- clamp(min: Vector4, max: Vector4) -> Vector4 —— 限制范围
- clampf(min: float, max: float) -> Vector4 —— 按浮点限制范围
- cubic_interpolate(b: Vector4, pre_a: Vector4, post_b: Vector4, weight: float) -> Vector4 —— 三次插值
- cubic_interpolate_in_time(b: Vector4, pre_a: Vector4, post_b: Vector4, weight: float, b_t: float, pre_a_t: float, post_b_t: float) -> Vector4 —— 时间三次插值
- direction_to(to: Vector4) -> Vector4 —— 指向目标的方向
- distance_squared_to(to: Vector4) -> float —— 到目标的距离平方
- distance_to(to: Vector4) -> float —— 到目标的距离
- dot(with: Vector4) -> float —— 点积
- floor() -> Vector4 —— 向下取整
- inverse() -> Vector4 —— 倒数
- is_equal_approx(to: Vector4) -> bool —— 是否近似相等
- is_finite() -> bool —— 是否有界
- is_normalized() -> bool —— 是否已归一化
- is_zero_approx() -> bool —— 是否近似为零
- length() -> float —— 长度
- length_squared() -> float —— 长度平方
- lerp(to: Vector4, weight: float) -> Vector4 —— 线性插值
- max(with: Vector4) -> Vector4 —— 最大值
- max_axis_index() -> int —— 最大轴索引
- maxf(with: float) -> Vector4 —— 按浮点最大值
- min(with: Vector4) -> Vector4 —— 最小值
- min_axis_index() -> int —— 最小轴索引
- minf(with: float) -> Vector4 —— 按浮点最小值
- normalized() -> Vector4 —— 归一化
- posmod(mod: float) -> Vector4 —— 正取模
- posmodv(modv: Vector4) -> Vector4 —— 向量正取模
- round() -> Vector4 —— 四舍五入
- sign() -> Vector4 —— 符号
- snapped(step: Vector4) -> Vector4 —— 按向量步进对齐
- snappedf(step: float) -> Vector4 —— 按浮点步进对齐

**枚举（Enums）：**
**Axis（轴）：** AXIS_X=0（X轴）, AXIS_Y=1（Y轴）, AXIS_Z=2（Z轴）, AXIS_W=3（W轴）
**Constants（常量）：** ZERO=Vector4(0, 0, 0, 0)（零向量）, ONE=Vector4(1, 1, 1, 1)（单位向量）, INF=Vector4(inf, inf, inf, inf)（无穷）
