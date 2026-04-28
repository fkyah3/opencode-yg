class_name PermissionDialog
extends Control

## 权限请求对话框
##
## AI 请求执行操作时弹出（bash/read/write/edit 等）。
## 用户选择"允许一次" / "始终允许" / "拒绝"。

signal permission_replied(request_id: String, reply_type: String, message: String)

# ── 界面节点 ──
var _bg: ColorRect
var _panel: Panel
var _title_label: Label
var _content_label: RichTextLabel
var _message_input: TextEdit
var _btn_once: Button
var _btn_always: Button
var _btn_reject: Button

var _request_id: String = ""


func _ready() -> void:
	# 半透明背景遮罩
	_bg = ColorRect.new()
	_bg.color = Color(0, 0, 0, 0.5)
	_bg.mouse_filter = Control.MOUSE_FILTER_STOP
	_bg.set_anchors_and_offsets_preset(Control.PRESET_FULL_RECT)
	add_child(_bg)

	# 对话框面板——初始放中间，后续 resize 会重新居中
	_panel = Panel.new()
	_panel.custom_minimum_size = Vector2(420, 260)
	_panel.size = Vector2(420, 260)
	add_child(_panel)

	# _ready 末尾调用居中，因为此时 viewport 尺寸才可用
	call_deferred("_center_panel")

	# 标题
	_title_label = Label.new()
	_title_label.text = "🔐 权限请求"
	_title_label.add_theme_font_size_override("font_size", 18)
	_title_label.add_theme_color_override("font_color", Color(1, 1, 1))
	_title_label.position = Vector2(16, 12)
	_title_label.size = Vector2(388, 28)
	_panel.add_child(_title_label)

	# 分隔线
	var sep := ColorRect.new()
	sep.color = Color(0.3, 0.3, 0.3)
	sep.position = Vector2(16, 44)
	sep.size = Vector2(388, 1)
	_panel.add_child(sep)

	# 内容区域
	_content_label = RichTextLabel.new()
	_content_label.bbcode_enabled = true
	_content_label.position = Vector2(16, 52)
	_content_label.size = Vector2(388, 90)
	_content_label.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART
	_content_label.fit_content = true
	_panel.add_child(_content_label)

	# 用户反馈输入（可选）
	var msg_label := Label.new()
	msg_label.text = "反馈（可选）:"
	msg_label.add_theme_color_override("font_color", Color(0.7, 0.7, 0.7))
	msg_label.add_theme_font_size_override("font_size", 12)
	msg_label.position = Vector2(16, 146)
	msg_label.size = Vector2(100, 18)
	_panel.add_child(msg_label)

	_message_input = TextEdit.new()
	_message_input.placeholder_text = "给 AI 的反馈..."
	_message_input.custom_minimum_size = Vector2(388, 36)
	_message_input.size = Vector2(388, 36)
	_message_input.position = Vector2(16, 166)
	_message_input.add_theme_color_override("background_color", Color(0.15, 0.15, 0.15))
	_message_input.add_theme_color_override("font_color", Color(0.85, 0.85, 0.85))
	_panel.add_child(_message_input)

	# 按钮行
	var btn_y := 216
	var btn_w := 120
	var btn_h := 32
	var spacing := 8
	var total_w := btn_w * 3 + spacing * 2
	var start_x := (420 - total_w) / 2

	_btn_reject = Button.new()
	_btn_reject.text = "❌ 拒绝"
	_btn_reject.position = Vector2(start_x, btn_y)
	_btn_reject.size = Vector2(btn_w, btn_h)
	_btn_reject.pressed.connect(_on_reject)
	_panel.add_child(_btn_reject)

	_btn_once = Button.new()
	_btn_once.text = "▶ 允许一次"
	_btn_once.position = Vector2(start_x + btn_w + spacing, btn_y)
	_btn_once.size = Vector2(btn_w, btn_h)
	_btn_once.pressed.connect(_on_allow_once)
	_panel.add_child(_btn_once)

	_btn_always = Button.new()
	_btn_always.text = "✓ 始终允许"
	_btn_always.position = Vector2(start_x + (btn_w + spacing) * 2, btn_y)
	_btn_always.size = Vector2(btn_w, btn_h)
	_btn_always.pressed.connect(_on_allow_always)
	_panel.add_child(_btn_always)


func _center_panel() -> void:
	var viewport_size := get_viewport_rect().size
	_panel.position = Vector2(
		(viewport_size.x - _panel.size.x) / 2,
		(viewport_size.y - _panel.size.y) / 2
	)


## 显示权限请求对话框
func show_permission(request_id: String, permission: String, patterns: Array, metadata: Dictionary = {}) -> void:
	_request_id = request_id

	var details := ""
	if permission == "bash":
		details = "执行命令"
	elif permission == "read":
		details = "读取文件"
	elif permission == "write":
		details = "写入文件"
	elif permission == "edit":
		details = "编辑文件"
	else:
		details = permission

	var bbcode := "[b]AI 请求执行:[/b] " + details + "\n"
	if patterns.size() > 0:
		bbcode += "\n[b]模式:[/b] "
		for p in patterns:
			bbcode += "\n  [color=#88cc88]" + str(p) + "[/color]"
	_content_label.append_text(bbcode)

	_message_input.text = ""
	visible = true


func _on_allow_once() -> void:
	var msg := _message_input.text.strip_edges()
	permission_replied.emit(_request_id, "once", msg)
	visible = false


func _on_allow_always() -> void:
	var msg := _message_input.text.strip_edges()
	permission_replied.emit(_request_id, "always", msg)
	visible = false


func _on_reject() -> void:
	var msg := _message_input.text.strip_edges()
	permission_replied.emit(_request_id, "reject", msg)
	visible = false
