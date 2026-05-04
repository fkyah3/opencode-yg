## PolygonOccluder3D（多边形 3D 遮光器） <- Occluder3D（3D 遮光器）

PolygonOccluder3D 存储一个多边形形状，可供引擎的遮挡剔除系统使用。当在编辑器中选中带有 PolygonOccluder3D 的 OccluderInstance3D 时，3D 视口顶部会出现一个编辑器，用于添加/移除点。所有点必须位于同一 2D 平面上，这意味着无法使用单个 PolygonOccluder3D 创建任意 3D 形状。要将任意 3D 形状用作遮光器，请改用 ArrayOccluder3D 或 OccluderInstance3D 的烘焙功能。设置遮挡剔除的说明请参见 OccluderInstance3D 的文档。

**属性（Props）：**
- polygon: PackedVector2Array = PackedVector2Array() —— 多边形顶点
