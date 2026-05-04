## ThemeDB（主题数据库）<- Object（对象）

此单例提供对引擎和项目所使用的 Theme 资源的静态信息的访问。你可以获取默认的引擎主题，以及项目配置的主题。ThemeDB 还包含主题属性的备用值。

**属性（Props）：**
- fallback_base_scale: float = 1.0 —— 备用基础缩放
- fallback_font: Font —— 备用字体
- fallback_font_size: int = 16 —— 备用字体大小
- fallback_icon: Texture2D —— 备用图标
- fallback_stylebox: StyleBox —— 备用样式盒

**方法（Methods）：**
- get_default_theme() -> Theme —— 获取默认主题
- get_project_theme() -> Theme —— 获取项目主题

**信号（Signals）：**
- fallback_changed —— 备用值已更改
