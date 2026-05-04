## Node2D（2D节点）<- CanvasItem（画布项）

一个 2D 游戏对象，具有变换（位置、旋转和缩放）。所有 2D 节点，包括物理对象和精灵，都继承自 Node2D。使用 Node2D 作为父节点，可以在 2D 项目中移动、缩放和旋转子节点。还可以控制节点的渲染顺序。**注意：** 由于 Node2D 和 Control 都继承自 CanvasItem，它们共享该类的一些概念，例如 `CanvasItem.z_index` 和 `CanvasItem.visible` 属性。

**属性（Props）：**
- global_position: Vector2 —— 全局位置
- global_rotation: float —— 全局旋转（弧度）
- global_rotation_degrees: float —— 全局旋转（角度）
- global_scale: Vector2 —— 全局缩放
- global_skew: float —— 全局倾斜
- global_transform: Transform2D —— 全局变换
- position: Vector2 = Vector2(0, 0) —— 位置
- rotation: float = 0.0 —— 旋转（弧度）
- rotation_degrees: float —— 旋转（角度）
- scale: Vector2 = Vector2(1, 1) —— 缩放
- skew: float = 0.0 —— 倾斜
- transform: Transform2D —— 变换

**方法（Methods）：**
- apply_scale(ratio: Vector2) —— 应用缩放
- get_angle_to(point: Vector2) -> float —— 获取到点的角度
- get_relative_transform_to_parent(parent: Node) -> Transform2D —— 获取相对于父节点的变换
- global_translate(offset: Vector2) —— 全局平移
- look_at(point: Vector2) —— 看向指定点
- move_local_x(delta: float, scaled: bool = false) —— 沿局部 X 轴移动
- move_local_y(delta: float, scaled: bool = false) —— 沿局部 Y 轴移动
- rotate(radians: float) —— 旋转
- to_global(local_point: Vector2) -> Vector2 —— 局部坐标转全局坐标
- to_local(global_point: Vector2) -> Vector2 —— 全局坐标转局部坐标
- translate(offset: Vector2) —— 平移
