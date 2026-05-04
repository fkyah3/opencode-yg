extends Control
class_name MainScene


@onready var virtual_content: Control = %VirtualContent
@onready var msg_input: TextEdit = %TextInput
@onready var send_btn: Button = %SendBtn
@onready var status_label: Label = %Status
@onready var scroll: ScrollContainer = %ScrollContainer
@onready var status_memory: Label = %StatusMemory
@onready var status_context: Label = %StatusContext
@onready var lsp_list: VBoxContainer = %LspList
@onready var info_workdir: Label = %InfoWorkdir
@onready var info_version: Label = %InfoVersion
@onready var connect_btn: Button = %ConnectBtn

# ── 信息栏（输入框上方） ──
@onready var info_agent: Label = %InfoAgent
@onready var info_model: Label = %InfoModel
@onready var info_ctx: Label = %InfoCtx
@onready var info_balance: Label = %InfoBalance
@onready var info_rate: Label = %InfoRate


# ── 会话选择器 ──
var _session_picker: SessionPicker

# ── 命令面板 ──
var _cmd_palette: CommandPalette

# ── 通信层 ──
var _api: OpenCodeAPI
var _sse: SSEClient

# ── 会话状态 ──
var _current_session_id: String = ""
var _streaming_text: String = ""
var _streaming_reasoning_text: String = ""
var _raw_toggle: CheckBox
var _scroll_pending: bool = false

# ── 懒加载状态 ──
var _lazy_cursor: String = ""
var _lazy_loading: bool = false
var _has_loaded_all: bool = false
var _refreshing_messages: bool = false

# ── 行级缓存 ──
var _row_data: Array = []

# ── 流式渲染相关 ──
var _streaming_label: RichTextLabel
var _streaming_node: Control

# ── 上下文 ──
var _context_memory: int = 0
var _context_total: int = 0
var _raw_mode: bool = true  # RAW 模式：显示原文，不经过 Markdown 渲染
var _cached_sessions: Array = []  # 会话列表缓存

# ── Token 速率 ──
var _rate_tokens: int = 0
var _rate_time: float = 0.0

# ── 余额 ──
var _balance_text: String = "余额: 未配置"

# ── 权限 / 问题对话框 ──
var _permission_dialog: PermissionDialog
var _question_dialog: QuestionDialog
var _pending_permissions: Dictionary = {}  # request_id → properties
var _pending_questions: Dictionary = {}    # request_id → properties

# ── 连接对话框 ──
var _connection_dialog: ConnectionDialog

# ── 模型信息（从 Agent API 加载） ──
var _primary_agent_name: String = ""
var _primary_model_name: String = ""


# ═══════════════════ 导出变量（可在 Inspector 中调整） ═══════════════════
@export var theme_config: ThemeConfig

@export_group("布局")
## 聊天框左右内边距（像素）
@export var chat_padding_h: int = 8
## 消息滚动区与输入框之间的间距（像素）
@export var chat_input_gap: int = 4
## 输入框内边距（像素，统一设置上下左右）
@export var input_padding: int = 8
## 输入框本身的最小高度（像素）
@export var input_min_height: int = 80
	## 当前会话状态（用于侧边栏指示器）
var _session_state: String = "idle"  # idle | sending | thinking | generating | tool_call
var _streaming_just_finalized: bool = false  # 阻止 message.updated 触发 _refresh_messages 销毁刚完成的流式节点

## 首次加载的消息条数（默认 50，数值越小启动越快，拉到顶会自动加载更多）
@export var load_limit: int = 50

# ── 子模块（注入 ThemeConfig 后初始化，顺序：theme_config → PartRenderer → SSEHandler） ──
@onready var part_renderer: PartRenderer = PartRenderer.new(theme_config)
@onready var message_log: MessageLog = MessageLog.new(virtual_content, theme_config, part_renderer)
@onready var sse_handler: SSEHandler = _create_sse_handler()


