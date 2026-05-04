## SpotLight3D（聚光灯3D）<- Light3D（灯光3D）

聚光灯是一种 Light3D 节点，以圆锥体形状向特定方向发射光线。光线随距离衰减。此衰减可以通过更改 Light3D 的能量、半径和衰减参数进行配置。光线沿节点全局基的 -Z 方向发射。对于未旋转的灯光，这意味着光线向前发射，照亮 3D 模型的前侧（参见 `Vector3.FORWARD` 和 `Vector3.MODEL_FRONT`）。**注意：** 使用 Mobile 渲染方法时，每个网格资源最多只能显示 8 个聚光灯。尝试在单个网格资源上显示超过 8 个聚光灯将导致聚光灯随着相机移动而闪烁出现和消失。使用 Compatibility 渲染方法时，默认情况下每个网格资源最多只能显示 8 个聚光灯，但可以通过调整 `ProjectSettings.rendering/limits/opengl/max_lights_per_object` 来增加此限制。**注意：** 使用 Mobile 或 Compatibility 渲染方法时，聚光灯只会正确影响其可见性 AABB 与灯光 AABB 相交的网格。如果使用着色器以使其超出 AABB 的方式变形网格，则必须增加 `GeometryInstance3D.extra_cull_margin`。否则，灯光可能在网格上不可见。

**属性（Props）：**
- light_specular: float = 0.5 —— 镜面反射强度
- shadow_bias: float = 0.03 —— 阴影偏差
- shadow_normal_bias: float = 1.0 —— 阴影法线偏差
- spot_angle: float = 45.0 —— 聚光角度
- spot_angle_attenuation: float = 1.0 —— 聚光角度衰减
- spot_attenuation: float = 1.0 —— 聚光衰减
- spot_range: float = 5.0 —— 聚光范围
