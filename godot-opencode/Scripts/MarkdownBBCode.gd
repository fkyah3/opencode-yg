class_name MarkdownBBCode
## 轻量级 Markdown → BBCode 转换器。
##
## 覆盖移山需要的最小 Markdown 子集：
##   标题 # → [font_size=][color]
##   粗体 ** → [color][b]
##   行内代码 ` → [color][bgcolor]
##   围栏代码块 ``` → [color] + 行级[bgcolor]
##   转义反斜杠 \\ → 透传
##
## 其它内容原样透传（BBCode 兼容）。
## 不支持的语法（表格/列表/图片/链接）保留原始文本。

static func to_bbcode(text: String, config: MarkdownBBCodeConfig = MarkdownBBCodeConfig.new()) -> String:
	var hc := config.heading_color.to_html(false)
	var bc := config.bold_color.to_html(false)
	var cc := config.code_color.to_html(false)
	var cbg := "#1e1e1e"  # 代码块背景色（深灰）
	
	var lines := text.split("\n")
	var result := PackedStringArray()
	
	var in_code_block := false
	for line_raw in lines:
		var line := line_raw.trim_suffix("\r")
		
		# ── 围栏代码块检测 ──
		var trimmed := line.strip_edges()
		if trimmed.begins_with("```"):
			if in_code_block:
				result.append("[/color]")
				in_code_block = false
				continue
			else:
				result.append("[color=#%s]" % cc)
				in_code_block = true
				continue
		
		if in_code_block:
			result.append("[bgcolor=%s]" % cbg + _escape_bbcode(line) + "[/bgcolor]")
			continue
		
		# ── 标题 # ──
		if trimmed.begins_with("#") and trimmed.length() > 1 and trimmed[1] in [" ", "#"]:
			var n := 0
			while n < trimmed.length() and trimmed[n] == "#":
				n += 1
				if n == 6:
					break
			var after_hash := trimmed.substr(n).trim_prefix(" ")
			var size := 26 - n * 2
			line = line.replace(trimmed, "[color=#%s][font_size=%d]%s[/font_size][/color]" % [hc, size, after_hash])
		
		# ── 行内代码 `code` ──
		var inline_re := RegEx.create_from_string("`([^`]+)`")
		line = inline_re.sub(line, "[color=#%s][bgcolor=#1e1e1e]$1[/bgcolor][/color]" % cc, true)
		
		# ── 粗体 **text** ──
		var bold_re := RegEx.create_from_string("\\*\\*(.+?)\\*\\*")
		line = bold_re.sub(line, "[color=#%s][b]$1[/b][/color]" % bc, true)
		
		result.append(line)
	
	# 关闭未闭合的围栏
	if in_code_block:
		result.append("[/color]")
	
	return "\n".join(result)


static func _escape_bbcode(text: String) -> String:
	## 转义 BBCode 特殊字符（Godot 标准转义）
	var result := text
	result = result.replace("[", "[lb]")
	result = result.replace("]", "[rb]")
	return result
