## Gradient（渐变） <- Resource（资源）

该资源通过定义一组彩色点以及它们之间的插值方式来描述颜色过渡。另请参见 Curve，它支持更复杂的缓动方法，但不支持颜色。

**属性（Props）：**
- colors: PackedColorArray = PackedColorArray(0, 0, 0, 1, 1, 1, 1, 1) —— 颜色数组
- interpolation_color_space: int (Gradient.ColorSpace) = 0 —— 插值颜色空间
- interpolation_mode: int (Gradient.InterpolationMode) = 0 —— 插值模式
- offsets: PackedFloat32Array = PackedFloat32Array(0, 1) —— 偏移数组

**方法（Methods）：**
- add_point(offset: float, color: Color) —— 添加点
- get_color(point: int) -> Color —— 获取颜色
- get_offset(point: int) -> float —— 获取偏移
- get_point_count() -> int —— 获取点数量
- remove_point(point: int) —— 移除点
- reverse() —— 反转
- sample(offset: float) -> Color —— 采样
- set_color(point: int, color: Color) —— 设置颜色
- set_offset(point: int, offset: float) —— 设置偏移

**枚举（Enums）：**
**InterpolationMode（插值模式）：** GRADIENT_INTERPOLATE_LINEAR=0（线性）, GRADIENT_INTERPOLATE_CONSTANT=1（常量）, GRADIENT_INTERPOLATE_CUBIC=2（三次）
**ColorSpace（颜色空间）：** GRADIENT_COLOR_SPACE_SRGB=0（sRGB）, GRADIENT_COLOR_SPACE_LINEAR_SRGB=1（线性 sRGB）, GRADIENT_COLOR_SPACE_OKLAB=2（OKLAB）
