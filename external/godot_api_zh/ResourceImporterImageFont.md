## ResourceImporterImageFont（图像字体资源导入器） <- ResourceImporter（资源导入器）

这种基于图像的工作流程比 ResourceImporterBMFont 更易于使用，但它要求所有字形具有相同的宽度和高度，字形的步进和绘制偏移可以自定义。这使得 ResourceImporterImageFont 最适合等宽字体。另请参见 ResourceImporterDynamicFont。

**属性（Props）：**
- ascent: int = 0 —— 上升高度
- character_margin: Rect2i = Rect2i(0, 0, 0, 0) —— 字符边距
- character_ranges: PackedStringArray = PackedStringArray() —— 字符范围
- columns: int = 1 —— 列数
- compress: bool = true —— 是否压缩
- descent: int = 0 —— 下降高度
- fallbacks: Array = [] —— 后备字体
- image_margin: Rect2i = Rect2i(0, 0, 0, 0) —— 图像边距
- kerning_pairs: PackedStringArray = PackedStringArray() —— 字距对
- rows: int = 1 —— 行数
- scaling_mode: int = 2 —— 缩放模式
