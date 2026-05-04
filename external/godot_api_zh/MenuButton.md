## MenuButton（菜单按钮）<- Button（按钮）

点击时弹出 PopupMenu 的按钮。要在此 PopupMenu 中创建新项，请使用 `get_popup().add_item("My Item Name")`。你也可以直接从 Godot 编辑器的检查器中创建它们。另请参阅 BaseButton，其中包含与此节点关联的通用属性和方法。

**属性（Props）：**
- action_mode: int (BaseButton.ActionMode) = 0 —— 动作模式
- flat: bool = true —— 扁平样式
- focus_mode: int (Control.FocusMode) = 3 —— 焦点模式
- item_count: int = 0 —— 项数
- switch_on_hover: bool = false —— 悬停时切换
- toggle_mode: bool = true —— 切换模式

**方法（Methods）：**
- get_popup() -> PopupMenu —— 获取弹出菜单
- set_disable_shortcuts(disabled: bool) —— 设置禁用快捷键
- show_popup() —— 显示弹出菜单

**信号（Signals）：**
- about_to_popup —— 即将弹出
