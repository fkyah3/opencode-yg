## VirtualJoystick <- Control（控件）

一个可自定义的屏幕虚拟摇杆控件，专为触屏设备设计。它允许用户通过在定义的圆形区域内拖动虚拟摇杆头来提供方向输入。该控件可以模拟方向操作（参见 `action_up`、`action_down`、`action_left` 和 `action_right`），当摇杆向相应方向移动时触发。

**属性（Props）：**
- action_down: StringName = &"ui_down" —— 向下操作
- action_left: StringName = &"ui_left" —— 向左操作
- action_right: StringName = &"ui_right" —— 向右操作
- action_up: StringName = &"ui_up" —— 向上操作
- clampzone_ratio: float = 1.0 —— 限制区比例
- deadzone_ratio: float = 0.0 —— 死区比例
- initial_offset_ratio: Vector2 = Vector2(0.5, 0.5) —— 初始偏移比例
- joystick_mode: int (VirtualJoystick.JoystickMode) = 0 —— 摇杆模式
- joystick_size: float = 100.0 —— 摇杆大小
- joystick_texture: Texture2D —— 摇杆纹理
- tip_size: float = 50.0 —— 摇杆头大小
- tip_texture: Texture2D —— 摇杆头纹理
- visibility_mode: int (VirtualJoystick.VisibilityMode) = 0 —— 可见性模式

**信号（Signals）：**
- flick_canceled —— 轻弹取消
- flicked(input_vector: Vector2) —— 轻弹
- pressed —— 按下
- released(input_vector: Vector2) —— 释放
- tapped —— 点击

**枚举（Enums）：**
**JoystickMode（摇杆模式）：** JOYSTICK_FIXED=0（固定）, JOYSTICK_DYNAMIC=1（动态）, JOYSTICK_FOLLOWING=2（跟随）
**VisibilityMode（可见性模式）：** VISIBILITY_ALWAYS=0（始终可见）, VISIBILITY_WHEN_TOUCHED=1（触摸时可见）
