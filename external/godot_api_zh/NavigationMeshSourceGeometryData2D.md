## NavigationMeshSourceGeometryData2D（2D导航网格源几何数据）<- Resource（资源）

用于存储导航网格烘焙中解析的源几何数据的容器。

**方法（Methods）：**
- add_obstruction_outline(shape_outline: PackedVector2Array) —— 添加障碍物轮廓
- add_projected_obstruction(vertices: PackedVector2Array, carve: bool) —— 添加投影障碍物
- add_traversable_outline(shape_outline: PackedVector2Array) —— 添加可通行轮廓
- append_obstruction_outlines(obstruction_outlines: PackedVector2Array[]) —— 追加障碍物轮廓列表
- append_traversable_outlines(traversable_outlines: PackedVector2Array[]) —— 追加可通行轮廓列表
- clear() —— 清除
- clear_projected_obstructions() —— 清除投影障碍物
- get_bounds() -> Rect2 —— 获取边界
- get_obstruction_outlines() -> PackedVector2Array[] —— 获取障碍物轮廓列表
- get_projected_obstructions() -> Array —— 获取投影障碍物
- get_traversable_outlines() -> PackedVector2Array[] —— 获取可通行轮廓列表
- has_data() -> bool —— 是否包含数据
- merge(other_geometry: NavigationMeshSourceGeometryData2D) —— 合并其他几何数据
- set_obstruction_outlines(obstruction_outlines: PackedVector2Array[]) —— 设置障碍物轮廓列表
- set_projected_obstructions(projected_obstructions: Array) —— 设置投影障碍物
- set_traversable_outlines(traversable_outlines: PackedVector2Array[]) —— 设置可通行轮廓列表
