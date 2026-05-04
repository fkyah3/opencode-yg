## Vector3（三维向量）

一个包含 3 个元素的结构，可用于表示 3D 坐标或任何其他数值三元组。它使用浮点坐标。默认情况下，这些浮点值使用 32 位精度，而 [float] 始终是 64 位。如果需要双精度，使用 `precision=double` 选项编译引擎。参见 Vector3i 以获取其整数版本。**注意：** 在布尔上下文中，如果 Vector3 等于 `Vector3(0, 0, 0)`，则计算结果为 `false`。否则，Vector3 始终计算结果为 `true`。

**属性（Props）：**
- x: float = 0.0
- y: float = 0.0
- z: float = 0.0

**方法（Methods）：**
- abs() -> Vector3 —— 绝对值
- angle_to(to: Vector3) -> float —— 与目标向量的夹角
- bezier_derivative(control_1: Vector3, control_2: Vector3, end: Vector3, t: float) -> Vector3 —— 贝塞尔导数
- bezier_interpolate(control_1: Vector3, control_2: Vector3, end: Vector3, t: float) -> Vector3 —— 贝塞尔插值
- bounce(n: Vector3) -> Vector3 —— 反弹
- ceil() -> Vector3 —— 向上取整
- clamp(min: Vector3, max: Vector3) -> Vector3 —— 限制范围
- clampf(min: float, max: float) -> Vector3 —— 按浮点限制范围
- cross(with: Vector3) -> Vector3 —— 叉积
- cubic_interpolate(b: Vector3, pre_a: Vector3, post_b: Vector3, weight: float) -> Vector3 —— 三次插值
- cubic_interpolate_in_time(b: Vector3, pre_a: Vector3, post_b: Vector3, weight: float, b_t: float, pre_a_t: float, post_b_t: float) -> Vector3 —— 时间三次插值
- direction_to(to: Vector3) -> Vector3 —— 指向目标的方向
- distance_squared_to(to: Vector3) -> float —— 到目标的距离平方
- distance_to(to: Vector3) -> float —— 到目标的距离
- dot(with: Vector3) -> float —— 点积
- floor() -> Vector3 —— 向下取整
- inverse() -> Vector3 —— 倒数
- is_equal_approx(to: Vector3) -> bool —— 是否近似相等
- is_finite() -> bool —— 是否有界
- is_normalized() -> bool —— 是否已归一化
- is_zero_approx() -> bool —— 是否近似为零
- length() -> float —— 长度
- length_squared() -> float —— 长度平方
- lerp(to: Vector3, weight: float) -> Vector3 —— 线性插值
- limit_length(length: float = 1.0) -> Vector3 —— 限制长度
- max(with: Vector3) -> Vector3 —— 最大值
- max_axis_index() -> int —— 最大轴索引
- maxf(with: float) -> Vector3 —— 按浮点最大值
- min(with: Vector3) -> Vector3 —— 最小值
- min_axis_index() -> int —— 最小轴索引
- minf(with: float) -> Vector3 —— 按浮点最小值
- move_toward(to: Vector3, delta: float) -> Vector3 —— 向目标移动
- normalized() -> Vector3 —— 归一化
- octahedron_decode(uv: Vector2) -> Vector3 —— 八面体解码
- octahedron_encode() -> Vector2 —— 八面体编码
- outer(with: Vector3) -> Basis —— 外积
- posmod(mod: float) -> Vector3 —— 正取模
- posmodv(modv: Vector3) -> Vector3 —— 向量正取模
- project(b: Vector3) -> Vector3 —— 投影
- reflect(n: Vector3) -> Vector3 —— 反射
- rotated(axis: Vector3, angle: float) -> Vector3 —— 绕轴旋转
- round() -> Vector3 —— 四舍五入
- sign() -> Vector3 —— 符号
- signed_angle_to(to: Vector3, axis: Vector3) -> float —— 有符号夹角
- slerp(to: Vector3, weight: float) -> Vector3 —— 球面线性插值
- slide(n: Vector3) -> Vector3 —— 滑动
- snapped(step: Vector3) -> Vector3 —— 按向量步进对齐
- snappedf(step: float) -> Vector3 —— 按浮点步进对齐

**枚举（Enums）：**
**Axis（轴）：** AXIS_X=0（X轴）, AXIS_Y=1（Y轴）, AXIS_Z=2（Z轴）
**Constants（常量）：** ZERO=Vector3(0, 0, 0)（零向量）, ONE=Vector3(1, 1, 1)（单位向量）, INF=Vector3(inf, inf, inf)（无穷）, LEFT=Vector3(-1, 0, 0)（左）, RIGHT=Vector3(1, 0, 0)（右）, UP=Vector3(0, 1, 0)（上）, DOWN=Vector3(0, -1, 0)（下）, FORWARD=Vector3(0, 0, -1)（前）, BACK=Vector3(0, 0, 1)（后）, MODEL_LEFT=Vector3(1, 0, 0)（模型左）, ...
