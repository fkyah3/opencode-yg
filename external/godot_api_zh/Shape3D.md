## Shape3D（3D形状） <- Resource（资源）

所有 3D 形状的抽象基类，用于物理系统。**性能：**基本体形状（尤其是 SphereShape3D）的碰撞检测速度很快。ConvexPolygonShape3D 和 HeightMapShape3D 较慢，ConcavePolygonShape3D 最慢。

**属性（Props）：**
- custom_solver_bias: float = 0.0 —— 自定义求解器偏向
- margin: float = 0.04 —— 边距

**方法（Methods）：**
- get_debug_mesh() -> ArrayMesh —— 获取调试网格
