## NativeMenu <- Object（对象）

NativeMenu 处理对操作系统原生全局菜单栏和弹出菜单的低级访问。**注意：** 这是低级 API，建议使用 MenuBar（设置 `MenuBar.prefer_global_menu` 为 `true`）和 PopupMenu（设置 `PopupMenu.prefer_native_menu` 为 `true`）。要创建菜单，使用 `create_menu`，使用 `add_*_item` 方法添加菜单项。要移除菜单，使用 `free_menu`。

**方法（Methods）：**
- add_check_item(rid: RID, label: String, callback: Callable = Callable(), key_callback: Callable = Callable(), tag: Variant = null, accelerator: int = 0, index: int = -1) -> int
- add_icon_check_item(rid: RID, icon: Texture2D, label: String, callback: Callable = Callable(), key_callback: Callable = Callable(), tag: Variant = null, accelerator: int = 0, index: int = -1) -> int
- add_icon_item(rid: RID, icon: Texture2D, label: String, callback: Callable = Callable(), key_callback: Callable = Callable(), tag: Variant = null, accelerator: int = 0, index: int = -1) -> int
- add_icon_radio_check_item(rid: RID, icon: Texture2D, label: String, callback: Callable = Callable(), key_callback: Callable = Callable(), tag: Variant = null, accelerator: int = 0, index: int = -1) -> int
- add_item(rid: RID, label: String, callback: Callable = Callable(), key_callback: Callable = Callable(), tag: Variant = null, accelerator: int = 0, index: int = -1) -> int
- add_multistate_item(rid: RID, label: String, max_states: int, default_state: int, callback: Callable = Callable(), key_callback: Callable = Callable(), tag: Variant = null, accelerator: int = 0, index: int = -1) -> int
- add_radio_check_item(rid: RID, label: String, callback: Callable = Callable(), key_callback: Callable = Callable(), tag: Variant = null, accelerator: int = 0, index: int = -1) -> int
- add_separator(rid: RID, index: int = -1) -> int
- add_submenu_item(rid: RID, label: String, submenu_rid: RID, tag: Variant = null, index: int = -1) -> int
- clear(rid: RID)
- create_menu() -> RID
- find_item_index_with_submenu(rid: RID, submenu_rid: RID) -> int
- find_item_index_with_tag(rid: RID, tag: Variant) -> int
- find_item_index_with_text(rid: RID, text: String) -> int
- free_menu(rid: RID)
- get_item_accelerator(rid: RID, idx: int) -> int
- get_item_callback(rid: RID, idx: int) -> Callable
- get_item_count(rid: RID) -> int
- get_item_icon(rid: RID, idx: int) -> Texture2D
- get_item_indentation_level(rid: RID, idx: int) -> int
- get_item_key_callback(rid: RID, idx: int) -> Callable
- get_item_max_states(rid: RID, idx: int) -> int
- get_item_state(rid: RID, idx: int) -> int
- get_item_submenu(rid: RID, idx: int) -> RID
- get_item_tag(rid: RID, idx: int) -> Variant
- get_item_text(rid: RID, idx: int) -> String
- get_item_tooltip(rid: RID, idx: int) -> String
- get_minimum_width(rid: RID) -> float
- get_popup_close_callback(rid: RID) -> Callable
- get_popup_open_callback(rid: RID) -> Callable
- get_size(rid: RID) -> Vector2
- get_system_menu(menu_id: int) -> RID
- get_system_menu_name(menu_id: int) -> String
- get_system_menu_text(menu_id: int) -> String
- has_feature(feature: int) -> bool
- has_menu(rid: RID) -> bool
- has_system_menu(menu_id: int) -> bool
- is_item_checkable(rid: RID, idx: int) -> bool
- is_item_checked(rid: RID, idx: int) -> bool
- is_item_disabled(rid: RID, idx: int) -> bool
- is_item_hidden(rid: RID, idx: int) -> bool
- is_item_radio_checkable(rid: RID, idx: int) -> bool
- is_opened(rid: RID) -> bool
- is_system_menu(rid: RID) -> bool
- popup(rid: RID, position: Vector2i)
- remove_item(rid: RID, idx: int)
- set_interface_direction(rid: RID, is_rtl: bool)
- set_item_accelerator(rid: RID, idx: int, keycode: int)
- set_item_callback(rid: RID, idx: int, callback: Callable)
- set_item_checkable(rid: RID, idx: int, checkable: bool)
- set_item_checked(rid: RID, idx: int, checked: bool)
- set_item_disabled(rid: RID, idx: int, disabled: bool)
- set_item_hidden(rid: RID, idx: int, hidden: bool)
- set_item_hover_callbacks(rid: RID, idx: int, callback: Callable)
- set_item_icon(rid: RID, idx: int, icon: Texture2D)
- set_item_indentation_level(rid: RID, idx: int, level: int)
- set_item_index(rid: RID, idx: int, target_idx: int) -> int
- set_item_key_callback(rid: RID, idx: int, key_callback: Callable)
- set_item_max_states(rid: RID, idx: int, max_states: int)
- set_item_radio_checkable(rid: RID, idx: int, checkable: bool)
- set_item_state(rid: RID, idx: int, state: int)
- set_item_submenu(rid: RID, idx: int, submenu_rid: RID)
- set_item_tag(rid: RID, idx: int, tag: Variant)
- set_item_text(rid: RID, idx: int, text: String)
- set_item_tooltip(rid: RID, idx: int, tooltip: String)
- set_minimum_width(rid: RID, width: float)
- set_popup_close_callback(rid: RID, callback: Callable)
- set_popup_open_callback(rid: RID, callback: Callable)
- set_system_menu_text(menu_id: int, name: String)

**枚举（Enums）：**
**Feature：** FEATURE_GLOBAL_MENU=0, FEATURE_POPUP_MENU=1, FEATURE_OPEN_CLOSE_CALLBACK=2, FEATURE_HOVER_CALLBACK=3, FEATURE_KEY_CALLBACK=4
**SystemMenus：** INVALID_MENU_ID=0, MAIN_MENU_ID=1, APPLICATION_MENU_ID=2, WINDOW_MENU_ID=3, HELP_MENU_ID=4, DOCK_MENU_ID=5
