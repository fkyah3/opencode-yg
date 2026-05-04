## Parallax2D（2D视差） <- Node2D（2D节点）

Parallax2D 用于创建视差效果。它可以相对于相机移动以不同的速度进行移动，使用 `scroll_scale` 实现。这会在 2D 游戏中产生深度感。如果需要手动滚动，可以通过 `ignore_camera_scroll` 忽略 Camera2D 的位置。**注意：** 如果 `ignore_camera_scroll` 为 `false` 或修改了 `screen_offset`，该节点进入场景树后对其位置的任何更改都将被覆盖。

**属性（Props）：**
- autoscroll: Vector2 = Vector2(0, 0) —— 自动滚动速度
- follow_viewport: bool = true —— 是否跟随视口
- ignore_camera_scroll: bool = false —— 是否忽略相机滚动
- limit_begin: Vector2 = Vector2(-10000000, -10000000) —— 滚动限制起点
- limit_end: Vector2 = Vector2(10000000, 10000000) —— 滚动限制终点
- physics_interpolation_mode: int (Node.PhysicsInterpolationMode) = 2 —— 物理插值模式
- repeat_size: Vector2 = Vector2(0, 0) —— 重复大小
- repeat_times: int = 1 —— 重复次数
- screen_offset: Vector2 = Vector2(0, 0) —— 屏幕偏移
- scroll_offset: Vector2 = Vector2(0, 0) —— 滚动偏移
- scroll_scale: Vector2 = Vector2(1, 1) —— 滚动比例
