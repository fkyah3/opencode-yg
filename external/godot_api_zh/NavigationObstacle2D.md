## NavigationObstacle2D（2D导航障碍物）<- Node2D（2D节点）

障碍物需要定义导航地图和轮廓 `vertices` 才能正常工作。轮廓不能交叉或重叠。启用 `affect_navigation_mesh` 后，障碍物可以包含在导航网格烘焙过程中。它们不会添加可通行几何体，而是丢弃形状内的其他源几何体。这可用于防止导航网格出现在不需要的位置。如果启用了 `carve_navigation_mesh`，烘焙形状将不受导航网格烘焙偏移（如代理半径）的影响。启用 `avoidance_enabled` 后，障碍物可以约束使用避障的代理的避障速度。如果障碍物的顶点按顺时针顺序排列，避障代理将被推向障碍物内部；否则避障代理将被推出。使用顶点和避障功能的障碍物可以跳转到新位置，但不应每帧都移动，因为每次更改都需要重建避障地图。

**属性（Props）：**
- affect_navigation_mesh: bool = false —— 是否影响导航网格
- avoidance_enabled: bool = true —— 是否启用避障
- avoidance_layers: int = 1 —— 避障层
- carve_navigation_mesh: bool = false —— 是否雕刻导航网格
- radius: float = 0.0 —— 半径
- velocity: Vector2 = Vector2(0, 0) —— 速度
- vertices: PackedVector2Array = PackedVector2Array() —— 顶点数组

**方法（Methods）：**
- get_avoidance_layer_value(layer_number: int) -> bool —— 获取避障层值
- get_navigation_map() -> RID —— 获取导航地图
- get_rid() -> RID —— 获取 RID
- set_avoidance_layer_value(layer_number: int, value: bool) —— 设置避障层值
- set_navigation_map(navigation_map: RID) —— 设置导航地图
