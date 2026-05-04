## XRVRS（XR可变速率着色） <- Object（对象）

各类 XR 接口使用此类生成 VRS 纹理，以加速渲染。

**属性（Props）：**
- vrs_min_radius: float = 20.0 —— VRS最小半径
- vrs_render_region: Rect2i = Rect2i(0, 0, 0, 0) —— VRS渲染区域
- vrs_strength: float = 1.0 —— VRS强度

**方法（Methods）：**
- make_vrs_texture(target_size: Vector2, eye_foci: PackedVector2Array) -> RID —— 创建VRS纹理
