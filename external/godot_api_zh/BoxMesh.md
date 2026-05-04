## BoxMesh（立方体网格） <- PrimitiveMesh（基本网格）

生成一个轴对齐的立方体基本网格。立方体的 UV 布局采用 3×2 排列，允许单独纹理化每个面。要在所有面上应用相同的纹理，请将材质的 UV 属性改为 `Vector3(3, 2, 1)`。这相当于在顶点着色器中添加 `UV *= vec2(3.0, 2.0)`。**注意：** 当使用较大的带纹理 BoxMesh（例如作为地板）时，可能会遇到 UV 抖动问题，具体取决于摄像机角度。要解决此问题，请增大 `subdivide_depth`、`subdivide_height` 和 `subdivide_width`，直到不再注意到 UV 抖动。

**属性（Props）：**
- size: Vector3 = Vector3(1, 1, 1) —— 尺寸
- subdivide_depth: int = 0 —— 深度细分
- subdivide_height: int = 0 —— 高度细分
- subdivide_width: int = 0 —— 宽度细分
