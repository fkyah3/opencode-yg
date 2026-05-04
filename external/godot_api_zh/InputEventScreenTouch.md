## InputEventScreenTouch（触屏触摸输入事件） <- InputEventFromWindow（窗口输入事件）

存储多点触控按下/释放输入事件的信息。支持触控按下、触控释放以及用于多点触控计数和顺序的 `index`。

**属性（Props）：**
- canceled: bool = false —— 是否被取消
- double_tap: bool = false —— 是否为双击
- index: int = 0 —— 触控点索引
- position: Vector2 = Vector2(0, 0) —— 触控位置
- pressed: bool = false —— 是否按下
