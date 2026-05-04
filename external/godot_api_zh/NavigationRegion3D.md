## NavigationRegion3D（3D导航区域）<- Node3D（3D节点）

基于 NavigationMesh 的可通行 3D 区域，NavigationAgent3D 可使用该区域进行寻路。两个区域如果共享相似的边则可以相互连接。可以使用 `NavigationServer3D.map_set_edge_connection_margin` 设置连接两条边所需的最小顶点距离。**注意：** 仅重叠两个区域的导航网格不足以连接它们，它们必须共享相似的边。从另一个区域进入此区域的成本可以通过 `enter_cost` 值控制。**注意：** 当起始位置已经在此区域内时，该值不会添加到路径成本中。在该区域内行进距离的成本可以通过 `travel_cost` 乘数控制。**注意：** 此节点会缓存对其属性的更改，因此如果直接对 NavigationServer3D 中的底层区域 RID 进行更改，这些更改不会反映在此节点的属性中。

**属性（Props）：**
- enabled: bool = true —— 是否启用
- enter_cost: float = 0.0 —— 进入成本
- navigation_layers: int = 1 —— 导航层
- navigation_mesh: NavigationMesh —— 导航网格
- travel_cost: float = 1.0 —— 行进成本
- use_edge_connections: bool = true —— 是否使用边连接

**方法（Methods）：**
- bake_navigation_mesh(on_thread: bool = true) —— 烘焙导航网格
- get_bounds() -> AABB —— 获取边界
- get_navigation_layer_value(layer_number: int) -> bool —— 获取导航层值
- get_navigation_map() -> RID —— 获取导航地图
- get_region_rid() -> RID —— 获取区域 RID
- get_rid() -> RID —— 获取 RID
- is_baking() -> bool —— 是否正在烘焙
- set_navigation_layer_value(layer_number: int, value: bool) —— 设置导航层值
- set_navigation_map(navigation_map: RID) —— 设置导航地图

**信号（Signals）：**
- bake_finished —— 烘焙完成时触发
- navigation_mesh_changed —— 导航网格改变时触发
