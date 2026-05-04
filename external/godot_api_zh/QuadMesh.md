## QuadMesh（四边形网格） <- PlaneMesh（平面网格）

表示正方形 PrimitiveMesh 的类。该平面网格没有厚度。默认情况下，此网格在 X 和 Y 轴上对齐；这种旋转更适合与广告牌材质一起使用。QuadMesh 相当于 PlaneMesh，只是其默认的 `PlaneMesh.orientation` 为 `PlaneMesh.FACE_Z`。

**属性（Props）：**
- orientation: int (PlaneMesh.Orientation) = 2 —— 朝向
- size: Vector2 = Vector2(1, 1) —— 尺寸
