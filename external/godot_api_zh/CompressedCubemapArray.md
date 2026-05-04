## CompressedCubemapArray（压缩立方体贴图数组）<- CompressedTextureLayered（压缩分层纹理）

从 `.ccubearray` 文件加载的立方体贴图数组。此文件格式是 Godot 内部格式；通过导入系统从其他图像格式创建。CompressedCubemapArray 可以使用以下 4 种压缩方法之一：- Lossless（WebP 或 PNG，GPU 上未压缩）- Lossy（WebP，GPU 上未压缩）- VRAM Compressed（在 GPU 上压缩）- VRAM Uncompressed（在 GPU 上未压缩）- Basis Universal（在 GPU 上压缩。文件大小比 VRAM 压缩小，但压缩速度较慢，质量低于 VRAM 压缩）只有 **VRAM 压缩** 实际上减少了 GPU 上的内存使用。**无损**和**有损**压缩方法将减少所需的磁盘存储量，但不会减少 GPU 上的内存使用量，因为纹理在发送到 GPU 时是未压缩的。使用 **VRAM 压缩** 还可缩短加载时间，因为 VRAM 压缩纹理的加载速度比使用无损或有损压缩的纹理更快。VRAM 压缩可能显示出明显的伪影，旨在用于 3D 渲染，而非 2D。有关立方体贴图数组的一般描述，请参见 CubemapArray。
