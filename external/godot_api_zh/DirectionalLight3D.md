## DirectionalLight3D（方向光3D） <- Light3D（光3D）

方向光是一种 Light3D 节点类型，模拟覆盖整个场景的无限平行光线。用于模拟距离场景很远但强度很大的光源，如日光或月光。光线沿节点全局基底的 -Z 方向发射。对于未旋转的光源，这意味着光线向前发射，照亮 3D 模型的正面（参见 `Vector3.FORWARD` 和 `Vector3.MODEL_FRONT`）。节点的位置被忽略；仅使用基底来确定光照方向。

**属性（Props）：**
- directional_shadow_blend_splits: bool = false —— 方向阴影混合分割
- directional_shadow_fade_start: float = 0.8 —— 方向阴影淡出起始
- directional_shadow_max_distance: float = 100.0 —— 方向阴影最大距离
- directional_shadow_mode: int (DirectionalLight3D.ShadowMode) = 2 —— 方向阴影模式
- directional_shadow_pancake_size: float = 20.0 —— 方向阴影平铺大小
- directional_shadow_split_1: float = 0.1 —— 方向阴影分割 1
- directional_shadow_split_2: float = 0.2 —— 方向阴影分割 2
- directional_shadow_split_3: float = 0.5 —— 方向阴影分割 3
- sky_mode: int (DirectionalLight3D.SkyMode) = 0 —— 天空模式

**枚举（Enums）：**
**ShadowMode（阴影模式）：** SHADOW_ORTHOGONAL=0（正交阴影）, SHADOW_PARALLEL_2_SPLITS=1（平行2分割）, SHADOW_PARALLEL_4_SPLITS=2（平行4分割）
**SkyMode（天空模式）：** SKY_MODE_LIGHT_AND_SKY=0（光照与天空）, SKY_MODE_LIGHT_ONLY=1（仅光照）, SKY_MODE_SKY_ONLY=2（仅天空）
