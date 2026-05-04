## Window <- Viewport（视口）

创建窗口的节点。窗口可以是原生系统窗口，也可以嵌入到另一个 Window 中（参见 `Viewport.gui_embed_subwindows`）。在运行时，Window 不会在请求时自动关闭。你需要使用 `close_requested` 信号手动处理（这同时适用于按下关闭按钮和点击弹出窗口外部）。

**属性（Props）：**
- accessibility_description: String = "" —— 辅助功能描述
- accessibility_name: String = "" —— 辅助功能名称
- always_on_top: bool = false —— 总在最前
- auto_translate: bool —— 自动翻译
- borderless: bool = false —— 无边框
- content_scale_aspect: int (Window.ContentScaleAspect) = 0 —— 内容缩放宽高比
- content_scale_factor: float = 1.0 —— 内容缩放因子
- content_scale_mode: int (Window.ContentScaleMode) = 0 —— 内容缩放模式
- content_scale_size: Vector2i = Vector2i(0, 0) —— 内容缩放大小
- content_scale_stretch: int (Window.ContentScaleStretch) = 0 —— 内容缩放拉伸
- current_screen: int —— 当前屏幕
- exclude_from_capture: bool = false —— 排除在捕获之外
- exclusive: bool = false —— 独占
- extend_to_title: bool = false —— 扩展到标题栏
- force_native: bool = false —— 强制原生
- hdr_output_requested: bool = false —— 请求HDR输出
- initial_position: int (Window.WindowInitialPosition) = 0 —— 初始位置
- keep_title_visible: bool = false —— 保持标题可见
- max_size: Vector2i = Vector2i(0, 0) —— 最大尺寸
- maximize_disabled: bool = false —— 禁用最大化
- min_size: Vector2i = Vector2i(0, 0) —— 最小尺寸
- minimize_disabled: bool = false —— 禁用最小化
- mode: int (Window.Mode) = 0 —— 窗口模式
- mouse_passthrough: bool = false —— 鼠标穿透
- mouse_passthrough_polygon: PackedVector2Array = PackedVector2Array() —— 鼠标穿透多边形
- nonclient_area: Rect2i = Rect2i(0, 0, 0, 0) —— 非客户区
- popup_window: bool = false —— 弹出窗口
- popup_wm_hint: bool = false —— 弹出窗口管理器提示
- position: Vector2i = Vector2i(0, 0) —— 位置
- sharp_corners: bool = false —— 尖角
- size: Vector2i = Vector2i(100, 100) —— 大小
- theme: Theme —— 主题
- theme_type_variation: StringName = &"" —— 主题类型变体
- title: String = "" —— 标题
- transient: bool = false —— 临时
- transient_to_focused: bool = false —— 临时到焦点窗口
- transparent: bool = false —— 透明
- unfocusable: bool = false —— 不可聚焦
- unresizable: bool = false —— 不可调整大小
- visible: bool = true —— 可见
- wrap_controls: bool = false —— 包裹控件

