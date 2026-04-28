class_name CommandPalette
extends Control

## 命令面板组件。输入 `/` 时弹出，显示可筛选的命令列表。
## 选中命令后通过 signal 通知父场景。

signal command_selected(command_name: String)

## 内置命令列表（与 OpenCode 的 slash commands 对应）
const COMMANDS := [
	{"name": "/commit", "desc": "Git 提交并推送"},
	{"name": "/handoff", "desc": "生成交接上下文摘要"},
	{"name": "/learn", "desc": "提取会话经验到 AGENTS.md"},
	{"name": "/changelog", "desc": "生成变更日志"},
	{"name": "/issues", "desc": "查找 GitHub Issue"},
	{"name": "/refactor", "desc": "智能重构（AST + TDD）"},
	{"name": "/spellcheck", "desc": "拼写检查 Markdown 变更"},
	{"name": "/rmslop", "desc": "移除 AI 代码异味"},
	{"name": "/ai-deps", "desc": "更新 AI SDK 依赖版本"},
	{"name": "/playwright", "desc": "浏览器自动化"},
	{"name": "/frontend-ui-ux", "desc": "前端 UI/UX 开发"},
	{"name": "/ai-slop-remover", "desc": "移除单文件 AI 代码异味"},
	{"name": "/init-deep", "desc": "初始化 AGENTS.md 知识库"},
	{"name": "/ralph-loop", "desc": "自参考开发循环"},
	{"name": "/ulw-loop", "desc": "Ultrawork 模式循环"},
	{"name": "/start-work", "desc": "从 Prometheus 计划开始工作"},
	{"name": "/stop-continuation", "desc": "停止所有延续机制"},
	{"name": "/prompt-version", "desc": "显示当前提示词版本"},
]

# ── 控件引用 ──
var _bg: ColorRect
var _panel: PanelContainer
var _search: LineEdit
var _list: VBoxContainer
var _scroll: ScrollContainer
var _all_commands: Array = []

var _filtered: Array = []


func _ready() -> void:
	# 背景遮罩（全屏半透明，点击关闭）
	_bg = ColorRect.new()
	_bg.color = Color(0, 0, 0, 0.45)
	_bg.mouse_filter = Control.MOUSE_FILTER_STOP
	_bg.set_anchors_and_offsets_preset(Control.PRESET_FULL_RECT)
	add_child(_bg)
	_bg.gui_input.connect(_on_bg_click)

	# 面板容器（居中）
	_panel = PanelContainer.new()
	_panel.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	_panel.custom_minimum_size = Vector2(400, 0)
	_panel.set_anchors_and_offsets_preset(Control.PRESET_FULL_RECT)
	add_child(_panel)

	# 面板内部：VBox
	var vbox := VBoxContainer.new()
	vbox.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	vbox.size_flags_vertical = Control.SIZE_EXPAND_FILL
	_panel.add_child(vbox)

	# 搜索输入框
	var title_label := Label.new()
	title_label.text = "  OpenCode 命令 [输入/后继续筛选]"
	title_label.add_theme_color_override("font_color", Color(0.7, 0.7, 0.7, 1))
	title_label.custom_minimum_size = Vector2(0, 24)
	vbox.add_child(title_label)

	var search_bg := PanelContainer.new()
	search_bg.custom_minimum_size = Vector2(0, 30)
	vbox.add_child(search_bg)

	_search = LineEdit.new()
	_search.placeholder_text = "搜索命令..."
	_search.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	_search.text_changed.connect(_on_search_changed)
	_search.text_submitted.connect(_on_search_submitted)
	search_bg.add_child(_search)

	var div := ColorRect.new()
	div.color = Color(0.3, 0.3, 0.3, 1)
	div.custom_minimum_size = Vector2(0, 1)
	div.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	vbox.add_child(div)

	# 命令列表
	_scroll = ScrollContainer.new()
	_scroll.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	_scroll.size_flags_vertical = Control.SIZE_EXPAND_FILL
	vbox.add_child(_scroll)

	_list = VBoxContainer.new()
	_list.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	_scroll.add_child(_list)

	# 底部提示
	var footer := Label.new()
	footer.text = "  点击选择 | /后继续输入筛选 | ESC 关闭"
	footer.add_theme_color_override("font_color", Color(0.5, 0.5, 0.5, 1))
	footer.custom_minimum_size = Vector2(0, 22)
	vbox.add_child(footer)

	# 填充命令
	_all_commands = COMMANDS.duplicate()
	_filter_commands("")


func show_palette(filter_prefix: String = "") -> void:
	visible = true
	_search.grab_focus()
	_search.text = filter_prefix
	_search.caret_column = _search.text.length()
	_filter_commands(filter_prefix)


func hide_palette() -> void:
	visible = false


func _on_search_changed(new_text: String) -> void:
	_filter_commands(new_text)


func _on_search_submitted(new_text: String) -> void:
	# 按 Enter 时选中第一个匹配的命令
	if _filtered.size() > 0:
		_on_command_pressed(_filtered[0].get("name", ""))


func _filter_commands(prefix: String) -> void:
	# 清除旧列表
	for c in _list.get_children():
		c.queue_free()

	_filtered.clear()
	for cmd in _all_commands:
		var name: String = cmd.get("name", "")
		var desc: String = cmd.get("desc", "")
		if prefix.is_empty() or name.findn(prefix) != -1 or desc.findn(prefix) != -1:
			_filtered.append(cmd)

	for cmd in _filtered:
		var btn := Button.new()
		btn.text = cmd.get("name", "") + "  —  " + cmd.get("desc", "")
		btn.size_flags_horizontal = Control.SIZE_EXPAND_FILL
		btn.add_theme_color_override("font_color", Color(0.9, 0.9, 0.9, 1))
		btn.add_theme_color_override("font_hover_color", Color(1, 1, 1, 1))
		btn.add_theme_stylebox_override("hover", _make_hover_style())
		btn.pressed.connect(_on_command_pressed.bind(cmd.get("name", "")))
		_list.add_child(btn)

	if _filtered.size() == 0:
		var empty := Label.new()
		empty.text = "  没有匹配的命令"
		empty.add_theme_color_override("font_color", Color(0.5, 0.5, 0.5, 1))
		_list.add_child(empty)


func _on_command_pressed(cmd_name: String) -> void:
	command_selected.emit(cmd_name)
	hide_palette()


func _on_bg_click(event: InputEvent) -> void:
	if event is InputEventMouseButton and event.pressed and event.button_index == MOUSE_BUTTON_LEFT:
		hide_palette()


func _make_hover_style() -> StyleBoxFlat:
	var s := StyleBoxFlat.new()
	s.bg_color = Color(0.3, 0.3, 0.3, 0.5)
	return s
