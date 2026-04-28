class_name QuestionDialog
extends Control

## 问题请求对话框
##
## AI 向用户提问时弹出，支持单选/多选和文本输入。

signal question_replied(request_id: String, answers: Array)
signal question_rejected(request_id: String)

# ── 界面节点 ──
var _bg: ColorRect
var _panel: Panel
var _title_label: Label
var _question_text: RichTextLabel
var _options_container: VBoxContainer
var _submit_btn: Button
var _reject_btn: Button

var _request_id: String = ""
var _option_checks: Array = []  # CheckBox 列表
var _option_radios: Array = []  # 单选用
var _allow_multiple: bool = false
var _radio_group: ButtonGroup


func _ready() -> void:
	# 半透明背景遮罩
	_bg = ColorRect.new()
	_bg.color = Color(0, 0, 0, 0.5)
	_bg.mouse_filter = Control.MOUSE_FILTER_STOP
	_bg.set_anchors_and_offsets_preset(Control.PRESET_FULL_RECT)
	add_child(_bg)

	# 对话框面板
	_panel = Panel.new()
	_panel.custom_minimum_size = Vector2(440, 300)
	add_child(_panel)
	call_deferred("_center_panel")

	# ── 对话框内部布局 ──
	var margin := 16
	var inner_w := 440 - margin * 2
	var y := 12

	# 标题
	_title_label = Label.new()
	_title_label.text = "❓ AI 提问"
	_title_label.add_theme_font_size_override("font_size", 18)
	_title_label.add_theme_color_override("font_color", Color(1, 1, 1))
	_title_label.position = Vector2(margin, y)
	_title_label.size = Vector2(inner_w, 28)
	_panel.add_child(_title_label)
	y += 36

	# 分隔线
	var sep := ColorRect.new()
	sep.color = Color(0.3, 0.3, 0.3)
	sep.position = Vector2(margin, y)
	sep.size = Vector2(inner_w, 1)
	_panel.add_child(sep)
	y += 8

	# 问题文本
	_question_text = RichTextLabel.new()
	_question_text.bbcode_enabled = true
	_question_text.position = Vector2(margin, y)
	_question_text.size = Vector2(inner_w, 60)
	_question_text.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART
	_question_text.fit_content = true
	_panel.add_child(_question_text)
	y += 68

	# 选项容器（可滚动）
	var scroll := ScrollContainer.new()
	scroll.position = Vector2(margin, y)
	scroll.size = Vector2(inner_w, 120)
	scroll.custom_minimum_size = Vector2(inner_w, 80)
	_panel.add_child(scroll)

	_options_container = VBoxContainer.new()
	_options_container.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	scroll.add_child(_options_container)
	y += 128

	# 按钮行
	var btn_y := y + 8
	var btn_w := 120
	var btn_h := 32
	var spacing := 8
	var total_w := btn_w * 2 + spacing
	var start_x := (440 - total_w) / 2

	_reject_btn = Button.new()
	_reject_btn.text = "✕ 跳过"
	_reject_btn.position = Vector2(start_x, btn_y)
	_reject_btn.size = Vector2(btn_w, btn_h)
	_reject_btn.pressed.connect(_on_reject)
	_panel.add_child(_reject_btn)

	_submit_btn = Button.new()
	_submit_btn.text = "✓ 提交"
	_submit_btn.position = Vector2(start_x + btn_w + spacing, btn_y)
	_submit_btn.size = Vector2(btn_w, btn_h)
	_submit_btn.pressed.connect(_on_submit)
	_panel.add_child(_submit_btn)

	# 调整面板高度
	_panel.size = Vector2(440, btn_y + btn_h + 12)


func _center_panel() -> void:
	var viewport_size := get_viewport_rect().size
	_panel.position = Vector2(
		(viewport_size.x - _panel.size.x) / 2,
		(viewport_size.y - _panel.size.y) / 2
	)


## 显示问题对话框
## options 是字典数组: [{label: "...", description: "..."}]
func show_question(request_id: String, question: String, options: Array, allow_multiple: bool) -> void:
	_request_id = request_id
	_allow_multiple = allow_multiple

	# 设置问题文本
	_question_text.clear()
	_question_text.append_text("[b]" + question + "[/b]")

	# 清空旧选项
	for c in _options_container.get_children():
		c.queue_free()
	_option_checks.clear()
	_option_radios.clear()

	if allow_multiple:
		# 多选 — 使用 CheckBox
		for opt in options:
			var d: Dictionary = opt as Dictionary
			var label_text: String = d.get("label", str(opt))
			var desc: String = d.get("description", "")

			var hbox := HBoxContainer.new()
			hbox.size_flags_horizontal = Control.SIZE_EXPAND_FILL

			var cb := CheckBox.new()
			cb.text = label_text
			cb.size_flags_horizontal = Control.SIZE_EXPAND_FILL
			hbox.add_child(cb)
			_option_checks.append(cb)

			if not desc.is_empty():
				var desc_label := Label.new()
				desc_label.text = "  " + desc
				desc_label.add_theme_color_override("font_color", Color(0.6, 0.6, 0.6))
				desc_label.add_theme_font_size_override("font_size", 11)
				hbox.add_child(desc_label)

			_options_container.add_child(hbox)
	else:
		# 单选 — 使用 RadioButton + ButtonGroup
		_radio_group = ButtonGroup.new()
		for opt in options:
			var d: Dictionary = opt as Dictionary
			var label_text: String = d.get("label", str(opt))
			var desc: String = d.get("description", "")

			var hbox := HBoxContainer.new()
			hbox.size_flags_horizontal = Control.SIZE_EXPAND_FILL

			var rb := CheckButton.new()
			rb.text = label_text
			rb.button_group = _radio_group
			rb.size_flags_horizontal = Control.SIZE_EXPAND_FILL
			hbox.add_child(rb)
			_option_radios.append(rb)

			if not desc.is_empty():
				var desc_label := Label.new()
				desc_label.text = "  " + desc
				desc_label.add_theme_color_override("font_color", Color(0.6, 0.6, 0.6))
				desc_label.add_theme_font_size_override("font_size", 11)
				hbox.add_child(desc_label)

			_options_container.add_child(hbox)

	visible = true


func _on_submit() -> void:
	var answers: Array = []

	if _allow_multiple:
		# 多选 — 收集所有勾选的
		for cb in _option_checks:
			if cb is CheckBox and cb.button_pressed:
				answers.append(cb.text)
	else:
		# 单选 — 收集选中的
		for rb in _option_radios:
			if rb is CheckButton and rb.button_pressed:
				answers.append(rb.text)

	question_replied.emit(_request_id, answers)
	visible = false


func _on_reject() -> void:
	question_rejected.emit(_request_id)
	visible = false
