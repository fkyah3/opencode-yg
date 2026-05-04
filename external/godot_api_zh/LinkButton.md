## LinkButton <- BaseButton（基础按钮）

表示链接的按钮。此类按钮主要用于引起上下文变化的交互（如链接到网页）。另请参见 BaseButton，其中包含与此节点关联的通用属性和方法。

**属性（Props）：**
- ellipsis_char: String = "…"
- focus_mode: int (Control.FocusMode) = 3
- language: String = ""
- mouse_default_cursor_shape: int (Control.CursorShape) = 2
- structured_text_bidi_override: int (TextServer.StructuredTextParser) = 0
- structured_text_bidi_override_options: Array = []
- text: String = ""
- text_direction: int (Control.TextDirection) = 0
- text_overrun_behavior: int (TextServer.OverrunBehavior) = 0
- underline: int (LinkButton.UnderlineMode) = 0
- uri: String = ""

**枚举（Enums）：**
**UnderlineMode：** UNDERLINE_MODE_ALWAYS=0, UNDERLINE_MODE_ON_HOVER=1, UNDERLINE_MODE_NEVER=2
