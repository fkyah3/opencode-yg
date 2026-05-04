## ColorPicker（颜色选取器）<- VBoxContainer（垂直盒容器）

一个提供选择和修改颜色界面的控件。可以选择性地提供颜色取样器（吸管）、颜色模式和预设等功能。**注意：** 此控件是颜色选取器小部件本身。如果你需要一个在弹出窗口中显示 ColorPicker 的按钮，可以使用 ColorPickerButton 代替。

**属性（Props）：**
- can_add_swatches: bool = true —— 可以添加色样
- color: Color = Color(1, 1, 1, 1) —— 颜色
- color_mode: int (ColorPicker.ColorModeType) = 0 —— 颜色模式
- color_modes_visible: bool = true —— 颜色模式可见
- deferred_mode: bool = false —— 延迟模式
- edit_alpha: bool = true —— 编辑透明度
- edit_intensity: bool = true —— 编辑强度
- hex_visible: bool = true —— 十六进制可见
- picker_shape: int (ColorPicker.PickerShapeType) = 0 —— 选取器形状
- presets_visible: bool = true —— 预设可见
- sampler_visible: bool = true —— 取样器可见
- sliders_visible: bool = true —— 滑块可见

**方法（Methods）：**
- add_preset(color: Color) —— 添加预设
- add_recent_preset(color: Color) —— 添加最近预设
- erase_preset(color: Color) —— 擦除预设
- erase_recent_preset(color: Color) —— 擦除最近预设
- get_presets() -> PackedColorArray —— 获取预设
- get_recent_presets() -> PackedColorArray —— 获取最近预设

**信号（Signals）：**
- color_changed(color: Color) —— 颜色已更改
- preset_added(color: Color) —— 预设已添加
- preset_removed(color: Color) —— 预设已移除

**枚举（Enums）：**
**ColorModeType（颜色模式类型）：** MODE_RGB=0 —— RGB 模式，MODE_HSV=1 —— HSV 模式，MODE_RAW=2 —— 原始模式，MODE_LINEAR=2 —— 线性模式（同 MODE_RAW），MODE_OKHSL=3 —— OKHSL 模式
**PickerShapeType（选取器形状类型）：** SHAPE_HSV_RECTANGLE=0 —— HSV 矩形，SHAPE_HSV_WHEEL=1 —— HSV 色轮，SHAPE_VHS_CIRCLE=2 —— VHS 圆形，SHAPE_OKHSL_CIRCLE=3 —— OKHSL 圆形，SHAPE_NONE=4 —— 无形状，SHAPE_OK_HS_RECTANGLE=5 —— OK_HS 矩形，SHAPE_OK_HL_RECTANGLE=6 —— OK_HL 矩形
