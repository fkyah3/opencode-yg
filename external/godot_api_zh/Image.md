## Image（图像） <- Resource（资源）

原生图像数据类型。包含可以转换为 ImageTexture 的图像数据，提供常用的*图像处理*方法。Image 的最大宽度和高度为 `MAX_WIDTH` 和 `MAX_HEIGHT`。Image 不能直接分配给对象的纹理属性（如 `Sprite2D.texture`），需要先手动转换为 ImageTexture。**注意：** 修改图像数据的方法不能用于 VRAM 压缩图像。请先使用 `decompress` 将图像转换为未压缩格式。**注意：** 由于图形硬件限制，最大图像尺寸为 16384×16384 像素。较大的图像可能无法导入。

**属性（Props）：**
- data: Dictionary = { "data": PackedByteArray(), "format": "Lum8", "height": 0, "mipmaps": false, "width": 0 } —— 图像数据

**方法（Methods）：**
- adjust_bcs(brightness: float, contrast: float, saturation: float) —— 调整亮度/对比度/饱和度
- blend_rect(src: Image, src_rect: Rect2i, dst: Vector2i) —— 混合矩形
- blend_rect_mask(src: Image, mask: Image, src_rect: Rect2i, dst: Vector2i) —— 带遮罩混合矩形
- blit_rect(src: Image, src_rect: Rect2i, dst: Vector2i) —— 复制矩形
- blit_rect_mask(src: Image, mask: Image, src_rect: Rect2i, dst: Vector2i) —— 带遮罩复制矩形
- bump_map_to_normal_map(bump_scale: float = 1.0) —— 凹凸贴图转法线贴图
- clear_mipmaps() —— 清除 mipmap
- compress(mode: int, source: int = 0, astc_format: int = 0) -> int —— 压缩
- compress_from_channels(mode: int, channels: int, astc_format: int = 0) -> int —— 从通道压缩
- compute_image_metrics(compared_image: Image, use_luma: bool) -> Dictionary —— 计算图像指标
- convert(format: int) —— 转换格式
- copy_from(src: Image) —— 从源复制
- create(width: int, height: int, use_mipmaps: bool, format: int) -> Image —— 创建
- create_empty(width: int, height: int, use_mipmaps: bool, format: int) -> Image —— 创建空图像
- create_from_data(width: int, height: int, use_mipmaps: bool, format: int, data: PackedByteArray) -> Image —— 从数据创建
- crop(width: int, height: int) —— 裁剪
- decompress() -> int —— 解压缩
- detect_alpha() -> int —— 检测 Alpha
- detect_used_channels(source: int = 0) -> int —— 检测使用的通道
- fill(color: Color) —— 填充
- fill_rect(rect: Rect2i, color: Color) —— 填充矩形
- fix_alpha_edges() —— 修复 Alpha 边缘
- flip_x() —— 水平翻转
- flip_y() —— 垂直翻转
- generate_mipmaps(renormalize: bool = false) -> int —— 生成 mipmap
- get_data() -> PackedByteArray —— 获取数据
- get_data_size() -> int —— 获取数据大小
- get_format() -> int —— 获取格式
- get_height() -> int —— 获取高度
- get_mipmap_count() -> int —— 获取 mipmap 数量
- get_mipmap_offset(mipmap: int) -> int —— 获取 mipmap 偏移
- get_pixel(x: int, y: int) -> Color —— 获取像素
- get_pixelv(point: Vector2i) -> Color —— 获取像素（向量形式）
- get_region(region: Rect2i) -> Image —— 获取区域
- get_size() -> Vector2i —— 获取大小
- get_used_rect() -> Rect2i —— 获取已使用区域
- get_width() -> int —— 获取宽度
- has_mipmaps() -> bool —— 是否有 mipmap
- is_compressed() -> bool —— 是否已压缩
- is_empty() -> bool —— 是否为空
- is_invisible() -> bool —— 是否不可见
- linear_to_srgb() —— 线性转 sRGB
- load(path: String) -> int —— 加载
- load_bmp_from_buffer(buffer: PackedByteArray) -> int —— 从缓冲区加载 BMP
- load_dds_from_buffer(buffer: PackedByteArray) -> int —— 从缓冲区加载 DDS
- load_exr_from_buffer(buffer: PackedByteArray) -> int —— 从缓冲区加载 EXR
- load_from_file(path: String) -> Image —— 从文件加载
- load_jpg_from_buffer(buffer: PackedByteArray) -> int —— 从缓冲区加载 JPG
- load_ktx_from_buffer(buffer: PackedByteArray) -> int —— 从缓冲区加载 KTX
- load_png_from_buffer(buffer: PackedByteArray) -> int —— 从缓冲区加载 PNG
- load_svg_from_buffer(buffer: PackedByteArray, scale: float = 1.0) -> int —— 从缓冲区加载 SVG
- load_svg_from_string(svg_str: String, scale: float = 1.0) -> int —— 从字符串加载 SVG
- load_tga_from_buffer(buffer: PackedByteArray) -> int —— 从缓冲区加载 TGA
- load_webp_from_buffer(buffer: PackedByteArray) -> int —— 从缓冲区加载 WebP
- normal_map_to_xy() —— 法线贴图转 XY
- premultiply_alpha() —— 预乘 Alpha
- resize(width: int, height: int, interpolation: int = 1) —— 调整大小
- resize_to_po2(square: bool = false, interpolation: int = 1) —— 调整为 2 的幂大小
- rgbe_to_srgb() -> Image —— RGBE 转 sRGB
- rotate_90(direction: int) —— 旋转 90 度
- rotate_180() —— 旋转 180 度
- save_dds(path: String) -> int —— 保存为 DDS
- save_dds_to_buffer() -> PackedByteArray —— 保存为 DDS 到缓冲区
- save_exr(path: String, grayscale: bool = false) -> int —— 保存为 EXR
- save_exr_to_buffer(grayscale: bool = false) -> PackedByteArray —— 保存为 EXR 到缓冲区
- save_jpg(path: String, quality: float = 0.75) -> int —— 保存为 JPG
- save_jpg_to_buffer(quality: float = 0.75) -> PackedByteArray —— 保存为 JPG 到缓冲区
- save_png(path: String) -> int —— 保存为 PNG
- save_png_to_buffer() -> PackedByteArray —— 保存为 PNG 到缓冲区
- save_webp(path: String, lossy: bool = false, quality: float = 0.75) -> int —— 保存为 WebP
- save_webp_to_buffer(lossy: bool = false, quality: float = 0.75) -> PackedByteArray —— 保存为 WebP 到缓冲区
- set_data(width: int, height: int, use_mipmaps: bool, format: int, data: PackedByteArray) —— 设置数据
- set_pixel(x: int, y: int, color: Color) —— 设置像素
- set_pixelv(point: Vector2i, color: Color) —— 设置像素（向量形式）
- shrink_x2() —— 缩小一半
- srgb_to_linear() —— sRGB 转线性

