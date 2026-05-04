## Control（控件）<- CanvasItem（画布项）

所有 UI 相关节点的基类。Control 拥有一个定义其范围的边界矩形、一个相对于父控件或视口的锚点位置，以及相对于锚点的偏移量。当节点、其父节点或屏幕尺寸发生变化时，偏移量会自动更新。关于 Godot UI 系统、锚点、偏移量和容器的更多信息，请参阅手册中的相关教程。要构建灵活的 UI，你需要混合使用继承自 Control 的 UI 元素和 Container 节点。

**注意：** 由于 Node2D 和 Control 都继承自 CanvasItem，它们共享该类的一些概念，例如 `CanvasItem.z_index` 和 `CanvasItem.visible` 属性。

**UI 节点与输入：** Godot 通过视口传播输入事件。每个 Viewport 负责将 InputEvent 传播给其子节点。由于 `SceneTree.root` 是一个 Window，这已经自动适用于游戏中的所有 UI 元素。输入事件通过 SceneTree 从根节点传播到所有子节点，通过调用 `Node._input` 实现。对于 UI 元素来说，更合理的做法是重写虚方法 `_gui_input`，它会过滤掉不相关的输入事件——例如通过检查 z-order、`mouse_filter`、焦点，或事件是否在控件的边界矩形内。调用 `accept_event` 使其他节点不再接收该事件。一旦你接受了输入，它就被标记为已处理，因此 `Node._unhandled_input` 将不会处理它。

只有一个 Control 节点可以处于焦点状态。只有焦点节点会接收事件。要获取焦点，调用 `grab_focus`。当另一个节点抢占了焦点，或者你隐藏了焦点节点时，Control 节点会失去焦点。如果通过鼠标/触摸输入获得焦点，焦点不会在视觉上显示——只有在键盘/手柄输入（为了无障碍）或通过 `grab_focus` 时才会显示。将 `mouse_filter` 设置为 `MOUSE_FILTER_IGNORE` 可让 Control 节点忽略鼠标或触摸事件。如果你在按钮上放置了一个图标，就需要用到它...（注：原始描述过长，此处仅翻译了前段）

