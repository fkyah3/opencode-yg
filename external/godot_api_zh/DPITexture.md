## DPITexture（DPI 纹理） <- Texture2D（2D 纹理）

一种基于 SVG 图像的自动可缩放 Texture2D。DPITexture 用于自动重新光栅化图标和其他基于纹理的 UI 主题元素，以匹配视口缩放和字体过采样。另请参见 `ProjectSettings.display/window/stretch/mode`（"canvas_items" 模式）和 `Viewport.oversampling_override`。

**属性（Props）：**
- base_scale: float = 1.0 —— 基础缩放
- color_map: Dictionary = {} —— 颜色映射
- resource_local_to_scene: bool = false —— 资源是否局部于场景
- saturation: float = 1.0 —— 饱和度

**方法（Methods）：**
- create_from_string(source: String, scale: float = 1.0, saturation: float = 1.0, color_map: Dictionary = {}) -> DPITexture —— 从字符串创建
- get_scaled_rid() -> RID —— 获取缩放后的 RID
- get_source() -> String —— 获取源字符串
- set_size_override(size: Vector2i) —— 设置尺寸覆盖
- set_source(source: String) —— 设置源字符串
