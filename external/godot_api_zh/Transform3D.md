## Transform3D（变换3D）

Transform3D 内置 Variant 类型是一个 3×4 矩阵，表示 3D 空间中的变换。它包含一个 Basis，其本身可以表示旋转、缩放和剪切。此外，结合其自身的 `origin`，变换还可以表示平移。有关一般介绍，请参阅教程。**注意：** Godot 使用右手坐标系，这是一个常见的标准。对于方向，像 Camera3D 这样的内置类型的约定是 -Z 指向前方（+X 是右，+Y 是上，+Z 是后）。其他对象可能使用不同的方向约定。有关更多信息，请参阅教程。**注意：** 在布尔上下文中，如果 Transform3D 等于 `IDENTITY`，则计算结果为 `false`。否则，Transform3D 始终计算为 `true`。

**属性（Props）：**
- basis: Basis = Basis(1, 0, 0, 0, 1, 0, 0, 0, 1) —— 基
- origin: Vector3 = Vector3(0, 0, 0) —— 原点

**方法（Methods）：**
- affine_inverse() -> Transform3D —— 仿射逆矩阵
- interpolate_with(xform: Transform3D, weight: float) -> Transform3D —— 插值
- inverse() -> Transform3D —— 逆矩阵
- is_equal_approx(xform: Transform3D) -> bool —— 是否近似相等
- is_finite() -> bool —— 是否有限
- looking_at(target: Vector3, up: Vector3 = Vector3(0, 1, 0), use_model_front: bool = false) -> Transform3D —— 朝向目标
- orthonormalized() -> Transform3D —— 正交归一化
- rotated(axis: Vector3, angle: float) -> Transform3D —— 旋转
- rotated_local(axis: Vector3, angle: float) -> Transform3D —— 本地旋转
- scaled(scale: Vector3) -> Transform3D —— 缩放
- scaled_local(scale: Vector3) -> Transform3D —— 本地缩放
- translated(offset: Vector3) -> Transform3D —— 平移
- translated_local(offset: Vector3) -> Transform3D —— 本地平移

**枚举（Enums）：**
**常量（Constants）：** IDENTITY=Transform3D(1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0)（单位矩阵），FLIP_X=Transform3D(-1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0)（水平翻转），FLIP_Y=Transform3D(1, 0, 0, 0, -1, 0, 0, 0, 1, 0, 0, 0)（垂直翻转），FLIP_Z=Transform3D(1, 0, 0, 0, 1, 0, 0, 0, -1, 0, 0, 0)（深度翻转）
