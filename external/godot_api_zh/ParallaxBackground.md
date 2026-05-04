## ParallaxBackground（视差背景） <- CanvasLayer（画布层）

ParallaxBackground 使用一个或多个 ParallaxLayer 子节点来创建视差效果。每个 ParallaxLayer 可以使用 `ParallaxLayer.motion_offset` 以不同速度移动。这会在 2D 游戏中产生深度感。如果不与 Camera2D 一起使用，您必须手动计算 `scroll_offset`。**注意：** 每个 ParallaxBackground 绘制在特定的 Viewport 上，不能在多个 Viewport 之间共享，请参见 `CanvasLayer.custom_viewport`。当使用多个 Viewport 时（例如在分屏游戏中），您需要为每个希望绘制 ParallaxBackground 的 Viewport 创建一个独立的实例。

**属性（Props）：**
- layer: int = -100 —— 层
- scroll_base_offset: Vector2 = Vector2(0, 0) —— 滚动基础偏移
- scroll_base_scale: Vector2 = Vector2(1, 1) —— 滚动基础比例
- scroll_ignore_camera_zoom: bool = false —— 是否忽略相机缩放
- scroll_limit_begin: Vector2 = Vector2(0, 0) —— 滚动限制起点
- scroll_limit_end: Vector2 = Vector2(0, 0) —— 滚动限制终点
- scroll_offset: Vector2 = Vector2(0, 0) —— 滚动偏移
