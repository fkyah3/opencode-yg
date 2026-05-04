## TextureProgressBar（纹理进度条）<- Range（范围）

TextureProgressBar 的工作方式类似于 ProgressBar，但使用最多 3 个纹理而不是 Godot 的 Theme 资源。可用于创建水平、垂直和径向进度条。

**属性（Props）：**
- fill_mode: int = 0 —— 填充模式
- mouse_filter: int (Control.MouseFilter) = 1 —— 鼠标过滤
- nine_patch_stretch: bool = false —— 九宫格拉伸
- radial_center_offset: Vector2 = Vector2(0, 0) —— 径向中心偏移
- radial_fill_degrees: float = 360.0 —— 径向填充角度
- radial_initial_angle: float = 0.0 —— 径向初始角度
- size_flags_vertical: int (Control.SizeFlags) = 1 —— 垂直尺寸标志
- step: float = 1.0 —— 步长
- stretch_margin_bottom: int = 0 —— 底部拉伸边距
- stretch_margin_left: int = 0 —— 左侧拉伸边距
- stretch_margin_right: int = 0 —— 右侧拉伸边距
- stretch_margin_top: int = 0 —— 顶部拉伸边距
- texture_over: Texture2D —— 覆盖纹理
- texture_progress: Texture2D —— 进度纹理
- texture_progress_offset: Vector2 = Vector2(0, 0) —— 进度纹理偏移
- texture_under: Texture2D —— 底部纹理
- tint_over: Color = Color(1, 1, 1, 1) —— 覆盖色调
- tint_progress: Color = Color(1, 1, 1, 1) —— 进度色调
- tint_under: Color = Color(1, 1, 1, 1) —— 底部色调

**方法（Methods）：**
- get_stretch_margin(margin: int) -> int —— 获取拉伸边距
- set_stretch_margin(margin: int, value: int) —— 设置拉伸边距

**枚举（Enums）：**
**FillMode（填充模式）：** FILL_LEFT_TO_RIGHT=0（从左到右），FILL_RIGHT_TO_LEFT=1（从右到左），FILL_TOP_TO_BOTTOM=2（从上到下），FILL_BOTTOM_TO_TOP=3（从下到上），FILL_CLOCKWISE=4（顺时针），FILL_COUNTER_CLOCKWISE=5（逆时针），FILL_BILINEAR_LEFT_AND_RIGHT=6（左右双线性），FILL_BILINEAR_TOP_AND_BOTTOM=7（上下双线性），FILL_CLOCKWISE_AND_COUNTER_CLOCKWISE=8（顺逆时针）
