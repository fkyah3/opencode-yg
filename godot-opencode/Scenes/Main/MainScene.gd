extends Control
class_name MainScene


@onready var msg_list: VBoxContainer = %MessageList
@onready var msg_input: TextEdit = %TextInput
@onready var send_btn: Button = %SendBtn
@onready var status_label: Label = %Status
@onready var scroll: ScrollContainer = %ScrollContainer
@onready var status_memory: Label = %StatusMemory
@onready var status_context: Label = %StatusContext
@onready var lsp_list: VBoxContainer = %LspList
@onready var info_workdir: Label = %InfoWorkdir
@onready var info_version: Label = %InfoVersion

# ── 信息栏（输入框上方） ──
@onready var info_agent: Label = %InfoAgent
@onready var info_model: Label = %InfoModel
@onready var info_ctx: Label = %InfoCtx
@onready var info_rate: Label = %InfoRate


# ═══════════════════ 导出变量（可在 Inspector 中调整） ═══════════════════
@export_group("字体设置")
@export var font_path_normal: String = "res://fonts/JetBrains_Mono/static/JetBrainsMono-Regular.ttf"
@export var font_path_bold: String = "res://fonts/JetBrains_Mono/static/JetBrainsMono-Bold.ttf"
@export var font_size_base: int = 16

@export_group("文字颜色")
@export var color_text: Color = Color(0.93, 0.93, 0.93, 1.0)
@export var color_text_dim: Color = Color(0.37, 0.37, 0.37, 1.0)
@export var color_text_name: Color = Color(0.75, 0.75, 0.75, 1.0)
@export var color_text_info: Color = Color(0.5, 0.5, 0.5, 1.0)

@export_group("气泡颜色")
@export var bubble_user_bg: Color = Color(0.13, 0.13, 0.13, 1.0)
@export var bubble_user_border: Color = Color(0.3, 0.6, 1.0, 1.0)
@export var bubble_ai_bg: Color = Color(0.07, 0.07, 0.07, 1.0)
@export var bubble_ai_border: Color = Color(0.75, 0.75, 0.75, 0.35)


# ── 会话选择器 ──
var _session_picker: SessionPicker

# ── 命令面板 ──
var _cmd_palette: CommandPalette

# ── 通信层 ──
var _api: OpenCodeAPI
var _sse: SSEClient

# ── 会话状态 ──
var _current_session_id: String = ""
var _cached_sessions: Array = []  # 缓存的会话列表，避免重复 HTTP 请求

# ── 流式渲染（按 Part 渲染，不全局累积） ──
var _streaming_root: VBoxContainer  # 流式消息的根容器（含名称标签）
var _streaming_parts: Dictionary = {}  # partID → {type, text, widget, container}
var _streaming_part_order: Array[String] = []  # 有序 partID 列表

# ── Agent/模型信息 ──
var _primary_agent_name: String = "-"
var _primary_model_name: String = "-"
var _context_memory: int = 0
var _context_total: int = 0

# ── Token 速率追踪 ──
var _rate_tokens: int = 0
var _rate_time: float = 0.0

# ── 消息分页 ──
const PAGE_SIZE: int = 20
const MAX_CACHE: int = 300  # 单次最多缓存消息数
var _all_messages: Array = []  # 当前会话的完整消息缓存
var _rendered_count: int = 0  # 已经渲染的消息条数

# ── 滚动防抖 ──
var _scroll_timer: float = 0.0
var _scroll_pending: bool = false

# ── 权限 / 问题对话框 ──
var _permission_dialog: PermissionDialog
var _question_dialog: QuestionDialog
var _pending_permissions: Dictionary = {}  # request_id → properties
var _pending_questions: Dictionary = {}    # request_id → properties


func _ready() -> void:
	_apply_font_theme()
	_init_api()
	_init_sse()
	_init_dialogs()
	_init_session_picker()
	_init_command_palette()
	await _bootstrap()
	_load_agent_info()
	# 监听输入框输入，检测 / 命令
	msg_input.text_changed.connect(_on_input_text_changed)


