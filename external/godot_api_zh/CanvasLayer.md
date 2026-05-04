## CanvasLayer（画布层）<- Node（节点）

派生自 CanvasItem 且直接或间接为 CanvasLayer 子节点的节点将在该层中绘制。层是一个定义绘制顺序的数字索引。默认的 2D 场景使用索引 `0` 渲染，因此索引为 `-1` 的 CanvasLayer 将绘制在下方，索引为 `1` 的 CanvasLayer 将绘制在上方。无论每个层中节点的 `CanvasItem.z_index` 如何，此顺序都将保持。CanvasLayer 可以隐藏，也可以选择跟随视口。这使得它们非常适合用于 HUD，如生命值条覆盖层（在层 `1` 及更高层上）或背景（在层 `-1` 及更低层上）。**注意：** 嵌入窗口放置在层 `1024` 上。层 `1025` 及更高层上的 CanvasItems 显示在嵌入窗口的前面。**注意：** 每个 CanvasLayer 在一个特定的 Viewport 上绘制，不能在不同的 Viewport 之间共享，请参见 `custom_viewport`。当使用多个 Viewport 时，例如在分屏游戏中，你需要为你希望在其上绘制的每个 Viewport 创建一个单独的 CanvasLayer。

**属性（Props）：**
- custom_viewport: Node —— 自定义视口
- follow_viewport_enabled: bool = false —— 启用跟随视口
- follow_viewport_scale: float = 1.0 —— 跟随视口缩放
- layer: int = 1 —— 层索引
- offset: Vector2 = Vector2(0, 0) —— 偏移
- rotation: float = 0.0 —— 旋转
- scale: Vector2 = Vector2(1, 1) —— 缩放
- transform: Transform2D = Transform2D(1, 0, 0, 1, 0, 0) —— 变换
- visible: bool = true —— 可见

**方法（Methods）：**
- get_canvas() -> RID —— 获取画布
- get_final_transform() -> Transform2D —— 获取最终变换
- hide() —— 隐藏
- show() —— 显示

**信号（Signals）：**
- visibility_changed —— 可见性已更改
