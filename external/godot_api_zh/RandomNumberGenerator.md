## RandomNumberGenerator（随机数生成器）<- RefCounted（引用计数）

RandomNumberGenerator 是用于生成伪随机数的类。**注意：** 底层算法是实现细节，不应依赖。要基于时间相关种子生成（给定范围内的）随机浮点数：

**属性（Props）：**
- seed: int = 0 —— 种子
- state: int = 0 —— 状态

**方法（Methods）：**
- rand_weighted(weights: PackedFloat32Array) -> int —— 加权随机
- randf() -> float —— 随机浮点数
- randf_range(from: float, to: float) -> float —— 范围随机浮点数
- randfn(mean: float = 0.0, deviation: float = 1.0) -> float —— 正态分布随机浮点数
- randi() -> int —— 随机整数
- randi_range(from: int, to: int) -> int —— 范围随机整数
- randomize() —— 随机化种子
