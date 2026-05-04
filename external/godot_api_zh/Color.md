## Color（颜色）

由红色（`r`）、绿色（`g`）、蓝色（`b`）和透明度（`a`）分量以 RGBA 格式表示的颜色。每个分量是一个 32 位浮点值，通常范围从 `0.0` 到 `1.0`。某些属性（如 `CanvasItem.modulate`）可能支持大于 `1.0` 的值，用于超亮或 HDR（高动态范围）颜色。颜色可以通过多种方式创建：通过各种 Color 构造函数，通过静态方法（如 `from_hsv`），以及使用基于标准颜色集中的名称（额外增加了 `TRANSPARENT`）。虽然 Color 可用于存储任何编码的值，但 Godot 期望颜色的红色（`r`）、绿色（`g`）、蓝色（`b`）属性使用 sRGB 编码，除非另有说明。这种颜色编码被许多传统艺术和 Web 工具使用，使你能够轻松匹配 Godot 和这些工具之间的颜色。Godot 使用 sRGB 标准所使用的颜色原色。所有物理模拟（如光照计算）和色度变换（如 `get_luminance`）必须在线性编码值上执行才能产生正确结果。执行这些计算时，使用 `srgb_to_linear` 和 `linear_to_srgb` 在 Color 与线性编码之间进行转换。**注意：** 在布尔上下文中，如果 Color 等于 `Color(0, 0, 0, 1)`（不透明黑色），则求值为 `false`。否则，Color 总是求值为 `true`。

**属性（Props）：**
- a: float = 1.0 —— 透明度（浮点）
- a8: int = 255 —— 透明度（8 位）
- b: float = 0.0 —— 蓝色（浮点）
- b8: int = 0 —— 蓝色（8 位）
- g: float = 0.0 —— 绿色（浮点）
- g8: int = 0 —— 绿色（8 位）
- h: float = 0.0 —— 色相
- ok_hsl_h: float = 0.0 —— OKHSL 色相
- ok_hsl_l: float = 0.0 —— OKHSL 亮度
- ok_hsl_s: float = 0.0 —— OKHSL 饱和度
- r: float = 0.0 —— 红色（浮点）
- r8: int = 0 —— 红色（8 位）
- s: float = 0.0 —— 饱和度（HSV）
- v: float = 0.0 —— 明度（HSV）

**方法（Methods）：**
- blend(over: Color) -> Color —— 混合
- clamp(min: Color = Color(0, 0, 0, 0), max: Color = Color(1, 1, 1, 1)) -> Color —— 钳制
- darkened(amount: float) -> Color —— 变暗
- from_hsv(h: float, s: float, v: float, alpha: float = 1.0) -> Color —— 从 HSV 创建
- from_ok_hsl(h: float, s: float, l: float, alpha: float = 1.0) -> Color —— 从 OKHSL 创建
- from_rgba8(r8: int, g8: int, b8: int, a8: int = 255) -> Color —— 从 8 位 RGBA 创建
- from_rgbe9995(rgbe: int) -> Color —— 从 RGBE9995 创建
- from_string(str: String, default: Color) -> Color —— 从字符串创建
- get_luminance() -> float —— 获取亮度
- hex(hex: int) -> Color —— 从十六进制整数创建
- hex64(hex: int) -> Color —— 从 64 位十六进制整数创建
- html(rgba: String) -> Color —— 从 HTML 字符串创建
- html_is_valid(color: String) -> bool —— HTML 颜色字符串是否有效
- inverted() -> Color —— 反色
- is_equal_approx(to: Color) -> bool —— 近似相等
- lerp(to: Color, weight: float) -> Color —— 线性插值
- lightened(amount: float) -> Color —— 变亮
- linear_to_srgb() -> Color —— 线性转 sRGB
- srgb_to_linear() -> Color —— sRGB 转线性
- to_abgr32() -> int —— 转换为 32 位 ABGR
- to_abgr64() -> int —— 转换为 64 位 ABGR
- to_argb32() -> int —— 转换为 32 位 ARGB
- to_argb64() -> int —— 转换为 64 位 ARGB
- to_html(with_alpha: bool = true) -> String —— 转换为 HTML 字符串
- to_rgba32() -> int —— 转换为 32 位 RGBA
- to_rgba64() -> int —— 转换为 64 位 RGBA

**枚举（Enums）：**
**常量（Constants）：** ALICE_BLUE=Color(0.9411765, 0.972549, 1, 1) —— 爱丽丝蓝，ANTIQUE_WHITE=Color(0.98039216, 0.92156863, 0.84313726, 1) —— 古董白，AQUA=Color(0, 1, 1, 1) —— 水蓝，AQUAMARINE=Color(0.49803922, 1, 0.83137256, 1) —— 海蓝，AZURE=Color(0.9411765, 1, 1, 1) —— 天蓝，BEIGE=Color(0.9607843, 0.9607843, 0.8627451, 1) —— 米色，BISQUE=Color(1, 0.89411765, 0.76862746, 1) —— 乳白，BLACK=Color(0, 0, 0, 1) —— 黑色，BLANCHED_ALMOND=Color(1, 0.92156863, 0.8039216, 1) —— 杏仁白，BLUE=Color(0, 0, 1, 1) —— 蓝色，...
