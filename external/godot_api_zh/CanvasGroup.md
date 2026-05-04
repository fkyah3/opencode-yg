## CanvasGroup（画布组）<- Node2D

CanvasGroup 的子级 CanvasItem 节点将作为一个单一对象绘制。这允许绘制重叠的半透明 2D 节点时，不会使重叠部分比预期的更不透明（在 CanvasGroup 上设置 `CanvasItem.self_modulate` 属性可实现此效果）。**注意：** CanvasGroup 使用自定义着色器从后缓冲区读取以绘制其子节点。为 CanvasGroup 分配 Material 将覆盖内置着色器。要在自定义 Shader 中复制内置着色器的行为，请使用以下代码：**注意：** 由于 CanvasGroup 和 `CanvasItem.clip_children` 都使用后缓冲区，设置了 `CanvasItem.clip_children` 为除 `CanvasItem.CLIP_CHILDREN_DISABLED` 之外的值的 CanvasGroup 的子节点将无法正常运行。

**属性（Props）：**
- clear_margin: float = 10.0 —— 清除边距
- fit_margin: float = 10.0 —— 适应边距
- use_mipmaps: bool = false —— 使用 Mipmap
