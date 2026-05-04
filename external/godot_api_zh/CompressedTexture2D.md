## CompressedTexture2D（压缩2D纹理）<- Texture2D（2D纹理）

从 `.ctex` 文件加载的纹理。此文件格式是 Godot 内部格式；通过导入系统从其他图像格式创建。CompressedTexture2D 可以使用以下 4 种压缩方法之一（包括不使用任何压缩）：- Lossless（WebP 或 PNG，GPU 上未压缩）- Lossy（WebP，GPU 上未压缩）- VRAM Compressed（在 GPU 上压缩）- VRAM Uncompressed（在 GPU 上未压缩）- Basis Universal（在 GPU 上压缩。文件大小比 VRAM 压缩小，但压缩速度较慢，质量低于 VRAM 压缩）只有 **VRAM 压缩** 实际上减少了 GPU 上的内存使用。**无损**和**有损**压缩方法将减少所需的磁盘存储量，但不会减少 GPU 上的内存使用量，因为纹理在发送到 GPU 时是未压缩的。使用 **VRAM 压缩** 还可缩短加载时间，因为 VRAM 压缩纹理的加载速度比使用无损或有损压缩的纹理更快。VRAM 压缩可能显示出明显的伪影，旨在用于 3D 渲染，而非 2D。

**属性（Props）：**
- load_path: String = "" —— 加载路径
- resource_local_to_scene: bool = false —— 资源是否为场景本地

**方法（Methods）：**
- load(path: String) -> int —— 加载
