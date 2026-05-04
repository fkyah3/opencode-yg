## ItemList <- Control（控件）

此控件提供一个可选项的垂直列表，可以是单列或多列，每个项目都有文本和图标的选项。支持工具提示，列表中的每个项目可以有不同的工具提示。列表中的可选项目可以被选中或取消选中，并且可以启用多选。也可以启用右键选择以支持弹出上下文菜单。项目也可以通过双击或按 [kbd]Enter[/kbd] 来"激活"。项目文本仅支持单行字符串。字符串中的换行符（例如 `\n`）不会产生新行。在 `ICON_MODE_TOP` 模式下启用文本换行，但列的宽度默认会调整以完全适应其内容。您需要将 `fixed_column_width` 设置为大于零才能换行文本。所有 `set_*` 方法都允许负的项目索引，即 `-1` 访问最后一个项目，`-2` 选择倒数第二个项目，以此类推。**增量搜索：** 与 PopupMenu 和 Tree 一样，ItemList 支持在控件获得焦点时在列表内搜索。按下与项目名称首字母匹配的键，选择以该字母开头的第一个项目。之后，有两种方式执行增量搜索：1) 在超时前再次按下同一个键，选择下一个以相同字母开头的项目。2) 在超时前按下匹配单词其余部分的字母键，直接选择该项目。如果自上次击键后超时已过，这两种操作都将重置到列表开头。您可以通过更改 `ProjectSettings.gui/timers/incremental_search_max_interval_msec` 来调整超时时间。

**属性（Props）：**
- allow_reselect: bool = false
- allow_rmb_select: bool = false
- allow_search: bool = true
- auto_height: bool = false
- auto_width: bool = false
- clip_contents: bool = true
- fixed_column_width: int = 0
- fixed_icon_size: Vector2i = Vector2i(0, 0)
- focus_mode: int (Control.FocusMode) = 2
- icon_mode: int (ItemList.IconMode) = 1
- icon_scale: float = 1.0
- item_count: int = 0
- max_columns: int = 1
- max_text_lines: int = 1
- same_column_width: bool = false
- scroll_hint_mode: int (ItemList.ScrollHintMode) = 0
- select_mode: int (ItemList.SelectMode) = 0
- text_overrun_behavior: int (TextServer.OverrunBehavior) = 3
- tile_scroll_hint: bool = false
- wraparound_items: bool = true

**方法（Methods）：**
- add_icon_item(icon: Texture2D, selectable: bool = true) -> int
- add_item(text: String, icon: Texture2D = null, selectable: bool = true) -> int
- center_on_current(center_verically: bool = true, center_horizontally: bool = true)
- clear()
- deselect(idx: int)
- deselect_all()
- ensure_current_is_visible()
- force_update_list_size()
- get_h_scroll_bar() -> HScrollBar
- get_item_at_position(position: Vector2, exact: bool = false) -> int
- get_item_auto_translate_mode(idx: int) -> int
- get_item_custom_bg_color(idx: int) -> Color
- get_item_custom_fg_color(idx: int) -> Color
- get_item_icon(idx: int) -> Texture2D
- get_item_icon_modulate(idx: int) -> Color
- get_item_icon_region(idx: int) -> Rect2
- get_item_language(idx: int) -> String
- get_item_metadata(idx: int) -> Variant
- get_item_rect(idx: int, expand: bool = true) -> Rect2
- get_item_text(idx: int) -> String
- get_item_text_direction(idx: int) -> int
- get_item_tooltip(idx: int) -> String
- get_selected_items() -> PackedInt32Array
- get_v_scroll_bar() -> VScrollBar
- is_anything_selected() -> bool
- is_item_disabled(idx: int) -> bool
- is_item_icon_transposed(idx: int) -> bool
- is_item_selectable(idx: int) -> bool
- is_item_tooltip_enabled(idx: int) -> bool
- is_selected(idx: int) -> bool
- move_item(from_idx: int, to_idx: int)
- remove_item(idx: int)
- select(idx: int, single: bool = true)
- set_item_auto_translate_mode(idx: int, mode: int)
- set_item_custom_bg_color(idx: int, custom_bg_color: Color)
- set_item_custom_fg_color(idx: int, custom_fg_color: Color)
- set_item_disabled(idx: int, disabled: bool)
- set_item_icon(idx: int, icon: Texture2D)
- set_item_icon_modulate(idx: int, modulate: Color)
- set_item_icon_region(idx: int, rect: Rect2)
- set_item_icon_transposed(idx: int, transposed: bool)
- set_item_language(idx: int, language: String)
- set_item_metadata(idx: int, metadata: Variant)
- set_item_selectable(idx: int, selectable: bool)
- set_item_text(idx: int, text: String)
- set_item_text_direction(idx: int, direction: int)
- set_item_tooltip(idx: int, tooltip: String)
- set_item_tooltip_enabled(idx: int, enable: bool)
- sort_items_by_text()

**信号（Signals）：**
- empty_clicked(at_position: Vector2, mouse_button_index: int)
- item_activated(index: int)
- item_clicked(index: int, at_position: Vector2, mouse_button_index: int)
- item_selected(index: int)
- multi_selected(index: int, selected: bool)

**枚举（Enums）：**
**IconMode：** ICON_MODE_TOP=0, ICON_MODE_LEFT=1
**SelectMode：** SELECT_SINGLE=0, SELECT_MULTI=1, SELECT_TOGGLE=2
**ScrollHintMode：** SCROLL_HINT_MODE_DISABLED=0, SCROLL_HINT_MODE_BOTH=1, SCROLL_HINT_MODE_TOP=2, SCROLL_HINT_MODE_BOTTOM=3
