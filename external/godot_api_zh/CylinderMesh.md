## CylinderMesh（圆柱体网格） <- PrimitiveMesh（基本体网格）

表示圆柱体 PrimitiveMesh 的类。可以将 `top_radius` 或 `bottom_radius` 属性设为 `0.0`，用于创建圆锥体。

**属性（Props）：**
- bottom_radius: float = 0.5 —— 底部半径
- cap_bottom: bool = true —— 是否封闭底部
- cap_top: bool = true —— 是否封闭顶部
- height: float = 2.0 —— 高度
- radial_segments: int = 64 —— 径向分段数
- rings: int = 4 —— 环数
- top_radius: float = 0.5 —— 顶部半径
