## CollisionShape3D（碰撞形状3D）<- Node3D（节点3D）

为 CollisionObject3D 父节点提供 Shape3D 并允许其编辑的节点。这可以为 Area3D 提供检测形状，或将 PhysicsBody3D 变成实体对象。**警告：** 非均匀缩放的 CollisionShape3D 可能不会按预期行为运行。请确保在所有轴上保持其缩放一致，并改用其 `shape` 资源进行调整。

**属性（Props）：**
- debug_color: Color = Color(0, 0, 0, 0) —— 调试颜色
- debug_fill: bool = true —— 调试填充
- disabled: bool = false —— 是否禁用
- shape: Shape3D —— 形状

**方法（Methods）：**
- make_convex_from_siblings() —— 从同级节点创建凸碰撞形状
- resource_changed(resource: Resource) —— 资源已更改
