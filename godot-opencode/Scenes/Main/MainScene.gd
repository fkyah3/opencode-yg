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
var _streaming_text: String = ""
var _streaming_label: RichTextLabel
var _streaming_thinking_text: String = ""  # 思考内容
var _streaming_thinking_label: RichTextLabel  # 思考标签
var _streaming_bubble: PanelContainer  # 流式气泡容器（用于插入思考区域）
var _streaming_node: Control          # 流式容器的根节点（虚拟内容中的临时行）
var _cached_sessions: Array = []  # 缓存的会话列表，避免重复 HTTP 请求

# ── Agent/模型信息 ──
var _primary_agent_name: String = "-"
var _primary_model_name: String = "-"
var _context_memory: int = 0
var _context_total: int = 0

# ── Token 速率追踪 ──
var _rate_tokens: int = 0
var _rate_time: float = 0.0

# ── 虚拟滚动（消息列表） ──
var _row_data: Array = []        # 所有消息的原始数据（元素为 Dictionary，JSON 类型）
var _y_offsets: Array[float] = []            # 每行的 Y 偏移
var _row_heights: Array[float] = []          # 每行估算高度
var _row_assignments: Dictionary = {}        # idx → Control（当前分配给可见行的池节点）
var _free_nodes: Array[Control] = []         # 空闲池节点（自由列表，O(1) 取用）
var _overscan: int = 4                       # 可见区域外的缓冲行数

# ── 滚动防抖 ──
var _scroll_timer: float = 0.0
var _scroll_pending: bool = false

# ── 权限 / 问题对话框 ──
var _permission_dialog: PermissionDialog
var _question_dialog: QuestionDialog
var _pending_permissions: Dictionary = {}  # request_id → properties
var _pending_questions: Dictionary = {}    # request_id → properties

# ── 连接对话框 ──
var _connection_dialog: ConnectionDialog


func _ready() -> void:
	print("→ _ready")
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
	# 回车发送，Tab 换行
	msg_input.gui_input.connect(_on_input_gui_input)
	# 连接虚拟滚动的滚动信号
	scroll.get_v_scroll_bar().value_changed.connect(_on_scroll_changed)
	scroll.resized.connect(_on_scroll_resized)


func _apply_font_theme() -> void:
	print("→ _apply_font_theme")
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
	print("→ _init_command_palette")
	_cmd_palette = CommandPalette.new()
	_cmd_palette.visible = false
	_cmd_palette.command_selected.connect(_on_command_selected)
	add_child(_cmd_palette)


func _load_agent_info() -> void:
	print("→ _load_agent_info")
	var agent := await _api.get_primary_agent()
	if agent.is_empty():
		return
	_primary_agent_name = agent.get("name", "-")
	var model: Dictionary = agent.get("model", {})
	_primary_model_name = model.get("modelID", "-")
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

	var result := await _api.send_message(_current_session_id, text)
	if result.is_empty():
		push_warning("send_message 返回空结果")
	else:
		# 移除流式占位，追加 AI 响应到虚拟滚动
		_finalize_streaming()
		_append_message(result)
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
	# print("→ _process")
	# 防抖滚动: 每 0.1s 最多触发一次
	if _scroll_pending:
		_scroll_timer += delta
		if _scroll_timer >= 0.1:
			_scroll_timer = 0.0
			_scroll_pending = false
			_do_scroll_to_bottom()


func _bootstrap() -> void:
	print("→ _bootstrap")
	# 创建加载覆盖面板
	_ensure_loading_overlay()
	_show_loading("连接服务器...")
	_set_status("连接服务器...")

	var ok := await _api.health_check()
	if not ok:
		_set_status("❌ 服务器不可用 (点 [连接] 按钮修改地址重试)")
		_show_loading("服务器不可用 (点 [连接] 按钮重试)")
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
	## 从 API 加载消息，初始化虚拟滚动
	_streaming_label = null
	_current_session_id = sid
	_clear_messages()
	_show_loading("加载消息...")
	_set_status("加载消息...")

	var messages = await _api.get_messages(sid, 300)
	if messages.is_empty():
		_set_status("(无消息)")
		_hide_loading()
		return

	# 数据准备
	_row_data = messages
	_show_loading("渲染 " + str(messages.size()) + " 条消息...")
	_compute_heights_and_offsets()
	_adjust_pool_size()
	_update_visible_rows(scroll.scroll_vertical)

	_set_status(str(_row_data.size()) + " 条消息")
	await _push_scroll_bottom_deferred()
	_hide_loading()

