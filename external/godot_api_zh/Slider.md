## Slider（滑块）<- Range（范围）

滑块的抽象基类，用于通过沿水平或垂直轴移动滑块手柄来调整值。滑块是基于 Range 的控件。

**属性（Props）：**
- editable: bool = true —— 可编辑
- focus_mode: int (Control.FocusMode) = 2 —— 焦点模式
- scrollable: bool = true —— 可滚动
- step: float = 1.0 —— 步长
- tick_count: int = 0 —— 刻度数量
- ticks_on_borders: bool = false —— 刻度在边框上
- ticks_position: int (Slider.TickPosition) = 0 —— 刻度位置

**信号（Signals）：**
- drag_ended(value_changed: bool) —— 拖拽结束
- drag_started —— 拖拽开始

**枚举（Enums）：**
**TickPosition：** TICK_POSITION_BOTTOM_RIGHT=0 —— 右下, TICK_POSITION_TOP_LEFT=1 —— 左上, TICK_POSITION_BOTH=2 —— 两侧, TICK_POSITION_CENTER=3 —— 居中