**属性（Props）：**
- `accessibility_controls_nodes`: NodePath[] = [] —— 无障碍控制的节点路径列表
- `accessibility_described_by_nodes`: NodePath[] = [] —— 被哪些节点描述（无障碍）
- `accessibility_description`: String = "" —— 无障碍描述
- `accessibility_flow_to_nodes`: NodePath[] = [] —— 无障碍焦点的流向节点路径列表
- `accessibility_labeled_by_nodes`: NodePath[] = [] —— 被哪些节点标注（无障碍）
- `accessibility_live`: int (DisplayServer.AccessibilityLiveMode) = 0 —— 无障碍实时模式
- `accessibility_name`: String = "" —— 无障碍名称
- `anchor_bottom`: float = 0.0 —— 底部锚点
- `anchor_left`: float = 0.0 —— 左侧锚点
- `anchor_right`: float = 0.0 —— 右侧锚点
- `anchor_top`: float = 0.0 —— 顶部锚点
- `auto_translate`: bool —— 自动翻译
- `clip_contents`: bool = false —— 裁剪内容
- `custom_minimum_size`: Vector2 = Vector2(0, 0) —— 自定义最小尺寸
- `focus_behavior_recursive`: int (Control.FocusBehaviorRecursive) = 0 —— 焦点行为递归方式
- `focus_mode`: int (Control.FocusMode) = 0 —— 焦点模式
- `focus_neighbor_bottom`: NodePath = NodePath("") —— 下方焦点邻居
- `focus_neighbor_left`: NodePath = NodePath("") —— 左方焦点邻居
- `focus_neighbor_right`: NodePath = NodePath("") —— 右方焦点邻居
- `focus_neighbor_top`: NodePath = NodePath("") —— 上方焦点邻居
- `focus_next`: NodePath = NodePath("") —— 下一个焦点
- `focus_previous`: NodePath = NodePath("") —— 上一个焦点
- `global_position`: Vector2 —— 全局位置
- `grow_horizontal`: int (Control.GrowDirection) = 1 —— 水平增长方向
- `grow_vertical`: int (Control.GrowDirection) = 1 —— 垂直增长方向
- `layout_direction`: int (Control.LayoutDirection) = 0 —— 布局方向
- `localize_numeral_system`: bool = true —— 本地化数字系统
- `mouse_behavior_recursive`: int (Control.MouseBehaviorRecursive) = 0 —— 鼠标行为递归方式
- `mouse_default_cursor_shape`: int (Control.CursorShape) = 0 —— 鼠标默认光标形状
- `mouse_filter`: int (Control.MouseFilter) = 0 —— 鼠标过滤
- `mouse_force_pass_scroll_events`: bool = true —— 强制传递滚动事件
- `offset_bottom`: float = 0.0 —— 底部偏移
- `offset_left`: float = 0.0 —— 左侧偏移
- `offset_right`: float = 0.0 —— 右侧偏移
- `offset_top`: float = 0.0 —— 顶部偏移
- `physics_interpolation_mode`: int (Node.PhysicsInterpolationMode) = 2 —— 物理插值模式
- `pivot_offset`: Vector2 = Vector2(0, 0) —— 轴心偏移
- `pivot_offset_ratio`: Vector2 = Vector2(0, 0) —— 轴心偏移比例
- `position`: Vector2 = Vector2(0, 0) —— 位置
- `rotation`: float = 0.0 —— 旋转角度（弧度）
- `rotation_degrees`: float —— 旋转角度（度）
- `scale`: Vector2 = Vector2(1, 1) —— 缩放
- `shortcut_context`: Node —— 快捷键上下文
- `size`: Vector2 = Vector2(0, 0) —— 尺寸
- `size_flags_horizontal`: int (Control.SizeFlags) = 1 —— 水平尺寸标志
- `size_flags_stretch_ratio`: float = 1.0 —— 尺寸拉伸比例
- `size_flags_vertical`: int (Control.SizeFlags) = 1 —— 垂直尺寸标志
- `theme`: Theme —— 主题
- `theme_type_variation`: StringName = &"" —— 主题类型变体
- `tooltip_auto_translate_mode`: int (Node.AutoTranslateMode) = 0 —— 工具提示自动翻译模式
- `tooltip_text`: String = "" —— 工具提示文本