func _refresh_messages() -> void:
	print("→ _refresh_messages")
	## 重新加载当前会话消息
	if _current_session_id.is_empty():
		return
	var messages = await _api.get_messages(_current_session_id, 300)
	if messages.is_empty():
		return
	_row_data = messages
	_compute_heights_and_offsets()
	_adjust_pool_size()
	_update_visible_rows(scroll.scroll_vertical)


# ═══════════════════ 虚拟滚动核心 ═══════════════════

func _compute_heights_and_offsets() -> void:
	print("→ _compute_heights_and_offsets")
	## 按内容估算每行高度，计算 Y 偏移数组
	_y_offsets.clear()
	_row_heights.clear()
	var cursor: float = 0.0
	for msg in _row_data:
		_y_offsets.append(cursor)
		var h: float = _estimate_row_height(msg)
		_row_heights.append(h)
		cursor += h
	virtual_content.custom_minimum_size.y = cursor

func _estimate_row_height(msg: Dictionary) -> float:
	## 基于字符数估算行高（ac: 80 chars/line, 22px line-height）
	var parts: Array = msg.get("parts", [])
	var text_len: int = 0
	var thinking_len: int = 0
	for p in parts:
		if p.get("type") == "text":
			text_len += len(p.get("text", ""))
		elif p.get("type") == "reasoning":
			thinking_len += len(p.get("reasoning_text", p.get("text", "")))
	# 按字符数估算行高（基础：80 chars/line, 22px line-height）
	# BBCode 包装标签使渲染文本比 raw markdown 长约 1.2-1.5 倍，
	# 乘以 1.35 矫正（经验值）。
	var cpl := 80.0
	var lh := 22.0
	var bbcode_factor := 1.35
	var text_lines := maxi(1, ceili(text_len / cpl * bbcode_factor))
	var thinking_lines := maxi(0, ceili(thinking_len / cpl * bbcode_factor))
	return 36.0 + text_lines * lh + thinking_lines * lh * 0.5

const MAX_POOL_SIZE: int = 50  # 硬上限：池行不超过 50 个节点

func _grow_pool(amount: int) -> void:
	print("→ _grow_pool amount=" + str(amount))
	var can_add: int = MAX_POOL_SIZE - _free_nodes.size()
	if amount > can_add:
		push_error("POOL_OVERFLOW: 池要膨胀 %d 行但超过上限 %d，_row_data.size=%d" % [
			amount, MAX_POOL_SIZE, _row_data.size()])
		amount = can_add
	if amount <= 0:
		return
	for i in amount:
		var row := _build_message_row()
		row.visible = false
		virtual_content.add_child(row)
		_free_nodes.append(row)

func _adjust_pool_size() -> void:
	print("→ _adjust_pool_size pool=" + str(_free_nodes.size()) + " row_data=" + str(_row_data.size()))
	## 确保空闲池足够
	var viewport_h: float = scroll.size.y
	var n_rows: int = _row_data.size()
	if n_rows == 0:
		return
	var avg_h: float = virtual_content.custom_minimum_size.y / max(1, n_rows)
	var needed: int = ceili(viewport_h / max(1, avg_h)) + _overscan
	needed = mini(needed, n_rows)
	if needed > _free_nodes.size():
		_grow_pool(needed - _free_nodes.size())

func _find_row_by_node(node: Control) -> int:
	## 根据节点查找对应的行索引
	for idx in _row_assignments:
		if _row_assignments[idx] == node:
			return idx
	return -1

func _on_scroll_changed(_value: float) -> void:
	print("→ _on_scroll_changed value=" + str(_value))
	## 滚动时更新可见行
	_update_visible_rows(scroll.scroll_vertical)

