## Camera2D（2D摄像机）<- Node2D

用于 2D 场景的摄像机节点。它强制屏幕（当前层）跟随此节点滚动。这比手动更改基于 CanvasItem 的节点位置更容易（且更快）地编程实现可滚动的场景。摄像机在最近的 Viewport 节点中注册（当向上遍历场景树时）。每个视口只能有一个活动摄像机。如果在向上遍历场景树时没有可用的视口，摄像机将在全局视口中注册。此节点旨在作为一个简单的助手来快速启动，但可能需要更多功能来改变摄像机的工作方式。要制作自己的自定义摄像机节点，请从 Node2D 继承它并通过设置 Viewport 中的 `Viewport.canvas_transform` 来更改画布的变换（你可以使用 `Node.get_viewport` 获取当前 Viewport）。注意，Camera2D 节点的 `Node2D.global_position` 并不代表屏幕的实际位置，由于应用的平滑或限制，实际位置可能不同。你可以使用 `get_screen_center_position` 获取真实位置。节点的 `Node2D.global_rotation` 同理，可能由于应用的旋转平滑而不同。你可以使用 `get_screen_rotation` 获取屏幕的当前旋转。

**属性（Props）：**
- anchor_mode: int (Camera2D.AnchorMode) = 1 —— 锚点模式
- custom_viewport: Node —— 自定义视口
- drag_bottom_margin: float = 0.2 —— 拖动底部边距
- drag_horizontal_enabled: bool = false —— 启用水平拖动
- drag_horizontal_offset: float = 0.0 —— 水平拖动偏移
- drag_left_margin: float = 0.2 —— 拖动左边距
- drag_right_margin: float = 0.2 —— 拖动右边距
- drag_top_margin: float = 0.2 —— 拖动上边距
- drag_vertical_enabled: bool = false —— 启用垂直拖动
- drag_vertical_offset: float = 0.0 —— 垂直拖动偏移
- editor_draw_drag_margin: bool = false —— 编辑器绘制拖动边距
- editor_draw_limits: bool = false —— 编辑器绘制限制
- editor_draw_screen: bool = true —— 编辑器绘制屏幕
- enabled: bool = true —— 启用
- ignore_rotation: bool = true —— 忽略旋转
- limit_bottom: int = 10000000 —— 底部限制
- limit_enabled: bool = true —— 启用限制
- limit_left: int = -10000000 —— 左侧限制
- limit_right: int = 10000000 —— 右侧限制
- limit_smoothed: bool = false —— 限制平滑
- limit_top: int = -10000000 —— 顶部限制
- offset: Vector2 = Vector2(0, 0) —— 偏移
- position_smoothing_enabled: bool = false —— 启用位置平滑
- position_smoothing_speed: float = 5.0 —— 位置平滑速度
- process_callback: int (Camera2D.Camera2DProcessCallback) = 1 —— 处理回调
- rotation_smoothing_enabled: bool = false —— 启用旋转平滑
- rotation_smoothing_speed: float = 5.0 —— 旋转平滑速度
- zoom: Vector2 = Vector2(1, 1) —— 缩放

**方法（Methods）：**
- align() —— 对齐
- force_update_scroll() —— 强制更新滚动
- get_drag_margin(margin: int) -> float —— 获取拖动边距
- get_limit(margin: int) -> int —— 获取限制
- get_screen_center_position() -> Vector2 —— 获取屏幕中心位置
- get_screen_rotation() -> float —— 获取屏幕旋转
- get_target_position() -> Vector2 —— 获取目标位置
- is_current() -> bool —— 是否为当前摄像机
- make_current() —— 设为当前
- reset_smoothing() —— 重置平滑
- set_drag_margin(margin: int, drag_margin: float) —— 设置拖动边距
- set_limit(margin: int, limit: int) —— 设置限制

**枚举（Enums）：**
**AnchorMode（锚点模式）：** ANCHOR_MODE_FIXED_TOP_LEFT=0 —— 固定左上角，ANCHOR_MODE_DRAG_CENTER=1 —— 拖动居中
**Camera2DProcessCallback（处理回调）：** CAMERA2D_PROCESS_PHYSICS=0 —— 物理帧处理，CAMERA2D_PROCESS_IDLE=1 —— 空闲帧处理
