## CharFXTransform（字符特效变换）<- RefCounted（引用计数）

通过设置此对象的各种属性，你可以控制 RichTextEffect 中单个字符的显示方式。

**属性（Props）：**
- color: Color = Color(0, 0, 0, 1) —— 颜色
- elapsed_time: float = 0.0 —— 经过时间
- env: Dictionary = {} —— 环境字典
- font: RID = RID() —— 字体 RID
- glyph_count: int = 0 —— 字形数量
- glyph_flags: int = 0 —— 字形标志
- glyph_index: int = 0 —— 字形索引
- offset: Vector2 = Vector2(0, 0) —— 偏移量
- outline: bool = false —— 是否描边
- range: Vector2i = Vector2i(0, 0) —— 范围
- relative_index: int = 0 —— 相对索引
- transform: Transform2D = Transform2D(1, 0, 0, 1, 0, 0) —— 变换
- visible: bool = true —— 是否可见