func _update_visible_rows(scroll_y: float) -> void:
	print("→ _update_visible_rows scroll_y=" + str(scroll_y))
	## 更新可见窗口内的行（回收不可见 + 分配可见）
	if _row_data.is_empty():
		for node in _free_nodes:
			node.visible = false
		_row_assignments.clear()
		return

	var viewport_h: float = scroll.size.y
	if viewport_h <= 0:
		return

	# 找出可见行区间
	var first_row: int = _row_idx_at_y(max(0, scroll_y))
	var last_row: int = _row_idx_at_y(min(virtual_content.custom_minimum_size.y, scroll_y + viewport_h))
	last_row = mini(last_row, _row_data.size() - 1)

	# 缓冲扩展
	var overscan_px: float = _overscan * _row_heights[0] if not _row_heights.is_empty() else 100
	first_row = maxi(0, _row_idx_at_y(max(0, scroll_y - overscan_px)))
	last_row = mini(_row_data.size() - 1, _row_idx_at_y(min(virtual_content.custom_minimum_size.y, scroll_y + viewport_h + overscan_px)))

	# 回收区间外的节点（放回空闲池）
	var to_reclaim: Array[int] = []
	for idx in _row_assignments:
		if idx < first_row or idx > last_row:
			to_reclaim.append(idx)
	for idx in to_reclaim:
		var node: Control = _row_assignments[idx]
		node.visible = false
		_row_assignments.erase(idx)
		_free_nodes.append(node)

	# 为可见行分配池节点
	for row_idx in range(first_row, last_row + 1):
		if _row_assignments.has(row_idx):
			var existing: Control = _row_assignments[row_idx]
			existing.position.y = _y_offsets[row_idx] if row_idx < _y_offsets.size() else 0
			existing.size.x = virtual_content.size.x
			continue
		if _free_nodes.is_empty():
			_grow_pool(1)
		var found: Control = _free_nodes.pop_back()
		_prepare_row_node(found, _row_data[row_idx], row_idx)
		found.position.y = _y_offsets[row_idx] if row_idx < _y_offsets.size() else 0
		found.size.x = virtual_content.size.x
		found.visible = true
		# 渲染后测量高度，修正 _row_heights 和 _y_offsets
		if not _row_heights.is_empty() and row_idx < _row_heights.size():
			var _actual_h := found.get_combined_minimum_size().y
			if _actual_h > 0:
				var diff: float = _actual_h - _row_heights[row_idx]
				if abs(diff) > 2.0:
					_row_heights[row_idx] = _actual_h
					var cms := virtual_content.custom_minimum_size
					cms.y += diff
					virtual_content.custom_minimum_size = cms
					for j in range(row_idx + 1, _y_offsets.size()):
						_y_offsets[j] += diff
						if _row_assignments.has(j):
							_row_assignments[j].position.y = _y_offsets[j]
		_row_assignments[row_idx] = found

func _row_idx_at_y(y: float) -> int:
	## 二分查找 y 坐标对应的行索引
	if _y_offsets.is_empty():
		return 0
	var lo := 0
	var hi := _y_offsets.size() - 1
	while lo < hi:
		var mid := (lo + hi + 1) / 2
		if _y_offsets[mid] <= y:
			lo = mid
		else:
			hi = mid - 1
	return lo

func _build_message_row() -> Control:
	print("→ _build_message_row")
	## 创建固定结构的消息行（子节点不变，只通过 _prepare_row_node 更新内容）
	var row := VBoxContainer.new()
	row.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	row.add_theme_constant_override("separation", 2)

	# ── 第 0 子节点：名称标签 ──
	var name_label := RichTextLabel.new()
	name_label.bbcode_enabled = true
	name_label.fit_content = true
	name_label.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	name_label.add_theme_font_size_override("normal_font_size", font_size_base - 3)
	name_label.add_theme_color_override("default_color", color_text_name)
	row.add_child(name_label)

	# ── 第 1 子节点：思考标签（默认隐藏） ──
	var thinking_label := RichTextLabel.new()
	thinking_label.bbcode_enabled = true
	thinking_label.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART
	thinking_label.fit_content = true
	thinking_label.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	thinking_label.add_theme_font_size_override("normal_font_size", font_size_base - 1)
	thinking_label.add_theme_color_override("default_color", color_text_dim)
	thinking_label.visible = false
	row.add_child(thinking_label)

	# ── 第 2 子节点：主气泡 ──
	var bubble := PanelContainer.new()
	bubble.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	var style := StyleBoxFlat.new()
	style.border_width_left = 3
	style.corner_radius_bottom_right = 6
	style.corner_radius_top_right = 6
	style.content_margin_left = 10
	style.content_margin_right = 10
	style.content_margin_top = 6
	style.content_margin_bottom = 6
	bubble.add_theme_stylebox_override("panel", style)

	var text_label := RichTextLabel.new()
	text_label.bbcode_enabled = true
	text_label.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART
	text_label.fit_content = true
	text_label.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	text_label.add_theme_font_size_override("normal_font_size", font_size_base)
	text_label.add_theme_color_override("default_color", color_text)
	bubble.add_child(text_label)
	row.add_child(bubble)

	return row