func _create_sse_handler() -> SSEHandler:
	var h := SSEHandler.new()
	h.on_part_delta = func(sid: String, _part_id: String, field: String, delta: String) -> void:
		if sid != _current_session_id:
			return
		if field == "reasoning":
			_update_session_state("thinking")
			_streaming_text += delta
			if _streaming_label != null:
				_streaming_label.text = _streaming_text
				_scroll_to_newest()
		elif field == "text":
			_update_session_state("generating")
			_streaming_text += delta
			if _streaming_label != null:
				_streaming_label.text = _streaming_text
				_scroll_to_newest()
			_rate_tokens += delta.length()
			if _rate_time < 0.001:
				_rate_time = 0.001
				_rate_tokens = 0
			else:
				_rate_time += 0.1

	h.on_session_status = func(sid: String, status: Dictionary) -> void:
		if status.get("type") == "idle" and sid == _current_session_id:
			_finalize_streaming()
			_update_session_state("idle")
		var mem: int = status.get("memory", _context_memory)
		var ctx: int = status.get("context", _context_total)
		_context_memory = mem
		_context_total = ctx
		_update_info_bar()

	h.on_tool_updated = func(sid: String, tool_name: String, status: String, _title: String, state: Dictionary = {}) -> void:
		if sid != _current_session_id or _streaming_label == null:
			return
		_update_session_state("tool_call")
		var icon: String = "✅" if status == "completed" else ("❌" if status == "error" else "🔧")
		_streaming_text += "\n[b]" + icon + " " + tool_name + "[/b]"
		# 渲染工具调用的 input（命令内容）和 output（执行结果）
		var input_val: Variant = state.get("input", {})
		if input_val is Dictionary:
			var content: String = input_val.get("content", "")
			if not content.is_empty():
				_streaming_text += "\n```\n" + content.left(1500) + "\n```"
		elif input_val is String and not input_val.is_empty():
			_streaming_text += "\n```\n" + str(input_val).left(1500) + "\n```"
		if status == "completed":
			var output: String = state.get("output", "")
			if not output.is_empty():
				_streaming_text += "\n[color=#88cc88]" + output.left(1000) + "[/color]"
		if _streaming_label != null:
			_streaming_label.text = _streaming_text
			_scroll_to_newest()

	h.on_message_updated = func(sid: String) -> void:
		if sid == _current_session_id and _streaming_label == null and not _streaming_just_finalized:
			_refresh_messages()

	h.on_permission_asked = func(props: Dictionary) -> void:
		_on_permission_asked(props)

	h.on_question_asked = func(props: Dictionary) -> void:
		_on_question_asked(props)

	h.on_server_connected = func() -> void:
		_update_info_bar()
		_fetch_balance()
		if _api and is_instance_valid(_api):
			_refresh_sessions()

	return h


func _ready() -> void:
	print("→ _ready")
	_apply_font_theme()
	_init_api()
	_init_sse()
	_init_dialogs()
	_init_session_picker()
	_init_command_palette()
	await _bootstrap()
	await _load_agent_info()
	_update_info_bar()
	# 监听输入框输入，检测 / 命令
	msg_input.text_changed.connect(_on_input_text_changed)
	# 回车发送，Tab 换行
	msg_input.gui_input.connect(_on_input_gui_input)
	# 连接虚拟滚动的滚动信号
	scroll.get_v_scroll_bar().value_changed.connect(_on_scroll_changed)
	scroll.resized.connect(_on_scroll_resized)
	# RAW 模式切换
	var toggle := get_node_or_null("Layout/Body/Sidebar/SidebarScroll/SidebarContent/RawModeToggle") as CheckBox
	if toggle != null:
		_raw_toggle = toggle
		_raw_toggle.button_pressed = _raw_mode
		_raw_toggle.toggled.connect(_on_raw_mode_toggled)

	# ── 应用布局参数 ──
	_apply_layout()
	# ── 侧边栏状态指示标签 ──
	_ensure_status_label()
	_update_session_state("idle")


func _apply_layout() -> void:
	## 将导出的布局变量应用到场景节点上
	var chat_area: VBoxContainer = scroll.get_parent() as VBoxContainer
	if chat_area:
		chat_area.add_theme_constant_override("separation", chat_input_gap)
		# 聊天框左右内边距 — 通过 ChatArea 的 StyleBox 衬垫实现
		var chat_style := StyleBoxEmpty.new()
		chat_style.content_margin_left = chat_padding_h
		chat_style.content_margin_right = chat_padding_h
		chat_area.add_theme_stylebox_override("panel", chat_style)

	# 输入框最小高度与内边距
	var input_panel: Panel = chat_area.get_node("InputArea") as Panel
	if input_panel:
		input_panel.custom_minimum_size.y = input_min_height
		var pb := StyleBoxEmpty.new()
		pb.content_margin_left = input_padding
		pb.content_margin_right = input_padding
		pb.content_margin_top = input_padding
		pb.content_margin_bottom = input_padding
		input_panel.add_theme_stylebox_override("panel", pb)


func _on_raw_mode_toggled(on: bool) -> void:
	## RAW 模式切换：重建当前消息
	_raw_mode = on
	# 重新渲染所有现有消息（跳过流式节点）
	var to_rerender: Array[Dictionary] = []
	for child in virtual_content.get_children():
		if child == _streaming_node:
			continue
		var row_data: Dictionary = child.get_meta("row_data", {})
		if not row_data.is_empty():
			to_rerender.append(row_data)
		child.queue_free()
	await get_tree().process_frame
	for msg in to_rerender:
		var node := _build_message_node(msg)
		virtual_content.add_child(node)
	if _streaming_node != null and is_instance_valid(_streaming_node):
		virtual_content.add_child(_streaming_node)


