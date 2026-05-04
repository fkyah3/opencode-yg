## Line2D <- Node2D（节点2D）

此节点绘制 2D 多段线，即由多个点通过线段连接而成的形状。Line2D 不是数学意义上的多段线，即线段不是无限细的。它用于渲染，可以有颜色，也可以选择添加纹理。**警告：** 某些配置可能无法很好地绘制，例如非常尖锐的角度。在这些情况下，节点会使用后备绘制逻辑以使其看起来合适。**注意：** Line2D 使用 2D 网格绘制。

**属性（Props）：**
- antialiased: bool = false
- begin_cap_mode: int (Line2D.LineCapMode) = 0
- closed: bool = false
- default_color: Color = Color(1, 1, 1, 1)
- end_cap_mode: int (Line2D.LineCapMode) = 0
- gradient: Gradient
- joint_mode: int (Line2D.LineJointMode) = 0
- points: PackedVector2Array = PackedVector2Array()
- round_precision: int = 8
- sharp_limit: float = 2.0
- texture: Texture2D
- texture_mode: int (Line2D.LineTextureMode) = 0
- width: float = 10.0
- width_curve: Curve

**方法（Methods）：**
- add_point(position: Vector2, index: int = -1)
- clear_points()
- get_point_count() -> int
- get_point_position(index: int) -> Vector2
- remove_point(index: int)
- set_point_position(index: int, position: Vector2)

**枚举（Enums）：**
**LineJointMode：** LINE_JOINT_SHARP=0, LINE_JOINT_BEVEL=1, LINE_JOINT_ROUND=2
**LineCapMode：** LINE_CAP_NONE=0, LINE_CAP_BOX=1, LINE_CAP_ROUND=2
**LineTextureMode：** LINE_TEXTURE_NONE=0, LINE_TEXTURE_TILE=1, LINE_TEXTURE_STRETCH=2
