## InputEventJoypadMotion（手柄运动输入事件）<- InputEvent（输入事件）

存储操纵杆运动的输入信息。每个 InputEventJoypadMotion 一次表示一个轴。游戏手柄按钮请参见 InputEventJoypadButton。

**属性（Props）：**
- axis: int (JoyAxis) = 0 —— 轴编号
- axis_value: float = 0.0 —— 轴数值
