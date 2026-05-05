extends Control
class_name SessionTab
## 单个会话的独立面板。
## 管理自己的消息节点、流式节点、滚动状态。
## 每切一次会话就是显示/隐藏不同的 SessionTab。

var session_id: String = ""
var _row_data: Array = []

# ── 消息容器 ──
var _msg_container: VBoxContainer

# ── 流式节点 ──
var streaming_node: Control
var streaming_label: RichTextLabel
var _streaming_text: String = ""

# ── 依赖 ──
var _theme_config: ThemeConfig
var _part_renderer: PartRenderer


func _init(theme_config: ThemeConfig, part_renderer: PartRenderer) -> void:
	_theme_config = theme_config
	_part_renderer = part_renderer
	size_flags_horizontal = Control.SIZE_EXPAND_FILL
	size_flags_vertical = 0
	mouse_filter = Control.MOUSE_FILTER_PASS
	
	_msg_container = VBoxContainer.new()
	_msg_container.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	_msg_container.size_flags_vertical = 0
	add_child(_msg_container)


# ── 消息管理 ─────────────────────────────────────────────

func append_message(msg: Dictionary) -> void:
	## 追加消息节点到底部
	var node := _build_raw_node(msg)
	_msg_container.add_child(node)
	_row_data.append(msg)


func append_messages(msgs: Array) -> void:
	## 批量追加消息（加载时用）
	for m in msgs:
		var node := _build_raw_node(m)
		_msg_container.add_child(node)
	_row_data = msgs.duplicate()


func clear_messages() -> void:
	## 清空消息节点（流式节点不受影响）
	for c in _msg_container.get_children():
		_msg_container.remove_child(c)
		c.queue_free()
	_row_data.clear()


func get_message_count() -> int:
	return _msg_container.get_child_count()


# ── 流式管理 ─────────────────────────────────────────────

func start_streaming() -> void:
	## 创建流式响应节点，放在消息容器末尾
	var bubble := PanelContainer.new()
	bubble.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	
	var style := StyleBoxFlat.new()
	style.bg_color = _theme_config.bubble_ai_bg
	style.border_color = _theme_config.bubble_ai_border
	style.border_width_left = 3
	style.corner_radius_bottom_right = 6
	style.corner_radius_top_right = 6
	style.content_margin_left = 10
	style.content_margin_right = 10
	style.content_margin_top = 6
	style.content_margin_bottom = 6
	bubble.add_theme_stylebox_override("panel", style)
	
	var label := RichTextLabel.new()
	label.bbcode_enabled = false
	label.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART
	label.fit_content = true
	label.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	label.add_theme_color_override("default_color", _theme_config.color_text)
	bubble.add_child(label)
	
	_msg_container.add_child(bubble)
	streaming_node = bubble
	streaming_label = label
	_streaming_text = ""


func append_streaming_text(delta: String) -> void:
	_streaming_text += delta
	if streaming_label != null:
		streaming_label.text = _streaming_text


func finalize_streaming() -> void:
	## 流式完成，节点保留为永久消息
	streaming_label = null
	streaming_node = null


# ── 内部构建 ─────────────────────────────────────────────

func _build_raw_node(msg: Dictionary) -> Control:
	## 构建一条消息节点（纯文本，无 BBCode 颜色）
	var is_user: bool = msg.get("role", "") == "user"
	var parts: Array = msg.get("parts", [])
	var root := VBoxContainer.new()
	root.size_flags_horizontal = Control.SIZE_EXPAND_FILL

	# 名称标签
	var name_label := RichTextLabel.new()
	name_label.bbcode_enabled = true
	name_label.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	name_label.add_theme_color_override("default_color", _theme_config.color_text_name)
	name_label.append_text("你" if is_user else "AI")
	root.add_child(name_label)

	# 消息气泡
	var text_parts := PackedStringArray()
	for p in parts:
		var pt: String = p.get("type", "")
		if pt.begins_with("tool-"):
			pt = "tool"
		match pt:
			"reasoning":
				var rt: String = p.get("text", "")
				if not rt.is_empty():
					text_parts.append(rt)
			"text":
				var txt: String = p.get("text", "")
				if not txt.is_empty():
					text_parts.append(txt)
			"tool", "tool-call":
				var tool_name: String = p.get("tool", p.get("name", "?"))
				var state: Dictionary = p.get("state", {})
				var stype: String = state.get("status", "")
				var icon: String = "OK" if stype == "completed" else ("ERR" if stype == "error" else ">>")
				var ttitle: String = state.get("title", "")
				var fpath: String = state.get("input", {}).get("filePath", "")
				var tname: String = tool_name + " " + (ttitle if not ttitle.is_empty() else fpath)
				text_parts.append(icon + " " + tname.trim_suffix(".md"))
				var raw_content: String = state.get("input", {}).get("content", "")
				if not raw_content.is_empty():
					text_parts.append(raw_content.left(1500))
				if stype == "completed":
					var output: String = state.get("output", "")
					if not output.is_empty():
						text_parts.append(output.left(1500))

	if not text_parts.is_empty():
		var bubble := PanelContainer.new()
		bubble.size_flags_horizontal = Control.SIZE_EXPAND_FILL
		var style := StyleBoxFlat.new()
		style.bg_color = _theme_config.bubble_user_bg if is_user else _theme_config.bubble_ai_bg
		style.border_color = _theme_config.bubble_user_border if is_user else _theme_config.bubble_ai_border
		style.border_width_left = 3
		style.corner_radius_bottom_right = 6
		style.corner_radius_top_right = 6
		style.set_content_margin_all(8)
		bubble.add_theme_stylebox_override("panel", style)
		var label := RichTextLabel.new()
		label.bbcode_enabled = false
		label.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART
		label.fit_content = true
		label.size_flags_horizontal = Control.SIZE_EXPAND_FILL
		label.add_theme_color_override("default_color", _theme_config.color_text)
		label.text = "\n".join(text_parts)
		bubble.add_child(label)
		root.add_child(bubble)

	root.set_meta("row_data", msg)
	return root
