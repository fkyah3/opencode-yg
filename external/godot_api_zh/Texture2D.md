## Texture2D（纹理2D）<- Texture（纹理）

纹理通过在视频硬件中注册图像来工作，然后可以在 3D 模型或 2D Sprite2D 或 GUI Control 中使用。纹理通常通过从文件加载来创建。请参阅 `@GDScript.load`。Texture2D 是其他资源的基础。不能直接使用。**注意：** 由于图形硬件限制，最大纹理尺寸为 16384×16384 像素。更大的纹理可能无法导入。

**方法（Methods）：**
- create_placeholder() -> Resource —— 创建占位符
- draw(canvas_item: RID, position: Vector2, modulate: Color = Color(1, 1, 1, 1), transpose: bool = false) —— 绘制
- draw_rect(canvas_item: RID, rect: Rect2, tile: bool, modulate: Color = Color(1, 1, 1, 1), transpose: bool = false) —— 绘制矩形
- draw_rect_region(canvas_item: RID, rect: Rect2, src_rect: Rect2, modulate: Color = Color(1, 1, 1, 1), transpose: bool = false, clip_uv: bool = true) —— 绘制矩形区域
- get_height() -> int —— 获取高度
- get_image() -> Image —— 获取图像
- get_size() -> Vector2 —— 获取尺寸
- get_width() -> int —— 获取宽度
- has_alpha() -> bool —— 是否有Alpha通道
