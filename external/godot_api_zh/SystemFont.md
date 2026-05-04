## SystemFont（系统字体）<- Font（字体）

SystemFont 从系统字体加载字体，使用 `font_names` 中第一个匹配的名称。它会尝试匹配字体样式，但不保证一定成功。返回的字体可能是字体集合的一部分，或者是具有 OpenType "weight"、"width" 和/或 "italic" 功能的可变字体。您可以创建系统字体的 FontVariation 以精确控制其功能。**注意：** 此类在 iOS、Linux、macOS 和 Windows 上实现，在其他平台上将回退到默认主题字体。

**属性（Props）：**
- allow_system_fallback: bool = true —— 允许系统回退
- antialiasing: int (TextServer.FontAntialiasing) = 1 —— 抗锯齿
- disable_embedded_bitmaps: bool = true —— 禁用嵌入位图
- font_italic: bool = false —— 斜体
- font_names: PackedStringArray = PackedStringArray() —— 字体名称列表
- font_stretch: int = 100 —— 字体拉伸
- font_weight: int = 400 —— 字体粗细
- force_autohinter: bool = false —— 强制自动提示
- generate_mipmaps: bool = false —— 生成mipmap
- hinting: int (TextServer.Hinting) = 1 —— 提示
- keep_rounding_remainders: bool = true —— 保留舍入余数
- modulate_color_glyphs: bool = false —— 调制彩色字形
- msdf_pixel_range: int = 16 —— MSDF像素范围
- msdf_size: int = 48 —— MSDF大小
- multichannel_signed_distance_field: bool = false —— 多通道有符号距离场
- oversampling: float = 0.0 —— 过采样
- subpixel_positioning: int (TextServer.SubpixelPositioning) = 1 —— 亚像素定位
