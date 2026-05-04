## TextMesh（文本网格）<- PrimitiveMesh（基本网格）

从文本生成基本网格。TextMesh 仅在使用具有矢量字形轮廓的动态字体时才能生成。不支持位图字体（包括 TrueType/OpenType 容器中的位图数据，如彩色表情字体）。UV 布局按从上到下的 4 个水平条带排列：正面高度占 40%，背面高度占 40%，外边缘占 10%，内边缘占 10%。

**属性（Props）：**
- autowrap_mode: int (TextServer.AutowrapMode) = 0 —— 自动换行模式
- curve_step: float = 0.5 —— 曲线步长
- depth: float = 0.05 —— 深度
- font: Font —— 字体
- font_size: int = 16 —— 字体大小
- horizontal_alignment: int (HorizontalAlignment) = 1 —— 水平对齐
- justification_flags: int (TextServer.JustificationFlag) = 163 —— 对齐标志
- language: String = "" —— 语言
- line_spacing: float = 0.0 —— 行间距
- offset: Vector2 = Vector2(0, 0) —— 偏移
- pixel_size: float = 0.01 —— 像素大小
- structured_text_bidi_override: int (TextServer.StructuredTextParser) = 0 —— 结构化文本双向覆盖
- structured_text_bidi_override_options: Array = [] —— 结构化文本双向覆盖选项
- text: String = "" —— 文本
- text_direction: int (TextServer.Direction) = 0 —— 文本方向
- uppercase: bool = false —— 大写
- vertical_alignment: int (VerticalAlignment) = 1 —— 垂直对齐
- width: float = 500.0 —— 宽度
