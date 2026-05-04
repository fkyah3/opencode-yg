## Shape2D（形状2D）<- Resource（资源）

所有 2D 形状的抽象基类，用于物理系统。**性能：** 基本形状，尤其是 CircleShape2D，碰撞检测速度最快。ConvexPolygonShape2D 较慢，ConcavePolygonShape2D 最慢。

**属性（Props）：**
- custom_solver_bias: float = 0.0 —— 自定义求解器偏差

**方法（Methods）：**
- collide(local_xform: Transform2D, with_shape: Shape2D, shape_xform: Transform2D) -> bool —— 碰撞检测
- collide_and_get_contacts(local_xform: Transform2D, with_shape: Shape2D, shape_xform: Transform2D) -> PackedVector2Array —— 碰撞检测并获取接触点
- collide_with_motion(local_xform: Transform2D, local_motion: Vector2, with_shape: Shape2D, shape_xform: Transform2D, shape_motion: Vector2) -> bool —— 带运动的碰撞检测
- collide_with_motion_and_get_contacts(local_xform: Transform2D, local_motion: Vector2, with_shape: Shape2D, shape_xform: Transform2D, shape_motion: Vector2) -> PackedVector2Array —— 带运动的碰撞检测并获取接触点
- draw(canvas_item: RID, color: Color) —— 绘制形状
- get_rect() -> Rect2 —— 获取矩形包围盒
