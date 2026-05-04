## Font（字体） <- Resource（资源）

不同字体类型的抽象基类。它具有绘制文字和字体字符自省的方法。

**属性（Props）：**
- fallbacks: Font[] = [] —— 后备字体列表

**方法（Methods）：**
- draw_char(canvas_item: RID, pos: Vector2, char: int, font_size: int, modulate: Color = Color(1, 1, 1, 1), oversampling: float = 0.0) -> float —— 绘制字符
- draw_char_outline(canvas_item: RID, pos: Vector2, char: int, font_size: int, size: int = -1, modulate: Color = Color(1, 1, 1, 1), oversampling: float = 0.0) -> float —— 绘制字符轮廓
- draw_multiline_string(canvas_item: RID, pos: Vector2, text: String, alignment: int = 0, width: float = -1, font_size: int = 16, max_lines: int = -1, modulate: Color = Color(1, 1, 1, 1), brk_flags: int = 3, justification_flags: int = 3, direction: int = 0, orientation: int = 0, oversampling: float = 0.0) —— 绘制多行字符串
- draw_multiline_string_outline(canvas_item: RID, pos: Vector2, text: String, alignment: int = 0, width: float = -1, font_size: int = 16, max_lines: int = -1, size: int = 1, modulate: Color = Color(1, 1, 1, 1), brk_flags: int = 3, justification_flags: int = 3, direction: int = 0, orientation: int = 0, oversampling: float = 0.0) —— 绘制多行字符串轮廓
- draw_string(canvas_item: RID, pos: Vector2, text: String, alignment: int = 0, width: float = -1, font_size: int = 16, modulate: Color = Color(1, 1, 1, 1), justification_flags: int = 3, direction: int = 0, orientation: int = 0, oversampling: float = 0.0) —— 绘制字符串
- draw_string_outline(canvas_item: RID, pos: Vector2, text: String, alignment: int = 0, width: float = -1, font_size: int = 16, size: int = 1, modulate: Color = Color(1, 1, 1, 1), justification_flags: int = 3, direction: int = 0, orientation: int = 0, oversampling: float = 0.0) —— 绘制字符串轮廓
- find_variation(variation_coordinates: Dictionary, face_index: int = 0, strength: float = 0.0, transform: Transform2D = Transform2D(1, 0, 0, 1, 0, 0), spacing_top: int = 0, spacing_bottom: int = 0, spacing_space: int = 0, spacing_glyph: int = 0, baseline_offset: float = 0.0) -> RID —— 查找变体
- get_ascent(font_size: int = 16) -> float —— 获取上升高度
- get_char_size(char: int, font_size: int) -> Vector2 —— 获取字符大小
- get_descent(font_size: int = 16) -> float —— 获取下降高度
- get_face_count() -> int —— 获取字面数量
- get_font_name() -> String —— 获取字体名称
- get_font_stretch() -> int —— 获取字体拉伸
- get_font_style() -> int —— 获取字体样式
- get_font_style_name() -> String —— 获取字体样式名称
- get_font_weight() -> int —— 获取字体字重
- get_height(font_size: int = 16) -> float —— 获取高度
- get_multiline_string_size(text: String, alignment: int = 0, width: float = -1, font_size: int = 16, max_lines: int = -1, brk_flags: int = 3, justification_flags: int = 3, direction: int = 0, orientation: int = 0) -> Vector2 —— 获取多行字符串大小
- get_opentype_features() -> Dictionary —— 获取 OpenType 特性
- get_ot_name_strings() -> Dictionary —— 获取 OT 名称字符串
- get_rids() -> RID[] —— 获取 RID 列表
- get_spacing(spacing: int) -> int —— 获取间距
- get_string_size(text: String, alignment: int = 0, width: float = -1, font_size: int = 16, justification_flags: int = 3, direction: int = 0, orientation: int = 0) -> Vector2 —— 获取字符串大小
- get_supported_chars() -> String —— 获取支持的字符
- get_supported_feature_list() -> Dictionary —— 获取支持的特性列表
- get_supported_variation_list() -> Dictionary —— 获取支持的变体列表
- get_underline_position(font_size: int = 16) -> float —— 获取下划线位置
- get_underline_thickness(font_size: int = 16) -> float —— 获取下划线厚度
- has_char(char: int) -> bool —— 是否包含字符
- is_language_supported(language: String) -> bool —— 是否支持该语言
- is_script_supported(script: String) -> bool —— 是否支持该文字系统
- set_cache_capacity(single_line: int, multi_line: int) —— 设置缓存容量
