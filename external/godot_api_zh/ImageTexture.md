## ImageTexture（图像纹理） <- Texture2D（纹理2D）

基于 Image 的 Texture2D。要显示图像，必须使用 `create_from_image` 方法从中创建 ImageTexture：这样，可以通过在编辑器和外部加载图像在运行时创建纹理。**警告：** 优先使用 `@GDScript.load` 加载导入的纹理，而不是使用 `Image.load` 从文件系统动态加载，因为这可能无法在导出的项目中工作：这是因为图像必须先作为 CompressedTexture2D 导入，才能使用 `@GDScript.load` 加载。如果你仍想像加载任何其他 Resource 一样加载图像文件，请将其作为 Image 资源导入，然后使用 `@GDScript.load` 方法正常加载。**注意：** 可以使用 `Texture2D.get_image` 方法从导入的纹理中获取图像，该方法返回图像的副本：ImageTexture 不适用于直接从编辑器界面操作，主要用于通过代码在屏幕上动态渲染图像。如果需要在编辑器内程序化生成图像，请考虑保存图像并作为自定义纹理资源导入，实现一个新的 EditorImportPlugin。**注意：** 由于图形硬件限制，最大纹理尺寸为 16384×16384 像素。

**属性（Props）：**
- resource_local_to_scene: bool = false —— 资源是否局部于场景

**方法（Methods）：**
- create_from_image(image: Image) -> ImageTexture —— 从图像创建纹理
- get_format() -> int —— 获取格式
- set_image(image: Image) —— 设置图像
- set_size_override(size: Vector2i) —— 设置大小覆盖
- update(image: Image) —— 更新
