## LineEdit <- Control（控件）

LineEdit 提供用于编辑单行文本的输入字段。- 当使用键盘方向键聚焦 LineEdit 控件时，它只会获得焦点而不会进入编辑模式。- 要进入编辑模式，请用鼠标单击控件，另请参见 `keep_editing_on_text_submit`。- 要退出编辑模式，按 `ui_text_submit` 或 `ui_cancel`（默认为 [kbd]Escape[/kbd]）动作。- 查看 `edit`、`unedit`、`is_editing` 和 `editing_toggled` 了解更多信息。输入文本时，可以使用 Unicode、OEM 或 Windows 的 Alt 码插入特殊字符：- 要输入 Unicode 码点，按住 [kbd]Alt[/kbd] 并在数字小键盘上键入码点。例如，要输入字符 `á`（U+00E1），按住 [kbd]Alt[/kbd] 并在数字小键盘上键入 [kbd]+E1[/kbd]（前导零可以省略）。- 要输入 OEM 码点，按住 [kbd]Alt[/kbd] 并在数字小键盘上键入代码。例如，要输入字符 `á`（OEM 160），按住 [kbd]Alt[/kbd] 并在数字小键盘上键入 `160`。- 要输入 Windows 码点，按住 [kbd]Alt[/kbd] 并在数字小键盘上键入代码。例如，要输入字符 `á`（Windows 0225），按住 [kbd]Alt[/kbd] 并在数字小键盘上依次键入 [kbd]0[/kbd]、[kbd]2[/kbd]、[kbd]2[/kbd]、[kbd]5[/kbd]。这里的前导零**不能**省略，因为这是区分 Windows 码点和 OEM 码点的方式。**重要：** - 使用 `ui_focus_next`（默认为 [kbd]Tab[/kbd]）或 `ui_focus_prev`（默认为 [kbd]Shift + Tab[/kbd]）或 `Control.grab_focus` 聚焦 LineEdit 时仍会进入编辑模式（为了兼容性）。LineEdit 具有许多内置快捷键，始终可用（[kbd]Ctrl[/kbd] 在 macOS 上映射为 [kbd]Cmd[/kbd]）：- [kbd]Ctrl + C[/kbd]：复制 - [kbd]Ctrl + X[/kbd]：剪切 - [kbd]Ctrl + V[/kbd] 或 [kbd]Ctrl + Y[/kbd]：粘贴 - [kbd]Ctrl + Z[/kbd]：撤销 - [kbd]Ctrl + ~[/kbd]：交换输入方向。 - [kbd]Ctrl + Shift + Z[/kbd]：重做 - [kbd]Ctrl + U[/kbd]：删除从光标位置到行首的文本 - [kbd]Ctrl + K[/kbd]：删除从光标位置到行尾的文本 - [kbd]Ctrl + A[/kbd]：全选 - [kbd]Ctrl + Backspace[/kbd]：删除前一个完整的单词 - [kbd]Ctrl + Delete[/kbd]：删除后一个完整的单词 - [kbd]Shift + 方向键[/kbd]：通过移动光标进行选择 - [kbd]Ctrl + 方向键[/kbd]：按单词或段落跳跃光标 - [kbd]Home[/kbd]：移动到行首 - [kbd]End[/kbd]：移动到行尾

**属性（Props）：**
- alignment: int (HorizontalAlignment) = 0
- backspace_deletes_composite_character_enabled: bool = false
- caret_blink: bool = false
- caret_blink_interval: float = 0.65
- caret_column: int = 0
- caret_force_displayed: bool = false
- caret_mid_grapheme: bool = false
- clear_button_enabled: bool = false
- context_menu_enabled: bool = true
- deselect_on_focus_loss_enabled: bool = true
- drag_and_drop_selection_enabled: bool = true
- draw_control_chars: bool = false
- editable: bool = true
- emoji_menu_enabled: bool = true
- expand_to_text_length: bool = false
- flat: bool = false
- focus_mode: int (Control.FocusMode) = 2
- icon_expand_mode: int (LineEdit.ExpandMode) = 0
- keep_editing_on_text_submit: bool = false
- language: String = ""
- max_length: int = 0
- middle_mouse_paste_enabled: bool = true
- mouse_default_cursor_shape: int (Control.CursorShape) = 1
- placeholder_text: String = ""
- right_icon: Texture2D
- right_icon_scale: float = 1.0
- secret: bool = false
- secret_character: String = "•"
- select_all_on_focus: bool = false
- selecting_enabled: bool = true
- shortcut_keys_enabled: bool = true
- structured_text_bidi_override: int (TextServer.StructuredTextParser) = 0
- structured_text_bidi_override_options: Array = []
- text: String = ""
- text_direction: int (Control.TextDirection) = 0
- virtual_keyboard_enabled: bool = true
- virtual_keyboard_show_on_focus: bool = true
- virtual_keyboard_type: int (LineEdit.VirtualKeyboardType) = 0

**方法（Methods）：**
- apply_ime()
- cancel_ime()
- clear()
- delete_char_at_caret()
- delete_text(from_column: int, to_column: int)
- deselect()
- edit(hide_focus: bool = false)
- get_menu() -> PopupMenu
- get_next_composite_character_column(column: int) -> int
- get_previous_composite_character_column(column: int) -> int
- get_scroll_offset() -> float
- get_selected_text() -> String
- get_selection_from_column() -> int
- get_selection_to_column() -> int
- has_ime_text() -> bool
- has_redo() -> bool
- has_selection() -> bool
- has_undo() -> bool
- insert_text_at_caret(text: String)
- is_editing() -> bool
- is_menu_visible() -> bool
- menu_option(option: int)
- select(from: int = 0, to: int = -1)
- select_all()
- unedit()

**信号（Signals）：**
- editing_toggled(toggled_on: bool)
- text_change_rejected(rejected_substring: String)
- text_changed(new_text: String)
- text_submitted(new_text: String)

**枚举（Enums）：**
**MenuItems：** MENU_CUT=0, MENU_COPY=1, MENU_PASTE=2, MENU_CLEAR=3, MENU_SELECT_ALL=4, MENU_UNDO=5, MENU_REDO=6, MENU_SUBMENU_TEXT_DIR=7, MENU_DIR_INHERITED=8, MENU_DIR_AUTO=9, ...
**VirtualKeyboardType：** KEYBOARD_TYPE_DEFAULT=0, KEYBOARD_TYPE_MULTILINE=1, KEYBOARD_TYPE_NUMBER=2, KEYBOARD_TYPE_NUMBER_DECIMAL=3, KEYBOARD_TYPE_PHONE=4, KEYBOARD_TYPE_EMAIL_ADDRESS=5, KEYBOARD_TYPE_PASSWORD=6, KEYBOARD_TYPE_URL=7
**ExpandMode：** EXPAND_MODE_ORIGINAL_SIZE=0, EXPAND_MODE_FIT_TO_TEXT=1, EXPAND_MODE_FIT_TO_LINE_EDIT=2
