## Projection（投影矩阵）

用于 3D 投影变换的 4×4 矩阵。它可以表示平移、旋转、缩放、剪切和透视除法等变换。由四个 Vector4 列组成。对于纯线性变换（平移、旋转和缩放），建议使用 Transform3D，因为其性能更高且内存占用更少。内部用作 Camera3D 的投影矩阵。**注意：** 在布尔上下文中，如果投影矩阵等于 `IDENTITY`，则求值为 `false`。否则，投影矩阵始终求值为 `true`。

**属性（Props）：**
- w: Vector4 = Vector4(0, 0, 0, 1)
- x: Vector4 = Vector4(1, 0, 0, 0)
- y: Vector4 = Vector4(0, 1, 0, 0)
- z: Vector4 = Vector4(0, 0, 1, 0)

**方法（Methods）：**
- create_depth_correction(flip_y: bool) -> Projection —— 创建深度修正
- create_fit_aabb(aabb: AABB) -> Projection —— 创建适配 AABB
- create_for_hmd(eye: int, aspect: float, intraocular_dist: float, display_width: float, display_to_lens: float, oversample: float, z_near: float, z_far: float) -> Projection —— 为头戴设备创建
- create_frustum(left: float, right: float, bottom: float, top: float, z_near: float, z_far: float) -> Projection —— 创建视锥体
- create_frustum_aspect(size: float, aspect: float, offset: Vector2, z_near: float, z_far: float, flip_fov: bool = false) -> Projection —— 按宽高比创建视锥体
- create_light_atlas_rect(rect: Rect2) -> Projection —— 创建光照图集矩形
- create_orthogonal(left: float, right: float, bottom: float, top: float, z_near: float, z_far: float) -> Projection —— 创建正交投影
- create_orthogonal_aspect(size: float, aspect: float, z_near: float, z_far: float, flip_fov: bool = false) -> Projection —— 按宽高比创建正交投影
- create_perspective(fovy: float, aspect: float, z_near: float, z_far: float, flip_fov: bool = false) -> Projection —— 创建透视投影
- create_perspective_hmd(fovy: float, aspect: float, z_near: float, z_far: float, flip_fov: bool, eye: int, intraocular_dist: float, convergence_dist: float) -> Projection —— 为头戴设备创建透视投影
- determinant() -> float —— 行列式
- flipped_y() -> Projection —— 翻转 Y 轴
- get_aspect() -> float —— 获取宽高比
- get_far_plane_half_extents() -> Vector2 —— 获取远平面半范围
- get_fov() -> float —— 获取视场角
- get_fovy(fovx: float, aspect: float) -> float —— 获取垂直视场角
- get_lod_multiplier() -> float —— 获取 LOD 倍数
- get_pixels_per_meter(for_pixel_width: int) -> int —— 获取每米像素数
- get_projection_plane(plane: int) -> Plane —— 获取投影平面
- get_viewport_half_extents() -> Vector2 —— 获取视口半范围
- get_z_far() -> float —— 获取远裁剪面
- get_z_near() -> float —— 获取近裁剪面
- inverse() -> Projection —— 逆矩阵
- is_orthogonal() -> bool —— 是否为正交投影
- jitter_offseted(offset: Vector2) -> Projection —— 抖动偏移
- perspective_znear_adjusted(new_znear: float) -> Projection —— 调整透视近裁剪面

**枚举（Enums）：**
**Planes（平面）：** PLANE_NEAR=0 —— 近平面, PLANE_FAR=1 —— 远平面, PLANE_LEFT=2 —— 左平面, PLANE_TOP=3 —— 上平面, PLANE_RIGHT=4 —— 右平面, PLANE_BOTTOM=5 —— 下平面
**常量（Constants）：** IDENTITY=Projection(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1) —— 单位矩阵, ZERO=Projection(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0) —— 零矩阵
