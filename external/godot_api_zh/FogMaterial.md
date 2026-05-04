## FogMaterial（雾材质） <- Material（材质）

可供 FogVolume 使用的材质资源，用于绘制体积雾效果。如需更高级的效果，请使用自定义 `ShaderMaterial`。

**属性（Props）：**
- albedo: Color = Color(1, 1, 1, 1) —— 雾的颜色
- density: float = 1.0 —— 雾的密度
- density_texture: Texture3D —— 密度纹理（3D纹理）
- edge_fade: float = 0.1 —— 边缘淡出
- emission: Color = Color(0, 0, 0, 1) —— 自发光颜色
- height_falloff: float = 0.0 —— 高度衰减
