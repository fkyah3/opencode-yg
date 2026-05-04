## Decal（贴花） <- VisualInstance3D（可视化实例3D）

贴花用于将纹理投射到场景中的 Mesh 上。使用贴花可以为场景添加细节而不影响底层 Mesh。它们常用于为建筑添加风化效果、为地面添加泥土或污渍、或为道具增加多样性。贴花可以随时移动，因此适合用于模糊阴影或激光瞄准点等效果。贴花由一个 AABB 和一组 Texture2D（指定颜色、法线、ORM（环境光遮蔽、粗糙度、金属度）和自发光）组成。贴花在其 AABB 内投射，因此改变贴花的方向会影响投射方向。默认情况下，贴花向下投射（即从正 Y 到负 Y）。与贴花关联的 Texture2D 会自动存储在纹理图集中，用于绘制贴花，因此所有贴花可以一次性绘制完成。Godot 使用聚类贴花，这意味着它们存储在聚类数据中，在绘制 Mesh 时一并绘制，而不是作为后处理效果绘制。**注意：** 贴花无法影响底层材质的透明度，无论其透明度模式如何（alpha blend、alpha scissor、alpha hash、不透明预渲染）。这意味着即使在不透明贴花上应用，材质的半透明或透明区域仍将保持半透明或透明。**注意：** 贴花仅在 Forward+ 和 Mobile 渲染方法中支持，Compatibility 不支持。使用 Mobile 渲染方法时，每个 mesh 资源上最多只能显示 8 张贴花。尝试在单个 mesh 资源上显示超过 8 张贴花会导致贴花随摄像机移动而闪烁。**注意：** 使用 Mobile 渲染方法时，贴花只会正确影响其可见性 AABB 与贴花 AABB 相交的网格。如果使用着色器以超出其 AABB 的方式变形网格，必须在网格上增加 `GeometryInstance3D.extra_cull_margin`。否则，贴花可能无法在网格上显示。

**属性（Props）：**
- albedo_mix: float = 1.0 —— 漫反射混合
- cull_mask: int = 1048575 —— 剔除遮罩
- distance_fade_begin: float = 40.0 —— 距离淡出起始
- distance_fade_enabled: bool = false —— 是否启用距离淡出
- distance_fade_length: float = 10.0 —— 距离淡出长度
- emission_energy: float = 1.0 —— 自发光强度
- lower_fade: float = 0.3 —— 下方淡出
- modulate: Color = Color(1, 1, 1, 1) —— 调制颜色
- normal_fade: float = 0.0 —— 法线淡出
- size: Vector3 = Vector3(2, 2, 2) —— 大小
- texture_albedo: Texture2D —— 漫反射纹理
- texture_emission: Texture2D —— 自发光纹理
- texture_normal: Texture2D —— 法线纹理
- texture_orm: Texture2D —— ORM 纹理
- upper_fade: float = 0.3 —— 上方淡出

**方法（Methods）：**
- get_texture(type: int) -> Texture2D —— 获取纹理
- set_texture(type: int, texture: Texture2D) —— 设置纹理

**枚举（Enums）：**
**DecalTexture（贴花纹理）：** TEXTURE_ALBEDO=0（漫反射）, TEXTURE_NORMAL=1（法线）, TEXTURE_ORM=2（ORM）, TEXTURE_EMISSION=3（自发光）, TEXTURE_MAX=4（最大数量）
