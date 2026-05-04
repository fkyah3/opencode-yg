## StyleBoxFlat（平面样式盒）<- StyleBox（样式盒）

通过配置此样式盒的各种属性，无需纹理即可实现许多常见的视觉效果。这包括可选的圆角边框、抗锯齿、阴影和倾斜。允许设置较高的圆角半径值。一旦圆角重叠，样式盒将切换到相对系统：[codeblock lang=text] height = 30 corner_radius_top_left = 50 corner_radius_bottom_left = 100 [/codeblock] 相对系统将使用两个左侧圆角的 1:2 比例来计算实际圆角宽度。两个圆角加起来**永远不会**超过高度。结果：[codeblock lang=text] corner_radius_top_left: 10 corner_radius_bottom_left: 20 [/codeblock]

**属性（Props）：**
- anti_aliasing: bool = true —— 抗锯齿
- anti_aliasing_size: float = 1.0 —— 抗锯齿大小
- bg_color: Color = Color(0.6, 0.6, 0.6, 1) —— 背景颜色
- border_blend: bool = false —— 边框混合
- border_color: Color = Color(0.8, 0.8, 0.8, 1) —— 边框颜色
- border_width_bottom: int = 0 —— 底部边框宽度
- border_width_left: int = 0 —— 左边框宽度
- border_width_right: int = 0 —— 右边框宽度
- border_width_top: int = 0 —— 顶部边框宽度
- corner_detail: int = 8 —— 圆角细节
- corner_radius_bottom_left: int = 0 —— 左下圆角半径
- corner_radius_bottom_right: int = 0 —— 右下圆角半径
- corner_radius_top_left: int = 0 —— 左上圆角半径
- corner_radius_top_right: int = 0 —— 右上圆角半径
- draw_center: bool = true —— 绘制中心
- expand_margin_bottom: float = 0.0 —— 底部扩展边距
- expand_margin_left: float = 0.0 —— 左侧扩展边距
- expand_margin_right: float = 0.0 —— 右侧扩展边距
- expand_margin_top: float = 0.0 —— 顶部扩展边距
- shadow_color: Color = Color(0, 0, 0, 0.6) —— 阴影颜色
- shadow_offset: Vector2 = Vector2(0, 0) —— 阴影偏移
- shadow_size: int = 0 —— 阴影大小
- skew: Vector2 = Vector2(0, 0) —— 倾斜

**方法（Methods）：**
- get_border_width(margin: int) -> int —— 获取边框宽度
- get_border_width_min() -> int —— 获取最小边框宽度
- get_corner_radius(corner: int) -> int —— 获取圆角半径
- get_expand_margin(margin: int) -> float —— 获取扩展边距
- set_border_width(margin: int, width: int) —— 设置边框宽度
- set_border_width_all(width: int) —— 设置所有边框宽度
- set_corner_radius(corner: int, radius: int) —— 设置圆角半径
- set_corner_radius_all(radius: int) —— 设置所有圆角半径
- set_expand_margin(margin: int, size: float) —— 设置扩展边距
- set_expand_margin_all(size: float) —— 设置所有扩展边距
