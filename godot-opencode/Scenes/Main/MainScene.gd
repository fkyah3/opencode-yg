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

# ── 会话选择器 ──
var _session_picker: SessionPicker

# ── 通信层 ──
var _api: OpenCodeAPI
var _sse: SSEClient

# ── 会话状态 ──
var _current_session_id: String = ""
var _streaming_text: String = ""
var _streaming_label: RichTextLabel
var _cached_sessions: Array = []  # 缓存的会话列表，避免重复 HTTP 请求

# ── 滚动防抖 ──
var _scroll_timer: float = 0.0
var _scroll_pending: bool = false

# ── 权限 / 问题对话框 ──
var _permission_dialog: PermissionDialog
var _question_dialog: QuestionDialog
var _pending_permissions: Dictionary = {}  # request_id → properties
var _pending_questions: Dictionary = {}    # request_id → properties


func _ready() -> void:
	_init_api()
	_init_sse()
	_init_dialogs()
	_init_session_picker()
	await _bootstrap()


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
	# 未处理的键盘快捷键
	if event is InputEventKey and event.pressed and event.keycode == KEY_P:
		if event.ctrl_pressed and not _session_picker.visible:
			_open_session_picker()
			get_viewport().set_input_as_handled()
			return

	if event is InputEventKey and event.pressed and event.keycode == KEY_ESCAPE:
		if _session_picker.visible:
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


func _process(delta: float) -> void:
	# 防抖滚动: 每 0.1s 最多触发一次
	if _scroll_pending:
		_scroll_timer += delta
		if _scroll_timer >= 0.1:
			_scroll_timer = 0.0
			_scroll_pending = false
			_do_scroll_to_bottom()


func _bootstrap() -> void:
	_set_status("连接服务器...")

	var ok := await _api.health_check()
	if not ok:
		_set_status("❌ 服务器不可用")
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


## 刷新当前会话的消息列表
func _open_session(sid: String) -> void:
	# 清理旧流式状态
	_streaming_label = null

	_current_session_id = sid
	_clear_messages()
	_set_status("加载消息...")

	# 通过 API 层获取消息
	var msgs = await _api.get_messages(sid)
	if msgs.size() > 0:
		for msg in msgs:
			_render_message(msg)

	_scroll_to_bottom()
	_set_status("")


func _refresh_messages() -> void:
	var msgs = await _api.get_messages(_current_session_id)
	if msgs.size() == 0:
		return
	_clear_messages()
	for msg in msgs:
		_render_message(msg)
	_scroll_to_bottom()


func _render_message(msg: Variant) -> void:
	if msg == null or not (msg is Dictionary):
		return

	var d: Dictionary = msg as Dictionary

	var role: String = d.get("role", "")
	if role.is_empty() and d.has("info"):
		role = d["info"].get("role", "")

	var parts: Array = d.get("parts", [])

	var bbcode := ""
	var is_user := role == "user"
	var name_tag := "你" if is_user else "AI"
	bbcode += "[b]" + name_tag + "[/b]\n"

	for part in parts:
		if not (part is Dictionary):
			continue
		var p: Dictionary = part as Dictionary
		var ptype: String = p.get("type", "")
		if ptype == "text":
			bbcode += p.get("text", "")
		elif ptype == "reasoning":
			bbcode += "[color=#888888]" + p.get("text", "") + "[/color]"
		elif ptype == "tool":
			var tname: String = p.get("tool", "")
			var state: Dictionary = p.get("state", {})
			var stype: String = state.get("status", "")
			var icon := "🛠" if stype != "done" else "✅"
			bbcode += "\n" + icon + " [i]" + tname + "[/i]"

	var bubble := PanelContainer.new()
	bubble.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	var label := RichTextLabel.new()
	label.bbcode_enabled = true
	label.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART
	label.fit_content = true
	label.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	label.size_flags_vertical = Control.SIZE_EXPAND_FILL

	var style := StyleBoxFlat.new()
	if is_user:
		style.bg_color = Color("#2b5278")
	else:
		style.bg_color = Color("#2d2d2d")
	style.corner_radius_top_left = 6
	style.corner_radius_top_right = 6
	style.corner_radius_bottom_right = 6
	style.corner_radius_bottom_left = 6
	style.content_margin_left = 8
	style.content_margin_right = 8
	style.content_margin_top = 8
	style.content_margin_bottom = 8
	bubble.add_theme_stylebox_override("panel", style)

	bubble.add_child(label)
	label.append_text(bbcode)
	msg_list.add_child(bubble)


func _on_send_pressed() -> void:
	var text := msg_input.text.strip_edges()
	if text.is_empty() or _current_session_id.is_empty():
		return

	msg_input.text = ""
	_set_status("发送中...")

	_render_message({"role": "user", "parts": [{"type": "text", "text": text}]})

	_streaming_text = ""
	_streaming_label = RichTextLabel.new()
	_streaming_label.bbcode_enabled = true
	_streaming_label.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART
	_streaming_label.fit_content = true
	_streaming_label.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	_streaming_label.size_flags_vertical = Control.SIZE_EXPAND_FILL

	var bubble := PanelContainer.new()
	bubble.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	var style := StyleBoxFlat.new()
	style.bg_color = Color("#2d2d2d")
	style.corner_radius_top_left = 6
	style.corner_radius_top_right = 6
	style.corner_radius_bottom_right = 6
	style.corner_radius_bottom_left = 6
	style.content_margin_left = 8
	style.content_margin_right = 8
	style.content_margin_top = 8
	style.content_margin_bottom = 8
	bubble.add_theme_stylebox_override("panel", style)
	bubble.add_child(_streaming_label)

	var name_label := RichTextLabel.new()
	name_label.bbcode_enabled = true
	name_label.fit_content = true
	name_label.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	name_label.append_text("[b]AI[/b]\n")
	msg_list.add_child(name_label)
	msg_list.add_child(bubble)
	_scroll_to_bottom()

	var result := await _api.send_message(_current_session_id, text)
	if result.is_empty():
		push_warning("send_message 返回空结果")
	else:
		# 用响应立即渲染最终消息，不依赖 SSE 补全
		_finalize_streaming()
		_render_message(result)
	_set_status("")


func _on_sse_event(event_type: String, properties: Dictionary) -> void:
	match event_type:
		"session.status":
			var sid: String = properties.get("sessionID", "")
			var status: Dictionary = properties.get("status", {})
			if status.get("type") == "idle" and sid == _current_session_id:
				_finalize_streaming()

		"message.part.delta":
			var sid: String = properties.get("sessionID", "")
			if sid != _current_session_id:
				return
			var field: String = properties.get("field", "")
			if field != "text":
				return
			var delta: String = properties.get("delta", "")
			if _streaming_label:
				_streaming_text += delta
				_streaming_label.text = _streaming_text
				_scroll_to_bottom()

		"message.updated":
			# SSE 通知有新消息完成时，刷新当前会话的消息列表
			var sid: String = properties.get("sessionID", "")
			if sid == _current_session_id and not _streaming_label:
				# 非流式场景下刷新消息列表
				_refresh_messages()

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


func _finalize_streaming() -> void:
	_streaming_label = null
	_scroll_to_bottom()


func _clear_messages() -> void:
	for child in msg_list.get_children():
		child.queue_free()


func _set_status(text: String) -> void:
	status_label.text = text


func _scroll_to_bottom() -> void:
	_scroll_pending = true


func _do_scroll_to_bottom() -> void:
	var max_v = scroll.get_v_scroll_bar().max_value
	scroll.set_deferred("scroll_vertical", max_v)
