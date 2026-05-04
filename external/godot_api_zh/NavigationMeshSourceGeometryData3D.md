## NavigationMeshSourceGeometryData3D（3D导航网格源几何数据）<- Resource（资源）

用于存储导航网格烘焙中解析的源几何数据的容器。

**方法（Methods）：**
- add_faces(faces: PackedVector3Array, xform: Transform3D) —— 添加面
- add_mesh(mesh: Mesh, xform: Transform3D) —— 添加网格
- add_mesh_array(mesh_array: Array, xform: Transform3D) —— 添加网格数组
- add_projected_obstruction(vertices: PackedVector3Array, elevation: float, height: float, carve: bool) —— 添加投影障碍物
- append_arrays(vertices: PackedFloat32Array, indices: PackedInt32Array) —— 追加数组
- clear() —— 清除
- clear_projected_obstructions() —— 清除投影障碍物
- get_bounds() -> AABB —— 获取边界
- get_indices() -> PackedInt32Array —— 获取索引
- get_projected_obstructions() -> Array —— 获取投影障碍物
- get_vertices() -> PackedFloat32Array —— 获取顶点
- has_data() -> bool —— 是否包含数据
- merge(other_geometry: NavigationMeshSourceGeometryData3D) —— 合并其他几何数据
- set_indices(indices: PackedInt32Array) —— 设置索引
- set_projected_obstructions(projected_obstructions: Array) —— 设置投影障碍物
- set_vertices(vertices: PackedFloat32Array) —— 设置顶点
