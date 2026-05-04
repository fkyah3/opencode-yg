## Bone2D（骨骼2D）<- Node2D

Bone2D 的层级结构可以绑定到 Skeleton2D，以控制和动画化其他 Node2D 节点。可以使用 Bone2D 和 Skeleton2D 节点来动画化使用 Polygon2D UV 编辑器创建的 2D 网格。每根骨骼都有一个 `rest`（静止）变换，可以通过 `apply_rest` 重置。这些静止姿势是相对于骨骼父节点的。如果在编辑器中，可以通过菜单选项设置整个骨架的静止姿势；通过代码，需要遍历骨骼以设置各自的静止姿势。

**属性（Props）：**
- rest: Transform2D = Transform2D(0, 0, 0, 0, 0, 0)

**方法（Methods）：**
- apply_rest()
- get_autocalculate_length_and_angle() -> bool
- get_bone_angle() -> float
- get_index_in_skeleton() -> int
- get_length() -> float
- get_skeleton_rest() -> Transform2D
- set_autocalculate_length_and_angle(auto_calculate: bool)
- set_bone_angle(angle: float)
- set_length(length: float)
