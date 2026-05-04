## InputEventScreenDrag（屏幕拖拽输入事件） <- InputEventFromWindow（窗口输入事件）

存储关于屏幕拖拽事件的信息。参见 `Node._input`。

**属性（Props）：**
- index: int = 0 —— 触摸索引
- pen_inverted: bool = false —— 触控笔是否反转
- position: Vector2 = Vector2(0, 0) —— 位置
- pressure: float = 0.0 —— 压力
- relative: Vector2 = Vector2(0, 0) —— 相对移动
- screen_relative: Vector2 = Vector2(0, 0) —— 屏幕相对移动
- screen_velocity: Vector2 = Vector2(0, 0) —— 屏幕速度
- tilt: Vector2 = Vector2(0, 0) —— 倾斜
- velocity: Vector2 = Vector2(0, 0) —— 速度
