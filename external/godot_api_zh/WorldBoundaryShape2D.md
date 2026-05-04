## WorldBoundaryShape2D（世界边界形状2D） <- Shape2D（形状2D）

一种 2D 世界边界形状，用于物理系统。WorldBoundaryShape2D 像一条无限直线，强制所有物理体保持在它上方。该直线的法线决定哪个方向被视为"上方"，在编辑器中，其上方的较短线段表示此方向。例如，可用于无限平坦的地板。

**属性（Props）：**
- distance: float = 0.0 —— 距离
- normal: Vector2 = Vector2(0, -1) —— 法线
