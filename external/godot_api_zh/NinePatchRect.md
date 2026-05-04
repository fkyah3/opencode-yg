## NinePatchRect（九宫格矩形）<- Control（控件）

也称为 9-slice 面板，NinePatchRect 基于一个较小的纹理生成任意大小的整洁面板。它通过将纹理分割为 3×3 的网格来实现。缩放节点时，它会水平或垂直平铺纹理的边缘，在两条轴上平铺中心，而边角保持不变。

**属性（Props）：**
- axis_stretch_horizontal: int (NinePatchRect.AxisStretchMode) = 0 —— 水平拉伸模式
- axis_stretch_vertical: int (NinePatchRect.AxisStretchMode) = 0 —— 垂直拉伸模式
- draw_center: bool = true —— 是否绘制中心
- mouse_filter: int (Control.MouseFilter) = 2 —— 鼠标过滤
- patch_margin_bottom: int = 0 —— 底部补丁边距
- patch_margin_left: int = 0 —— 左侧补丁边距
- patch_margin_right: int = 0 —— 右侧补丁边距
- patch_margin_top: int = 0 —— 顶部补丁边距
- region_rect: Rect2 = Rect2(0, 0, 0, 0) —— 区域矩形
- texture: Texture2D —— 纹理

**方法（Methods）：**
- get_patch_margin(margin: int) -> int —— 获取补丁边距
- set_patch_margin(margin: int, value: int) —— 设置补丁边距

**信号（Signals）：**
- texture_changed —— 纹理改变时触发

**枚举（Enums）：**
**AxisStretchMode（轴拉伸模式）：** AXIS_STRETCH_MODE_STRETCH=0 —— 拉伸, AXIS_STRETCH_MODE_TILE=1 —— 平铺, AXIS_STRETCH_MODE_TILE_FIT=2 —— 平铺适应
