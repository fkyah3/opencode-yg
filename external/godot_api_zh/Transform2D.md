## Transform2D（变换2D）

Transform2D 内置 Variant 类型是一个 2×3 矩阵，表示 2D 空间中的变换。它包含三个 Vector2 值：`x`、`y` 和 `origin`。它们共同可以表示平移、旋转、缩放和倾斜。`x` 和 `y` 轴构成一个 2×2 矩阵，称为变换的**基（basis）**。每个轴的长度（`Vector2.length`）影响变换的缩放，而所有轴的方向影响旋转。通常，两个轴彼此垂直。但是，当单独旋转一个轴时，变换会变得倾斜。将倾斜的变换应用于 2D 精灵会使精灵看起来扭曲。有关一般介绍，请参阅教程。**注意：** 与 Transform3D 不同，没有与 Basis 类型对应的 2D 类型。所有提到的"基"都指 Transform2D 的 `x` 和 `y` 分量。**注意：** 在布尔上下文中，如果 Transform2D 等于 `IDENTITY`，则计算结果为 `false`。否则，Transform2D 始终计算为 `true`。

**属性（Props）：**
- origin: Vector2 = Vector2(0, 0) —— 原点
- x: Vector2 = Vector2(1, 0) —— X轴
- y: Vector2 = Vector2(0, 1) —— Y轴

**方法（Methods）：**
- affine_inverse() -> Transform2D —— 仿射逆矩阵
- basis_xform(v: Vector2) -> Vector2 —— 基变换
- basis_xform_inv(v: Vector2) -> Vector2 —— 基逆变换
- determinant() -> float —— 行列式
- get_origin() -> Vector2 —— 获取原点
- get_rotation() -> float —— 获取旋转
- get_scale() -> Vector2 —— 获取缩放
- get_skew() -> float —— 获取倾斜
- interpolate_with(xform: Transform2D, weight: float) -> Transform2D —— 插值
- inverse() -> Transform2D —— 逆矩阵
- is_conformal() -> bool —— 是否共形
- is_equal_approx(xform: Transform2D) -> bool —— 是否近似相等
- is_finite() -> bool —— 是否有限
- looking_at(target: Vector2 = Vector2(0, 0)) -> Transform2D —— 朝向目标
- orthonormalized() -> Transform2D —— 正交归一化
- rotated(angle: float) -> Transform2D —— 旋转
- rotated_local(angle: float) -> Transform2D —— 本地旋转
- scaled(scale: Vector2) -> Transform2D —— 缩放
- scaled_local(scale: Vector2) -> Transform2D —— 本地缩放
- translated(offset: Vector2) -> Transform2D —— 平移
- translated_local(offset: Vector2) -> Transform2D —— 本地平移

**枚举（Enums）：**
**常量（Constants）：** IDENTITY=Transform2D(1, 0, 0, 1, 0, 0)（单位矩阵），FLIP_X=Transform2D(-1, 0, 0, 1, 0, 0)（水平翻转），FLIP_Y=Transform2D(1, 0, 0, -1, 0, 0)（垂直翻转）
