extends Window

## 权限请求对话框。通过 `permission_replied` 信号返回用户选择。
## reply_type: "once" | "always" | "reject"

signal permission_replied(request_id: String, reply_type: String, message: String)

var _request_id: String = ""
var _patterns_label: RichTextLabel
var _message_input: TextEdit
var _once_btn: Button
var _always_btn: Button
var _reject_btn: Button


func _ready() -> void:
	title = "操作请求"
	min_size = Vector2(480, 260)
	size = Vector2(480, 260)
	initial_position = Window.WINDOW_INITIAL_POSITION_CENTER_MAIN_WINDOW_SCREEN
	visible = false

	# 主布局
	var vbox := VBoxContainer.new()
	vbox.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	vbox.size_flags_vertical = Control.SIZE_EXPAND_FILL
	vbox.add_theme_constant_override("separation", 8)
	add_child(vbox)

	# 提示文字
	var hint := Label.new()
	hint.text = "AI 请求以下操作权限："
	hint.add_theme_color_override("font_color", Color(0.8, 0.8, 0.8, 1))
	vbox.add_child(hint)

	# 操作描述（BBCode 支持）
	_patterns_label = RichTextLabel.new()
	_patterns_label.bbcode_enabled = true
	_patterns_label.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART
	_patterns_label.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	_patterns_label.size_flags_vertical = Control.SIZE_EXPAND_FILL
	_patterns_label.custom_minimum_size.y = 60
	vbox.add_child(_patterns_label)

	# 拒接理由输入
	var msg_label := Label.new()
	msg_label.text = "拒接理由（可选）："
	msg_label.add_theme_color_override("font_color", Color(0.6, 0.6, 0.6, 1))
	vbox.add_child(msg_label)

	_message_input = TextEdit.new()
	_message_input.custom_minimum_size.y = 40
	_message_input.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	_message_input.placeholder_text = "输入拒接理由（选填）"
	vbox.add_child(_message_input)

	# 按钮行
	var hbox := HBoxContainer.new()
	hbox.size_flags_horizontal = Control.SIZE_SHRINK_CENTER
	hbox.add_theme_constant_override("separation", 8)
	vbox.add_child(hbox)

	_once_btn = Button.new()
	_once_btn.text = "同意一次"
	_once_btn.pressed.connect(_on_click.bind("once"))
	hbox.add_child(_once_btn)

	_always_btn = Button.new()
	_always_btn.text = "全部同意（本会话）"
	_always_btn.pressed.connect(_on_click.bind("always"))
	hbox.add_child(_always_btn)

	_reject_btn = Button.new()
	_reject_btn.text = "拒绝"
	_reject_btn.pressed.connect(_on_click.bind("reject"))
	hbox.add_child(_reject_btn)

	# 关闭窗口时等同于拒绝
	close_requested.connect(_on_close_requested)


func show_permission(request_id: String, permission: String, patterns: Array, metadata: Dictionary) -> void:
	_request_id = request_id
	_message_input.text = ""

	# 构建描述文字
	var desc := "[b]权限类型:[/b] " + permission + "\n[b]涉及路径/模式:[/b]\n"
	for p in patterns:
		desc += "  " + p + "\n"
	desc += "\n选择处理方式："
	_patterns_label.text = desc

	_once_btn.disabled = false
	_always_btn.disabled = false
	_reject_btn.disabled = false
	visible = true


func _on_click(reply_type: String) -> void:
	_once_btn.disabled = true
	_always_btn.disabled = true
	_reject_btn.disabled = true
	visible = false
	permission_replied.emit(_request_id, reply_type, _message_input.text.strip_edges())


func _on_close_requested() -> void:
	_on_click("reject")