func _apply_font_theme() -> void:
	## 加载 JetBrains Mono 字体，设置全场景主题
	var font_normal := load(font_path_normal)
	var font_bold := load(font_path_bold)

	if font_normal == null:
		push_warning("无法加载字体: " + font_path_normal)
		return

	var theme := Theme.new()
	# Label
	theme.set_font("font", "Label", font_normal)
	theme.set_font_size("font_size", "Label", font_size_base)
	# RichTextLabel
	theme.set_font("normal_font", "RichTextLabel", font_normal)
	theme.set_font("bold_font", "RichTextLabel", font_bold)
	theme.set_font_size("normal_font_size", "RichTextLabel", font_size_base)
	theme.set_font_size("bold_font_size", "RichTextLabel", font_size_base)
	# Button
	theme.set_font("font", "Button", font_normal)
	theme.set_font_size("font_size", "Button", font_size_base - 1)
	# TextEdit
	theme.set_font("font", "TextEdit", font_normal)
	theme.set_font_size("font_size", "TextEdit", font_size_base)
	# LineEdit
	theme.set_font("font", "LineEdit", font_normal)
	theme.set_font_size("font_size", "LineEdit", font_size_base)

	self.theme = theme


func _init_command_palette() -> void:
	_cmd_palette = CommandPalette.new()
	_cmd_palette.visible = false
	_cmd_palette.command_selected.connect(_on_command_selected)
	add_child(_cmd_palette)


func _load_agent_info() -> void:
	var agent := await _api.get_primary_agent()
	if agent.is_empty():
		return
	_primary_agent_name = agent.get("name", "-")
	var model: Dictionary = agent.get("model", {})
	_primary_model_name = model.get("modelID", "-")
	_update_info_bar()


func _update_info_bar() -> void:
	# 设置 InfoBar 背景样式（纯黑底部信息栏 + 上边框分隔线）
	var info_bar := %InfoBar as PanelContainer
	if info_bar:
		var s := StyleBoxFlat.new()
		s.bg_color = Color(0.06, 0.06, 0.06, 1)
		s.content_margin_top = 2
		s.corner_radius_bottom_left = 0
		s.corner_radius_bottom_right = 0
		info_bar.add_theme_stylebox_override("panel", s)

	info_agent.text = "Agent: " + _primary_agent_name
	info_model.text = "Model: " + _primary_model_name
	var pct := 0.0
	if _context_total > 0:
		pct = float(_context_memory) / float(_context_total) * 100.0
	info_ctx.text = "Ctx: " + _format_tokens(_context_memory) + " / " + _format_tokens(_context_total) + " (" + str(int(pct)) + "%)"
	info_rate.text = "↑ " + str(_rate_tokens) + " tok/s" if _rate_time < 0.1 else "↑ " + str(int(float(_rate_tokens) / _rate_time)) + " tok/s"


func _format_tokens(n: int) -> String:
	if n >= 1000000:
		return str(snapped(float(n) / 1000000.0, 0.1)) + "M"
	if n >= 1000:
		return str(snapped(float(n) / 1000.0, 0.1)) + "K"
	return str(n)


func _init_session_picker() -> void:
	_session_picker = SessionPicker.new()
	_session_picker.visible = false
	_session_picker.session_selected.connect(_on_session_picker_selected)
	_session_picker.dismissed.connect(_on_session_picker_dismissed)
	add_child(_session_picker)

	# 侧边栏点击打开选择器
	%SessionHeader.text = "  打开会话 [Ctrl+P]"
	%SessionHeader.mouse_filter = Control.MOUSE_FILTER_STOP
	%SessionHeader.gui_input.connect(_on_session_header_input)


func _unhandled_input(event: InputEvent) -> void:
	if event is InputEventKey and event.pressed and event.keycode == KEY_P:
		if event.ctrl_pressed and not _session_picker.visible:
			_open_session_picker()
			get_viewport().set_input_as_handled()
			return

	if event is InputEventKey and event.pressed and event.keycode == KEY_ESCAPE:
		# 优先关闭命令面板
		if _cmd_palette and _cmd_palette.visible:
			_cmd_palette.hide_palette()
			msg_input.text = ""
			get_viewport().set_input_as_handled()
			return
		# 再关闭会话选择器
		if _session_picker and _session_picker.visible:
			_close_session_picker()
			get_viewport().set_input_as_handled()


func _on_session_header_input(event: InputEvent) -> void:
	if event is InputEventMouseButton and event.pressed and event.button_index == MOUSE_BUTTON_LEFT:
		_open_session_picker()


