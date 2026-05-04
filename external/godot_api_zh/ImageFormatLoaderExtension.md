## ImageFormatLoaderExtension（图片格式加载器扩展） <- ImageFormatLoader（图片格式加载器）

引擎原生支持多种图片格式（如 PNG、SVG、JPEG、WebP 等），但您可以通过扩展此类来支持额外的图片格式。请务必遵循文档中规定的返回类型和值。您应该创建一个实例，并在初始化阶段调用 `add_format_loader` 来注册该加载器。

**Methods（方法）：**
- add_format_loader() —— 添加格式加载器
- remove_format_loader() —— 移除格式加载器
