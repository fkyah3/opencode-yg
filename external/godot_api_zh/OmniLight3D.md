## OmniLight3D（全向光3D）<- Light3D（3D光源）

全向光是一种向所有方向发射光的 Light3D 类型。光强度随距离衰减，可以通过更改其能量、半径和衰减参数来配置这种衰减。**注意：** 使用 Mobile 渲染方法时，每个网格资源最多只能显示 8 个全向光。尝试在单个网格资源上显示超过 8 个全向光会导致全向光随摄像机移动而闪烁和消失。使用 Compatibility 渲染方法时，默认情况下每个网格资源最多只能显示 8 个全向光，但可以通过调整 `ProjectSettings.rendering/limits/opengl/max_lights_per_object` 来增加此限制。**注意：** 使用 Mobile 或 Compatibility 渲染方法时，全向光只会正确影响其可见性 AABB 与光源 AABB 相交的网格。如果使用着色器以超出其 AABB 的方式变形网格，则必须增加网格上的 `GeometryInstance3D.extra_cull_margin`。否则，网格上可能看不到光照。

**属性（Props）：**
- light_specular: float = 0.5 —— 高光强度
- omni_attenuation: float = 1.0 —— 衰减系数
- omni_range: float = 5.0 —— 照射范围
- omni_shadow_mode: int (OmniLight3D.ShadowMode) = 1 —— 阴影模式
- shadow_normal_bias: float = 1.0 —— 阴影法线偏移

**枚举（Enums）：**
**ShadowMode（阴影模式）：** SHADOW_DUAL_PARABOLOID=0 —— 双抛物面, SHADOW_CUBE=1 —— 立方体贴图
