## SkeletonModification2D（2D 骨骼修改器） <- Resource（资源）

此资源提供了一个可扩展的接口，使得对 Skeleton2D 中 Bone2D 节点进行操作的代码可以混合搭配，以创建复杂的交互效果。用于为 Godot 提供灵活而强大的反向动力学（IK）解决方案，可适应多种不同用途。

**属性（Props）：**
- enabled: bool = true —— 是否启用
- execution_mode: int = 0 —— 执行模式

**方法（Methods）：**
- clamp_angle(angle: float, min: float, max: float, invert: bool) -> float —— 限制角度范围
- get_editor_draw_gizmo() -> bool —— 是否在编辑器中绘制辅助线
- get_is_setup() -> bool —— 是否已完成设置
- get_modification_stack() -> SkeletonModificationStack2D —— 获取修改栈
- set_editor_draw_gizmo(draw_gizmo: bool) —— 设置是否在编辑器中绘制辅助线
- set_is_setup(is_setup: bool) —— 设置是否完成设置
