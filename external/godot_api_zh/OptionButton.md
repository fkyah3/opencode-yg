## OptionButton（选项按钮）<- Button（按钮）

OptionButton 是一种按钮类型，按下时会弹出一个下拉菜单，其中包含可选项目。选中的项目成为"当前"项目，并显示为按钮文本。另请参见 BaseButton，其中包含与此节点关联的公共属性和方法。**注意：** 用于项目的 ID 限于有符号 32 位整数，而非完整的 64 位 [int]。其范围是 `-2^31` 到 `2^31 - 1`，即 `-2147483648` 到 `2147483647`。**注意：** `Button.text` 和 `Button.icon` 属性会根据选中的项目自动设置，不应手动更改。

**属性（Props）：**
- action_mode: int (BaseButton.ActionMode) = 0 —— 动作模式
- alignment: int (HorizontalAlignment) = 0 —— 对齐方式
- allow_reselect: bool = false —— 是否允许重新选择
- fit_to_longest_item: bool = true —— 是否适配最长项目
- item_count: int = 0 —— 项目数量
- selected: int = -1 —— 当前选中索引
- toggle_mode: bool = true —— 切换模式

**方法（Methods）：**
- add_icon_item(texture: Texture2D, label: String, id: int = -1) —— 添加带图标的项目
- add_item(label: String, id: int = -1) —— 添加项目
- add_separator(text: String = "") —— 添加分隔符
- clear() —— 清除所有项目
- get_item_auto_translate_mode(idx: int) -> int —— 获取项目自动翻译模式
- get_item_icon(idx: int) -> Texture2D —— 获取项目图标
- get_item_id(idx: int) -> int —— 获取项目 ID
- get_item_index(id: int) -> int —— 根据 ID 获取项目索引
- get_item_metadata(idx: int) -> Variant —— 获取项目元数据
- get_item_text(idx: int) -> String —— 获取项目文本
- get_item_tooltip(idx: int) -> String —— 获取项目工具提示
- get_popup() -> PopupMenu —— 获取弹出菜单
- get_selectable_item(from_last: bool = false) -> int —— 获取可选项目
- get_selected_id() -> int —— 获取选中项目的 ID
- get_selected_metadata() -> Variant —— 获取选中项目的元数据
- has_selectable_items() -> bool —— 是否有可选项目
- is_item_disabled(idx: int) -> bool —— 项目是否禁用
- is_item_separator(idx: int) -> bool —— 项目是否为分隔符
- remove_item(idx: int) —— 移除项目
- select(idx: int) —— 选中项目
- set_disable_shortcuts(disabled: bool) —— 设置禁用快捷键
- set_item_auto_translate_mode(idx: int, mode: int) —— 设置项目自动翻译模式
- set_item_disabled(idx: int, disabled: bool) —— 设置项目禁用
- set_item_icon(idx: int, texture: Texture2D) —— 设置项目图标
- set_item_id(idx: int, id: int) —— 设置项目 ID
- set_item_metadata(idx: int, metadata: Variant) —— 设置项目元数据
- set_item_text(idx: int, text: String) —— 设置项目文本
- set_item_tooltip(idx: int, tooltip: String) —— 设置项目工具提示
- show_popup() —— 显示弹出菜单

**信号（Signals）：**
- item_focused(index: int) —— 项目获得焦点时触发
- item_selected(index: int) —— 项目被选中时触发
