## FileDialog（文件对话框） <- ConfirmationDialog（确认对话框）

FileDialog 是一个预设对话框，用于在文件系统中选择文件和目录。它支持过滤掩码。FileDialog 会根据 `file_mode` 自动设置其窗口标题。如果要使用自定义标题，请将 `mode_overrides_title` 设置为 `false` 来禁用此功能。**注意：** FileDialog 默认不可见。要使其可见，请在节点上调用 Window 的 `popup_*` 方法之一，如 `Window.popup_centered_clamped`。

**属性（Props）：**
- access: int (FileDialog.Access) = 0 —— 访问类型
- current_dir: String —— 当前目录
- current_file: String —— 当前文件
- current_path: String —— 当前路径
- deleting_enabled: bool = true —— 是否启用删除
- dialog_hide_on_ok: bool = false —— 确认后是否隐藏对话框
- display_mode: int (FileDialog.DisplayMode) = 0 —— 显示模式
- favorites_enabled: bool = true —— 是否启用收藏夹
- file_filter_toggle_enabled: bool = true —— 是否启用文件过滤切换
- file_mode: int (FileDialog.FileMode) = 4 —— 文件模式
- file_sort_options_enabled: bool = true —— 是否启用文件排序选项
- filename_filter: String = "" —— 文件名过滤器
- filters: PackedStringArray = PackedStringArray() —— 过滤规则
- folder_creation_enabled: bool = true —— 是否启用创建文件夹
- hidden_files_toggle_enabled: bool = true —— 是否启用隐藏文件切换
- layout_toggle_enabled: bool = true —— 是否启用布局切换
- mode_overrides_title: bool = true —— 模式是否覆盖标题
- option_count: int = 0 —— 选项数量
- overwrite_warning_enabled: bool = true —— 是否启用覆盖警告
- recent_list_enabled: bool = true —— 是否启用最近列表
- root_subfolder: String = "" —— 根子文件夹
- show_hidden_files: bool = false —— 是否显示隐藏文件
- size: Vector2i = Vector2i(640, 360) —— 大小
- title: String = "Save a File" —— 标题
- use_native_dialog: bool = false —— 是否使用原生对话框

**方法（Methods）：**
- add_filter(filter: String, description: String = "", mime_type: String = "") —— 添加过滤器
- add_option(name: String, values: PackedStringArray, default_value_index: int) —— 添加选项
- clear_filename_filter() —— 清除文件名过滤器
- clear_filters() —— 清除所有过滤器
- deselect_all() —— 取消全选
- get_favorite_list() -> PackedStringArray —— 获取收藏列表
- get_line_edit() -> LineEdit —— 获取行编辑器
- get_option_default(option: int) -> int —— 获取选项默认值
- get_option_name(option: int) -> String —— 获取选项名称
- get_option_values(option: int) -> PackedStringArray —— 获取选项值列表
- get_recent_list() -> PackedStringArray —— 获取最近列表
- get_selected_options() -> Dictionary —— 获取选中的选项
- get_vbox() -> VBoxContainer —— 获取垂直盒子
- invalidate() —— 失效
- is_customization_flag_enabled(flag: int) -> bool —— 自定义标志是否启用
- popup_file_dialog() —— 弹出文件对话框
- set_customization_flag_enabled(flag: int, enabled: bool) —— 设置自定义标志启用
- set_favorite_list(favorites: PackedStringArray) —— 设置收藏列表
- set_get_icon_callback(callback: Callable) —— 设置获取图标回调
- set_get_thumbnail_callback(callback: Callable) —— 设置获取缩略图回调
- set_option_default(option: int, default_value_index: int) —— 设置选项默认值
- set_option_name(option: int, name: String) —— 设置选项名称
- set_option_values(option: int, values: PackedStringArray) —— 设置选项值列表
- set_recent_list(recents: PackedStringArray) —— 设置最近列表

**信号（Signals）：**
- dir_selected(dir: String) —— 目录已选择
- file_selected(path: String) —— 文件已选择
- filename_filter_changed(filter: String) —— 文件名过滤器已更改
- files_selected(paths: PackedStringArray) —— 多个文件已选择

**枚举（Enums）：**
**FileMode（文件模式）：** FILE_MODE_OPEN_FILE=0（打开文件）, FILE_MODE_OPEN_FILES=1（打开多个文件）, FILE_MODE_OPEN_DIR=2（打开目录）, FILE_MODE_OPEN_ANY=3（打开任意）, FILE_MODE_SAVE_FILE=4（保存文件）
**Access（访问类型）：** ACCESS_RESOURCES=0（资源目录）, ACCESS_USERDATA=1（用户数据目录）, ACCESS_FILESYSTEM=2（文件系统）
**DisplayMode（显示模式）：** DISPLAY_THUMBNAILS=0（缩略图）, DISPLAY_LIST=1（列表）
**Customization（自定义）：** CUSTOMIZATION_HIDDEN_FILES=0（隐藏文件）, CUSTOMIZATION_CREATE_FOLDER=1（创建文件夹）, CUSTOMIZATION_FILE_FILTER=2（文件过滤）, CUSTOMIZATION_FILE_SORT=3（文件排序）, CUSTOMIZATION_FAVORITES=4（收藏夹）, CUSTOMIZATION_RECENT=5（最近）, CUSTOMIZATION_LAYOUT=6（布局）, CUSTOMIZATION_OVERWRITE_WARNING=7（覆盖警告）, CUSTOMIZATION_DELETE=8（删除）