func _open_session_picker() -> void:
	# 移到场景树末尾，确保渲染在最前
	move_child(_session_picker, get_child_count())

	# 先显示空面板，用户看到"加载中"的即时反馈
	_session_picker.show_sessions([], _current_session_id)
	_session_picker.visible = true

	# 后台加载会话列表
	var sessions = await _api.list_sessions()
	if sessions is Array:
		_cached_sessions = sessions.duplicate()
		if _session_picker.visible:
			_session_picker.show_sessions(_cached_sessions, _current_session_id)


func _close_session_picker() -> void:
	_session_picker.visible = false


func _on_session_picker_selected(sid: String) -> void:
	await _open_session(sid)
	_close_session_picker()


func _on_command_selected(cmd_name: String) -> void:
	# 选中命令后直接发送
	_cmd_palette.hide_palette()
	msg_input.text = cmd_name
	_send_message_direct(msg_input.text)


func _on_input_text_changed() -> void:
	# TextEdit.text_changed 无参信号，用 msg_input.text 获取
	var t := msg_input.text
	# 输入 / 时立即弹出命令面板，不用等到按发送按钮
	if t.begins_with("/") and not _cmd_palette.visible:
		# 把 / 后面的内容传到面板搜索框，清空输入框
		var filter := t
		msg_input.text = ""
		_cmd_palette.show_palette(filter)


func _send_message_direct(text: String) -> void:
	if text.is_empty():
		return

	# 无当前会话时自动创建
	if _current_session_id.is_empty():
		var title := text.substr(0, min(text.length(), 30))
		var created := await _api.create_session(title)
		var sid: String = created.get("id", "")
		if sid.is_empty():
			_set_status("创建会话失败")
			return
		_current_session_id = sid
		_refresh_sessions()

	msg_input.text = ""
	_set_status("执行命令...")

	_render_message({"role": "user", "parts": [{"type": "text", "text": text}]})

	# 创建流式响应容器（由 SSE 事件实时填充）
	_create_streaming_widget()

	# 不阻塞等待，完全由 SSE 流式驱动渲染
	_api.send_message_async(_current_session_id, text)


func _on_session_picker_dismissed() -> void:
	_close_session_picker()


func _init_dialogs() -> void:
	# 权限请求对话框
	_permission_dialog = PermissionDialog.new()
	add_child(_permission_dialog)
	_permission_dialog.permission_replied.connect(_on_permission_replied)
	_permission_dialog.visible = false

	# 问题请求对话框
	_question_dialog = QuestionDialog.new()
	add_child(_question_dialog)
	_question_dialog.question_replied.connect(_on_question_replied)
	_question_dialog.question_rejected.connect(_on_question_rejected)
	_question_dialog.visible = false


func _init_api() -> void:
	_api = OpenCodeAPI.new()
	add_child(_api)


func _init_sse() -> void:
	_sse = SSEClient.new()
	add_child(_sse)
	_sse.event_received.connect(_on_sse_event)


func _launch_headless_server() -> void:
	## 后台启动 opencode headless 服务器（Windows 专用）
	## 使用 create_process 而非 execute，避免 GDScript 重载歧义。
	var opencode_root := "E:\\agent\\opencode-yg\\packages\\opencode"
	var bun_exe := "E:\\agent\\bun-main\\build\\release\\bun.exe"
	OS.create_process("cmd.exe", PackedStringArray([
		"/c", "cd", "/d", opencode_root, "&&",
		bun_exe, "run", "--conditions=browser", "src/index.ts", "--port", "4096"
	]), false)


var _pending_refresh: bool = false  # 由 _process 处理的异步刷新请求


func _process(delta: float) -> void:
	# 防抖滚动
	if _scroll_pending:
		_scroll_timer += delta
		if _scroll_timer >= 0.1:
			_scroll_timer = 0.0
			_scroll_pending = false
			_do_scroll_to_bottom()
	
	# 延迟异步刷新（避让信号处理器中的 await GC 陷阱）
	if _pending_refresh:
		_pending_refresh = false
		_refresh_messages()


func _bootstrap() -> void:
	_set_status("连接服务器...")

	var ok := await _api.health_check()
	if not ok:
		_set_status("启动服务器...")
		_launch_headless_server()
		# 等 4 秒让服务器初始化
		await get_tree().create_timer(4.0).timeout
		ok = await _api.health_check()
		if not ok:
			_set_status("❌ 服务器不可用，请在终端手动运行 opencode")
			return

	_set_status("获取会话列表...")
	await _refresh_sessions()

	# 异步加载侧边栏信息，不阻塞主流程
	_refresh_sidebar_info()

	_set_status("")
	_sse.start()


