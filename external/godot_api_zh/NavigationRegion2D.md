## NavigationRegion2D（2D导航区域）<- Node2D（2D节点）

基于 NavigationPolygon 的可通行 2D 区域，NavigationAgent2D 可使用该区域进行寻路。两个区域如果共享相似的边则可以相互连接。可以使用 `NavigationServer2D.map_set_edge_connection_margin` 设置连接两条边所需的最小顶点距离。**注意：** 仅重叠两个区域的导航多边形不足以连接它们，它们必须共享相似的边。从另一个区域进入该区域的寻路成本可以通过 `enter_cost` 值控制。**注意：** 当起始位置已经在此区域内时，该值不会添加到路径成本中。在该区域内行进距离的寻路成本可以通过 `travel_cost` 乘数控制。**注意：** 此节点会缓存对其属性的更改，因此如果直接对 NavigationServer2D 中的底层区域 RID 进行更改，这些更改不会反映在此节点的属性中。

**属性（Props）：**
- enabled: bool = true —— 是否启用
- enter_cost: float = 0.0 —— 进入成本
- navigation_layers: int = 1 —— 导航层
- navigation_polygon: NavigationPolygon —— 导航多边形
- travel_cost: float = 1.0 —— 行进成本
- use_edge_connections: bool = true —— 是否使用边连接

**方法（Methods）：**
- bake_navigation_polygon(on_thread: bool = true) —— 烘焙导航多边形
- get_bounds() -> Rect2 —— 获取边界
- get_navigation_layer_value(layer_number: int) -> bool —— 获取导航层值
- get_navigation_map() -> RID —— 获取导航地图
- get_region_rid() -> RID —— 获取区域 RID
- get_rid() -> RID —— 获取 RID
- is_baking() -> bool —— 是否正在烘焙
- set_navigation_layer_value(layer_number: int, value: bool) —— 设置导航层值
- set_navigation_map(navigation_map: RID) —— 设置导航地图

**信号（Signals）：**
- bake_finished —— 烘焙完成时触发
- navigation_polygon_changed —— 导航多边形改变时触发