func _prepare_row_node(row: Control, msg: Dictionary, row_idx: int = -1) -> void:
	print("→ _prepare_row_node")
	## 用消息数据填充已有行结构（不创建/删除子节点）
	var d: Dictionary = msg as Dictionary
	# 第二版使用字典作为基础数组类型
	var _parts: Array = msg.get("parts", [])
	var is_user: bool = d.get("role", "") == "user"
	var parts: Array = _parts

	# 解包行结构的预构建子节点
	var name_label: RichTextLabel = row.get_child(0)
	var thinking_label: RichTextLabel = row.get_child(1)
	var bubble: PanelContainer = row.get_child(2)
	var text_label: RichTextLabel = bubble.get_child(0)

	# ── 更新名称 ──
	name_label.clear()
	name_label.append_text("你" if is_user else "AI")

	# ── 提取文本 + 思考 ──
	var text_parts := PackedStringArray()  # raw markdown/fmt
	var thinking_text := ""
	for p in parts:
		var pt: String = p.get("type", "")
		if pt == "text":
			var txt: String = p.get("text", "")
			if not txt.is_empty():
				text_parts.append(txt)
		elif pt == "tool" or pt == "tool-call":
			var tool_name: String = p.get("tool", p.get("name", p.get("function", {}).get("name", "?")))
			var state: Dictionary = p.get("state", {})
			var status: String = state.get("status", "")
			var icon: String = "✅" if status == "completed" else ("❌" if status == "error" else "🔧")
			var preview := ""
			var content: String = state.get("input", {}).get("content", "")
			if not content.is_empty():
				# 内容预览用 fenced code block 包裹，_convert_markdown 会转成 [code]
				preview = "\n```\n" + content.left(300) + "\n```"
			text_parts.append("**" + icon + " " + tool_name + "**" + preview)

	# ── 更新思考标签 ──
	if not thinking_text.is_empty():
		var col := color_text_dim.to_html(false)
		thinking_label.visible = true
		thinking_label.clear()
		thinking_label.append_text("[color=#" + col + "]思考：" + thinking_text + "[/color]")
	else:
		thinking_label.visible = false

	# ── 更新气泡文本 + 颜色 ──
	if not text_parts.is_empty():
		var style: StyleBoxFlat = bubble.get_theme_stylebox("panel")
		style.bg_color = bubble_user_bg if is_user else bubble_ai_bg
		style.border_color = bubble_user_border if is_user else bubble_ai_border

		# 拼接 raw markdown → 用 _convert_markdown 转为 BBCode（纯字符串，不触发布局）
		var raw_md: String = "\n".join(text_parts)
		var bbcode: String = msg.get("_bbcode", "")
		if bbcode.is_empty():
			var cfg := MarkdownBBCodeConfig.new()
			cfg.heading_color = Color("#C77DFF")
			cfg.bold_color = Color("#FF9500")
			cfg.code_color = Color("#4CD964")
			bbcode = MarkdownBBCode.to_bbcode(raw_md, cfg)
			msg["_bbcode"] = bbcode

		text_label.clear()
		text_label.append_text(bbcode)
		print("→ _prepare_row_node: append_text done")
		bubble.visible = true
	else:
		bubble.visible = false

func _append_message(msg: Dictionary, remove_streaming: bool = false) -> void:
	print("→ _append_message remove_streaming=" + str(remove_streaming))
	## 追加一条消息到虚拟滚动（用于用户/ AI 响应消息）
	if remove_streaming or _streaming_node != null:
		if _streaming_node != null and is_instance_valid(_streaming_node):
			_streaming_node.queue_free()
		_streaming_node = null
		_streaming_label = null
		_streaming_thinking_label = null

	_row_data.append(msg)
	var h: float = _estimate_row_height(msg)
	_row_heights.append(h)
	_y_offsets.append(virtual_content.custom_minimum_size.y)
	virtual_content.custom_minimum_size.y += h

	_adjust_pool_size()
	_update_visible_rows(scroll.scroll_vertical)
	_scroll_to_bottom()


