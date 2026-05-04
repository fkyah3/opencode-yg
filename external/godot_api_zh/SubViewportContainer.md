## SubViewportContainer（子视口容器）<- Container（容器）

显示底层 SubViewport 子节点内容的容器。它使用 SubViewport 的组合大小作为最小大小，除非启用了 `stretch`。**注意：** 更改 SubViewportContainer 的 `Control.scale` 将导致其内容看起来变形。要更改其视觉大小而不导致变形，请改为调整节点的边距（如果尚未在容器中）。**注意：** SubViewportContainer 将鼠标进入和鼠标离开通知转发给其子视口。

**属性（Props）：**
- focus_mode: int (Control.FocusMode) = 1 —— 焦点模式
- mouse_target: bool = false —— 鼠标目标
- stretch: bool = false —— 拉伸
- stretch_shrink: int = 1 —— 拉伸缩小
