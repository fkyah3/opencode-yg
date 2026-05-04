## TextParagraph（文本段落）<- RefCounted（引用计数）

TextServer 的抽象层，用于处理单个段落文本。

**属性（Props）：**
- alignment: int (HorizontalAlignment) = 0 —— 对齐方式
- break_flags: int (TextServer.LineBreakFlag) = 3 —— 换行标志
- custom_punctuation: String = "" —— 自定义标点
- direction: int (TextServer.Direction) = 0 —— 方向
- ellipsis_char: String = "…" —— 省略号字符
- justification_flags: int (TextServer.JustificationFlag) = 163 —— 对齐标志
- line_spacing: float = 0.0 —— 行间距
- max_lines_visible: int = -1 —— 最大可见行数
- orientation: int (TextServer.Orientation) = 0 —— 方向
- preserve_control: bool = false —— 保留控制字符
- preserve_invalid: bool = true —— 保留无效字符
- text_overrun_behavior: int (TextServer.OverrunBehavior) = 0 —— 文本溢出行为
- width: float = -1.0 —— 宽度

**方法（Methods）：**
- add_object(key: Variant, size: Vector2, inline_align: int = 5, length: int = 1, baseline: float = 0.0) -> bool —— 添加对象
- add_string(text: String, font: Font, font_size: int, language: String = "", meta: Variant = null) -> bool —— 添加字符串
- clear() —— 清除
- clear_dropcap() —— 清除首字下沉
- draw(canvas: RID, pos: Vector2, color: Color = Color(1, 1, 1, 1), dc_color: Color = Color(1, 1, 1, 1), oversampling: float = 0.0) —— 绘制
- draw_dropcap(canvas: RID, pos: Vector2, color: Color = Color(1, 1, 1, 1), oversampling: float = 0.0) —— 绘制首字下沉
- draw_dropcap_outline(canvas: RID, pos: Vector2, outline_size: int = 1, color: Color = Color(1, 1, 1, 1), oversampling: float = 0.0) —— 绘制首字下沉轮廓
- draw_line(canvas: RID, pos: Vector2, line: int, color: Color = Color(1, 1, 1, 1), oversampling: float = 0.0) —— 绘制行
- draw_line_outline(canvas: RID, pos: Vector2, line: int, outline_size: int = 1, color: Color = Color(1, 1, 1, 1), oversampling: float = 0.0) —— 绘制行轮廓
- draw_outline(canvas: RID, pos: Vector2, outline_size: int = 1, color: Color = Color(1, 1, 1, 1), dc_color: Color = Color(1, 1, 1, 1), oversampling: float = 0.0) —— 绘制轮廓
- duplicate() -> TextParagraph —— 复制
- get_dropcap_lines() -> int —— 获取首字下沉行数
- get_dropcap_rid() -> RID —— 获取首字下沉RID
- get_dropcap_size() -> Vector2 —— 获取首字下沉尺寸
- get_inferred_direction() -> int —— 获取推断方向
- get_line_ascent(line: int) -> float —— 获取行上升高度
- get_line_count() -> int —— 获取行数
- get_line_descent(line: int) -> float —— 获取行下降高度
- get_line_object_rect(line: int, key: Variant) -> Rect2 —— 获取行对象矩形
- get_line_objects(line: int) -> Array —— 获取行对象列表
- get_line_range(line: int) -> Vector2i —— 获取行范围
- get_line_rid(line: int) -> RID —— 获取行RID
- get_line_size(line: int) -> Vector2 —— 获取行尺寸
- get_line_underline_position(line: int) -> float —— 获取行下划线位置
- get_line_underline_thickness(line: int) -> float —— 获取行下划线厚度
- get_line_width(line: int) -> float —— 获取行宽
- get_non_wrapped_size() -> Vector2 —— 获取未换行时的尺寸
- get_range() -> Vector2i —— 获取范围
- get_rid() -> RID —— 获取RID
- get_size() -> Vector2 —— 获取尺寸
- has_object(key: Variant) -> bool —— 是否有对象
- hit_test(coords: Vector2) -> int —— 命中测试
- resize_object(key: Variant, size: Vector2, inline_align: int = 5, baseline: float = 0.0) -> bool —— 调整对象大小
- set_bidi_override(override: Array) —— 设置双向覆盖
- set_dropcap(text: String, font: Font, font_size: int, dropcap_margins: Rect2 = Rect2(0, 0, 0, 0), language: String = "") -> bool —— 设置首字下沉
- tab_align(tab_stops: PackedFloat32Array) —— 制表符对齐
