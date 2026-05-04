## VisibleOnScreenEnabler2D <- VisibleOnScreenNotifier2D（屏幕可见通知器2D）

VisibleOnScreenEnabler2D 包含一个 2D 空间的矩形区域和一个目标节点。当该区域的任何部分在屏幕上可见时，目标节点将自动启用（通过其 `Node.process_mode` 属性），否则自动禁用。例如，可用于仅在玩家接近时激活敌人。如果只想在区域可见时收到通知，请参见 VisibleOnScreenNotifier2D。**注意：** VisibleOnScreenEnabler2D 使用渲染剔除代码来确定是否在屏幕上可见，因此除非 `CanvasItem.visible` 设置为 `true`，否则它将无法工作。

**属性（Props）：**
- enable_mode: int (VisibleOnScreenEnabler2D.EnableMode) = 0 —— 启用模式
- enable_node_path: NodePath = NodePath("..") —— 启用节点路径

**枚举（Enums）：**
**EnableMode（启用模式）：** ENABLE_MODE_INHERIT=0（继承）, ENABLE_MODE_ALWAYS=1（始终）, ENABLE_MODE_WHEN_PAUSED=2（暂停时）
