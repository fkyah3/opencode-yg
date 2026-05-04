## Button（按钮）<- BaseButton（基础按钮）

Button 是标准主题按钮。它可以包含文本和图标，并根据当前 Theme 显示它们。**示例：** 创建一个按钮并连接一个在按下时将调用的方法：另请参见 BaseButton，其中包含与此节点关联的公共属性和方法。**注意：** 按钮不检测触摸输入，因此不支持多点触控，因为鼠标模拟在给定时间只能按下一个按钮。对于触发游戏移动或操作的按钮，请使用 TouchScreenButton。

**属性（Props）：**
- alignment: int (HorizontalAlignment) = 1 —— 对齐方式
- autowrap_mode: int (TextServer.AutowrapMode) = 0 —— 自动换行模式
- autowrap_trim_flags: int (TextServer.LineBreakFlag) = 128 —— 自动换行修剪标志
- clip_text: bool = false —— 裁剪文本
- expand_icon: bool = false —— 扩展图标
- flat: bool = false —— 扁平样式
- icon: Texture2D —— 图标
- icon_alignment: int (HorizontalAlignment) = 0 —— 图标对齐方式
- language: String = "" —— 语言
- text: String = "" —— 文本
- text_direction: int (Control.TextDirection) = 0 —— 文本方向
- text_overrun_behavior: int (TextServer.OverrunBehavior) = 0 —— 文本溢出行为
- vertical_icon_alignment: int (VerticalAlignment) = 1 —— 图标垂直对齐方式
