extends Window

## 问题对话框。用户回答问题后发送 reply。
signal question_replied(request_id: String, reply_type: String, selected: String)

var _request_id: String = ""
var _question_label: RichTextLabel
var _confirm_btn: Button
var _reject_btn: Button

func _ready() -> void:
	title = "需确认"
	min_size = Vector2(400, 180)
	size = Vector2(400, 180)
	initial_position = Window.WINDOW_INITIAL_POSITION_CENTER_MAIN_WINDOW_SCREEN
	visible = false

	var vbox := VBoxContainer.new()
	vbox.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	vbox.size_flags_vertical = Control.SIZE_EXPAND_FILL
	vbox.add_theme_constant_override("separation", 8)
	add_child(vbox)

	_question_label = RichTextLabel.new()
	_question_label.bbcode_enabled = true
	_question_label.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART
	_question_label.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	_question_label.size_flags_vertical = Control.SIZE_EXPAND_FILL
	_question_label.custom_minimum_size.y = 50
	vbox.add_child(_question_label)

	var hbox := HBoxContainer.new()
	hbox.size_flags_horizontal = Control.SIZE_SHRINK_CENTER
	hbox.add_theme_constant_override("separation", 8)
	vbox.add_child(hbox)

	_confirm_btn = Button.new()
	_confirm_btn.text = "确认"
	_confirm_btn.pressed.connect(_on_click.bind("once"))
	hbox.add_child(_confirm_btn)

	_reject_btn = Button.new()
	_reject_btn.text = "拒绝"
	_reject_btn.pressed.connect(_on_click.bind("reject"))
	hbox.add_child(_reject_btn)

	close_requested.connect(_on_click.bind("reject"))

func show_question(request_id: String, question: String, options: Array, allow_multiple: bool) -> void:
	_request_id = request_id
	_question_label.text = question
	_confirm_btn.disabled = false
	_reject_btn.disabled = false
	visible = true

func _on_click(reply_type: String) -> void:
	_confirm_btn.disabled = true
	_reject_btn.disabled = true
	visible = false
	question_replied.emit(_request_id, reply_type, "")
