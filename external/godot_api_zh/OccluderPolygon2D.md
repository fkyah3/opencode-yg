## OccluderPolygon2D（2D遮挡多边形） <- Resource（资源）

编辑器工具，用于绘制 2D 多边形，作为 LightOccluder2D 的资源使用。

**属性（Props）：**
- closed: bool = true —— 多边形是否闭合
- cull_mode: int (OccluderPolygon2D.CullMode) = 0 —— 剔除模式
- polygon: PackedVector2Array = PackedVector2Array() —— 多边形顶点数组

**枚举（Enums）：**
**CullMode（剔除模式）：** CULL_DISABLED=0 —— 禁用剔除, CULL_CLOCKWISE=1 —— 顺时针剔除, CULL_COUNTER_CLOCKWISE=2 —— 逆时针剔除