func _on_scroll_resized() -> void:
	print("→ _on_scroll_resized")
	## 滚动容器大小变化时重新调整
	_adjust_pool_size()
	_update_visible_rows(scroll.scroll_vertical)
	# 更新流式节点的宽度
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
	_compute_heights_and_offsets()
	_adjust_pool_size()
	_update_visible_rows(scroll.scroll_vertical)
	
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

	msg_input.text = ""
	_set_status("发送中...")

	# 用户消息追加到虚拟滚动
	_append_message({"role": "user", "parts": [{"type": "text", "text": text}]})

	# 创建流式响应容器
	_create_streaming_widget()

	var res = await _api.send_message(_current_session_id, text)
	if res.is_empty() or not (res is Dictionary):
		push_warning("send_message 返回异常: " + str(res))
	else:
		_finalize_streaming()
		_append_message(res)
	_set_status("")


func _on_sse_event(event_type: String, properties: Dictionary) -> void:
	print("→ _on_sse_event type=" + event_type)
	match event_type:
		"session.status":
			var sid: String = properties.get("sessionID", "")
			var status: Dictionary = properties.get("status", {})
			if status.get("type") == "idle" and sid == _current_session_id:
				_finalize_streaming()
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
			var field: String = properties.get("field", "")
			var delta: String = properties.get("delta", "")

			# 思考内容单独处理
			if field == "reasoning":
				if _streaming_thinking_label:
					_streaming_thinking_text += delta
					_streaming_thinking_label.visible = true
					# 用 BBCode 渲染思考文字（灰色 + "思考：" 前缀）
					var col_html := color_text_dim.to_html(true)
					_streaming_thinking_label.clear()
					_streaming_thinking_label.append_text("[color=#" + col_html + "]思考：" + _streaming_thinking_text + "[/color]")
					_scroll_to_bottom()
				return

			if field != "text":
				return

			if _streaming_label:
				_streaming_text += delta
				_streaming_label.text = _streaming_text
				_scroll_to_bottom()
			# Token 速率追踪
			_rate_tokens += delta.length()
			if _rate_time < 0.001:
				_rate_time = 0.001
				_rate_tokens = 0
			else:
				_rate_time += 0.1  # 粗略估算

		"sync":
			# SyncEvent: 工具调用状态更新（PartUpdated）
			var sync_data: Dictionary = properties.get("syncEvent", {})
			var sync_type: String = sync_data.get("type", "")
			if sync_type == "message.part.updated":
				var data: Dictionary = sync_data.get("data", {})
				var part: Dictionary = data.get("part", {})
				var part_type: String = part.get("type", "")
				if part_type == "tool" and _streaming_label != null:
					var tool_name: String = part.get("tool", "?")
					var state: Dictionary = part.get("state", {})
					var status: String = state.get("status", "running")
					var icon: String = "✅" if status == "completed" else ("❌" if status == "error" else "🔧")
					_streaming_text += "\n**" + icon + " " + tool_name + "**"
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

		"server.connected":
			_hide_loading()
			_set_status("服务器已连接")

		"server.heartbeat":
			pass


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
	_streaming_text = ""
	_streaming_thinking_text = ""

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

	# 思考标签（初始隐藏，SSE 推送时可见）
	_streaming_thinking_label = RichTextLabel.new()
	_streaming_thinking_label.bbcode_enabled = true
	_streaming_thinking_label.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART
	_streaming_thinking_label.fit_content = true
	_streaming_thinking_label.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	_streaming_thinking_label.add_theme_font_size_override("normal_font_size", font_size_base - 1)
	_streaming_thinking_label.append_text("")
	_streaming_thinking_label.visible = false
	msg_vbox.add_child(_streaming_thinking_label)

	# 主文本气泡
	var bubble := PanelContainer.new()
	bubble.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	var style := StyleBoxFlat.new()
	style.bg_color = bubble_ai_bg
	style.border_width_left = 3
	style.border_color = bubble_ai_border
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
	_streaming_label.add_theme_font_size_override("normal_font_size", font_size_base)
	_streaming_label.add_theme_color_override("default_color", color_text)

	bubble.add_child(_streaming_label)
	msg_vbox.add_child(bubble)

	# 将流式节点添加到虚拟内容底部（在虚拟滚动行之后）
	_streaming_node = msg_vbox
	var y_pos := virtual_content.custom_minimum_size.y
	msg_vbox.position.y = y_pos
	msg_vbox.size.x = virtual_content.size.x
	virtual_content.add_child(msg_vbox)
	_scroll_to_bottom()
	return msg_vbox


