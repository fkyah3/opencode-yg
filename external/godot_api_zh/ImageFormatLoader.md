## ImageFormatLoader（图片格式加载器） <- RefCounted（引用计数）

引擎默认支持多种图片格式（PNG、SVG、JPEG、WebP 等），但你可以通过扩展 ImageFormatLoaderExtension 来实现对其他图片格式的支持。

**枚举（Enums）：**
**LoaderFlags（加载标志）：** FLAG_NONE=0 —— 无标志, FLAG_FORCE_LINEAR=1 —— 强制线性, FLAG_CONVERT_COLORS=2 —— 转换颜色
