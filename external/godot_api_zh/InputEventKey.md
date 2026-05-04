## InputEventKey <- InputEventWithModifiers（带修饰符的输入事件）

键盘按键的输入事件。支持按键按下、按键释放和`echo`（回显）事件。也可以在`Node._unhandled_key_input`中接收。**注意：** 从键盘接收的事件通常所有属性都已设置。事件映射应只设置`keycode`、`physical_keycode`或`unicode`中的一个。当事件进行比较时，属性按以下优先级检查——`keycode`、`physical_keycode`和`unicode`。第一个匹配值的事件将被视为相等。

**属性（Props）：**
- echo: bool = false
- key_label: int (Key) = 0
- keycode: int (Key) = 0
- location: int (KeyLocation) = 0
- physical_keycode: int (Key) = 0
- pressed: bool = false
- unicode: int = 0

**方法（Methods）：**
- as_text_key_label() -> String
- as_text_keycode() -> String
- as_text_location() -> String
- as_text_physical_keycode() -> String
- get_key_label_with_modifiers() -> int
- get_keycode_with_modifiers() -> int
- get_physical_keycode_with_modifiers() -> int
