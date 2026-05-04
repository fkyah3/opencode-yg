## AnimationNodeBlendSpace1D（动画节点混合空间1D）<- AnimationRootNode

由 AnimationNodeBlendTree 使用的资源。AnimationNodeBlendSpace1D 表示一个虚拟轴，可以使用 `add_blend_point` 在其上添加任何类型的 AnimationRootNode。输出当前值相邻的两个 AnimationRootNode 的线性混合。可以使用 `min_space` 和 `max_space` 设置轴的边界。

**属性（Props）：**
- blend_mode: int (AnimationNodeBlendSpace1D.BlendMode) = 0
- max_space: float = 1.0
- min_space: float = -1.0
- snap: float = 0.1
- sync: bool = false
- value_label: String = "value"

**方法（Methods）：**
- add_blend_point(node: AnimationRootNode, pos: float, at_index: int = -1)
- get_blend_point_count() -> int
- get_blend_point_node(point: int) -> AnimationRootNode
- get_blend_point_position(point: int) -> float
- remove_blend_point(point: int)
- set_blend_point_node(point: int, node: AnimationRootNode)
- set_blend_point_position(point: int, pos: float)

**枚举（Enums）：**
**BlendMode（混合模式）：** BLEND_MODE_INTERPOLATED=0, BLEND_MODE_DISCRETE=1, BLEND_MODE_DISCRETE_CARRY=2
