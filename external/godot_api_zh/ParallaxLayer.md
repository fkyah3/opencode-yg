## ParallaxLayer（视差层）<- Node2D（节点2D）

ParallaxLayer 必须是 ParallaxBackground 节点的子节点。每个 ParallaxLayer 可以设置为相对于摄像机移动或 `ParallaxBackground.scroll_offset` 值以不同速度移动。该节点的子节点将受其滚动偏移的影响。**注意：** 该节点进入场景后对其位置和比例所做的任何更改都将被忽略。

**属性（Props）：**
- motion_mirroring: Vector2 = Vector2(0, 0) —— 运动镜像
- motion_offset: Vector2 = Vector2(0, 0) —— 运动偏移
- motion_scale: Vector2 = Vector2(1, 1) —— 运动比例
- physics_interpolation_mode: int (Node.PhysicsInterpolationMode) = 2 —— 物理插值模式
