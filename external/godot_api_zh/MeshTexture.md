## MeshTexture（网格纹理） <- Texture2D（2D纹理）

使用网格来绘制自身的简单纹理。由于无法修改标记且不支持区域绘制，功能有限。

**属性（Props）：**
- base_texture: Texture2D —— 基础纹理
- image_size: Vector2 = Vector2(0, 0) —— 图像尺寸
- mesh: Mesh —— 网格
- resource_local_to_scene: bool = false —— 资源是否本地化到场景
