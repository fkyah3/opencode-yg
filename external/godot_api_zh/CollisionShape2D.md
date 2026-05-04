## CollisionShape2D（碰撞形状2D） <- Node2D（节点2D）

为 CollisionObject2D 父节点提供 Shape2D 并允许其进行编辑的节点。这可以为 Area2D 提供检测形状，或将 PhysicsBody2D 转变为实体对象。

**属性（Props）：**
- debug_color: Color = Color(0, 0, 0, 0) —— 调试颜色
- disabled: bool = false —— 是否禁用
- one_way_collision: bool = false —— 单向碰撞
- one_way_collision_direction: Vector2 = Vector2(0, 1) —— 单向碰撞方向
- one_way_collision_margin: float = 1.0 —— 单向碰撞边距
- shape: Shape2D —— 形状
