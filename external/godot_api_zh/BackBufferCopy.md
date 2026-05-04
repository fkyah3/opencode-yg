## BackBufferCopy（后缓冲复制） <- Node2D（节点2D）

用于对当前显示的屏幕进行后缓冲的节点。BackBufferCopy 节点中定义的区域会被其覆盖的屏幕内容缓冲，或者根据 `copy_mode` 缓冲整个屏幕。可以在着色器脚本中使用屏幕纹理访问（即使用 `hint_screen_texture` 的 uniform 采样器）。**注意：** 由于此节点继承自 Node2D（而非 Control），锚点和边距不适用于子 Control 派生节点。这在调整窗口大小时可能有问题。为避免此问题，请将 Control 派生节点作为 BackBufferCopy 节点的*同级*节点添加，而不是作为子节点。

**属性（Props）：**
- copy_mode: int (BackBufferCopy.CopyMode) = 1 —— 复制模式
- rect: Rect2 = Rect2(-100, -100, 200, 200) —— 矩形区域

**枚举（Enums）：**
**CopyMode（复制模式）：** COPY_MODE_DISABLED=0, COPY_MODE_RECT=1, COPY_MODE_VIEWPORT=2
