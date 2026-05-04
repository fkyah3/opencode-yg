## AtlasTexture（图集纹理） <- Texture2D（2D 纹理）

仅绘制其 `atlas` 纹理中由 `region` 定义的部分的 Texture2D 资源。还可以设置额外的 `margin`，用于微调。可以从同一个 `atlas` 中裁剪出多个 AtlasTexture 资源。将许多小纹理打包到单个大纹理中有助于优化显存成本和渲染调用次数。**注意：** AtlasTexture 不能用于 AnimatedTexture，也无法在 TextureRect 或 Sprite2D 等节点中正确平铺。要平铺 AtlasTexture，请改为修改其 `region`。

**属性（Props）：**
- atlas: Texture2D —— 图集纹理
- filter_clip: bool = false —— 过滤裁剪
- margin: Rect2 = Rect2(0, 0, 0, 0) —— 边距
- region: Rect2 = Rect2(0, 0, 0, 0) —— 区域
- resource_local_to_scene: bool = false —— 资源是否局部于场景
