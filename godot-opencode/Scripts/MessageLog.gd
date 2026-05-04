extends RefCounted
## VBoxContainer 子节点管理。
## 职责：消息节点的创建、流式节点的生命周期、节点清理。
## 不管理 SSE、不管理滚动、不涉及 API。

class_name MessageLog

# ── 回调（构造注入替代信号） ──
var on_node_count_changed: Callable  # func(count: int)
var on_streaming_height_changed: Callable  # func()

# ── 内部状态 ──
var _container: VBoxContainer
var _streaming_node: VBoxContainer
var _streaming_label: RichTextLabel = null

var _theme_config: ThemeConfig
var _part_renderer: PartRenderer


func _init(container: VBoxContainer, theme_config: ThemeConfig, part_renderer: PartRenderer) -> void:
	_container = container
	_theme_config = theme_config
	_part_renderer = part_renderer


# ── 清空所有节点（包括流式）────────────────────────────────────────
func clear_all() -> void:
	for c in _container.get_children():
		c.queue_free()
	_streaming_node = null
	_streaming_label = null


# ── 创建消息节点（历史加载/用户消息）────────────────────────────────
func build_node(msg: Dictionary) -> VBoxContainer:
	## 创建一个固定结构的消息节点并返回（不添加到容器）
	var is_user: bool = msg.get("role", "") == "user"
	var parts: Array = msg.get("parts", [])
	var root := VBoxContainer.new()
	root.size_flags_horizontal = Control.SIZE_EXPAND_FILL

	# 名称标签
	var name_label := RichTextLabel.new()
	name_label.bbcode_enabled = true
	name_label.selection_enabled = true
	name_label.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	name_label.add_theme_color_override("default_color", _theme_config.color_text_name)
	name_label.append_text("你" if is_user else "AI")
	root.add_child(name_label)

	# 统一流式风格：灰色思考，粗体工具，原文文字
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
					raw_parts.append("[color=#" + _theme_config.color_text_dim.to_html(false) + "]" + rt + "[/color]")
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
				raw_parts.append("[b]" + icon + " " + tname.trim_suffix(".md") + "[/b]")
				var raw_content: String = state.get("input", {}).get("content", "")
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
		style.bg_color = _theme_config.bubble_user_bg if is_user else _theme_config.bubble_ai_bg
		style.border_color = _theme_config.bubble_user_border if is_user else _theme_config.bubble_ai_border
		style.border_width_left = 3
		style.corner_radius_bottom_right = 6
		style.corner_radius_top_right = 6
		style.set_content_margin_all(10)
		bubble.add_theme_stylebox_override("panel", style)
		var label := RichTextLabel.new()
		label.bbcode_enabled = true
		label.selection_enabled = true
		label.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART
		label.fit_content = true
		label.size_flags_horizontal = Control.SIZE_EXPAND_FILL
		label.add_theme_color_override("default_color", _theme_config.color_text)
		label.append_text("\n".join(raw_parts))
		bubble.add_child(label)
		root.add_child(bubble)
	else:
		# 无内容兜底（不应发生）
		var empty := RichTextLabel.new()
		empty.text = "(空消息)"
		root.add_child(empty)
	return root


func append_node(node: VBoxContainer) -> void:
	## 将节点追加到容器底部，并触发回调
	_container.add_child(node)
	if on_node_count_changed.is_valid():
		on_node_count_changed.call(_container.get_child_count())


# ── 流式节点管理 ─────────────────────────────────────────────────
func create_streaming_widget() -> VBoxContainer:
	## 在容器底部创建一个新的流式节点
	var msg_vbox := VBoxContainer.new()
	msg_vbox.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	msg_vbox.size_flags_vertical = 0

	var bubble := PanelContainer.new()
	bubble.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	var bstyle := StyleBoxFlat.new()
	bstyle.bg_color = _theme_config.bubble_ai_bg
	bstyle.border_color = _theme_config.bubble_ai_border
	bstyle.border_width_left = 3
	bstyle.corner_radius_bottom_right = 6
	bstyle.corner_radius_top_right = 6
	bstyle.set_content_margin_all(8)
	bubble.add_theme_stylebox_override("panel", bstyle)

	_streaming_label = RichTextLabel.new()
	_streaming_label.bbcode_enabled = true
	_streaming_label.selection_enabled = true
	_streaming_label.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART
	_streaming_label.fit_content = true
	_streaming_label.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	_streaming_label.add_theme_color_override("default_color", _theme_config.color_text)
	bubble.add_child(_streaming_label)
	msg_vbox.add_child(bubble)

	_container.add_child(msg_vbox)
	_streaming_node = msg_vbox
	return msg_vbox


func get_streaming_label() -> RichTextLabel:
	return _streaming_label


func lock_streaming() -> void:
	## 锁定流式节点：节点保留在容器中，但不再被追踪为流式节点
	_streaming_label = null
	_streaming_node = null


func is_streaming() -> bool:
	return _streaming_label != null