**方法（Methods）：**
- add_theme_color_override(name: StringName, color: Color) —— 添加主题颜色覆盖
- add_theme_constant_override(name: StringName, constant: int) —— 添加主题常量覆盖
- add_theme_font_override(name: StringName, font: Font) —— 添加主题字体覆盖
- add_theme_font_size_override(name: StringName, font_size: int) —— 添加主题字体大小覆盖
- add_theme_icon_override(name: StringName, texture: Texture2D) —— 添加主题图标覆盖
- add_theme_stylebox_override(name: StringName, stylebox: StyleBox) —— 添加主题样式盒覆盖
- begin_bulk_theme_override() —— 开始批量主题覆盖
- can_draw() -> bool —— 是否可以绘制
- child_controls_changed() —— 子控件已变更
- end_bulk_theme_override() —— 结束批量主题覆盖
- get_contents_minimum_size() -> Vector2 —— 获取内容最小尺寸
- get_flag(flag: int) -> bool —— 获取标志
- get_focused_window() -> Window —— 获取焦点窗口
- get_layout_direction() -> int —— 获取布局方向
- get_output_max_linear_value() -> float —— 获取输出最大线性值
- get_position_with_decorations() -> Vector2i —— 获取带装饰的位置
- get_size_with_decorations() -> Vector2i —— 获取带装饰的尺寸
- get_theme_color(name: StringName, theme_type: StringName = &"") -> Color —— 获取主题颜色
- get_theme_constant(name: StringName, theme_type: StringName = &"") -> int —— 获取主题常量
- get_theme_default_base_scale() -> float —— 获取主题默认基础缩放
- get_theme_default_font() -> Font —— 获取主题默认字体
- get_theme_default_font_size() -> int —— 获取主题默认字体大小
- get_theme_font(name: StringName, theme_type: StringName = &"") -> Font —— 获取主题字体
- get_theme_font_size(name: StringName, theme_type: StringName = &"") -> int —— 获取主题字体大小
- get_theme_icon(name: StringName, theme_type: StringName = &"") -> Texture2D —— 获取主题图标
- get_theme_stylebox(name: StringName, theme_type: StringName = &"") -> StyleBox —— 获取主题样式盒
- get_window_id() -> int —— 获取窗口ID
- grab_focus() —— 获取焦点
- has_focus() -> bool —— 是否有焦点
- has_theme_color(name: StringName, theme_type: StringName = &"") -> bool —— 是否有主题颜色
- has_theme_color_override(name: StringName) -> bool —— 是否有主题颜色覆盖
- has_theme_constant(name: StringName, theme_type: StringName = &"") -> bool —— 是否有主题常量
- has_theme_constant_override(name: StringName) -> bool —— 是否有主题常量覆盖
- has_theme_font(name: StringName, theme_type: StringName = &"") -> bool —— 是否有主题字体
- has_theme_font_override(name: StringName) -> bool —— 是否有主题字体覆盖
- has_theme_font_size(name: StringName, theme_type: StringName = &"") -> bool —— 是否有主题字体大小
- has_theme_font_size_override(name: StringName) -> bool —— 是否有主题字体大小覆盖
- has_theme_icon(name: StringName, theme_type: StringName = &"") -> bool —— 是否有主题图标
- has_theme_icon_override(name: StringName) -> bool —— 是否有主题图标覆盖
- has_theme_stylebox(name: StringName, theme_type: StringName = &"") -> bool —— 是否有主题样式盒
- has_theme_stylebox_override(name: StringName) -> bool —— 是否有主题样式盒覆盖
- hide() —— 隐藏
- is_embedded() -> bool —— 是否嵌入
- is_layout_rtl() -> bool —— 是否从右到左布局
- is_maximize_allowed() -> bool —— 是否允许最大化
- is_using_font_oversampling() -> bool —— 是否使用字体过采样
- move_to_center() —— 移动到中心
- move_to_foreground() —— 移到前台
- popup(rect: Rect2i = Rect2i(0, 0, 0, 0)) —— 弹出
- popup_centered(minsize: Vector2i = Vector2i(0, 0)) —— 居中弹出
- popup_centered_clamped(minsize: Vector2i = Vector2i(0, 0), fallback_ratio: float = 0.75) —— 居中弹出并限制大小
- popup_centered_ratio(ratio: float = 0.8) —— 按比例居中弹出
- popup_exclusive(from_node: Node, rect: Rect2i = Rect2i(0, 0, 0, 0)) —— 独占弹出
- popup_exclusive_centered(from_node: Node, minsize: Vector2i = Vector2i(0, 0)) —— 独占居中弹出
- popup_exclusive_centered_clamped(from_node: Node, minsize: Vector2i = Vector2i(0, 0), fallback_ratio: float = 0.75) —— 独占居中弹出并限制大小
- popup_exclusive_centered_ratio(from_node: Node, ratio: float = 0.8) —— 独占按比例居中弹出
- popup_exclusive_on_parent(from_node: Node, parent_rect: Rect2i) —— 在父节点上独占弹出
- popup_on_parent(parent_rect: Rect2i) —— 在父节点上弹出
- remove_theme_color_override(name: StringName) —— 移除主题颜色覆盖
- remove_theme_constant_override(name: StringName) —— 移除主题常量覆盖
- remove_theme_font_override(name: StringName) —— 移除主题字体覆盖
- remove_theme_font_size_override(name: StringName) —— 移除主题字体大小覆盖
- remove_theme_icon_override(name: StringName) —— 移除主题图标覆盖
- remove_theme_stylebox_override(name: StringName) —— 移除主题样式盒覆盖
- request_attention() —— 请求注意
- reset_size() —— 重置大小
- set_flag(flag: int, enabled: bool) —— 设置标志
- set_ime_active(active: bool) —— 设置IME激活
- set_ime_position(position: Vector2i) —— 设置IME位置
- set_layout_direction(direction: int) —— 设置布局方向
- set_unparent_when_invisible(unparent: bool) —— 设置不可见时取消父级
- set_use_font_oversampling(enable: bool) —— 设置使用字体过采样
- show() —— 显示
- start_drag() —— 开始拖拽
- start_resize(edge: int) —— 开始调整大小

