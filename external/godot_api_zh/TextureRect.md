## TextureRect（纹理矩形） <- Control（控件）

显示纹理的控件，例如 GUI 中的图标。纹理的放置可以通过 `stretch_mode` 属性控制。可以缩放、平铺或在其边界矩形内居中显示。

**属性（Props）：**
- expand_mode: int (TextureRect.ExpandMode) = 0 —— 扩展模式
- flip_h: bool = false —— 水平翻转
- flip_v: bool = false —— 垂直翻转
- mouse_filter: int (Control.MouseFilter) = 1 —— 鼠标过滤
- stretch_mode: int (TextureRect.StretchMode) = 0 —— 拉伸模式
- texture: Texture2D —— 纹理

**枚举（Enums）：**
**ExpandMode（扩展模式）：** EXPAND_KEEP_SIZE=0, EXPAND_IGNORE_SIZE=1, EXPAND_FIT_WIDTH=2, EXPAND_FIT_WIDTH_PROPORTIONAL=3, EXPAND_FIT_HEIGHT=4, EXPAND_FIT_HEIGHT_PROPORTIONAL=5
**StretchMode（拉伸模式）：** STRETCH_SCALE=0, STRETCH_TILE=1, STRETCH_KEEP=2, STRETCH_KEEP_CENTERED=3, STRETCH_KEEP_ASPECT=4, STRETCH_KEEP_ASPECT_CENTERED=5, STRETCH_KEEP_ASPECT_COVERED=6
