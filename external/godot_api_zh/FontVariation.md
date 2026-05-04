## FontVariation（字体变体）<- Font（字体）

提供 OpenType 变体、模拟粗体/斜体以及额外的字体设置，如 OpenType 特性和额外间距。要使用模拟粗体字体变体：要设置多个变体轴的坐标：

**属性（Props）：**
- base_font: Font —— 基础字体
- baseline_offset: float = 0.0 —— 基线偏移
- opentype_features: Dictionary = {} —— OpenType特性
- spacing_bottom: int = 0 —— 底部间距
- spacing_glyph: int = 0 —— 字形间距
- spacing_space: int = 0 —— 空格间距
- spacing_top: int = 0 —— 顶部间距
- variation_embolden: float = 0.0 —— 变体加粗
- variation_face_index: int = 0 —— 变体字形索引
- variation_opentype: Dictionary = {} —— OpenType变体
- variation_transform: Transform2D = Transform2D(1, 0, 0, 1, 0, 0) —— 变体变换

**方法（Methods）：**
- set_spacing(spacing: int, value: int) —— 设置间距
