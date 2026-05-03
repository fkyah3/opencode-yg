extends RefCounted
class_name PartRenderer


# ═══════════════════ Part → BBCode 渲染器 ═══════════════════
# 职责：将消息 Parts（text / tool / reasoning）转为 BBCode 字符串。
# 每个 render_* 方法接受一个 part 字典（Json 对象），返回 BBCode 片段。
# 调用方将这些片段用 "\n" 拼接后通过 append_text() 渲染。
# 无状态，ThemeConfig 在构造时注入。

var theme_config: ThemeConfig


func _init(config: ThemeConfig) -> void:
	theme_config = config


func render_part_text(txt: String) -> String:
	## text part：Markdown → BBCode（颜色方案取自 ThemeConfig）
	var cfg := MarkdownBBCodeConfig.new()
	cfg.heading_color = Color("#C77DFF")
	cfg.bold_color = Color("#FF9500")
	cfg.code_color = Color("#4CD964")
	return MarkdownBBCode.to_bbcode(txt, cfg)


func render_part_tool(d: Dictionary) -> String:
	## tool part：根据工具语义生成 BBCode，不经过 markdown 转换
	var tool_name: String = d.get("tool", d.get("name", d.get("function", {}).get("name", "?")))
	var state: Dictionary = d.get("state", {})
	var status: String = state.get("status", "")
	var icon: String = "✅" if status == "completed" else ("❌" if status == "error" else "🔧")
	var ttitle: String = state.get("title", "")
	var fpath: String = state.get("input", {}).get("filePath", "")
	var tname: String = tool_name + " " + (ttitle if not ttitle.is_empty() else fpath)

	var parts := PackedStringArray()
	parts.append("**" + icon + " " + tname.trim_suffix(".md") + "**")

	# edit → 原文红、修改后绿
	if tool_name == "edit":
		var old_str: String = state.get("input", {}).get("oldString", "")
		var new_str: String = state.get("input", {}).get("newString", "")
		if not old_str.is_empty() or not new_str.is_empty():
			var old_esc := old_str.replace("[", "[lb]")
			var new_esc := new_str.replace("[", "[lb]")
			parts.append("\n[color=#ff5555]─ 原文 ─[/color]\n[color=#ff5555]" + old_esc + "[/color]\n[color=#55ff55]─ 修改后 ─[/color]\n[color=#55ff55]" + new_esc + "[/color]")
	else:
		# write/bash/shell → 代码块包裹内容
		var mutation: bool = tool_name in ["write", "bash", "shell"]
		if mutation:
			var raw: String = state.get("input", {}).get("content", "")
			var out: String = state.get("output", "")
			if not raw.is_empty():
				parts.append("\n```\n" + raw.left(1500) + "\n```")
			elif not out.is_empty():
				parts.append("\n```\n" + out.left(1500) + "\n```")

	return "\n".join(parts)
