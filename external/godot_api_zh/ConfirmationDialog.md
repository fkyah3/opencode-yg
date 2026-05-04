## ConfirmationDialog（确认对话框） <- AcceptDialog（接受对话框）

用于确认操作的对话框。此窗口类似于 AcceptDialog，但其取消按钮与确定按钮可能有不同的结果。两个按钮的顺序取决于宿主操作系统。要获取取消操作，可以使用：**注意：** AcceptDialog 默认不可见。要使其可见，请在节点上调用 Window 的某个 `popup_*` 方法，例如 `Window.popup_centered_clamped`。

**属性（Props）：**
- cancel_button_text: String = "Cancel" —— 取消按钮文字
- min_size: Vector2i = Vector2i(200, 70) —— 最小尺寸
- size: Vector2i = Vector2i(200, 100) —— 尺寸
- title: String = "Please Confirm..." —— 标题

**方法（Methods）：**
- get_cancel_button() -> Button —— 获取取消按钮