**枚举（Enums）：**
**常量（Constants）：** MAX_WIDTH=16777216（最大宽度）, MAX_HEIGHT=16777216（最大高度）
**Format（格式）：** FORMAT_L8=0, FORMAT_LA8=1, FORMAT_R8=2, FORMAT_RG8=3, FORMAT_RGB8=4, FORMAT_RGBA8=5, FORMAT_RGBA4444=6, FORMAT_RGB565=7, FORMAT_RF=8, FORMAT_RGF=9, ...
**Interpolation（插值）：** INTERPOLATE_NEAREST=0（最近邻）, INTERPOLATE_BILINEAR=1（双线性）, INTERPOLATE_CUBIC=2（三次）, INTERPOLATE_TRILINEAR=3（三线性）, INTERPOLATE_LANCZOS=4（Lanczos）
**AlphaMode（Alpha 模式）：** ALPHA_NONE=0（无）, ALPHA_BIT=1（位）, ALPHA_BLEND=2（混合）
**CompressMode（压缩模式）：** COMPRESS_S3TC=0, COMPRESS_ETC=1, COMPRESS_ETC2=2, COMPRESS_BPTC=3, COMPRESS_ASTC=4, COMPRESS_MAX=5
**UsedChannels（使用的通道）：** USED_CHANNELS_L=0（亮度）, USED_CHANNELS_LA=1（亮度+Alpha）, USED_CHANNELS_R=2（红）, USED_CHANNELS_RG=3（红绿）, USED_CHANNELS_RGB=4（RGB）, USED_CHANNELS_RGBA=5（RGBA）
**CompressSource（压缩源）：** COMPRESS_SOURCE_GENERIC=0（通用）, COMPRESS_SOURCE_SRGB=1（sRGB）, COMPRESS_SOURCE_NORMAL=2（法线）
**ASTCFormat（ASTC 格式）：** ASTC_FORMAT_4x4=0, ASTC_FORMAT_8x8=1
