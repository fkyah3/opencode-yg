## InputEventMouseMotion <- InputEventMouse（鼠标输入事件）

存储鼠标或触控笔运动的信息。包括相对位置、绝对位置和速度。参见 `Node._input`。**注意：** 默认情况下，此事件每帧最多只发射一次。如果您需要更精确的输入报告，将 `Input.use_accumulated_input` 设置为 `false` 可以使事件尽可能频繁地发射。如果您使用 InputEventMouseMotion 绘制线条，考虑同时使用 `Geometry2D.bresenham_line`，以避免用户在快速移动鼠标时线条出现可见间隙。**注意：** 即使鼠标没有移动，此事件也可能由操作系统或 Godot 自身发射。如果您确实需要知道鼠标是否移动过（例如，为了抑制显示工具提示），应检查 `relative.is_zero_approx()` 是否为 `false`。

**属性（Props）：**
- pen_inverted: bool = false
- pressure: float = 0.0
- relative: Vector2 = Vector2(0, 0)
- screen_relative: Vector2 = Vector2(0, 0)
- screen_velocity: Vector2 = Vector2(0, 0)
- tilt: Vector2 = Vector2(0, 0)
- velocity: Vector2 = Vector2(0, 0)
