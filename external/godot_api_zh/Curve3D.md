## Curve3D <- Resource（资源）

该类描述 3D 空间中的贝塞尔曲线。主要用于为 Path3D 提供形状，但也可以手动采样用于其他目的。它会缓存沿曲线的预计算点，以加速后续计算。

**属性（Props）：**
- bake_interval: float = 0.2 —— 预计算间隔
- closed: bool = false —— 是否闭合
- point_count: int = 0 —— 点数量
- up_vector_enabled: bool = true —— 是否启用上向量

**方法（Methods）：**
- add_point(position: Vector3, in: Vector3 = Vector3(0, 0, 0), out: Vector3 = Vector3(0, 0, 0), index: int = -1) —— 添加点
- clear_points() —— 清除所有点
- get_baked_length() -> float —— 获取预计算长度
- get_baked_points() -> PackedVector3Array —— 获取预计算点数组
- get_baked_tilts() -> PackedFloat32Array —— 获取预计算倾斜数组
- get_baked_up_vectors() -> PackedVector3Array —— 获取预计算上向量数组
- get_closest_offset(to_point: Vector3) -> float —— 获取离目标点最近的偏移量
- get_closest_point(to_point: Vector3) -> Vector3 —— 获取离目标点最近的点
- get_point_in(idx: int) -> Vector3 —— 获取点的入控制点
- get_point_out(idx: int) -> Vector3 —— 获取点的出控制点
- get_point_position(idx: int) -> Vector3 —— 获取点位置
- get_point_tilt(idx: int) -> float —— 获取点倾斜
- remove_point(idx: int) —— 移除点
- sample(idx: int, t: float) -> Vector3 —— 采样
- sample_baked(offset: float = 0.0, cubic: bool = false) -> Vector3 —— 从预计算数据采样
- sample_baked_up_vector(offset: float, apply_tilt: bool = false) -> Vector3 —— 从预计算数据采样上向量
- sample_baked_with_rotation(offset: float = 0.0, cubic: bool = false, apply_tilt: bool = false) -> Transform3D —— 从预计算数据采样并获取旋转
- samplef(fofs: float) -> Vector3 —— 按分数偏移采样
- set_point_in(idx: int, position: Vector3) —— 设置点的入控制点
- set_point_out(idx: int, position: Vector3) —— 设置点的出控制点
- set_point_position(idx: int, position: Vector3) —— 设置点位置
- set_point_tilt(idx: int, tilt: float) —— 设置点倾斜
- tessellate(max_stages: int = 5, tolerance_degrees: float = 4) -> PackedVector3Array —— 细分曲面
- tessellate_even_length(max_stages: int = 5, tolerance_length: float = 0.2) -> PackedVector3Array —— 等长度细分
