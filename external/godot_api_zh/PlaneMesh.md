## PlaneMesh（平面网格） <- PrimitiveMesh（基本网格）

表示平面 PrimitiveMesh 的类。此平面网格没有厚度。默认情况下，此网格在 X 和 Z 轴上对齐；此默认旋转不适用于公告板材质。对于公告板材质，请将 `orientation` 更改为 `FACE_Z`。**注意：** 当使用大型带纹理的 PlaneMesh（例如作为地板）时，可能会根据相机角度遇到 UV 抖动问题。要解决此问题，请增加 `subdivide_depth` 和 `subdivide_width`，直到不再注意到 UV 抖动。

**属性（Props）：**
- center_offset: Vector3 = Vector3(0, 0, 0) —— 中心偏移
- orientation: int (PlaneMesh.Orientation) = 1 —— 朝向
- size: Vector2 = Vector2(2, 2) —— 大小
- subdivide_depth: int = 0 —— 深度细分
- subdivide_width: int = 0 —— 宽度细分

**枚举（Enums）：**
**Orientation（朝向）：** FACE_X=0, FACE_Y=1, FACE_Z=2
