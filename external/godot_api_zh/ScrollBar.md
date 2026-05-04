## ScrollBar（滚动条） <- Range（范围）

滚动条的抽象基类，通常用于浏览超出控件可见区域的内容。滚动条是基于 Range 的控件。

**属性（Props）：**
- custom_step: float = -1.0 —— 自定义步长
- focus_mode: int (Control.FocusMode) = 3 —— 焦点模式
- step: float = 0.0 —— 步长

**信号（Signals）：**
- scrolling —— 正在滚动
