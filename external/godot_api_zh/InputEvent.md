## InputEvent（输入事件） <- Resource（资源）

所有类型输入事件的抽象基类。参见 `Node._input`。

**属性（Props）：**
- device: int = 0 —— 设备

**方法（Methods）：**
- accumulate(with_event: InputEvent) -> bool —— 累积
- as_text() -> String —— 转为文本
- get_action_strength(action: StringName, exact_match: bool = false) -> float —— 获取动作强度
- is_action(action: StringName, exact_match: bool = false) -> bool —— 是否为动作
- is_action_pressed(action: StringName, allow_echo: bool = false, exact_match: bool = false) -> bool —— 动作是否按下
- is_action_released(action: StringName, exact_match: bool = false) -> bool —— 动作是否释放
- is_action_type() -> bool —— 是否为动作类型
- is_canceled() -> bool —— 是否取消
- is_echo() -> bool —— 是否为回显
- is_match(event: InputEvent, exact_match: bool = true) -> bool —— 是否匹配
- is_pressed() -> bool —— 是否按下
- is_released() -> bool —— 是否释放
- xformed_by(xform: Transform2D, local_ofs: Vector2 = Vector2(0, 0)) -> InputEvent —— 变换

**枚举（Enums）：**
**常量（Constants）：** DEVICE_ID_EMULATION=-1
