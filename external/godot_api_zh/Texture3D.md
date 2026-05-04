## Texture3D（纹理3D）<- Texture（纹理）

ImageTexture3D 和 CompressedTexture3D 的基类。不能直接使用，但包含访问派生资源类型所需的全部函数。Texture3D 是所有三维纹理类型的基类。另请参阅 TextureLayered。所有图像必须具有相同的宽度、高度和米普映射级别数。要自行创建此类纹理文件，请使用 Godot 编辑器导入预设重新导入图像文件。

**方法（Methods）：**
- create_placeholder() -> Resource —— 创建占位符
- get_data() -> Image[] —— 获取数据
- get_depth() -> int —— 获取深度
- get_format() -> int —— 获取格式
- get_height() -> int —— 获取高度
- get_width() -> int —— 获取宽度
- has_mipmaps() -> bool —— 是否有米普映射
