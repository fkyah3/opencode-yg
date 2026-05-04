## TextLine（文本行）<- RefCounted（引用计数）

TextServer 的抽象层，用于处理单行文本。

**属性（Props）：**
- alignment: int (HorizontalAlignment) = 0 —— 对齐方式
- direction: int (TextServer.Direction) = 0 —— 方向
- ellipsis_char: String = "…" —— 省略号字符
- flags: int (TextServer.JustificationFlag) = 3 —— 标志
- orientation: int (TextServer.Orientation) = 0 —— 方向
- preserve_control: bool = false —— 保留控制字符
- preserve_invalid: bool = true —— 保留无效字符
- text_overrun_behavior: int (TextServer.OverrunBehavior) = 3 —— 文本溢出行为
- width: float = -1.0 —— 宽度

**方法（Methods）：**
- add_object(key: Variant, size: Vector2, inline_align: int = 5, length: int = 1, baseline: float = 0.0) -> bool —— 添加对象
- add_string(text: String, font: Font, font_size: int, language: String = "", meta: Variant = null) -> bool —— 添加字符串
- clear() —— 清除
- draw(canvas: RID, pos: Vector2, color: Color = Color(1, 1, 1, 1), oversampling: float = 0.0) —— 绘制
- draw_outline(canvas: RID, pos: Vector2, outline_size: int = 1, color: Color = Color(1, 1, 1, 1), oversampling: float = 0.0) —— 绘制轮廓
- duplicate() -> TextLine —— 复制
- get_inferred_direction() -> int —— 获取推断方向
- get_line_ascent() -> float —— 获取行上升高度
- get_line_descent() -> float —— 获取行下降高度
- get_line_underline_position() -> float —— 获取行下划线位置
- get_line_underline_thickness() -> float —— 获取行下划线厚度
- get_line_width() -> float —— 获取行宽
- get_object_rect(key: Variant) -> Rect2 —— 获取对象矩形
- get_objects() -> Array —— 获取对象列表
- get_rid() -> RID —— 获取RID
- get_size() -> Vector2 —— 获取尺寸
- has_object(key: Variant) -> bool —— 是否有对象
- hit_test(coords: float) -> int —— 命中测试
- resize_object(key: Variant, size: Vector2, inline_align: int = 5, baseline: float = 0.0) -> bool —— 调整对象大小
- set_bidi_override(override: Array) —— 设置双向覆盖
- tab_align(tab_stops: PackedFloat32Array) —— 制表符对齐
