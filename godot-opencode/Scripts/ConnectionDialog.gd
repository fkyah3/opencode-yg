class_name ConnectionDialog
extends PopupPanel

## 连接对话框 — 用户手动输入 opencode 服务器的地址和端口。

signal connected(url: String)

var url_input: LineEdit


func _ready() -> void:
	var margin := MarginContainer.new()
	margin.add_theme_constant_override("margin_left", 12)
	margin.add_theme_constant_override("margin_right", 12)
	margin.add_theme_constant_override("margin_top", 12)
	margin.add_theme_constant_override("margin_bottom", 12)
	add_child(margin)
	
	var vbox := VBoxContainer.new()
	vbox.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	vbox.size_flags_vertical = Control.SIZE_EXPAND_FILL
	margin.add_child(vbox)
	
	var label := Label.new()
	label.text = "服务器地址:"
	label.add_theme_color_override("font_color", Color(0.85, 0.85, 0.85))
	label.add_theme_font_size_override("font_size", 14)
	vbox.add_child(label)
	
	url_input = LineEdit.new()
	url_input.placeholder_text = "http://127.0.0.1:4096"
	url_input.text = "http://127.0.0.1:4096"
	url_input.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	url_input.caret_blink = true
	url_input.text_submitted.connect(_on_text_submitted)
	vbox.add_child(url_input)
	
	var btn_hbox := HBoxContainer.new()
	btn_hbox.alignment = BoxContainer.ALIGNMENT_END
	btn_hbox.add_theme_constant_override("separation", 8)
	vbox.add_child(btn_hbox)
	
	var cancel_btn := Button.new()
	cancel_btn.text = "取消"
	cancel_btn.pressed.connect(_on_cancel)
	btn_hbox.add_child(cancel_btn)
	
	var connect_btn := Button.new()
	connect_btn.text = "连接"
	connect_btn.pressed.connect(_on_connect)
	btn_hbox.add_child(connect_btn)


func popup_connect() -> void:
	url_input.select_all()
	url_input.grab_focus()
	min_size = Vector2i(360, 140)
	popup_centered()


func _on_text_submitted(_text: String) -> void:
	_on_connect()


func _on_cancel() -> void:
	hide()


func _on_connect() -> void:
	var url := url_input.text.strip_edges()
	if url.is_empty():
		return
	if not url.begins_with("http://") and not url.begins_with("https://"):
		url = "http://" + url
	connected.emit(url)
	hide()
