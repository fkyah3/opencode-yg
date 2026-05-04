## AnimationNodeBlendSpace2D（动画节点混合空间2D）<- AnimationRootNode

由 AnimationNodeBlendTree 使用的资源。AnimationNodeBlendSpace2D 表示一个虚拟 2D 空间，在其中放置 AnimationRootNode。使用 Vector2 权重输出三个相邻动画的线性混合。此处的"相邻"指构成包含当前值的三角形的三个 AnimationRootNode。可以使用 `add_blend_point` 向混合空间添加顶点，并通过将 `auto_triangles` 设置为 `true` 来自动三角化。否则，使用 `add_triangle` 和 `remove_triangle` 手动三角化混合空间。

**属性（Props）：**
- auto_triangles: bool = true
- blend_mode: int (AnimationNodeBlendSpace2D.BlendMode) = 0
- max_space: Vector2 = Vector2(1, 1)
- min_space: Vector2 = Vector2(-1, -1)
- snap: Vector2 = Vector2(0.1, 0.1)
- sync: bool = false
- x_label: String = "x"
- y_label: String = "y"

**方法（Methods）：**
- add_blend_point(node: AnimationRootNode, pos: Vector2, at_index: int = -1)
- add_triangle(x: int, y: int, z: int, at_index: int = -1)
- get_blend_point_count() -> int
- get_blend_point_node(point: int) -> AnimationRootNode
- get_blend_point_position(point: int) -> Vector2
- get_triangle_count() -> int
- get_triangle_point(triangle: int, point: int) -> int
- remove_blend_point(point: int)
- remove_triangle(triangle: int)
- set_blend_point_node(point: int, node: AnimationRootNode)
- set_blend_point_position(point: int, pos: Vector2)

**信号（Signals）：**
- triangles_updated

**枚举（Enums）：**
**BlendMode（混合模式）：** BLEND_MODE_INTERPOLATED=0, BLEND_MODE_DISCRETE=1, BLEND_MODE_DISCRETE_CARRY=2