**信号（Signals）：**
- about_to_popup —— 即将弹出
- close_requested —— 关闭请求
- dpi_changed —— DPI已变更
- files_dropped(files: PackedStringArray) —— 文件已拖放
- focus_entered —— 焦点进入
- focus_exited —— 焦点退出
- go_back_requested —— 返回请求
- mouse_entered —— 鼠标进入
- mouse_exited —— 鼠标退出
- nonclient_window_input(event: InputEvent) —— 非客户区窗口输入
- theme_changed —— 主题已变更
- title_changed —— 标题已变更
- titlebar_changed —— 标题栏已变更
- visibility_changed —— 可见性已变更
- window_input(event: InputEvent) —— 窗口输入

**枚举（Enums）：**
**Constants（常量）：** NOTIFICATION_VISIBILITY_CHANGED=30（可见性变更通知）, NOTIFICATION_THEME_CHANGED=32（主题变更通知）
**Mode（模式）：** MODE_WINDOWED=0（窗口模式）, MODE_MINIMIZED=1（最小化）, MODE_MAXIMIZED=2（最大化）, MODE_FULLSCREEN=3（全屏）, MODE_EXCLUSIVE_FULLSCREEN=4（独占全屏）
**Flags（标志）：** FLAG_RESIZE_DISABLED=0（禁用调整大小）, FLAG_BORDERLESS=1（无边框）, FLAG_ALWAYS_ON_TOP=2（总在最前）, FLAG_TRANSPARENT=3（透明）, FLAG_NO_FOCUS=4（无焦点）, FLAG_POPUP=5（弹出）, FLAG_EXTEND_TO_TITLE=6（扩展到标题栏）, FLAG_MOUSE_PASSTHROUGH=7（鼠标穿透）, FLAG_SHARP_CORNERS=8（尖角）, FLAG_EXCLUDE_FROM_CAPTURE=9（排除在捕获之外）, ...
**ContentScaleMode（内容缩放模式）：** CONTENT_SCALE_MODE_DISABLED=0（禁用）, CONTENT_SCALE_MODE_CANVAS_ITEMS=1（画布项目）, CONTENT_SCALE_MODE_VIEWPORT=2（视口）
**ContentScaleAspect（内容缩放宽高比）：** CONTENT_SCALE_ASPECT_IGNORE=0（忽略）, CONTENT_SCALE_ASPECT_KEEP=1（保持）, CONTENT_SCALE_ASPECT_KEEP_WIDTH=2（保持宽度）, CONTENT_SCALE_ASPECT_KEEP_HEIGHT=3（保持高度）, CONTENT_SCALE_ASPECT_EXPAND=4（扩展）
**ContentScaleStretch（内容缩放拉伸）：** CONTENT_SCALE_STRETCH_FRACTIONAL=0（分数）, CONTENT_SCALE_STRETCH_INTEGER=1（整数）
**LayoutDirection（布局方向）：** LAYOUT_DIRECTION_INHERITED=0（继承）, LAYOUT_DIRECTION_APPLICATION_LOCALE=1（应用区域设置）, LAYOUT_DIRECTION_LTR=2（从左到右）, LAYOUT_DIRECTION_RTL=3（从右到左）, LAYOUT_DIRECTION_SYSTEM_LOCALE=4（系统区域设置）, LAYOUT_DIRECTION_MAX=5（最大值）, LAYOUT_DIRECTION_LOCALE=1（区域设置）
**WindowInitialPosition（窗口初始位置）：** WINDOW_INITIAL_POSITION_ABSOLUTE=0（绝对位置）, WINDOW_INITIAL_POSITION_CENTER_PRIMARY_SCREEN=1（主屏幕居中）, WINDOW_INITIAL_POSITION_CENTER_MAIN_WINDOW_SCREEN=2（主窗口屏幕居中）, WINDOW_INITIAL_POSITION_CENTER_OTHER_SCREEN=3（其他屏幕居中）, WINDOW_INITIAL_POSITION_CENTER_SCREEN_WITH_MOUSE_FOCUS=4（鼠标焦点屏幕居中）, WINDOW_INITIAL_POSITION_CENTER_SCREEN_WITH_KEYBOARD_FOCUS=5（键盘焦点屏幕居中）