func _apply_font_theme() -> void:
	print("→ _apply_font_theme")
	## 加载 JetBrains Mono 字体，设置全场景主题
	var font_normal := load(theme_config.font_path_normal)
	var font_bold := load(theme_config.font_path_bold)

	if font_normal == null:
		push_warning("无法加载字体: " + theme_config.font_path_normal)
		return

	var theme := Theme.new()
	# Label
	theme.set_font("font", "Label", font_normal)
	theme.set_font_size("font_size", "Label", theme_config.font_size_base)
	# RichTextLabel
	theme.set_font("normal_font", "RichTextLabel", font_normal)
	theme.set_font("bold_font", "RichTextLabel", font_bold)
	theme.set_font_size("normal_font_size", "RichTextLabel", theme_config.font_size_base)
	theme.set_font_size("bold_font_size", "RichTextLabel", theme_config.font_size_base)
	# Button
	theme.set_font("font", "Button", font_normal)
	theme.set_font_size("font_size", "Button", theme_config.font_size_base - 1)
	# TextEdit
	theme.set_font("font", "TextEdit", font_normal)
	theme.set_font_size("font_size", "TextEdit", theme_config.font_size_base)
	# LineEdit
	theme.set_font("font", "LineEdit", font_normal)
	theme.set_font_size("font_size", "LineEdit", theme_config.font_size_base)

	self.theme = theme


func _init_command_palette() -> void:
	print("→ _init_command_palette")
	_cmd_palette = CommandPalette.new()
	_cmd_palette.visible = false
	_cmd_palette.command_selected.connect(_on_command_selected)
	add_child(_cmd_palette)


func _load_agent_info() -> void:
	print("→ _load_agent_info")
	var agent := await _api.get_primary_agent()
	if agent.is_empty():
		print("→ _load_agent_info: agent is empty")
		return
	_primary_agent_name = agent.get("name", "-")
	var model: Dictionary = agent.get("model", {})
	_primary_model_name = model.get("modelID", "-")
	var model_limit: Dictionary = model.get("limit", {})
	_context_total = model_limit.get("context", 0)
	print("→ _load_agent_info: agent=" + _primary_agent_name + " model=" + _primary_model_name + " ctx_limit=" + str(_context_total))
	_update_info_bar()


func _update_info_bar() -> void:
	print("→ _update_info_bar")
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
	status_memory.text = "记忆: " + _format_tokens(_context_memory)
	status_context.text = "上下文: " + _format_tokens(_context_memory) + " / " + _format_tokens(_context_total) + " (" + str(int(pct)) + "%)"


func _format_tokens(n: int) -> String:
	if n >= 1000000:
		return str(snapped(float(n) / 1000000.0, 0.1)) + "M"
	if n >= 1000:
		return str(snapped(float(n) / 1000.0, 0.1)) + "K"
	return str(n)


func _init_session_picker() -> void:
	print("→ _init_session_picker")
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
	print("→ _unhandled_input")
	if event is InputEventKey and event.pressed and event.keycode == KEY_P:
		if event.ctrl_pressed and not _session_picker.visible:
			_open_session_picker()
			get_viewport().set_input_as_handled()
			return

	if event is InputEventKey and event.pressed and event.keycode == KEY_F6:
		# 调试：触发 value_changed 信号模拟一次滚动刷新
		_set_status("刷新...")
		var bar := scroll.get_v_scroll_bar()
		if bar != null and bar.max_value > 0:
			var sv := scroll.scroll_vertical
			scroll.scroll_vertical = clampi(sv + 1, 0, int(bar.max_value))
			scroll.scroll_vertical = sv
		_set_status("刷新完成 (" + str(_row_data.size()) + " 行)")
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
	print("→ _on_session_header_input")
	if event is InputEventMouseButton and event.pressed and event.button_index == MOUSE_BUTTON_LEFT:
		_open_session_picker()


func _open_session_picker() -> void:
	print("→ _open_session_picker")
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
	print("→ _close_session_picker")
	_session_picker.visible = false


func _on_session_picker_selected(sid: String) -> void:
	print("→ _on_session_picker_selected sid=" + sid)
	await _open_session(sid)
	_close_session_picker()


func _on_command_selected(cmd_name: String) -> void:
	print("→ _on_command_selected cmd=" + cmd_name)
	# 选中命令后直接发送
	_cmd_palette.hide_palette()
	msg_input.text = cmd_name
	_send_message_direct(msg_input.text)


func _on_input_text_changed() -> void:
	# print("→ _on_input_text_changed")
	# TextEdit.text_changed 无参信号，用 msg_input.text 获取
	var t := msg_input.text
	# 输入 / 时立即弹出命令面板，不用等到按发送按钮
	if t.begins_with("/") and not _cmd_palette.visible:
		# 把 / 后面的内容传到面板搜索框，清空输入框
		var filter := t
		msg_input.text = ""
		_cmd_palette.show_palette(filter)


