## TextureLayered（分层纹理）<- Texture（纹理）

ImageTextureLayered 和 CompressedTextureLayered 的基类。不能直接使用，但包含访问派生资源类型所需的所有函数。另请参阅 Texture3D。数据按图层设置。对于 Texture2DArray，图层指定数组层。所有图像需要具有相同的宽度、高度和 mipmap 级别数量。可以使用 `ResourceLoader.load` 加载 TextureLayered。在内部，Godot 将这些文件映射到目标渲染驱动（Vulkan、OpenGL3）中的对应类型。

**方法（Methods）：**
- get_format() -> int —— 获取格式
- get_height() -> int —— 获取高度
- get_layer_data(layer: int) -> Image —— 获取图层数据
- get_layered_type() -> int —— 获取分层类型
- get_layers() -> int —— 获取图层数
- get_width() -> int —— 获取宽度
- has_mipmaps() -> bool —— 是否有mipmap

**枚举（Enums）：**
**LayeredType（分层类型）：** LAYERED_TYPE_2D_ARRAY=0（2D数组），LAYERED_TYPE_CUBEMAP=1（立方体贴图），LAYERED_TYPE_CUBEMAP_ARRAY=2（立方体贴图数组）