func _refresh_sidebar_info() -> void:
	var path_data = await _api.get_path_info()
	if path_data is Dictionary:
		var dir_path: String = path_data.get("directory", "")
		if not dir_path.is_empty():
			var parts := dir_path.split("/")
			if parts.size() > 2:
				dir_path = ".../" + parts[parts.size() - 2] + "/" + parts[parts.size() - 1]
			info_workdir.text = "  工作目录: " + dir_path

	var lsp_data = await _api.get_lsp_info()
	if lsp_data is Array:
		_update_lsp_list(lsp_data)

	var agent_data = await _api.get_agent_info()
	if agent_data is Array and agent_data.size() > 0:
		info_version.text = "  OpenCode " + agent_data[0].get("version", "")


func _update_lsp_list(lsp_data: Array) -> void:
	for child in lsp_list.get_children():
		child.queue_free()

	for item in lsp_data as Array:
		if not (item is Dictionary):
			continue
		var lang_name: String = item.get("name", "")
		var status_name: String = item.get("status", "unknown")
		var color := Color(0.5, 0.8, 0.5) if status_name == "running" else Color(0.8, 0.5, 0.5)
		var icon := "●" if status_name == "running" else "○"

		var label := RichTextLabel.new()
		label.bbcode_enabled = true
		label.fit_content = true
		label.size_flags_horizontal = Control.SIZE_EXPAND_FILL
		label.add_theme_font_size_override("font_size", 11)
		label.append_text("  [color=#" + color.to_html() + "]" + icon + "[/color] " + lang_name)
		lsp_list.add_child(label)


func _refresh_sessions() -> void:
	var sessions = await _api.list_sessions()
	if sessions is Array and sessions.size() > 0:
		_cached_sessions = sessions.duplicate()
		_set_status("" + str(sessions.size()) + " 个会话")
	else:
		push_warning("[MainScene] 没有会话或请求失败, sessions=", str(sessions))



func _open_session(sid: String) -> void:
	## 打开会话，一次加载最多 MAX_CACHE 条，分页渲染
	_finalize_streaming()  # 清理仍在运行的流式状态

	_current_session_id = sid
	_clear_messages()
	_set_status("加载消息...")

	# 一次加载最多 MAX_CACHE 条，全部缓存
	_all_messages = await _api.get_messages(sid, MAX_CACHE)
	if _all_messages.size() == 0:
		_set_status("(无消息)")
		return

	# 渲染最近 PAGE_SIZE 条
	_render_page_from_cache(max(0, _all_messages.size() - PAGE_SIZE))
	_set_status(str(_all_messages.size()) + " 条消息，显示 " + str(_rendered_count) + " 条")
	_scroll_to_bottom()


func _refresh_messages() -> void:
	## 刷新全部消息（重新加载缓存并分页渲染）
	var msgs = await _api.get_messages(_current_session_id, MAX_CACHE)
	if msgs == null or msgs.size() == 0:
		return
	_all_messages = msgs
	_clear_messages()
	_render_page_from_cache(max(0, _all_messages.size() - PAGE_SIZE))
	_scroll_to_bottom()


func _render_page_from_cache(start_idx: int) -> void:
	## 从缓存 _all_messages 中渲染 start_idx 之后的所有消息
	_rendered_count = _all_messages.size() - start_idx
	for i in range(start_idx, _all_messages.size()):
		_render_message(_all_messages[i])

	# 如果有更早的消息，添加"加载更多"按钮
	if start_idx > 0:
		_add_load_more_button()


func _add_load_more_button() -> void:
	## 在消息列表顶部添加"加载更多"按钮
	var btn := Button.new()
	btn.text = "  加载更早的消息..."
	btn.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	btn.add_theme_color_override("font_color", Color(0.5, 0.5, 0.5, 1))
	btn.flat = true
	btn.pressed.connect(_load_more_messages)
	msg_list.add_child(btn)
	msg_list.move_child(btn, 0)


