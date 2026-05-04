## ColorPickerButton（颜色选择器按钮） <- Button（按钮）

封装了一个 ColorPicker，通过按下按钮来访问。按下按钮将切换 ColorPicker 的可见性。另请参见 BaseButton，其中包含与此节点相关的通用属性和方法。**注意：** 默认情况下，按钮可能不够宽，无法显示颜色预览色样。请确保将 `Control.custom_minimum_size` 设置为足够大的值，以便为按钮提供足够的空间。

**属性（Props）：**
- color: Color = Color(0, 0, 0, 1) —— 颜色
- edit_alpha: bool = true —— 是否编辑 Alpha 通道
- edit_intensity: bool = true —— 是否编辑强度
- toggle_mode: bool = true —— 是否切换模式

**方法（Methods）：**
- get_picker() -> ColorPicker —— 获取颜色选择器
- get_popup() -> PopupPanel —— 获取弹出面板

**信号（Signals）：**
- color_changed(color: Color) —— 颜色已改变
- picker_created —— 颜色选择器已创建
- popup_closed —— 弹出窗口已关闭
