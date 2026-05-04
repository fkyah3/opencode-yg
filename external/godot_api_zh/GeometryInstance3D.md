## GeometryInstance3D（几何实例3D） <- VisualInstance3D（可视化实例3D）

基于几何的可视化实例的基节点。共享一些通用功能，如可见性和自定义材质。

**属性（Props）：**
- cast_shadow: int (GeometryInstance3D.ShadowCastingSetting) = 1 —— 投射阴影
- custom_aabb: AABB = AABB(0, 0, 0, 0, 0, 0) —— 自定义 AABB
- extra_cull_margin: float = 0.0 —— 额外剔除边距
- gi_lightmap_scale: int (GeometryInstance3D.LightmapScale) = 0 —— GI 光照贴图缩放
- gi_lightmap_texel_scale: float = 1.0 —— GI 光照贴图像素缩放
- gi_mode: int (GeometryInstance3D.GIMode) = 1 —— GI 模式
- ignore_occlusion_culling: bool = false —— 忽略遮挡剔除
- lod_bias: float = 1.0 —— LOD 偏移
- material_overlay: Material —— 覆盖材质
- material_override: Material —— 材质覆盖
- transparency: float = 0.0 —— 透明度
- visibility_range_begin: float = 0.0 —— 可见范围起始
- visibility_range_begin_margin: float = 0.0 —— 可见范围起始边距
- visibility_range_end: float = 0.0 —— 可见范围结束
- visibility_range_end_margin: float = 0.0 —— 可见范围结束边距
- visibility_range_fade_mode: int (GeometryInstance3D.VisibilityRangeFadeMode) = 0 —— 可见范围淡出模式

**方法（Methods）：**
- get_instance_shader_parameter(name: StringName) -> Variant —— 获取实例着色器参数
- set_instance_shader_parameter(name: StringName, value: Variant) —— 设置实例着色器参数

**枚举（Enums）：**
**ShadowCastingSetting（阴影投射设置）：** SHADOW_CASTING_SETTING_OFF=0（关闭）, SHADOW_CASTING_SETTING_ON=1（开启）, SHADOW_CASTING_SETTING_DOUBLE_SIDED=2（双面）, SHADOW_CASTING_SETTING_SHADOWS_ONLY=3（仅阴影）
**GIMode（GI 模式）：** GI_MODE_DISABLED=0（禁用）, GI_MODE_STATIC=1（静态）, GI_MODE_DYNAMIC=2（动态）
**LightmapScale（光照贴图缩放）：** LIGHTMAP_SCALE_1X=0（1倍）, LIGHTMAP_SCALE_2X=1（2倍）, LIGHTMAP_SCALE_4X=2（4倍）, LIGHTMAP_SCALE_8X=3（8倍）, LIGHTMAP_SCALE_MAX=4（最大）
**VisibilityRangeFadeMode（可见范围淡出模式）：** VISIBILITY_RANGE_FADE_DISABLED=0（禁用）, VISIBILITY_RANGE_FADE_SELF=1（自身淡出）, VISIBILITY_RANGE_FADE_DEPENDENCIES=2（依赖淡出）
