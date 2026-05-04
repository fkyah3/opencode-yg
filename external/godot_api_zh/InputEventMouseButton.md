## InputEventMouseButton（输入事件鼠标按钮）<- InputEventMouse（输入事件鼠标）

存储鼠标点击事件的信息。参见 `Node._input`。**注意：** 在 Wear OS 设备上，旋钮输入映射到 `MOUSE_BUTTON_WHEEL_UP` 和 `MOUSE_BUTTON_WHEEL_DOWN`。可以通过 `ProjectSettings.input_devices/pointing/android/rotary_input_scroll_axis` 设置将其更改为 `MOUSE_BUTTON_WHEEL_LEFT` 和 `MOUSE_BUTTON_WHEEL_RIGHT`。

**属性（Props）：**
- button_index: int (MouseButton) = 0
- canceled: bool = false
- double_click: bool = false
- factor: float = 1.0
- pressed: bool = false
