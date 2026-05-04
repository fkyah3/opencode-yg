## AcceptDialog（接受对话框）<- Window

AcceptDialog 的默认用途是仅允许接受或关闭，两者结果相同。但 `confirmed`（已确认）和 `canceled`（已取消）信号可让两个操作产生不同效果，`add_button` 方法可以添加自定义按钮和操作。**注意：** AcceptDialog 默认不可见。要使其可见，调用该节点上 Window 的 `popup_*` 方法之一，例如 `Window.popup_centered_clamped`。

**属性（Props）：**
- dialog_autowrap: bool = false
- dialog_close_on_escape: bool = true
- dialog_hide_on_ok: bool = true
- dialog_text: String = ""
- exclusive: bool = true
- keep_title_visible: bool = true
- maximize_disabled: bool = true
- minimize_disabled: bool = true
- ok_button_text: String = ""
- title: String = "Alert!"
- transient: bool = true
- visible: bool = false
- wrap_controls: bool = true

**方法（Methods）：**
- add_button(text: String, right: bool = false, action: String = "") -> Button
- add_cancel_button(name: String) -> Button
- get_label() -> Label
- get_ok_button() -> Button
- register_text_enter(line_edit: LineEdit)
- remove_button(button: Button)

**信号（Signals）：**
- canceled
- confirmed
- custom_action(action: StringName)
