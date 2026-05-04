## VisualInstance3D（3D 可视化实例） <- Node3D（3D 节点）

VisualInstance3D 用于将资源连接到可视化表示。所有 3D 可视化节点都继承自 VisualInstance3D。通常，不应直接访问 VisualInstance3D 的属性，因为它们由继承自 VisualInstance3D 的节点访问和管理。VisualInstance3D 是 RenderingServer 实例的节点表示。

**属性（Props）：**
- layers: int = 1 —— 层级
- sorting_offset: float = 0.0 —— 排序偏移
- sorting_use_aabb_center: bool —— 是否使用 AABB 中心进行排序

**方法（Methods）：**
- get_aabb() -> AABB —— 获取轴对齐包围盒
- get_base() -> RID —— 获取基础 RID
- get_instance() -> RID —— 获取实例 RID
- get_layer_mask_value(layer_number: int) -> bool —— 获取层掩码值
- set_base(base: RID) —— 设置基础 RID
- set_layer_mask_value(layer_number: int, value: bool) —— 设置层掩码值
