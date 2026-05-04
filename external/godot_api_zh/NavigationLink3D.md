## NavigationLink3D（3D导航链接）<- Node3D（3D节点）

NavigationRegion3D 上两个位置之间的链接，代理可以路由通过该链接。这两个位置可以在同一个 NavigationRegion3D 上，也可以在不同的 NavigationRegion3D 上。链接对于表达除沿导航网格表面行进之外的其他导航方式非常有用，例如滑索、传送器或可以跳过的间隙。

**属性（Props）：**
- bidirectional: bool = true —— 是否双向
- enabled: bool = true —— 是否启用
- end_position: Vector3 = Vector3(0, 0, 0) —— 终点位置
- enter_cost: float = 0.0 —— 进入成本
- navigation_layers: int = 1 —— 导航层
- start_position: Vector3 = Vector3(0, 0, 0) —— 起点位置
- travel_cost: float = 1.0 —— 行进成本

**方法（Methods）：**
- get_global_end_position() -> Vector3 —— 获取全局终点位置
- get_global_start_position() -> Vector3 —— 获取全局起点位置
- get_navigation_layer_value(layer_number: int) -> bool —— 获取导航层值
- get_navigation_map() -> RID —— 获取导航地图
- get_rid() -> RID —— 获取 RID
- set_global_end_position(position: Vector3) —— 设置全局终点位置
- set_global_start_position(position: Vector3) —— 设置全局起点位置
- set_navigation_layer_value(layer_number: int, value: bool) —— 设置导航层值
- set_navigation_map(navigation_map: RID) —— 设置导航地图
