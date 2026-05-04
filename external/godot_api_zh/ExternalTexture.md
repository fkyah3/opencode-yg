## ExternalTexture（外部纹理） <- Texture2D（2D纹理）

显示由平台提供的外部缓冲区内容。需要 OpenGL 扩展或 Vulkan 扩展。**注意：**目前仅在 Android 构建中支持。

**属性（Props）：**
- resource_local_to_scene: bool = false —— 资源是否局部于场景
- size: Vector2 = Vector2(256, 256) —— 尺寸

**方法（Methods）：**
- get_external_texture_id() -> int —— 获取外部纹理 ID
- set_external_buffer_id(external_buffer_id: int) —— 设置外部缓冲区 ID
