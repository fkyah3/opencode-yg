## ButtonGroup（按钮组）<- Resource（资源）

一组 BaseButton 派生按钮。ButtonGroup 中的按钮被视为单选按钮：同一时间只能按下一个按钮。某些类型的按钮（如 CheckBox）在此状态下可能有特殊外观。ButtonGroup 的每个成员都应将 `BaseButton.toggle_mode` 设置为 `true`。

**属性（Props）：**
- allow_unpress: bool = false —— 允许取消按下
- resource_local_to_scene: bool = true —— 资源本地化到场景

**方法（Methods）：**
- get_buttons() -> BaseButton[] —— 获取按钮列表
- get_pressed_button() -> BaseButton —— 获取当前按下的按钮

**信号（Signals）：**
- pressed(button: BaseButton) —— 按钮被按下
