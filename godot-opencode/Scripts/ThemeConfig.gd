extends Resource
class_name ThemeConfig


# ═══════════════════ 主题配置（可在 Inspector 中调整） ═══════════════════

@export_group("字体设置")
@export var font_path_normal: String = "res://fonts/JetBrains_Mono/static/JetBrainsMono-Regular.ttf"
@export var font_path_bold: String = "res://fonts/JetBrains_Mono/static/JetBrainsMono-Bold.ttf"
@export var font_size_base: int = 16

@export_group("文字颜色")
@export var color_text: Color = Color(0.93, 0.93, 0.93, 1.0)
@export var color_text_dim: Color = Color(0.37, 0.37, 0.37, 1.0)
@export var color_text_name: Color = Color(0.75, 0.75, 0.75, 1.0)
@export var color_text_info: Color = Color(0.5, 0.5, 0.5, 1.0)

@export_group("气泡颜色")
@export var bubble_user_bg: Color = Color(0.13, 0.13, 0.13, 1.0)
@export var bubble_user_border: Color = Color(0.3, 0.6, 1.0, 1.0)
@export var bubble_ai_bg: Color = Color(0.07, 0.07, 0.07, 1.0)
@export var bubble_ai_border: Color = Color(0.75, 0.75, 0.75, 0.35)
