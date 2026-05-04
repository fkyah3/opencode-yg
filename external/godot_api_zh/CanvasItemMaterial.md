## CanvasItemMaterial（画布项材质） <- Material（材质）

CanvasItemMaterial 提供了修改与 CanvasItem 关联的纹理的方法。它专门描述纹理的混合和光照行为。如需更全面地自定义材质与 CanvasItem 的交互，请使用 ShaderMaterial。

**属性（Props）：**
- blend_mode: int (CanvasItemMaterial.BlendMode) = 0 —— 混合模式
- light_mode: int (CanvasItemMaterial.LightMode) = 0 —— 光照模式
- particles_anim_h_frames: int —— 粒子动画水平帧数
- particles_anim_loop: bool —— 粒子动画是否循环
- particles_anim_v_frames: int —— 粒子动画垂直帧数
- particles_animation: bool = false —— 是否启用粒子动画

**枚举（Enums）：**
**BlendMode（混合模式）：** BLEND_MODE_MIX=0 —— 混合, BLEND_MODE_ADD=1 —— 相加, BLEND_MODE_SUB=2 —— 相减, BLEND_MODE_MUL=3 —— 相乘, BLEND_MODE_PREMULT_ALPHA=4 —— 预乘 Alpha
**LightMode（光照模式）：** LIGHT_MODE_NORMAL=0 —— 正常, LIGHT_MODE_UNSHADED=1 —— 无阴影, LIGHT_MODE_LIGHT_ONLY=2 —— 仅光照
