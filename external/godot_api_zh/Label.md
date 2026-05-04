## Label <- Control（控件）

用于显示纯文本的控件。它让您可以控制水平和垂直对齐方式，并可以在节点的边界矩形内换行文本。它不支持粗体、斜体或其他富文本格式。如需富文本格式，请使用 RichTextLabel。**注意：** 单个 Label 节点不适合显示大量文本。要在单个节点中显示大量文本，建议使用 RichTextLabel，因为它支持集成的滚动条和多线程等功能。RichTextLabel 在显示大量文本（几页或更多）时通常表现更好。

**属性（Props）：**
- autowrap_mode: int (TextServer.AutowrapMode) = 0
- autowrap_trim_flags: int (TextServer.LineBreakFlag) = 192
- clip_text: bool = false
- ellipsis_char: String = "…"
- horizontal_alignment: int (HorizontalAlignment) = 0
- justification_flags: int (TextServer.JustificationFlag) = 163
- label_settings: LabelSettings
- language: String = ""
- lines_skipped: int = 0
- max_lines_visible: int = -1
- mouse_filter: int (Control.MouseFilter) = 2
- paragraph_separator: String = "\\n"
- size_flags_vertical: int (Control.SizeFlags) = 4
- structured_text_bidi_override: int (TextServer.StructuredTextParser) = 0
- structured_text_bidi_override_options: Array = []
- tab_stops: PackedFloat32Array = PackedFloat32Array()
- text: String = ""
- text_direction: int (Control.TextDirection) = 0
- text_overrun_behavior: int (TextServer.OverrunBehavior) = 0
- uppercase: bool = false
- vertical_alignment: int (VerticalAlignment) = 0
- visible_characters: int = -1
- visible_characters_behavior: int (TextServer.VisibleCharactersBehavior) = 0
- visible_ratio: float = 1.0

**方法（Methods）：**
- get_character_bounds(pos: int) -> Rect2
- get_line_count() -> int
- get_line_height(line: int = -1) -> int
- get_total_character_count() -> int
- get_visible_line_count() -> int
