## Path2D（2D路径） <- Node2D（2D节点）

可以拥有沿 Curve2D 移动的 PathFollow2D 子节点。更多使用信息，请参见 PathFollow2D。**注意：** 路径被视为相对于被移动节点（PathFollow2D 的子节点）。因此，曲线通常应以零向量（`(0, 0)`）开始。

**属性（Props）：**
- curve: Curve2D —— 曲线
