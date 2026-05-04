## Texture2DArray（纹理2D数组）<- ImageTextureLayered（图像纹理分层）

Texture2DArray 与 Texture3D 不同：Texture2DArray 不支持图像之间的三线性插值，即没有混合。另请参阅 Cubemap 和 CubemapArray，它们是具有专用立方体贴图功能的纹理数组。Texture2DArray 也与 AtlasTexture 不同：在 Texture2DArray 中，所有图像都单独处理。在图集中，区域（即单个图像）可以具有不同的大小。此外，通常需要在区域周围添加填充，以防止意外的 UV 映射到多个区域。mipmapping 也是如此：Mipmap 链为每个图层单独处理。在图集中，需要在片段着色器中手动进行切片。要自己创建此类纹理文件，请使用 Godot 编辑器导入预设重新导入图像文件。要从代码创建 Texture2DArray，请在 Texture2DArray 类的实例上使用 `ImageTextureLayered.create_from_images`。

**方法（Methods）：**
- create_placeholder() -> Resource —— 创建占位符