func _send_message_direct(text: String) -> void:
	print("→ _send_message_direct")
	if text.is_empty():
		return

	# ⭐ 前置系统时间到用户消息
	var now := Time.get_datetime_dict_from_system()
	var time_tag := "当前时间为 %04d年%02d月%02d日 %02d:%02d:%02d\n" % [now.year, now.month, now.day, now.hour, now.minute, now.second]
	text = time_tag + text

	# 自动创建会话
	if _current_session_id.is_empty():
		var title := text.substr(0, min(text.length(), 30))
		var created := await _api.create_session(title)
		var sid: String = created.get("id", "")
		if sid.is_empty():
			_set_status("创建会话失败")
			return
		_current_session_id = sid

	msg_input.text = ""
	_set_status("执行命令...")

	# 用户消息追加到虚拟滚动
	_append_message({"role": "user", "parts": [{"type": "text", "text": text}]})

	# 创建流式响应容器
	_create_streaming_widget()

	var send_sid := _current_session_id
	var result := await _api.send_message(_current_session_id, text)
	if _current_session_id != send_sid:
		_update_session_state("idle")
		return
	if result.is_empty():
		push_warning("send_message 返回空结果")
	else:
		_finalize_streaming()
	_set_status("")


func _on_session_picker_dismissed() -> void:
	print("→ _on_session_picker_dismissed")
	_close_session_picker()


func _init_dialogs() -> void:
	print("→ _init_dialogs")
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

	# 连接对话框
	var conn_dlg := ConnectionDialog.new()
	add_child(conn_dlg)
	conn_dlg.connected.connect(_on_connection_dialog_connected)
	conn_dlg.visible = false
	_connection_dialog = conn_dlg


func _init_api() -> void:
	print("→ _init_api")
	_api = OpenCodeAPI.new()
	add_child(_api)


func _init_sse() -> void:
	print("→ _init_sse")
	_sse = SSEClient.new()
	add_child(_sse)
	_sse.event_received.connect(_on_sse_event)


func _process(delta: float) -> void:
	# 主动推底：设 scroll_vertical，value_changed 在 Layout Pass 后才刷新 max_value
	# 推底一次即清标记，防止用户上拉后被拽回
	if _scroll_pending:
		var bar := scroll.get_v_scroll_bar()
		if bar != null and bar.max_value > 0:
			scroll.scroll_vertical = int(bar.max_value)
			if scroll.scroll_vertical >= bar.max_value - 2.0:
				_scroll_pending = false  # 已到真底
			# else: 还没到底（节点高度还在增长中），保持标记，下一帧继续推

	# 注意：VBoxContainer 自动管理总高，滚动路径不碰 custom_minimum_size


func _bootstrap() -> void:
	print("→ _bootstrap")
	_set_status("连接服务器...")

	var ok := await _api.health_check()
	if not ok:
		_set_status("❌ 服务器不可用 (点 [连接] 按钮修改地址重试)")
		return

	_set_status("获取会话列表...")
	await _refresh_sessions()

	# 异步加载侧边栏信息，不阻塞主流程
	_refresh_sidebar_info()

	# 连接按钮
	if connect_btn != null:
		connect_btn.pressed.connect(_open_connection_dialog)

	_set_status("")
	_sse.start()


func _refresh_sidebar_info() -> void:
	print("→ _refresh_sidebar_info")
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
	print("→ _update_lsp_list")
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
	print("→ _refresh_sessions")
	var sessions = await _api.list_sessions()
	if sessions is Array and sessions.size() > 0:
		_cached_sessions = sessions.duplicate()
		_set_status("" + str(sessions.size()) + " 个会话")
	else:
		push_warning("[MainScene] 没有会话或请求失败, sessions=", str(sessions))



func _open_session(sid: String) -> void:
	print("→ _open_session sid=" + sid)
	## 打开会话：加载消息并初始化虚拟滚动
	await _load_session_messages(sid)

func _load_session_messages(sid: String) -> void:
	print("→ _load_session_messages sid=" + sid)
	## 从 API 加载消息，追加到 VBoxContainer
	_streaming_label = null
	_current_session_id = sid
	_clear_messages()
	_streaming_just_finalized = false
	_set_status("加载消息...")

	var page = await _api.get_messages_page(sid, load_limit)
	if page.is_empty() or page.get("items", []).is_empty():
		_set_status("(无消息)")
		_has_loaded_all = true
		return
	var messages: Array = page.items
	# API 返回 items 为旧→新顺序
	_lazy_cursor = page.get("cursor", "")
	if _lazy_cursor.is_empty():
		_has_loaded_all = true

	_row_data = messages
	# 计算当前消息的 token 用量
	_context_memory = 0
	for msg in messages:
		var toks: Dictionary = msg.get("tokens", {})
		if not toks.is_empty():
			_context_memory += toks.get("input", 0) + toks.get("output", 0) + toks.get("reasoning", 0) + toks.get("cache", {}).get("read", 0) + toks.get("cache", {}).get("write", 0)
	_update_info_bar()
	# 顺序追加：msg[0]=最旧 → 先加 → 在顶，msg[N]=最新 → 后加 → 在底
	for msg in messages:
		var node := _build_message_node(msg)
		virtual_content.add_child(node)

	# 消息追加完毕，标记推送到底
	await get_tree().process_frame
	_scroll_pending = true

	_set_status(str(messages.size()) + " 条消息")