func _load_more_messages() -> void:
	## 加载更多历史消息（从缓存中取出更早的）
	if _all_messages.size() == 0:
		return

	# 计算当前最早渲染的消息索引
	var current_start := _all_messages.size() - _rendered_count
	var next_start: int = max(0, current_start - PAGE_SIZE)

	# 移除"加载更多"按钮
	for c in msg_list.get_children():
		if c is Button and c.text.begins_with("  加载"):
			msg_list.remove_child(c)
			c.queue_free()
			break

	# 逆序插入到列表头部
	var insert_idx := 0
	for i in range(next_start, current_start):
		_render_message(_all_messages[i])
		msg_list.move_child(msg_list.get_child(msg_list.get_child_count() - 1), insert_idx)
		insert_idx += 1

	_rendered_count = _all_messages.size() - next_start

	# 如果还有更早的消息，重新添加按钮
	if next_start > 0:
		_add_load_more_button()
	_set_status("")


func _render_message(msg: Variant) -> void:
	if msg == null or not (msg is Dictionary):
		return

	var d: Dictionary = msg as Dictionary

	var role: String = d.get("role", "")
	if role.is_empty() and d.has("info"):
		role = d["info"].get("role", "")

	var parts: Array = d.get("parts", [])

	var is_user := role == "user"
	var name_tag := "你" if is_user else "AI"

	# ── 提取文本和思考内容 ──
	var text_parts := PackedStringArray()
	var thinking_text := ""
	for part in parts:
		if not (part is Dictionary):
			continue
		var p: Dictionary = part as Dictionary
		var ptype: String = p.get("type", "")
		if ptype == "text":
			text_parts.append(p.get("text", ""))
		elif ptype == "reasoning":
			thinking_text += p.get("text", "")
		elif ptype == "tool":
			var tname: String = p.get("tool", "")
			var state: Dictionary = p.get("state", {})
			var stype: String = state.get("status", "")
			var icon := "🛠" if stype != "done" else "✅"
			text_parts.append(icon + " [i]" + tname + "[/i]")

	# ── 消息容器（VBox，包含名称 + 气泡） ──
	var msg_vbox := VBoxContainer.new()
	msg_vbox.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	msg_vbox.add_theme_constant_override("separation", 2)

	# ── 名称标签 ──
	var name_label := RichTextLabel.new()
	name_label.bbcode_enabled = true
	name_label.fit_content = true
	name_label.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	name_label.add_theme_font_size_override("normal_font_size", font_size_base - 3)
	name_label.add_theme_color_override("default_color", color_text_name)
	name_label.append_text(name_tag)

	# ── 创建气泡（用户 + AI 统一用 PanelContainer） ──
	if is_user:
		# ── 用户气泡：深灰背景 + 蓝色左边条 ──
		var bubble := PanelContainer.new()
		bubble.size_flags_horizontal = Control.SIZE_EXPAND_FILL
		var style := StyleBoxFlat.new()
		style.bg_color = bubble_user_bg
		style.border_width_left = 3
		style.border_color = bubble_user_border
		style.corner_radius_bottom_right = 6
		style.corner_radius_top_right = 6
		style.content_margin_left = 10
		style.content_margin_right = 10
		style.content_margin_top = 6
		style.content_margin_bottom = 6
		bubble.add_theme_stylebox_override("panel", style)

		var label := _make_msg_label()
		label.text = "\n".join(text_parts)
		bubble.add_child(label)

		msg_vbox.add_child(name_label)
		msg_vbox.add_child(bubble)

	else:
		# ── AI 气泡：稍深背景 + 极浅灰色左边条 ──
		msg_vbox.add_child(name_label)

		# 思考内容直接显示（不折叠）
		if not thinking_text.is_empty():
			var think_content := RichTextLabel.new()
			think_content.bbcode_enabled = true
			think_content.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART
			think_content.fit_content = true
			think_content.size_flags_horizontal = Control.SIZE_EXPAND_FILL
			think_content.add_theme_font_size_override("normal_font_size", font_size_base - 1)
			# BBCode 灰色渲染思考文本 + "思考：" 前缀
			var col_html := color_text_dim.to_html(true)
			think_content.append_text("[color=#" + col_html + "]思考：" + thinking_text + "[/color]")
			msg_vbox.add_child(think_content)

		# 主回复气泡
		if text_parts.size() > 0:
			if not thinking_text.is_empty():
				var spacing := ColorRect.new()
				spacing.custom_minimum_size = Vector2(0, 4)
				spacing.color = Color.TRANSPARENT
				msg_vbox.add_child(spacing)

			var bubble := PanelContainer.new()
			bubble.size_flags_horizontal = Control.SIZE_EXPAND_FILL
			var style := StyleBoxFlat.new()
			style.bg_color = Color(0.07, 0.07, 0.07, 1)  # 比纯黑稍亮
			style.border_width_left = 3
			style.border_color = Color(0.75, 0.75, 0.75, 0.35)  # 极浅灰
			style.corner_radius_bottom_right = 6
			style.corner_radius_top_right = 6
			style.content_margin_left = 10
			style.content_margin_right = 10
			style.content_margin_top = 6
			style.content_margin_bottom = 6
			bubble.add_theme_stylebox_override("panel", style)

			var label := _make_msg_label()
			label.text = "\n".join(text_parts)
			bubble.add_child(label)
			msg_vbox.add_child(bubble)

	msg_list.add_child(msg_vbox)


