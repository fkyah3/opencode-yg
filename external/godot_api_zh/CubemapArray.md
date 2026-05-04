## CubemapArray（立方体贴图数组） <- ImageTextureLayered（分层图像纹理）

CubemapArray 由一组 Cubemap 构成。与 Cubemap 一样，它们由多张纹理组成，纹理数量必须能被 6 整除（立方体每个面一张）。CubemapArray 的主要优点是在着色器代码中可以通过单个纹理引用访问多个 Cubemap。换句话说，你可以使用单个 CubemapArray 将多个 Cubemap 传递到着色器中。Cubemap 在 GPU 上分配在相邻的缓存区域中，这使得 CubemapArray 成为存储多个 Cubemap 最高效的方式。Godot 内部将 CubemapArray 用于许多效果，包括当你在 `ProjectSettings.rendering/reflections/sky_reflections/texture_array_reflections` 中设置为 `true` 时的 Sky。要自行创建此类纹理文件，请使用 Godot 编辑器导入预设重新导入图像文件。要通过代码创建 CubemapArray，在 CubemapArray 类的实例上使用 `ImageTextureLayered.create_from_images`。预期的图像顺序为 X+、X-、Y+、Y-、Z+、Z-（在 Godot 坐标系中，Y+ 为"上"，Z- 为"前"）。你可以使用以下模板之一作为基础：- - - - 使用默认的垂直导入选项（第一层在顶部）时，多个层会上下堆叠。你也可以在导入选项中选择水平布局（第一层在左侧）。**注意：** 由于图形 API 限制，Compatibility 渲染器不支持 CubemapArray。

**方法（Methods）：**
- create_placeholder() -> Resource（创建占位符）