func _refresh_messages() -> void:
	print("→ _refresh_messages")
	## 重新加载当前会话的最新消息（SSE 触发时加锁，防止和 _append_message 竞争）
	if _current_session_id.is_empty():
		return
	if _refreshing_messages:
		print("→ _refresh_messages skipped (already refreshing)")
		return
	_refreshing_messages = true
	var page = await _api.get_messages_page(_current_session_id, load_limit)
	if page.is_empty() or page.get("items", []).is_empty():
		return
	var messages: Array = page.items
	messages.reverse()
	_row_data = messages
	_set_status("刷新 " + str(messages.size()) + " 条...")
	for msg in messages:
		virtual_content.add_child(_build_message_node(msg))
	_refreshing_messages = false
	await get_tree().process_frame
	_scroll_to_newest()


func _on_scroll_changed(_value: float) -> void:
	print("→ _on_scroll_changed value=" + str(_value))

	## 滚动时触发懒加载：拉到顶时加载更旧的消息
	if not _lazy_loading and not _lazy_cursor.is_empty():
		if scroll.scroll_vertical <= 5:
			_lazy_loading = true
			_lazy_load_more()


func _lazy_load_more() -> void:
	## 加载更多旧消息，批量创建后一次性加入 VBoxContainer
	var page = await _api.get_messages_page(_current_session_id, load_limit, _lazy_cursor)
	if page.is_empty() or not (page.get("items") is Array) or page.items.is_empty():
		_lazy_loading = false
		if page.get("cursor", "") == "":
			_has_loaded_all = true
		return
	var items: Array = page.items

	# 批量构建所有节点（不加入场景树）
	var nodes: Array[Control] = []
	for msg in items:
		nodes.append(_build_message_node(msg))
		_row_data.append(msg)
	# 从末到首移动到 VBoxContainer 顶部 — 保持 old→new 顺序
	for j in range(nodes.size() - 1, -1, -1):
		virtual_content.add_child(nodes[j])
		virtual_content.move_child(nodes[j], 0)

	_lazy_cursor = page.get("cursor", "")
	if _lazy_cursor.is_empty():
		_has_loaded_all = true
	_lazy_loading = false


func _on_scroll_resized() -> void:
	print("→ _on_scroll_resized")
	if _streaming_node != null and is_instance_valid(_streaming_node):
		_streaming_node.size.x = virtual_content.size.x


# ── 连接对话框 ──

func _open_connection_dialog() -> void:
	## 手动修改服务器地址
	_connection_dialog.popup_connect()


func _on_connection_dialog_connected(url: String) -> void:
	## 用户确认新地址后，重置 api 和 sse 并重新连接
	print("→ _on_connection_dialog_connected: " + url)
	_set_status("连接 " + url + "...")
	
	_api.set_base_url(url)
	_sse.set_url(url)
	
	# 清空会话状态
	_current_session_id = ""
	_row_data = []
	_clear_messages()
	
	# 重新健康检查 + 引导
	var ok := await _api.health_check()
	if not ok:
		_set_status("❌ 连接失败")
		return
	
	_set_status("获取会话列表...")
	await _refresh_sessions()
	_refresh_sidebar_info()
	_set_status("已连接 " + url)
	_sse.start()


func _on_input_gui_input(event: InputEvent) -> void:
	## 回车发送，Tab 换行
	if not (event is InputEventKey):
		return
	var key_event := event as InputEventKey
	if not key_event.pressed:
		return
	if key_event.keycode == KEY_ENTER:
		accept_event()
		_on_send_pressed()
	elif key_event.keycode == KEY_TAB:
		accept_event()
		var cl := msg_input.get_caret_line()
		var cc := msg_input.get_caret_column()
		var lines := msg_input.text.split("\n")
		if cl >= lines.size():
			return
		var cur := lines[cl]
		lines[cl] = cur.left(cc)
		lines.insert(cl + 1, cur.right(cc))
		msg_input.text = "\n".join(lines)
		msg_input.set_caret_line(cl + 1)
		msg_input.set_caret_column(0)




