## Shortcut（快捷键）<- Resource（资源）

快捷键是 InputEvent 资源的容器。通常用于从 InputEvent 与 Control 元素交互。一个快捷键可以包含多个 InputEvent 资源，从而实现通过多种不同输入触发同一操作。**示例：** 使用 Shortcut 资源捕获 [kbd]Ctrl + S[/kbd] 快捷键：

**属性（Props）：**
- events: Array = []

**方法（Methods）：**
- get_as_text() -> String
- has_valid_event() -> bool
- matches_event(event: InputEvent) -> bool
