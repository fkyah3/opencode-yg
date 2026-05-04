## CollisionPolygon3D（碰撞多边形3D）<- Node3D（节点3D）

为 CollisionObject3D 父节点提供加厚多边形形状（棱柱）并允许编辑的节点。多边形可以是凹面或凸面。这可以为 Area3D 提供检测形状，或将 PhysicsBody3D 变为实体对象。**警告：** 非均匀缩放的 CollisionShape3D 可能无法按预期工作。请确保在所有轴上保持其比例一致，而是调整其形状资源。

**属性（Props）：**
- debug_color: Color = Color(0, 0, 0, 0) —— 调试颜色
- debug_fill: bool = true —— 调试填充
- depth: float = 1.0 —— 深度
- disabled: bool = false —— 禁用
- margin: float = 0.04 —— 边距
- polygon: PackedVector2Array = PackedVector2Array() —— 多边形
