## ScrollContainer（滚动容器）<- Container（容器）

用于在需要时为子控件提供滚动条的容器。滚动条将自动绘制在右侧（垂直）或底部（水平），并允许拖拽以在 ScrollContainer 内移动可见的控件（及其子控件）。滚动条还会根据控件相对于 ScrollContainer 的 `Control.custom_minimum_size` 自动调整拖动手柄的大小。

**属性（Props）：**
- clip_contents: bool = true —— 裁剪内容
- draw_focus_border: bool = false —— 绘制焦点边框
- follow_focus: bool = false —— 跟随焦点
- horizontal_scroll_mode: int (ScrollContainer.ScrollMode) = 1 —— 水平滚动模式
- scroll_deadzone: int = 0 —— 滚动死区
- scroll_hint_mode: int (ScrollContainer.ScrollHintMode) = 0 —— 滚动提示模式
- scroll_horizontal: int = 0 —— 水平滚动偏移
- scroll_horizontal_custom_step: float = -1.0 —— 水平滚动自定义步长
- scroll_vertical: int = 0 —— 垂直滚动偏移
- scroll_vertical_custom_step: float = -1.0 —— 垂直滚动自定义步长
- tile_scroll_hint: bool = false —— 平铺滚动提示
- vertical_scroll_mode: int (ScrollContainer.ScrollMode) = 1 —— 垂直滚动模式

**方法（Methods）：**
- ensure_control_visible(control: Control) —— 确保控件可见
- get_h_scroll_bar() -> HScrollBar —— 获取水平滚动条
- get_v_scroll_bar() -> VScrollBar —— 获取垂直滚动条

**信号（Signals）：**
- scroll_ended —— 滚动结束
- scroll_started —— 滚动开始

**枚举（Enums）：**
**ScrollMode（滚动模式）：** SCROLL_MODE_DISABLED=0 —— 禁用, SCROLL_MODE_AUTO=1 —— 自动, SCROLL_MODE_SHOW_ALWAYS=2 —— 始终显示, SCROLL_MODE_SHOW_NEVER=3 —— 从不显示, SCROLL_MODE_RESERVE=4 —— 预留空间
**ScrollHintMode（滚动提示模式）：** SCROLL_HINT_MODE_DISABLED=0 —— 禁用, SCROLL_HINT_MODE_ALL=1 —— 全部, SCROLL_HINT_MODE_TOP_AND_LEFT=2 —— 顶部和左侧, SCROLL_HINT_MODE_BOTTOM_AND_RIGHT=3 —— 底部和右侧
