## DrawableTexture2D（可绘制纹理2D） <- Texture2D（纹理2D）

一种可通过 blit 调用修改的 2D 纹理，支持从目标纹理复制到自身。主要用于代码管理，用户必须先调用 `setup` 来初始化状态，然后才能绘制。每次 `blit_rect` 调用至少需要一个矩形（绘制区域）和另一个纹理（要绘制的内容）。绘制调用使用 Texture_Blit 着色器逐像素处理和计算结果。用户可以提供自定义的 ShaderMaterial 配合自定义 Texture_Blit 着色器，以实现更复杂的行为。

**属性（Props）：**
- resource_local_to_scene: bool = false —— 资源是否局部于场景

**方法（Methods）：**
- blit_rect(rect: Rect2i, source: Texture2D, modulate: Color = Color(1, 1, 1, 1), mipmap: int = 0, material: Material = null) —— 矩形 blit
- blit_rect_multi(rect: Rect2i, sources: Texture2D[], extra_targets: DrawableTexture2D[], modulate: Color = Color(1, 1, 1, 1), mipmap: int = 0, material: Material = null) —— 多源矩形 blit
- generate_mipmaps() —— 生成 mipmap
- setup(width: int, height: int, format: int, color: Color = Color(1, 1, 1, 1), use_mipmaps: bool = false) —— 设置

**枚举（Enums）：**
**DrawableFormat（可绘制格式）：** DRAWABLE_FORMAT_RGBA8=0, DRAWABLE_FORMAT_RGBA8_SRGB=1, DRAWABLE_FORMAT_RGBAH=2, DRAWABLE_FORMAT_RGBAF=3
