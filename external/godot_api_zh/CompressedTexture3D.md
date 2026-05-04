## CompressedTexture3D（压缩纹理3D） <- Texture3D（纹理3D）

CompressedTexture3D 是 ImageTexture3D 的 VRAM 压缩对应物。CompressedTexture3D 文件的扩展名为 `.ctex3d`。此文件格式是 Godot 内部格式，通过导入系统导入其他图像格式创建。CompressedTexture3D 使用 VRAM 压缩，可以在渲染纹理时减少 GPU 上的内存使用。这还缩短了加载时间，因为 VRAM 压缩纹理比使用无损压缩的纹理加载更快。VRAM 压缩可能表现出明显的伪影，适用于 3D 渲染而非 2D。有关 3D 纹理的通用描述，请参见 Texture3D。

**属性（Props）：**
- load_path: String = "" —— 加载路径

**方法（Methods）：**
- load(path: String) -> int —— 加载
