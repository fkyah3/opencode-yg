## ImageTextureLayered（图片纹理分层） <- TextureLayered（纹理分层）

Texture2DArray、Cubemap 和 CubemapArray 的基类。不可直接使用，但包含访问派生资源类型所需的所有函数。另请参阅 Texture3D。

**方法（Methods）：**
- create_from_images(images: Image[]) -> int —— 从图片数组创建纹理
- update_layer(image: Image, layer: int) —— 更新指定层的图片
