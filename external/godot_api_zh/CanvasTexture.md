## CanvasTexture（画布纹理）<- Texture2D（2D纹理）

CanvasTexture 是用于 2D 渲染的 ImageTexture 替代方案。它允许在任何继承自 CanvasItem 的节点中使用法线贴图和镜面贴图。CanvasTexture 还允许独立于节点的属性（或项目设置）覆盖纹理的过滤和重复模式。**注意：** CanvasTexture 不能用于 3D。当应用于任何 VisualInstance3D（如 Sprite3D 或 Decal）时，它将无法正确显示。对于 3D 中的基于物理的材质，请改用 BaseMaterial3D。

**属性（Props）：**
- diffuse_texture: Texture2D —— 漫反射纹理
- normal_texture: Texture2D —— 法线纹理
- resource_local_to_scene: bool = false —— 资源是否为场景本地
- specular_color: Color = Color(1, 1, 1, 1) —— 镜面颜色
- specular_shininess: float = 1.0 —— 镜面光泽度
- specular_texture: Texture2D —— 镜面纹理
- texture_filter: int (CanvasItem.TextureFilter) = 0 —— 纹理过滤
- texture_repeat: int (CanvasItem.TextureRepeat) = 0 —— 纹理重复
