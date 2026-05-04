## Curve（曲线） <- Resource（资源）

该资源通过定义一组点及其切线来描述数学曲线。默认情况下，它在 X 和 Y 轴上的范围在 `0` 和 `1` 之间，但这些范围可以更改。请注意，许多资源和节点假定它们接收的是*单位曲线*。单位曲线是其定义域（X 轴）在 `0` 到 `1` 之间的曲线。单位曲线的一些使用示例包括 `CPUParticles2D.angle_curve` 和 `Line2D.width_curve`。

**属性（Props）：**
- bake_resolution: int = 100 —— 预计算分辨率
- max_domain: float = 1.0 —— 最大定义域
- max_value: float = 1.0 —— 最大值
- min_domain: float = 0.0 —— 最小定义域
- min_value: float = 0.0 —— 最小值
- point_count: int = 0 —— 点数量

**方法（Methods）：**
- add_point(position: Vector2, left_tangent: float = 0, right_tangent: float = 0, left_mode: int = 0, right_mode: int = 0) -> int —— 添加点
- bake() —— 预计算
- clean_dupes() —— 清理重复点
- clear_points() —— 清除所有点
- get_domain_range() -> float —— 获取定义域范围
- get_point_left_mode(index: int) -> int —— 获取点左侧模式
- get_point_left_tangent(index: int) -> float —— 获取点左侧切线
- get_point_position(index: int) -> Vector2 —— 获取点位置
- get_point_right_mode(index: int) -> int —— 获取点右侧模式
- get_point_right_tangent(index: int) -> float —— 获取点右侧切线
- get_value_range() -> float —— 获取值域范围
- remove_point(index: int) —— 移除点
- sample(offset: float) -> float —— 采样
- sample_baked(offset: float) -> float —— 从预计算数据采样
- set_point_left_mode(index: int, mode: int) —— 设置点左侧模式
- set_point_left_tangent(index: int, tangent: float) —— 设置点左侧切线
- set_point_offset(index: int, offset: float) -> int —— 设置点偏移
- set_point_right_mode(index: int, mode: int) —— 设置点右侧模式
- set_point_right_tangent(index: int, tangent: float) —— 设置点右侧切线
- set_point_value(index: int, y: float) —— 设置点值

**信号（Signals）：**
- domain_changed —— 定义域改变
- range_changed —— 值域改变

**枚举（Enums）：**
**TangentMode（切线模式）：** TANGENT_FREE=0（自由切线）, TANGENT_LINEAR=1（线性切线）, TANGENT_MODE_COUNT=2（模式数量）
