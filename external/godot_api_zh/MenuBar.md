## MenuBar <- Control（控件）

一个水平菜单栏，为每个 PopupMenu 子节点创建一个菜单。通过向此节点添加 PopupMenu 来创建新项目。项目标题由 `Window.title` 决定，如果 `Window.title` 为空则使用节点名称。可以使用 `set_menu_title` 覆盖项目标题。

**属性（Props）：**
- flat: bool = false
- focus_mode: int (Control.FocusMode) = 3
- language: String = ""
- prefer_global_menu: bool = true
- start_index: int = -1
- switch_on_hover: bool = true
- text_direction: int (Control.TextDirection) = 0

**方法（Methods）：**
- get_menu_count() -> int
- get_menu_popup(menu: int) -> PopupMenu
- get_menu_title(menu: int) -> String
- get_menu_tooltip(menu: int) -> String
- is_menu_disabled(menu: int) -> bool
- is_menu_hidden(menu: int) -> bool
- is_native_menu() -> bool
- set_disable_shortcuts(disabled: bool)
- set_menu_disabled(menu: int, disabled: bool)
- set_menu_hidden(menu: int, hidden: bool)
- set_menu_title(menu: int, title: String)
- set_menu_tooltip(menu: int, tooltip: String)
