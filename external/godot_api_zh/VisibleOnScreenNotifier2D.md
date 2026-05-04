## VisibleOnScreenNotifier2D（可见屏幕通知器2D） <- Node2D（节点2D）

VisibleOnScreenNotifier2D 表示一个矩形区域的 2D 空间。当该区域的任何部分在屏幕或视口中变得可见时，它会发出 `screen_entered` 信号，同样当没有任何部分保持可见时，它会发出 `screen_exited` 信号。如果你想在该区域在屏幕上可见时自动启用某个节点，请使用 VisibleOnScreenEnabler2D。**注意：** VisibleOnScreenNotifier2D 使用渲染裁剪代码来判断是否在屏幕上可见，因此除非 `CanvasItem.visible` 设置为 `true`，否则不会生效。

**属性（Props）：**
- rect: Rect2 = Rect2(-10, -10, 20, 20) —— 矩形区域
- show_rect: bool = true —— 显示矩形

**方法（Methods）：**
- is_on_screen() -> bool —— 是否在屏幕上

**信号（Signals）：**
- screen_entered —— 进入屏幕
- screen_exited —— 离开屏幕
