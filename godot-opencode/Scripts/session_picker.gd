class_name SessionPicker
extends Control

## 会话选择器 — 居中覆盖层
##
## 类似 TUI 的 Ctrl+P command palette。
## 全屏遮罩 + 居中大面板，面板尺寸随视口自适应。

signal session_selected(session_id: String)
signal dismissed()

# ── 界面节点 ──
var _bg: ColorRect
var _panel: Panel
var _search_input: LineEdit
var _list_container: VBoxContainer
var _scroll: ScrollContainer

var _session_btns: Dictionary = {}  # session_id → Button
var _all_sessions: Array = []       # 完整会话列表


func _ready() -> void:
	# 自己填满父容器
	set_anchors_and_offsets_preset(Control.PRESET_FULL_RECT)

	# 半透明遮罩 — 占满全屏
	_bg = ColorRect.new()
	_bg.color = Color(0, 0, 0, 0.55)
	_bg.set_anchors_and_offsets_preset(Control.PRESET_FULL_RECT)
	_bg.mouse_filter = Control.MOUSE_FILTER_STOP
	_bg.gui_input.connect(_on_bg_click)
	add_child(_bg)

	# 主面板 — 响应式大小（与视口边缘保持间距）
	_panel = Panel.new()
	add_child(_panel)
	_resize_panel()

	# 面板内部用 VBoxContainer 纵向排列
	var vbox := VBoxContainer.new()
	vbox.set_anchors_and_offsets_preset(Control.PRESET_FULL_RECT)
	vbox.add_theme_constant_override("separation", 8)
	_panel.add_child(vbox)

	# 顶部内边距占位
	var pad_top := Control.new()
	pad_top.custom_minimum_size.y = 16
	vbox.add_child(pad_top)

	# 标题
	var title := Label.new()
	title.text = "选择会话  [Ctrl+P]"
	title.add_theme_font_size_override("font_size", 20)
	title.add_theme_color_override("font_color", Color(1, 1, 1))
	title.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	vbox.add_child(title)

	# 搜索输入框
	_search_input = LineEdit.new()
	_search_input.placeholder_text = "搜索会话..."
	_search_input.custom_minimum_size = Vector2(0, 36)
	_search_input.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	_search_input.add_theme_color_override("font_color", Color(0.85, 0.85, 0.85))
	_search_input.add_theme_color_override("background_color", Color(0.15, 0.15, 0.15))
	_search_input.right_icon = get_theme_icon("Search", "EditorIcons") if has_theme_icon("Search", "EditorIcons") else null
	_search_input.text_changed.connect(_on_search_changed)
	vbox.add_child(_search_input)

	# 分隔线
	var sep := ColorRect.new()
	sep.custom_minimum_size.y = 1
	sep.color = Color(0.3, 0.3, 0.3)
	sep.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	vbox.add_child(sep)

	# 会话列表 — 占满剩余垂直空间
	_scroll = ScrollContainer.new()
	_scroll.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	_scroll.size_flags_vertical = Control.SIZE_EXPAND_FILL
	vbox.add_child(_scroll)

	_list_container = VBoxContainer.new()
	_list_container.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	_scroll.add_child(_list_container)

	# 底部提示
	var hint := Label.new()
	hint.text = "点击选择  |  ESC 关闭"
	hint.add_theme_color_override("font_color", Color(0.5, 0.5, 0.5))
	hint.add_theme_font_size_override("font_size", 11)
	hint.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	hint.custom_minimum_size.y = 24
	vbox.add_child(hint)


func _resize_panel() -> void:
	## 根据视口大小计算面板的位置和尺寸，与边缘留间距
	var vp := get_viewport_rect().size

	# 左右留至少 80px，上下至少 60px
	var margin_x := maxi(80, int(vp.x * 0.08))
	var margin_y := maxi(60, int(vp.y * 0.06))

	var pw := int(vp.x) - margin_x * 2
	var ph := int(vp.y) - margin_y * 2

	_panel.position = Vector2(margin_x, margin_y)
	_panel.size = Vector2(pw, ph)


func _on_bg_click(event: InputEvent) -> void:
	# 点击遮罩关闭
	if event is InputEventMouseButton and event.pressed and event.button_index == MOUSE_BUTTON_LEFT:
		dismissed.emit()
		visible = false


## 设置会话列表并显示
func show_sessions(sessions: Array, current_id: String = "") -> void:
	_all_sessions = sessions.duplicate()
	_search_input.text = ""
	visible = true
	_resize_panel()

	call_deferred("_render_filtered", current_id)
	_search_input.grab_focus()


func _render_filtered(current_id: String) -> void:
	var query := _search_input.text.strip_edges().to_lower()

	# 清空旧列表
	for c in _list_container.get_children():
		c.queue_free()
	_session_btns.clear()

	# 过滤并渲染
	for s in _all_sessions as Array:
		if not (s is Dictionary):
			continue
		var sid: String = s.get("id", "")
		var title: String = s.get("title", "")

		# 搜索过滤
		if not query.is_empty():
			if not title.to_lower().contains(query) and not sid.contains(query):
				continue

		var btn := Button.new()
		btn.text = "  " + title
		btn.size_flags_horizontal = Control.SIZE_EXPAND_FILL
		btn.custom_minimum_size = Vector2(0, 38)

		if sid == current_id:
			btn.text = "  " + title + "  ✓"
			btn.disabled = true

		btn.pressed.connect(_on_session_pick.bind(sid))
		_list_container.add_child(btn)
		_session_btns[sid] = btn


func _on_search_changed(_new_text: String) -> void:
	_render_filtered("")


func _on_session_pick(sid: String) -> void:
	session_selected.emit(sid)
	visible = false
