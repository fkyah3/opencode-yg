## Vector2（二维向量）

一个包含 2 个元素的结构，可用于表示 2D 坐标或任何其他数值对。它使用浮点坐标。默认情况下，这些浮点值使用 32 位精度，而 [float] 始终是 64 位。如果需要双精度，使用 `precision=double` 选项编译引擎。参见 Vector2i 以获取其整数版本。**注意：** 在布尔上下文中，如果 Vector2 等于 `Vector2(0, 0)`，则计算结果为 `false`。否则，Vector2 始终计算结果为 `true`。

**属性（Props）：**
- x: float = 0.0
- y: float = 0.0

**方法（Methods）：**
- abs() -> Vector2 —— 绝对值
- angle() -> float —— 角度
- angle_to(to: Vector2) -> float —— 与目标向量的夹角
- angle_to_point(to: Vector2) -> float —— 与目标点的夹角
- aspect() -> float —— 纵横比
- bezier_derivative(control_1: Vector2, control_2: Vector2, end: Vector2, t: float) -> Vector2 —— 贝塞尔导数
- bezier_interpolate(control_1: Vector2, control_2: Vector2, end: Vector2, t: float) -> Vector2 —— 贝塞尔插值
- bounce(n: Vector2) -> Vector2 —— 反弹
- ceil() -> Vector2 —— 向上取整
- clamp(min: Vector2, max: Vector2) -> Vector2 —— 限制范围
- clampf(min: float, max: float) -> Vector2 —— 限制浮点范围
- cross(with: Vector2) -> float —— 叉积
- cubic_interpolate(b: Vector2, pre_a: Vector2, post_b: Vector2, weight: float) -> Vector2 —— 三次插值
- cubic_interpolate_in_time(b: Vector2, pre_a: Vector2, post_b: Vector2, weight: float, b_t: float, pre_a_t: float, post_b_t: float) -> Vector2 —— 时间三次插值
- direction_to(to: Vector2) -> Vector2 —— 指向目标的方向
- distance_squared_to(to: Vector2) -> float —— 到目标的距离平方
- distance_to(to: Vector2) -> float —— 到目标的距离
- dot(with: Vector2) -> float —— 点积
- floor() -> Vector2 —— 向下取整
- from_angle(angle: float) -> Vector2 —— 从角度创建
- is_equal_approx(to: Vector2) -> bool —— 是否近似相等
- is_finite() -> bool —— 是否有界
- is_normalized() -> bool —— 是否已归一化
- is_zero_approx() -> bool —— 是否近似为零
- length() -> float —— 长度
- length_squared() -> float —— 长度平方
- lerp(to: Vector2, weight: float) -> Vector2 —— 线性插值
- limit_length(length: float = 1.0) -> Vector2 —— 限制长度
- max(with: Vector2) -> Vector2 —— 最大值
- max_axis_index() -> int —— 最大轴索引
- maxf(with: float) -> Vector2 —— 按浮点最大值
- min(with: Vector2) -> Vector2 —— 最小值
- min_axis_index() -> int —— 最小轴索引
- minf(with: float) -> Vector2 —— 按浮点最小值
- move_toward(to: Vector2, delta: float) -> Vector2 —— 向目标移动
- normalized() -> Vector2 —— 归一化
- orthogonal() -> Vector2 —— 正交向量
- posmod(mod: float) -> Vector2 —— 正取模
- posmodv(modv: Vector2) -> Vector2 —— 向量正取模
- project(b: Vector2) -> Vector2 —— 投影
- reflect(line: Vector2) -> Vector2 —— 反射
- rotated(angle: float) -> Vector2 —— 旋转
- round() -> Vector2 —— 四舍五入
- sign() -> Vector2 —— 符号
- slerp(to: Vector2, weight: float) -> Vector2 —— 球面线性插值
- slide(n: Vector2) -> Vector2 —— 滑动
- snapped(step: Vector2) -> Vector2 —— 按向量步进对齐
- snappedf(step: float) -> Vector2 —— 按浮点步进对齐

**枚举（Enums）：**
**Axis（轴）：** AXIS_X=0（X轴）, AXIS_Y=1（Y轴）
**Constants（常量）：** ZERO=Vector2(0, 0)（零向量）, ONE=Vector2(1, 1)（单位向量）, INF=Vector2(inf, inf)（无穷）, LEFT=Vector2(-1, 0)（左）, RIGHT=Vector2(1, 0)（右）, UP=Vector2(0, -1)（上）, DOWN=Vector2(0, 1)（下）
