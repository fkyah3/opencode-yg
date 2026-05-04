## CollisionPolygon2D（碰撞多边形2D） <- Node2D（节点2D）

一个为 CollisionObject2D 父节点提供多边形形状并允许编辑的节点。多边形可以是凹的或凸的。这可以为 Area2D 提供检测形状，将 PhysicsBody2D 转变为实心对象，或为 StaticBody2D 提供空心形状。**警告：** 非均匀缩放的 CollisionPolygon2D 可能不会按预期工作。请确保在所有轴上保持其缩放一致，而是调整其多边形。

**属性（Props）：**
- build_mode: int (CollisionPolygon2D.BuildMode) = 0 —— 构建模式
- disabled: bool = false —— 禁用
- one_way_collision: bool = false —— 单向碰撞
- one_way_collision_direction: Vector2 = Vector2(0, 1) —— 单向碰撞方向
- one_way_collision_margin: float = 1.0 —— 单向碰撞边距
- polygon: PackedVector2Array = PackedVector2Array() —— 多边形

**枚举（Enums）：**
**BuildMode（构建模式）：** BUILD_SOLIDS=0, BUILD_SEGMENTS=1