func _make_msg_label() -> MarkdownLabel:
	## 统一创建消息文本标签（调小字号、轻色），使用 MarkdownLabel 渲染 Markdown 内容
	var label := MarkdownLabel.new()
	label.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART
	label.fit_content = true
	label.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	label.add_theme_font_size_override("normal_font_size", font_size_base)
	label.add_theme_font_size_override("bold_font_size", font_size_base)
	label.add_theme_color_override("default_color", color_text)
	return label


func _on_send_pressed() -> void:
	var text := msg_input.text.strip_edges()
	if text.is_empty():
		return

	# 无当前会话时自动创建
	if _current_session_id.is_empty():
		var title := text.substr(0, min(text.length(), 30))
		var created := await _api.create_session(title)
		var sid: String = created.get("id", "")
		if sid.is_empty():
			_set_status("创建会话失败")
			return
		_current_session_id = sid
		# 通知会话选择器更新
		_refresh_sessions()

	msg_input.text = ""
	_set_status("思考中...")

	_render_message({"role": "user", "parts": [{"type": "text", "text": text}]})

	# 创建流式响应容器（由 SSE 事件实时填充）
	_create_streaming_widget()

	# 不阻塞等待，完全由 SSE 流式驱动渲染
	_api.send_message_async(_current_session_id, text)


func _on_sse_event(event_type: String, properties: Dictionary) -> void:
	match event_type:
		"session.status":
			var sid: String = properties.get("sessionID", "")
			var status: Dictionary = properties.get("status", {})
			if status.get("type") == "idle" and sid == _current_session_id:
				# 先就地渲染流式内容为 MarkdownLabel
				_finalize_streaming_content()
				_finalize_streaming()
				_set_status("")
				# 通过 _process 触发异步刷新，避让信号处理器中 await 被 GC
				_pending_refresh = true
			# 更新上下文 Token 数
			var mem: int = status.get("memory", _context_memory)
			var ctx: int = status.get("context", _context_total)
			if mem != _context_memory or ctx != _context_total:
				_context_memory = mem
				_context_total = ctx
				_update_info_bar()

		"message.part.delta":
			var sid: String = properties.get("sessionID", "")
			if sid != _current_session_id:
				return
			var part_id: String = properties.get("partID", "")
			var field: String = properties.get("field", "")
			var delta: String = properties.get("delta", "")
			
			if part_id.is_empty() or field.is_empty():
				return
			
			# 首次遇到 partID → 创建部件
			if not _streaming_parts.has(part_id):
				if not is_instance_valid(_streaming_root):
					return  # 流式容器已被清理（如 clear_messages 触发时）
				_create_streaming_part(part_id, field, _streaming_root)
			
			var part: Dictionary = _streaming_parts[part_id]
			part.text += delta
			
			# 更新对应部件的文本
			match part.type:
				"reasoning":
					var col := color_text_dim.to_html(false)
					part.widget.clear()
					part.widget.append_text("[color=#" + col + "]思考：" + part.text + "[/color]")
					part.widget.visible = true
					if part.container is PanelContainer:
						part.container.visible = true
				"text":
					var prev_in_code: bool = part.get("_code_in_fence", false)
					var now_in_code: bool = _is_streaming_code_block(part.text)
					part._code_in_fence = now_in_code
					
					if now_in_code:
						# 代码块内：不逐字推送，提取围栏前的内容 + 占位符
						if not prev_in_code:
							# 刚进入代码块，截取围栏前的文本用于显示
							part._pre_code_text = part.text.rsplit("```", 1)[0]
						var pre: String = part.get("_pre_code_text", "")
						part.widget.text = pre + ("\n" if pre.length() > 0 else "") + "```\n(代码块生成中...)\n```"
					else:
						# 不在代码块内，但刚退出时也不 dump 原始文本
						if prev_in_code:
							# 刚退出代码块：保持占位符，不显示原始围栏内容
							pass
						else:
							# 普通文本（围栏之前或之间）：正常流式更新
							part.widget.text = part.text
				"tool":
					part.widget.text = "🛠 " + part.text
				
			_scroll_to_bottom()

		"message.updated":
			# SSE 通知有新消息完成——不再直接刷新，由 session.status/idle
			# 事件通过 _pending_refresh 触发单次刷新，避免双刷新闪屏
			pass

		"permission.asked":
			_on_permission_asked(properties)

		"question.asked":
			_on_question_asked(properties)

		"server.heartbeat":
			pass