func _update_session_state(new_state: String) -> void:
	## 更新侧边栏会话状态指示标签
	_session_state = new_state
	var texts := {
		"idle": "就绪",
		"sending": "发送中",
		"thinking": "思考中",
		"generating": "生成中",
		"tool_call": "执行工具",
		"error": "错误",
	}
	var label: Label = get_node_or_null("Layout/Body/Sidebar/SidebarScroll/SidebarContent/StatusState")
	if label:
		label.text = texts.get(new_state, new_state)


func _ensure_status_label() -> void:
	## 确保侧边栏状态指示标签存在
	var sidebar := get_node_or_null("Layout/Body/Sidebar/SidebarScroll/SidebarContent") as VBoxContainer
	if sidebar == null or sidebar.has_node("StatusState"):
		return
	var label := Label.new()
	label.name = "StatusState"
	label.text = "就绪"
	label.custom_minimum_size.y = 22
	label.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	label.add_theme_color_override("font_color", Color(0.5, 0.5, 0.5, 1))
	# 插入到 RawModeToggle 前面
	var toggle := sidebar.get_node_or_null("RawModeToggle")
	if toggle:
		sidebar.add_child(label)
		sidebar.move_child(label, toggle.get_index())
	else:
		sidebar.add_child(label)


func _on_send_pressed() -> void:
	print("→ _on_send_pressed")
	var text := msg_input.text.strip_edges()
	if text.is_empty():
		return

	# 自动创建会话
	if _current_session_id.is_empty():
		var title := text.substr(0, min(text.length(), 30))
		var created := await _api.create_session(title)
		var sid: String = created.get("id", "")
		if sid.is_empty():
			_set_status("创建会话失败")
			msg_input.text = text
			return
		_current_session_id = sid

	# ⭐ 前置系统时间到用户消息
	var now := Time.get_datetime_dict_from_system()
	var time_tag := "当前时间为 %04d年%02d月%02d日 %02d:%02d:%02d\n" % [now.year, now.month, now.day, now.hour, now.minute, now.second]
	text = time_tag + text

	msg_input.text = ""
	_set_status("发送中...")
	_update_session_state("sending")

	# 用户消息追加到虚拟滚动
	_append_message({"role": "user", "parts": [{"type": "text", "text": text}]})

	# 创建流式响应容器
	_create_streaming_widget()

	var send_sid := _current_session_id
	var res = await _api.send_message(send_sid, text)
	# 安全锁：await 期间切换会话则丢弃结果
	if _current_session_id != send_sid:
		print("→ discard send result: session changed")
		_update_session_state("idle")
		_set_status("")
		return
	# 流式节点已包含完整内容，直接成为永久消息
	_finalize_streaming()
	_set_status("")
	_update_session_state("idle")


func _on_sse_event(event_type: String, properties: Dictionary) -> void:
	print("→ _on_sse_event type=" + event_type)
	sse_handler.handle_event(event_type, properties)


# ── 权限处理 ──

func _on_permission_asked(properties: Dictionary) -> void:
	print("→ _on_permission_asked")
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
	print("→ _on_permission_replied")
	## 用户回应了权限请求，发送到服务器
	_pending_permissions.erase(request_id)
	await _api.reply_permission(request_id, reply_type, message)


# ── 问题处理 ──

func _on_question_asked(properties: Dictionary) -> void:
	print("→ _on_question_asked")
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
	print("→ _on_question_replied")
	## 用户回答了问题，发送到服务器
	_pending_questions.erase(request_id)
	await _api.reply_question(request_id, answers)


func _on_question_rejected(request_id: String) -> void:
	print("→ _on_question_rejected")
	## 用户跳过了问题
	_pending_questions.erase(request_id)
	# 发送空回答表示跳过
	await _api.reply_question(request_id, [])


func _create_streaming_widget() -> VBoxContainer:
	print("→ _create_streaming_widget")
	## 创建流式响应的容器结构（名称 + 思考文本 + 气泡文本区）
	# 重置流式状态
	# 重置流式状态——下次流式开始时允许 _refresh_messages
	_streaming_just_finalized = false
	_streaming_text = ""
	_streaming_reasoning_text = ""

	var msg_vbox := VBoxContainer.new()
	msg_vbox.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	msg_vbox.add_theme_constant_override("separation", 2)

	# 名称标签
	var name_label := RichTextLabel.new()
	name_label.bbcode_enabled = true
	name_label.fit_content = true
	name_label.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	name_label.add_theme_font_size_override("normal_font_size", theme_config.font_size_base - 3)
	name_label.add_theme_color_override("default_color", theme_config.color_text_name)
	name_label.append_text("AI")
	msg_vbox.add_child(name_label)

	# 主文本气泡（思考 + 文字合并输出）
	var bubble := PanelContainer.new()
	bubble.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	var style := StyleBoxFlat.new()
	style.bg_color = theme_config.bubble_ai_bg
	style.border_width_left = 3
	style.border_color = theme_config.bubble_ai_border
	style.corner_radius_bottom_right = 6
	style.corner_radius_top_right = 6
	style.content_margin_left = 10
	style.content_margin_right = 10
	style.content_margin_top = 6
	style.content_margin_bottom = 6
	bubble.add_theme_stylebox_override("panel", style)

	_streaming_label = RichTextLabel.new()
	_streaming_label.bbcode_enabled = true
	_streaming_label.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART
	_streaming_label.fit_content = true
	_streaming_label.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	_streaming_label.add_theme_font_size_override("normal_font_size", theme_config.font_size_base)
	_streaming_label.add_theme_color_override("default_color", theme_config.color_text)

	bubble.add_child(_streaming_label)
	msg_vbox.add_child(bubble)

	# 将流式节点添加到 VBoxContainer 底部（正常顺序：新消息在末尾）
	_streaming_node = msg_vbox
	virtual_content.add_child(msg_vbox)
	_scroll_to_newest()
	return msg_vbox


