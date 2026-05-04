## CompressedTextureLayered（压缩纹理分层） <- TextureLayered（纹理分层）

CompressedTexture2DArray 和 CompressedTexture3D 的基类。不可直接使用，但包含访问派生资源类型所需的所有函数。另请参阅 TextureLayered（纹理分层）。

**属性（Props）：**
- load_path: String = "" —— 加载路径

**方法（Methods）：**
- load(path: String) -> int —— 加载纹理
