## NavigationPathQueryResult2D（导航路径查询结果2D） <- RefCounted（引用计数）

此类存储来自 NavigationServer2D 的 2D 导航路径查询结果。

**属性（Props）：**
- path: PackedVector2Array = PackedVector2Array() —— 路径
- path_length: float = 0.0 —— 路径长度
- path_owner_ids: PackedInt64Array = PackedInt64Array() —— 路径所有者 ID
- path_rids: RID[] = [] —— 路径 RID
- path_types: PackedInt32Array = PackedInt32Array() —— 路径类型

**方法（Methods）：**
- reset() —— 重置

**枚举（Enums）：**
**PathSegmentType（路径段类型）：** PATH_SEGMENT_TYPE_REGION=0 —— 区域, PATH_SEGMENT_TYPE_LINK=1 —— 链接