func _finalize_streaming() -> void:
	print("→ _finalize_streaming")
	## 完成流式响应：流式节点成为永久消息
	_streaming_label = null
	_streaming_node = null
	_streaming_just_finalized = true
	_scroll_to_newest()


func _build_message_node(msg: Dictionary) -> Control:
	## 创建一个消息节点树
	var is_user: bool = msg.get("role", "") == "user"
	var parts: Array = msg.get("parts", [])
	var root := VBoxContainer.new()
	root.size_flags_horizontal = Control.SIZE_EXPAND_FILL

	# 名称标签
	var name_label := RichTextLabel.new()
	name_label.bbcode_enabled = true
	name_label.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	name_label.add_theme_color_override("default_color", theme_config.color_text_name)
	name_label.append_text("你" if is_user else "AI")
	root.add_child(name_label)

	if _raw_mode:
		# — 统一流式风格：灰色思考，粗体工具，原文文字 —
		var raw_parts := PackedStringArray()
		for p in parts:
			var pt_raw: String = p.get("type", "")
			var pt: String = pt_raw
			if pt.begins_with("tool-"):
				pt = "tool"
			match pt:
				"reasoning":
					var rt: String = p.get("text", "")
					if not rt.is_empty():
						raw_parts.append("[color=#" + theme_config.color_text_dim.to_html(false) + "]思考：" + rt + "[/color]")
				"text":
					var txt: String = p.get("text", "")
					if not txt.is_empty():
						raw_parts.append(txt)
				"tool", "tool-call":
					var tool_name: String = p.get("tool", p.get("name", "?"))
					var state: Dictionary = p.get("state", {})
					var stype: String = state.get("status", "")
					var icon: String = "✅" if stype == "completed" else ("❌" if stype == "error" else "🔧")
					var ttitle: String = state.get("title", "")
					var fpath: String = state.get("input", {}).get("filePath", "")
					var tname: String = tool_name + " " + (ttitle if not ttitle.is_empty() else fpath)
					var raw_line: String = "[b]" + icon + " " + tname.trim_suffix(".md") + "[/b]"
					var raw_content: String = state.get("input", {}).get("content", "")
					raw_parts.append(raw_line)
					if not raw_content.is_empty():
						raw_parts.append("```" + raw_content.left(2000) + "```")
					if stype == "completed":
						var output: String = state.get("output", "")
						if not output.is_empty():
							raw_parts.append("[color=#88cc88]" + output.left(2000) + "[/color]")
		if not raw_parts.is_empty():
			var bubble := PanelContainer.new()
			bubble.size_flags_horizontal = Control.SIZE_EXPAND_FILL
			var style := StyleBoxFlat.new()
			style.bg_color = theme_config.bubble_user_bg if is_user else theme_config.bubble_ai_bg
			style.border_color = theme_config.bubble_user_border if is_user else theme_config.bubble_ai_border
			style.border_width_left = 3
			style.corner_radius_bottom_right = 6
			style.corner_radius_top_right = 6
			style.content_margin_left = 10
			style.content_margin_right = 10
			style.content_margin_top = 6
			style.content_margin_bottom = 6
			bubble.add_theme_stylebox_override("panel", style)
			var label := RichTextLabel.new()
			label.bbcode_enabled = true
			label.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART
			label.fit_content = true
			label.size_flags_horizontal = Control.SIZE_EXPAND_FILL
			label.add_theme_color_override("default_color", theme_config.color_text)
			label.append_text("\n".join(raw_parts))
			bubble.add_child(label)
			root.add_child(bubble)
	else:
		# — 渲染模式：思考独立标签，文字通过 MarkdownBBCode 转换 —
		var thinking_text := ""
		var bbcode_parts := PackedStringArray()
		for p in parts:
			var pt_raw: String = p.get("type", "")
			var pt: String = pt_raw
			if pt.begins_with("tool-"):
				pt = "tool"
			match pt:
				"reasoning":
					var rt: String = p.get("text", "")
					if not rt.is_empty():
						thinking_text += rt
				"text":
					var txt: String = p.get("text", "")
					if not txt.is_empty():
						bbcode_parts.append(part_renderer.render_part_text(txt))
				"tool", "tool-call":
					bbcode_parts.append(part_renderer.render_part_tool(p))

		if not thinking_text.is_empty():
			var think_label := RichTextLabel.new()
			think_label.bbcode_enabled = true
			think_label.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART
			think_label.fit_content = true
			think_label.size_flags_horizontal = Control.SIZE_EXPAND_FILL
			think_label.add_theme_color_override("default_color", theme_config.color_text_dim)
			think_label.append_text("[color=#" + theme_config.color_text_dim.to_html(false) + "]思考：" + thinking_text + "[/color]")
			root.add_child(think_label)

		if not bbcode_parts.is_empty():
			var bubble := PanelContainer.new()
			bubble.size_flags_horizontal = Control.SIZE_EXPAND_FILL
			var style := StyleBoxFlat.new()
			style.bg_color = theme_config.bubble_user_bg if is_user else theme_config.bubble_ai_bg
			style.border_color = theme_config.bubble_user_border if is_user else theme_config.bubble_ai_border
			style.border_width_left = 3
			style.corner_radius_bottom_right = 6
			style.corner_radius_top_right = 6
			style.content_margin_left = 10
			style.content_margin_right = 10
			style.content_margin_top = 6
			style.content_margin_bottom = 6
			bubble.add_theme_stylebox_override("panel", style)
			var label := RichTextLabel.new()
			label.bbcode_enabled = true
			label.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART
			label.fit_content = true
			label.size_flags_horizontal = Control.SIZE_EXPAND_FILL
			label.add_theme_color_override("default_color", theme_config.color_text)
			label.append_text("\n".join(bbcode_parts))
			bubble.add_child(label)
			root.add_child(bubble)

	root.set_meta("row_data", msg)
	return root