**方法（Methods）：**
- `accept_event()` —— 接受事件（阻止进一步传播）
- `accessibility_drag()` —— 无障碍拖拽
- `accessibility_drop()` —— 无障碍放下
- `add_theme_color_override(name: StringName, color: Color)` —— 添加主题颜色覆盖
- `add_theme_constant_override(name: StringName, constant: int)` —— 添加主题常量覆盖
- `add_theme_font_override(name: StringName, font: Font)` —— 添加主题字体覆盖
- `add_theme_font_size_override(name: StringName, font_size: int)` —— 添加主题字体大小覆盖
- `add_theme_icon_override(name: StringName, texture: Texture2D)` —— 添加主题图标覆盖
- `add_theme_stylebox_override(name: StringName, stylebox: StyleBox)` —— 添加主题样式盒覆盖
- `begin_bulk_theme_override()` —— 开始批量主题覆盖
- `end_bulk_theme_override()` —— 结束批量主题覆盖
- `find_next_valid_focus()` -> Control —— 查找下一个有效焦点
- `find_prev_valid_focus()` -> Control —— 查找上一个有效焦点
- `find_valid_focus_neighbor(side: int)` -> Control —— 查找指定方向的有效焦点邻居
- `force_drag(data: Variant, preview: Control)` —— 强制开始拖拽
- `get_anchor(side: int)` -> float —— 获取锚点值
- `get_begin()` -> Vector2 —— 获取起始位置
- `get_combined_minimum_size()` -> Vector2 —— 获取组合最小尺寸
- `get_combined_pivot_offset()` -> Vector2 —— 获取组合轴心偏移
- `get_cursor_shape(position: Vector2 = Vector2(0, 0))` -> int —— 获取光标形状
- `get_end()` -> Vector2 —— 获取结束位置
- `get_focus_mode_with_override()` -> int —— 获取含覆盖的焦点模式
- `get_focus_neighbor(side: int)` -> NodePath —— 获取指定方向的焦点邻居
- `get_global_rect()` -> Rect2 —— 获取全局矩形
- `get_minimum_size()` -> Vector2 —— 获取最小尺寸
- `get_mouse_filter_with_override()` -> int —— 获取含覆盖的鼠标过滤模式
- `get_offset(offset: int)` -> float —— 获取偏移量
- `get_parent_area_size()` -> Vector2 —— 获取父区域尺寸
- `get_parent_control()` -> Control —— 获取父控件
- `get_rect()` -> Rect2 —— 获取矩形
- `get_screen_position()` -> Vector2 —— 获取屏幕位置
- `get_theme_color(name: StringName, theme_type: StringName = &"")` -> Color —— 获取主题颜色
- `get_theme_constant(name: StringName, theme_type: StringName = &"")` -> int —— 获取主题常量
- `get_theme_default_base_scale()` -> float —— 获取主题默认基础缩放
- `get_theme_default_font()` -> Font —— 获取主题默认字体
- `get_theme_default_font_size()` -> int —— 获取主题默认字体大小
- `get_theme_font(name: StringName, theme_type: StringName = &"")` -> Font —— 获取主题字体
- `get_theme_font_size(name: StringName, theme_type: StringName = &"")` -> int —— 获取主题字体大小
- `get_theme_icon(name: StringName, theme_type: StringName = &"")` -> Texture2D —— 获取主题图标
- `get_theme_stylebox(name: StringName, theme_type: StringName = &"")` -> StyleBox —— 获取主题样式盒
- `get_tooltip(at_position: Vector2 = Vector2(0, 0))` -> String —— 获取工具提示
- `grab_click_focus()` —— 抢点击焦点
- `grab_focus(hide_focus: bool = false)` —— 获取焦点
- `has_focus(ignore_hidden_focus: bool = false)` -> bool —— 是否有焦点
- `has_theme_color(name: StringName, theme_type: StringName = &"")` -> bool —— 是否有主题颜色
- `has_theme_color_override(name: StringName)` -> bool —— 是否有主题颜色覆盖
- `has_theme_constant(name: StringName, theme_type: StringName = &"")` -> bool —— 是否有主题常量
- `has_theme_constant_override(name: StringName)` -> bool —— 是否有主题常量覆盖
- `has_theme_font(name: StringName, theme_type: StringName = &"")` -> bool —— 是否有主题字体
- `has_theme_font_override(name: StringName)` -> bool —— 是否有主题字体覆盖
- `has_theme_font_size(name: StringName, theme_type: StringName = &"")` -> bool —— 是否有主题字体大小
- `has_theme_font_size_override(name: StringName)` -> bool —— 是否有主题字体大小覆盖
- `has_theme_icon(name: StringName, theme_type: StringName = &"")` -> bool —— 是否有主题图标
- `has_theme_icon_override(name: StringName)` -> bool —— 是否有主题图标覆盖
- `has_theme_stylebox(name: StringName, theme_type: StringName = &"")` -> bool —— 是否有主题样式盒
- `has_theme_stylebox_override(name: StringName)` -> bool —— 是否有主题样式盒覆盖
- `is_drag_successful()` -> bool —— 拖拽是否成功
- `is_layout_rtl()` -> bool —— 布局是否为从右到左
- `release_focus()` —— 释放焦点
- `remove_theme_color_override(name: StringName)` —— 移除主题颜色覆盖
- `remove_theme_constant_override(name: StringName)` —— 移除主题常量覆盖
- `remove_theme_font_override(name: StringName)` —— 移除主题字体覆盖
- `remove_theme_font_size_override(name: StringName)` —— 移除主题字体大小覆盖
- `remove_theme_icon_override(name: StringName)` —— 移除主题图标覆盖
- `remove_theme_stylebox_override(name: StringName)` —— 移除主题样式盒覆盖
- `reset_size()` —— 重置尺寸
- `set_anchor(side: int, anchor: float, keep_offset: bool = false, push_opposite_anchor: bool = true)` —— 设置锚点
- `set_anchor_and_offset(side: int, anchor: float, offset: float, push_opposite_anchor: bool = false)` —— 设置锚点和偏移
- `set_anchors_and_offsets_preset(preset: int, resize_mode: int = 0, margin: int = 0)` —— 按预设设置锚点和偏移
- `set_anchors_preset(preset: int, keep_offsets: bool = false)` —— 按预设设置锚点
- `set_begin(position: Vector2)` —— 设置起始位置
- `set_drag_forwarding(drag_func: Callable, can_drop_func: Callable, drop_func: Callable)` —— 设置拖拽转发
- `set_drag_preview(control: Control)` —— 设置拖拽预览
- `set_end(position: Vector2)` —— 设置结束位置
- `set_focus_neighbor(side: int, neighbor: NodePath)` —— 设置指定方向的焦点邻居
- `set_global_position(position: Vector2, keep_offsets: bool = false)` —— 设置全局位置
- `set_offset(side: int, offset: float)` —— 设置偏移量
- `set_offsets_preset(preset: int, resize_mode: int = 0, margin: int = 0)` —— 按预设设置偏移
- `set_position(position: Vector2, keep_offsets: bool = false)` —— 设置位置
- `set_size(size: Vector2, keep_offsets: bool = false)` —— 设置尺寸
- `update_minimum_size()` —— 更新最小尺寸
- `warp_mouse(position: Vector2)` —— 将鼠标移动到指定位置

