## Basis（基）

Basis 内置 Variant 类型是一个用于表示 3D 旋转、缩放和剪切的 3×3 矩阵。常用于 Transform3D 中。Basis 由 3 个轴向量组成，每个代表矩阵的一列：`x`、`y` 和 `z`。每个轴的长度（`Vector3.length`）影响基的缩放，而所有轴的方向影响旋转。通常，这些轴彼此垂直。然而，当单独旋转任何轴时，基会发生剪切。将剪切的基应用于 3D 模型会使模型看起来扭曲。Basis 是：- **正交（Orthogonal）**，如果其轴彼此垂直。- **归一化（Normalized）**，如果每个轴的长度为 `1.0`。- **一致（Uniform）**，如果所有轴具有相同的长度（参见 `get_scale`）。- **标准正交（Orthonormal）**，如果同时是正交和归一化的，这使得它只能表示旋转（参见 `orthonormalized`）。- **共形（Conformal）**，如果同时是正交和一致的，确保它没有扭曲。关于一般介绍，请参见教程。**注意：** Godot 使用右手坐标系，这是常见标准。对于方向，Camera3D 等内置类型的约定是 -Z 向前（+X 是右，+Y 是上，+Z 是后）。其他对象可能使用不同的方向约定。更多信息，请参见教程。**注意：** 基矩阵以列主序公开，与 OpenGL 相同。但内部以行主序存储，与 DirectX 相同。**注意：** 在布尔上下文中，当基等于 `IDENTITY` 时求值为 `false`，否则始终求值为 `true`。

**属性（Props）：**
- x: Vector3 = Vector3(1, 0, 0)
- y: Vector3 = Vector3(0, 1, 0)
- z: Vector3 = Vector3(0, 0, 1)

**方法（Methods）：**
- determinant() -> float
- from_euler(euler: Vector3, order: int = 2) -> Basis
- from_scale(scale: Vector3) -> Basis
- get_euler(order: int = 2) -> Vector3
- get_rotation_quaternion() -> Quaternion
- get_scale() -> Vector3
- inverse() -> Basis
- is_conformal() -> bool
- is_equal_approx(b: Basis) -> bool
- is_finite() -> bool
- looking_at(target: Vector3, up: Vector3 = Vector3(0, 1, 0), use_model_front: bool = false) -> Basis
- orthonormalized() -> Basis
- rotated(axis: Vector3, angle: float) -> Basis
- scaled(scale: Vector3) -> Basis
- scaled_local(scale: Vector3) -> Basis
- slerp(to: Basis, weight: float) -> Basis
- tdotx(with: Vector3) -> float
- tdoty(with: Vector3) -> float
- tdotz(with: Vector3) -> float
- transposed() -> Basis

**枚举（Enums）：**
**常量（Constants）：** IDENTITY=Basis(1, 0, 0, 0, 1, 0, 0, 0, 1), FLIP_X=Basis(-1, 0, 0, 0, 1, 0, 0, 0, 1), FLIP_Y=Basis(1, 0, 0, 0, -1, 0, 0, 0, 1), FLIP_Z=Basis(1, 0, 0, 0, 1, 0, 0, 0, -1)