func _append_message(msg: Dictionary) -> void:
	## 追加消息到 VBoxContainer 末尾（刷新锁开启时跳过，避免与 _refresh_messages 竞争）
	if _refreshing_messages:
		print("→ _append_message skipped (refreshing lock)")
		return
	if not is_instance_valid(virtual_content) or virtual_content.get_parent() == null:
		push_warning("→ _append_message: virtual_content 已失效！msg_role=" + msg.get("role", "?"))
		return
	# 清理流式节点
	if _streaming_node != null and is_instance_valid(_streaming_node):
		_streaming_node.queue_free()
		_streaming_node = null
	_streaming_label = null
	_row_data.append(msg)
	var toks: Dictionary = msg.get("tokens", {})
	if not toks.is_empty():
		_context_memory += toks.get("input", 0) + toks.get("output", 0) + toks.get("reasoning", 0) + toks.get("cache", {}).get("read", 0) + toks.get("cache", {}).get("write", 0)
	_update_info_bar()
	var node := _build_message_node(msg)
	if not is_instance_valid(node):
		push_warning("→ _append_message: _build_message_node 返回无效节点！")
		return
	var before := virtual_content.get_child_count()
	virtual_content.add_child(node)
	print("→ _append_message added children=" + str(before) + "→" + str(before + 1))
	await get_tree().process_frame
	_scroll_pending = true


func _clear_messages() -> void:
	## 清空 VBoxContainer 中所有消息节点
	for c in virtual_content.get_children():
		c.queue_free()


func _set_status(text: String) -> void:
	status_label.text = text


func _fetch_balance() -> void:
	## 从 DEEPSEEK_API_KEY 环境变量查询余额并更新 InfoBar
	var key := OS.get_environment("DEEPSEEK_API_KEY")
	if key.is_empty():
		info_balance.text = "余额: 未配置"
		return
	info_balance.text = "余额: 查询中..."

	var http := HTTPRequest.new()
	add_child(http)
	var on_done := func(_result: int, _code: int, _headers: PackedStringArray, body: PackedByteArray) -> void:
		var json: Variant = JSON.parse_string(body.get_string_from_utf8())
		if json is Dictionary and json.has("balance_infos"):
			var bi: Variant = json.balance_infos[0] if json.balance_infos.size() > 0 else {}
			var total: String = bi.get("total_balance", "?")
			info_balance.text = "余额: ¥" + total
		else:
			info_balance.text = "余额: 查询失败"
		http.queue_free()
	http.request_completed.connect(on_done)
	var err := http.request("https://api.deepseek.com/user/balance", ["Authorization: Bearer " + key])
	if err != OK:
		info_balance.text = "余额: 请求失败"
		http.queue_free()


func _scroll_to_newest() -> void:
	if not _scroll_pending:
		_scroll_pending = true
