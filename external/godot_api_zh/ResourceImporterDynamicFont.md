## ResourceImporterDynamicFont（动态字体资源导入器） <- ResourceImporter（资源导入器）

与位图字体不同，动态字体可以调整到任何大小并保持清晰。动态字体还可选支持 MSDF 字体渲染，允许运行时缩放而无需重新栅格化的开销。虽然 WOFF 特别是 WOFF2 往往产生更小的文件大小，但没有普遍"更好"的字体格式。大多数情况下，建议使用字体开发者网站上提供的字体格式。另请参见 ResourceImporterBMFont 和 ResourceImporterImageFont。

**属性（Props）：**
- allow_system_fallback: bool = true —— 允许系统回退
- antialiasing: int = 1 —— 抗锯齿
- compress: bool = true —— 压缩
- disable_embedded_bitmaps: bool = true —— 禁用嵌入位图
- fallbacks: Array = [] —— 回退字体
- force_autohinter: bool = false —— 强制自动提示
- generate_mipmaps: bool = false —— 生成 Mipmap
- hinting: int = 3 —— 字体提示
- keep_rounding_remainders: bool = true —— 保留舍入余数
- language_support: Dictionary = {} —— 语言支持
- modulate_color_glyphs: bool = false —— 调制彩色字形
- msdf_pixel_range: int = 8 —— MSDF 像素范围
- msdf_size: int = 48 —— MSDF 大小
- multichannel_signed_distance_field: bool = false —— 多通道有符号距离场
- opentype_features: Dictionary = {} —— OpenType 特性
- oversampling: float = 0.0 —— 过采样
- preload: Array = [] —— 预加载
- script_support: Dictionary = {} —— 脚本支持
- subpixel_positioning: int = 4 —— 亚像素定位