**信号（Signals）：**
- `focus_entered` —— 进入焦点
- `focus_exited` —— 退出焦点
- `gui_input(event: InputEvent)` —— GUI 输入事件
- `minimum_size_changed` —— 最小尺寸变更
- `mouse_entered` —— 鼠标进入
- `mouse_exited` —— 鼠标退出
- `resized` —— 尺寸改变
- `size_flags_changed` —— 尺寸标志变更
- `theme_changed` —— 主题变更

**枚举（Enums）：**

**FocusMode（焦点模式）：**
- `FOCUS_NONE=0` —— 无焦点
- `FOCUS_CLICK=1` —— 点击获取焦点
- `FOCUS_ALL=2` —— 全部
- `FOCUS_ACCESSIBILITY=3` —— 无障碍

**FocusBehaviorRecursive（焦点行为递归）：**
- `FOCUS_BEHAVIOR_INHERITED=0` —— 继承
- `FOCUS_BEHAVIOR_DISABLED=1` —— 禁用
- `FOCUS_BEHAVIOR_ENABLED=2` —— 启用

**MouseBehaviorRecursive（鼠标行为递归）：**
- `MOUSE_BEHAVIOR_INHERITED=0` —— 继承
- `MOUSE_BEHAVIOR_DISABLED=1` —— 禁用
- `MOUSE_BEHAVIOR_ENABLED=2` —— 启用

**常量（Constants）：**
- `NOTIFICATION_RESIZED=40` —— 尺寸改变通知
- `NOTIFICATION_MOUSE_ENTER=41` —— 鼠标进入通知
- `NOTIFICATION_MOUSE_EXIT=42` —— 鼠标退出通知
- `NOTIFICATION_MOUSE_ENTER_SELF=60` —— 鼠标进入自身
- `NOTIFICATION_MOUSE_EXIT_SELF=61` —— 鼠标退出自身
- `NOTIFICATION_FOCUS_ENTER=43` —— 进入焦点通知
- `NOTIFICATION_FOCUS_EXIT=44` —— 退出焦点通知
- `NOTIFICATION_THEME_CHANGED=45` —— 主题变更通知
- `NOTIFICATION_SCROLL_BEGIN=47` —— 滚动开始通知
- `NOTIFICATION_SCROLL_END=48` —— 滚动结束通知

