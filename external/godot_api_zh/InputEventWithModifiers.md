## InputEventWithModifiers（含修饰键的输入事件） <- InputEventFromWindow（来自窗口的输入事件）

存储关于鼠标、键盘和触摸手势输入事件的信息。包括哪些修饰键被按下，例如 [kbd]Shift[/kbd] 或 [kbd]Alt[/kbd]。请参见 `Node._input`。**注意：** 修饰键仅在与另一个键组合使用时才被视为修饰键。因此，其对应的成员变量（如 `ctrl_pressed`）在按键单独按下时会返回 `false`。

**属性（Props）：**
- alt_pressed: bool = false —— Alt 键是否按下
- command_or_control_autoremap: bool = false —— Command/Ctrl 自动映射
- ctrl_pressed: bool = false —— Ctrl 键是否按下
- meta_pressed: bool = false —— Meta 键是否按下
- shift_pressed: bool = false —— Shift 键是否按下

**方法（Methods）：**
- get_modifiers_mask() -> int —— 获取修饰键掩码
- is_command_or_control_pressed() -> bool —— Command 或 Control 是否按下
