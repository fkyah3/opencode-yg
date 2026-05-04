## Curve2D <- Resource（资源）

该类描述 2D 空间中的贝塞尔曲线。主要用于为 Path2D 提供形状，但也可以手动采样用于其他目的。它会缓存沿曲线的预计算点，以加速后续计算。

**属性（Props）：**
- bake_interval: float = 5.0 —— 预计算间隔
- point_count: int = 0 —— 点数量

**方法（Methods）：**
- add_point(position: Vector2, in: Vector2 = Vector2(0, 0), out: Vector2 = Vector2(0, 0), index: int = -1) —— 添加点
- clear_points() —— 清除所有点
- get_baked_length() -> float —— 获取预计算长度
- get_baked_points() -> PackedVector2Array —— 获取预计算点数组
- get_closest_offset(to_point: Vector2) -> float —— 获取离目标点最近的偏移量
- get_closest_point(to_point: Vector2) -> Vector2 —— 获取离目标点最近的点
- get_point_in(idx: int) -> Vector2 —— 获取点的入控制点
- get_point_out(idx: int) -> Vector2 —— 获取点的出控制点
- get_point_position(idx: int) -> Vector2 —— 获取点位置
- remove_point(idx: int) —— 移除点
- sample(idx: int, t: float) -> Vector2 —— 采样
- sample_baked(offset: float = 0.0, cubic: bool = false) -> Vector2 —— 从预计算数据采样
- sample_baked_with_rotation(offset: float = 0.0, cubic: bool = false) -> Transform2D —— 从预计算数据采样并获取旋转
- samplef(fofs: float) -> Vector2 —— 按分数偏移采样
- set_point_in(idx: int, position: Vector2) —— 设置点的入控制点
- set_point_out(idx: int, position: Vector2) —— 设置点的出控制点
- set_point_position(idx: int, position: Vector2) —— 设置点位置
- tessellate(max_stages: int = 5, tolerance_degrees: float = 4) -> PackedVector2Array —— 细分曲面
- tessellate_even_length(max_stages: int = 5, tolerance_length: float = 20.0) -> PackedVector2Array —— 等长度细分
