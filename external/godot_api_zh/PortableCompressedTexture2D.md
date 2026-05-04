## PortableCompressedTexture2D（便携压缩纹理2D） <- Texture2D（2D纹理）

该类允许将压缩纹理存储为自包含（非导入）资源。对于 2D 使用（磁盘压缩，VRAM 解压），建议使用有损和无损模式。对于 3D 使用（VRAM 压缩），取决于目标平台。如果仅用于桌面，建议使用 S3TC 或 BPTC。仅用于移动端，建议使用 ETC2。对于可在桌面和移动端上使用的便携式自包含 3D 纹理，建议使用 Basis Universal（不过其质量成本略高，压缩时间也更长作为权衡）。该资源旨在从代码创建。

**属性（Props）：**
- keep_compressed_buffer: bool = false —— 保留压缩缓冲区
- resource_local_to_scene: bool = false —— 资源本地化到场景
- size_override: Vector2 = Vector2(0, 0) —— 大小覆盖

**方法（Methods）：**
- create_from_image(image: Image, compression_mode: int, normal_map: bool = false, lossy_quality: float = 0.8) —— 从图像创建
- get_compression_mode() -> int —— 获取压缩模式
- get_format() -> int —— 获取格式
- is_keeping_all_compressed_buffers() -> bool —— 是否保留所有压缩缓冲区
- set_basisu_compressor_params(uastc_level: int, rdo_quality_loss: float) —— 设置 BasisU 压缩器参数
- set_keep_all_compressed_buffers(keep: bool) —— 设置保留所有压缩缓冲区

**枚举（Enums）：**
**CompressionMode（压缩模式）：** COMPRESSION_MODE_LOSSLESS=0 —— 无损, COMPRESSION_MODE_LOSSY=1 —— 有损, COMPRESSION_MODE_BASIS_UNIVERSAL=2 —— Basis Universal, COMPRESSION_MODE_S3TC=3 —— S3TC, COMPRESSION_MODE_ETC2=4 —— ETC2, COMPRESSION_MODE_BPTC=5 —— BPTC, COMPRESSION_MODE_ASTC=6 —— ASTC
