## VisibleOnScreenNotifier3D（可见屏幕通知器3D） <- VisualInstance3D（可视实例3D）

VisibleOnScreenNotifier3D 表示一个盒形区域的 3D 空间。当该区域的任何部分在屏幕或 Camera3D 视野中变得可见时，它会发出 `screen_entered` 信号，同样当没有任何部分保持可见时，它会发出 `screen_exited` 信号。如果你想在该区域在屏幕上可见时自动启用某个节点，请使用 VisibleOnScreenEnabler3D。**注意：** VisibleOnScreenNotifier3D 使用近似启发式方法，不考虑墙壁和其他遮挡物，除非使用了遮挡剔除。此外，除非 `Node3D.visible` 设置为 `true`，否则不会生效。

**属性（Props）：**
- aabb: AABB = AABB(-1, -1, -1, 2, 2, 2) —— 轴对齐包围盒

**方法（Methods）：**
- is_on_screen() -> bool —— 是否在屏幕上

**信号（Signals）：**
- screen_entered —— 进入屏幕
- screen_exited —— 离开屏幕
