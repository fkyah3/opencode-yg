## Popup（弹出窗口）<- Window（窗口）

Popup 是固定位置的上下文窗口和面板的基类。默认情况下为模态（参见 `Window.popup_window`），并提供实现自定义弹出行为的方法。**注意：** Popup 默认不可见。要使其可见，请在节点上调用 Window 中的 `popup_*` 方法之一，例如 `Window.popup_centered_clamped`。

**属性（Props）：**
- borderless: bool = true —— 无边框
- maximize_disabled: bool = true —— 禁用最大化
- minimize_disabled: bool = true —— 禁用最小化
- popup_window: bool = true —— 弹出窗口
- popup_wm_hint: bool = true —— 窗口管理器弹出提示
- transient: bool = true —— 临时
- unresizable: bool = true —— 不可调整大小
- visible: bool = false —— 可见
- wrap_controls: bool = true —— 包裹控件

**信号（Signals）：**
- popup_hide —— 弹出隐藏