# ── 权限处理 ──

func _on_permission_asked(properties: Dictionary) -> void:
	## 收到 permission.asked SSE 事件，弹出权限对话框
	var request_id: String = properties.get("id", "")
	var permission: String = properties.get("permission", "")
	var patterns: Array = properties.get("patterns", [])
	var metadata: Dictionary = properties.get("metadata", {})
	var sid: String = properties.get("sessionID", "")

	if sid != _current_session_id:
		# 不是当前会话的权限请求，暂存但不弹窗
		_pending_permissions[request_id] = properties
		return

	# 存储到待处理列表
	_pending_permissions[request_id] = properties

	# 弹出对话框
	_permission_dialog.show_permission(request_id, permission, patterns, metadata)


func _on_permission_replied(request_id: String, reply_type: String, message: String) -> void:
	## 用户回应了权限请求，发送到服务器
	_pending_permissions.erase(request_id)
	await _api.reply_permission(request_id, reply_type, message)


# ── 问题处理 ──

func _on_question_asked(properties: Dictionary) -> void:
	## 收到 question.asked SSE 事件，弹出问题对话框
	var request_id: String = properties.get("id", "")
	var question: String = properties.get("question", "")
	var options: Array = properties.get("options", [])
	var allow_multiple: bool = properties.get("allow_multiple", true)  # 默认多选
	var sid: String = properties.get("sessionID", "")

	if sid != _current_session_id:
		_pending_questions[request_id] = properties
		return

	_pending_questions[request_id] = properties
	_question_dialog.show_question(request_id, question, options, allow_multiple)


func _on_question_replied(request_id: String, answers: Array) -> void:
	## 用户回答了问题，发送到服务器
	_pending_questions.erase(request_id)
	await _api.reply_question(request_id, answers)


func _on_question_rejected(request_id: String) -> void:
	## 用户跳过了问题
	_pending_questions.erase(request_id)
	# 发送空回答表示跳过
	await _api.reply_question(request_id, [])


func _create_streaming_widget() -> VBoxContainer:
	## 创建流式消息的根容器。SSE PartDelta 到达时动态追加子部件。
	_streaming_parts.clear()
	_streaming_part_order.clear()
	
	var msg_vbox := VBoxContainer.new()
	msg_vbox.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	msg_vbox.add_theme_constant_override("separation", 2)
	
	# 名称标签
	var name_label := RichTextLabel.new()
	name_label.bbcode_enabled = true
	name_label.fit_content = true
	name_label.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	name_label.add_theme_font_size_override("normal_font_size", font_size_base - 3)
	name_label.add_theme_color_override("default_color", color_text_name)
	name_label.append_text("AI")
	msg_vbox.add_child(name_label)
	
	_streaming_root = msg_vbox
	msg_list.add_child(msg_vbox)
	_scroll_to_bottom()
	return msg_vbox


