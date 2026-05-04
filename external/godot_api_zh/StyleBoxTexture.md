## StyleBoxTexture（纹理样式盒）<- StyleBox（样式盒）

基于纹理的九宫格样式盒，方式类似于 NinePatchRect。此样式盒对纹理执行 3×3 缩放，其中只有中心单元格被完全拉伸。这使得无论样式盒的大小如何，都可以设计带边框的样式。

**属性（Props）：**
- axis_stretch_horizontal: int (StyleBoxTexture.AxisStretchMode) = 0 —— 水平轴拉伸模式
- axis_stretch_vertical: int (StyleBoxTexture.AxisStretchMode) = 0 —— 垂直轴拉伸模式
- draw_center: bool = true —— 绘制中心
- expand_margin_bottom: float = 0.0 —— 底部扩展边距
- expand_margin_left: float = 0.0 —— 左侧扩展边距
- expand_margin_right: float = 0.0 —— 右侧扩展边距
- expand_margin_top: float = 0.0 —— 顶部扩展边距
- modulate_color: Color = Color(1, 1, 1, 1) —— 调制颜色
- region_rect: Rect2 = Rect2(0, 0, 0, 0) —— 区域矩形
- texture: Texture2D —— 纹理
- texture_margin_bottom: float = 0.0 —— 底部纹理边距
- texture_margin_left: float = 0.0 —— 左侧纹理边距
- texture_margin_right: float = 0.0 —— 右侧纹理边距
- texture_margin_top: float = 0.0 —— 顶部纹理边距

**方法（Methods）：**
- get_expand_margin(margin: int) -> float —— 获取扩展边距
- get_texture_margin(margin: int) -> float —— 获取纹理边距
- set_expand_margin(margin: int, size: float) —— 设置扩展边距
- set_expand_margin_all(size: float) —— 设置所有扩展边距
- set_texture_margin(margin: int, size: float) —— 设置纹理边距
- set_texture_margin_all(size: float) —— 设置所有纹理边距

**枚举（Enums）：**
**AxisStretchMode（轴拉伸模式）：** AXIS_STRETCH_MODE_STRETCH=0（拉伸），AXIS_STRETCH_MODE_TILE=1（平铺），AXIS_STRETCH_MODE_TILE_FIT=2（平铺适应）
