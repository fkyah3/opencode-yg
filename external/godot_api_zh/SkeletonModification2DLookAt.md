## SkeletonModification2DLookAt（骨架修改2D注视）<- SkeletonModification2D（骨架修改2D）

此 SkeletonModification2D 旋转骨骼以注视目标。这对于移动角色头部注视玩家、旋转炮塔瞄准目标或任何其他希望快速轻松地使骨骼朝某物旋转的情况非常有用。

**属性（Props）：**
- bone2d_node: NodePath = NodePath("") —— Bone2D 节点
- bone_index: int = -1 —— 骨骼索引
- target_nodepath: NodePath = NodePath("") —— 目标节点路径

**方法（Methods）：**
- get_additional_rotation() -> float —— 获取附加旋转
- get_constraint_angle_invert() -> bool —— 获取约束角度是否反转
- get_constraint_angle_max() -> float —— 获取约束最大角度
- get_constraint_angle_min() -> float —— 获取约束最小角度
- get_enable_constraint() -> bool —— 是否启用约束
- set_additional_rotation(rotation: float) —— 设置附加旋转
- set_constraint_angle_invert(invert: bool) —— 设置约束角度反转
- set_constraint_angle_max(angle_max: float) —— 设置约束最大角度
- set_constraint_angle_min(angle_min: float) —— 设置约束最小角度
- set_enable_constraint(enable_constraint: bool) —— 设置启用约束