**CursorShape（光标形状）：**
- `CURSOR_ARROW=0` —— 箭头
- `CURSOR_IBEAM=1` —— I型光标（文本输入）
- `CURSOR_POINTING_HAND=2` —— 手型指针（可点击）
- `CURSOR_CROSS=3` —— 十字
- `CURSOR_WAIT=4` —— 等待（转圈）
- `CURSOR_BUSY=5` —— 忙碌
- `CURSOR_DRAG=6` —— 拖拽
- `CURSOR_CAN_DROP=7` —— 可放下
- `CURSOR_FORBIDDEN=8` —— 禁止
- `CURSOR_VSIZE=9` —— 垂直调整大小

**LayoutPreset（布局预设）：**
- `PRESET_TOP_LEFT=0` —— 左上
- `PRESET_TOP_RIGHT=1` —— 右上
- `PRESET_BOTTOM_LEFT=2` —— 左下
- `PRESET_BOTTOM_RIGHT=3` —— 右下
- `PRESET_CENTER_LEFT=4` —— 中左
- `PRESET_CENTER_TOP=5` —— 中上
- `PRESET_CENTER_RIGHT=6` —— 中右
- `PRESET_CENTER_BOTTOM=7` —— 中下
- `PRESET_CENTER=8` —— 居中
- `PRESET_LEFT_WIDE=9` —— 左侧宽

**LayoutPresetMode（布局预设模式）：**
- `PRESET_MODE_MINSIZE=0` —— 最小尺寸
- `PRESET_MODE_KEEP_WIDTH=1` —— 保持宽度
- `PRESET_MODE_KEEP_HEIGHT=2` —— 保持高度
- `PRESET_MODE_KEEP_SIZE=3` —— 保持尺寸

**SizeFlags（尺寸标志）：**
- `SIZE_SHRINK_BEGIN=0` —— 从开头收缩
- `SIZE_FILL=1` —— 填充
- `SIZE_EXPAND=2` —— 扩展
- `SIZE_EXPAND_FILL=3` —— 扩展并填充
- `SIZE_SHRINK_CENTER=4` —— 居中收缩
- `SIZE_SHRINK_END=8` —— 从结尾收缩

**MouseFilter（鼠标过滤）：**
- `MOUSE_FILTER_STOP=0` —— 停止（阻止事件穿透）
- `MOUSE_FILTER_PASS=1` —— 穿透（事件可继续传播）
- `MOUSE_FILTER_IGNORE=2` —— 忽略（控件不响应鼠标）

**GrowDirection（增长方向）：**
- `GROW_DIRECTION_BEGIN=0` —— 向起始方向增长
- `GROW_DIRECTION_END=1` —— 向结束方向增长
- `GROW_DIRECTION_BOTH=2` —— 向两侧增长

**Anchor（锚点）：**
- `ANCHOR_BEGIN=0` —— 起始
- `ANCHOR_END=1` —— 结束

**LayoutDirection（布局方向）：**
- `LAYOUT_DIRECTION_INHERITED=0` —— 继承
- `LAYOUT_DIRECTION_APPLICATION_LOCALE=1` —— 跟随应用区域设置
- `LAYOUT_DIRECTION_LTR=2` —— 从左到右
- `LAYOUT_DIRECTION_RTL=3` —— 从右到左
- `LAYOUT_DIRECTION_SYSTEM_LOCALE=4` —— 跟随系统区域设置
- `LAYOUT_DIRECTION_LOCALE=1` —— 跟随区域设置

**TextDirection（文本方向）：**
- `TEXT_DIRECTION_INHERITED=3` —— 继承
- `TEXT_DIRECTION_AUTO=0` —— 自动检测
- `TEXT_DIRECTION_LTR=1` —— 从左到右
- `TEXT_DIRECTION_RTL=2` —— 从右到左