func _create_streaming_part(part_id: String, field: String, parent: VBoxContainer) -> void:
	## 按 field 类型创建流式部件并加入 parent 末尾。
	## reasoning → 带左边条的半透明面板
	## text     → AI 气泡
	## tool     → 单行工具名称
	var type: String = field
	var container: Control
	var widget: RichTextLabel
	
	match type:
		"reasoning":
			var panel := PanelContainer.new()
			panel.size_flags_horizontal = Control.SIZE_EXPAND_FILL
			panel.visible = false
			var pstyle := StyleBoxFlat.new()
			pstyle.bg_color = Color(0.37, 0.37, 0.37, 0.07)
			pstyle.border_width_left = 2
			pstyle.border_color = Color(0.37, 0.37, 0.37, 0.35)
			pstyle.content_margin_left = 8
			pstyle.content_margin_right = 4
			pstyle.content_margin_top = 2
			pstyle.content_margin_bottom = 2
			panel.add_theme_stylebox_override("panel", pstyle)
			
			widget = RichTextLabel.new()
			widget.bbcode_enabled = true
			widget.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART
			widget.fit_content = true
			widget.size_flags_horizontal = Control.SIZE_EXPAND_FILL
			widget.add_theme_font_size_override("normal_font_size", font_size_base - 1)
			widget.add_theme_color_override("default_color", color_text_dim)
			
			panel.add_child(widget)
			container = panel
		
		"text":
			var bubble := PanelContainer.new()
			bubble.size_flags_horizontal = Control.SIZE_EXPAND_FILL
			var bstyle := StyleBoxFlat.new()
			bstyle.bg_color = Color(0.07, 0.07, 0.07, 1)
			bstyle.border_width_left = 3
			bstyle.border_color = Color(0.75, 0.75, 0.75, 0.35)
			bstyle.corner_radius_bottom_right = 6
			bstyle.corner_radius_top_right = 6
			bstyle.content_margin_left = 10
			bstyle.content_margin_right = 10
			bstyle.content_margin_top = 6
			bstyle.content_margin_bottom = 6
			bubble.add_theme_stylebox_override("panel", bstyle)
			
			widget = RichTextLabel.new()
			widget.bbcode_enabled = true
			widget.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART
			widget.fit_content = true
			widget.size_flags_horizontal = Control.SIZE_EXPAND_FILL
			widget.add_theme_font_size_override("normal_font_size", font_size_base)
			widget.add_theme_color_override("default_color", color_text)
			
			bubble.add_child(widget)
			container = bubble
		
		_:
			# tool 及其它类型：简单 RichTextLabel 行
			widget = RichTextLabel.new()
			widget.bbcode_enabled = true
			widget.fit_content = true
			widget.size_flags_horizontal = Control.SIZE_EXPAND_FILL
			widget.add_theme_font_size_override("normal_font_size", font_size_base)
			widget.add_theme_color_override("default_color", color_text)
			container = widget
	
	parent.add_child(container)
	
	_streaming_parts[part_id] = {
		type = type,
		text = "",
		widget = widget,
		container = container,
	}
	_streaming_part_order.append(part_id)


func _finalize_streaming() -> void:
	## 流式完成后清理流式状态
	_streaming_root = null
	_streaming_parts.clear()
	_streaming_part_order.clear()
	_scroll_to_bottom()


func _finalize_streaming_content() -> void:
	## 流式完成后，将 text 类型的 RichTextLabel 替换为 MarkdownLabel
	for part_id in _streaming_parts:
		var part: Dictionary = _streaming_parts[part_id]
		if part.type != "text":
			continue
		
		var old_label: RichTextLabel = part.widget
		var parent: Control = part.container
		
		var md := MarkdownLabel.new()
		md.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART
		md.fit_content = true
		md.size_flags_horizontal = Control.SIZE_EXPAND_FILL
		md.add_theme_font_size_override("normal_font_size", font_size_base)
		md.add_theme_font_size_override("bold_font_size", font_size_base)
		md.add_theme_color_override("default_color", color_text)
		md.text = part.text
		
		# 替换气泡内标签
		if parent is PanelContainer and old_label in parent.get_children():
			parent.remove_child(old_label)
			old_label.queue_free()
			parent.add_child(md)
		else:
			# 兜底：直接替换父节点
			parent.visible = false
	
	_scroll_to_bottom()


func _clear_messages() -> void:
	for child in msg_list.get_children():
		child.queue_free()


func _set_status(text: String) -> void:
	status_label.text = text


func _is_streaming_code_block(accumulated: String) -> bool:
	## 检测累计文本中是否处于未闭合的代码围栏内
	## 统计 ``` 出现的次数，奇数次 = 在代码块内
	var idx := 0
	var fence_count := 0
	while true:
		idx = accumulated.find("```", idx)
		if idx == -1:
			break
		fence_count += 1
		idx += 3
	return fence_count % 2 == 1


func _scroll_to_bottom() -> void:
	_scroll_pending = true


func _do_scroll_to_bottom() -> void:
	call_deferred("_apply_scroll_to_bottom")


func _apply_scroll_to_bottom() -> void:
	var max_v = scroll.get_v_scroll_bar().max_value
	if max_v > 0:
		scroll.set_deferred("scroll_vertical", max_v)
