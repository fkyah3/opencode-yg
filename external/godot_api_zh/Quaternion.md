## Quaternion（四元数）

Quaternion 内置 Variant 类型是一个 4D 数据结构，以四元数形式表示旋转。与可同时存储旋转和缩放的 Basis 类型相比，四元数*只能*存储旋转。四元数由 4 个浮点分量组成：`w`、`x`、`y` 和 `z`。这些分量在内存中非常紧凑，因此某些操作更高效且更不易出现浮点错误。诸如 `get_angle`、`get_axis` 和 `slerp` 等方法比其 Basis 对应方法更快。关于四元数的精彩介绍，请参见相关资源。您无需了解四元数背后的数学原理，因为 Godot 提供了多个辅助方法来处理。其中包括 `slerp` 和 `spherical_cubic_interpolate`，以及 `*` 运算符。**注意：** 四元数必须在使用前进行归一化才能用于旋转（参见 `normalized`）。**注意：** 与 Vector2 和 Vector3 类似，四元数的分量默认使用 32 位精度，而 [float] 始终为 64 位。如果需要双精度，请使用 `precision=double` 选项编译引擎。**注意：** 在布尔上下文中，如果四元数等于 `IDENTITY`，则求值为 `false`。否则，四元数始终求值为 `true`。

**属性（Props）：**
- w: float = 1.0
- x: float = 0.0
- y: float = 0.0
- z: float = 0.0

**方法（Methods）：**
- angle_to(to: Quaternion) -> float —— 到另一四元数的角度
- dot(with: Quaternion) -> float —— 点积
- exp() -> Quaternion —— 指数
- from_euler(euler: Vector3) -> Quaternion —— 从欧拉角创建
- get_angle() -> float —— 获取角度
- get_axis() -> Vector3 —— 获取轴
- get_euler(order: int = 2) -> Vector3 —— 获取欧拉角
- inverse() -> Quaternion —— 逆
- is_equal_approx(to: Quaternion) -> bool —— 是否近似相等
- is_finite() -> bool —— 是否为有限值
- is_normalized() -> bool —— 是否已归一化
- length() -> float —— 长度
- length_squared() -> float —— 长度平方
- log() -> Quaternion —— 对数
- normalized() -> Quaternion —— 归一化
- slerp(to: Quaternion, weight: float) -> Quaternion —— 球面线性插值
- slerpni(to: Quaternion, weight: float) -> Quaternion —— 球面线性插值（非归一化）
- spherical_cubic_interpolate(b: Quaternion, pre_a: Quaternion, post_b: Quaternion, weight: float) -> Quaternion —— 球面三次插值
- spherical_cubic_interpolate_in_time(b: Quaternion, pre_a: Quaternion, post_b: Quaternion, weight: float, b_t: float, pre_a_t: float, post_b_t: float) -> Quaternion —— 球面时间三次插值

**枚举（Enums）：**
**常量（Constants）：** IDENTITY=Quaternion(0, 0, 0, 1) —— 单位四元数
