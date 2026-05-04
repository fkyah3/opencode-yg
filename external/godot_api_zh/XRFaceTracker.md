## XRFaceTracker <- XRTracker（追踪器）

此对象的实例表示被追踪的面部及其对应的混合形状。混合形状来自标准，并为每个混合形状提供扩展的细节和视觉效果。此外，该页面记录了统一表达式与其他标准之间的关系。当面部的追踪开启时，它们会在 XRServer 上注册。

**属性（Props）：**
- blend_shapes: PackedFloat32Array = PackedFloat32Array() —— 混合形状
- type: int (XRServer.TrackerType) = 64 —— 追踪器类型

**方法（Methods）：**
- get_blend_shape(blend_shape: int) -> float —— 获取混合形状权重
- set_blend_shape(blend_shape: int, weight: float) —— 设置混合形状权重

**枚举（Enums）：**
**BlendShapeEntry（混合形状条目）：** FT_EYE_LOOK_OUT_RIGHT=0（右眼向外看）, FT_EYE_LOOK_IN_RIGHT=1（右眼向内看）, FT_EYE_LOOK_UP_RIGHT=2（右眼向上看）, FT_EYE_LOOK_DOWN_RIGHT=3（右眼向下看）, FT_EYE_LOOK_OUT_LEFT=4（左眼向外看）, FT_EYE_LOOK_IN_LEFT=5（左眼向内看）, FT_EYE_LOOK_UP_LEFT=6（左眼向上看）, FT_EYE_LOOK_DOWN_LEFT=7（左眼向下看）, FT_EYE_CLOSED_RIGHT=8（右眼闭合）, FT_EYE_CLOSED_LEFT=9（左眼闭合）, ...