func _finalize_streaming() -> void:
	print("→ _finalize_streaming")
	## 完成流式响应（不删除节点，由 _append_message 清理）
	_streaming_label = null
	_streaming_thinking_label = null
	_scroll_to_bottom()


func _clear_messages() -> void:
	print("→ _clear_messages")
	## 清除虚拟滚动所有状态
	_row_data.clear()
	_y_offsets.clear()
	_row_heights.clear()
	_row_assignments.clear()
	if _streaming_node != null and is_instance_valid(_streaming_node):
		_streaming_node.queue_free()
		_streaming_node = null
		_streaming_label = null
		_streaming_thinking_label = null
	for node in _free_nodes:
		if is_instance_valid(node):
			node.queue_free()
	_free_nodes.clear()
	virtual_content.custom_minimum_size.y = 0
	# 清除 virtual_content 下所有子节点
	for c in virtual_content.get_children():
		c.queue_free()


func _set_status(text: String) -> void:
	status_label.text = text


# ── 加载覆盖面板 ──

var _loading_overlay: Control = null

func _ensure_loading_overlay() -> void:
	## 创建/获取加载覆盖面板（覆盖整个消息区，在 scroll 之上）
	if _loading_overlay != null:
		return
	
	# 用 CanvasLayer 确保覆盖在 scroll 之上且不受布局影响
	var layer := CanvasLayer.new()
	layer.layer = 50  # 高于普通控件
	
	var panel := Panel.new()
	panel.name = "LoadingPanel"
	panel.mouse_filter = Control.MOUSE_FILTER_IGNORE
	panel.set_anchors_and_offsets_preset(Control.PRESET_FULL_RECT)
	var pstyle := StyleBoxFlat.new()
	pstyle.bg_color = Color(0, 0, 0, 0.85)
	panel.add_theme_stylebox_override("panel", pstyle)
	
	var lbl := Label.new()
	lbl.name = "LoadingLabel"
	lbl.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
	lbl.vertical_alignment = VERTICAL_ALIGNMENT_CENTER
	lbl.add_theme_font_size_override("font_size", 20)
	lbl.add_theme_color_override("font_color", Color(0.6, 0.6, 0.6, 1))
	panel.add_child(lbl)
	
	layer.add_child(panel)
	# 挂在 scroll 的父节点（ChatArea）上，覆盖消息区域
	scroll.get_parent().add_child(layer)
	_loading_overlay = panel
	_loading_overlay.hide()

func _show_loading(text: String) -> void:
	_ensure_loading_overlay()
	var lbl := _loading_overlay.get_node("LoadingLabel") as Label
	if lbl != null:
		lbl.text = text
	_loading_overlay.show()

func _hide_loading() -> void:
	if _loading_overlay != null:
		_loading_overlay.hide()


func _scroll_to_bottom() -> void:
	_scroll_pending = true


func _push_scroll_bottom_deferred() -> void:
	## 迭代滚动：从顶一次推一段，直到 scroll 无法再推（已到真底）
	if _row_data.size() <= 1:
		scroll.scroll_vertical = 99999
		return

	var vp_h: float = maxf(scroll.size.y, 100)
	var step: float = vp_h * 0.66  # 每次推 2/3 视口高度，避免跳过行的测量
	scroll.scroll_vertical = 0
	await get_tree().process_frame

	while true:
		var vbar := scroll.get_v_scroll_bar()
		if vbar == null or vbar.max_value <= 0:
			break
		var cur: float = scroll.scroll_vertical
		var max_v: float = vbar.max_value
		if cur >= max_v - 2.0:
			break  # 已到真底
		scroll.scroll_vertical = int(cur + step)
		await get_tree().process_frame
	# 最后再推一次确保到底（高度在实测中逐渐趋准）
	scroll.scroll_vertical = 99999


func _do_scroll_to_bottom() -> void:
	## 实际执行滚动到底部，由 _process 防抖调用
	var max_y: float = virtual_content.custom_minimum_size.y
	if max_y > 0:
		scroll.scroll_vertical = int(max_y)
