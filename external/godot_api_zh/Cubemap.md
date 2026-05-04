## Cubemap（立方体贴图） <- ImageTextureLayered（分层图像纹理）

立方体贴图由按层组织的 6 张纹理组成，通常用于在 3D 渲染中模拟反射效果（参见 ReflectionProbe）。它可以让物体看起来像是在反射周围环境，通常比其他反射方法性能好得多。该资源通常用作自定义着色器中的 uniform。Godot 核心方法中很少使用 Cubemap 资源。要自行创建此类纹理文件，请使用 Godot 编辑器导入预设重新导入图像文件。要通过代码创建 Cubemap，在 Cubemap 类的实例上使用 `ImageTextureLayered.create_from_images`。预期的图像顺序为 X+、X-、Y+、Y-、Z+、Z-（在 Godot 坐标系中，Y+ 为"上"，Z- 为"前"）。你可以使用以下模板之一作为基础：- - - - **注意：** Godot 不支持在 PanoramaSkyMaterial 中使用立方体贴图。要将立方体贴图用作天空盒，请使用 **Convert to ShaderMaterial** 资源下拉选项将默认的 PanoramaSkyMaterial 转换为 ShaderMaterial，然后用以下代码替换其代码：[codeblock lang=text] shader_type sky; uniform samplerCube source_panorama : filter_linear, source_color, hint_default_black; uniform float exposure : hint_range(0, 128) = 1.0; void sky() { // 如果从其他引擎导入立方体贴图，可能需要将下方某个 `EYEDIR` 分量取反 // 将其替换为 `-EYEDIR`。 vec3 eyedir = vec3(EYEDIR.x, EYEDIR.y, EYEDIR.z); COLOR = texture(source_panorama, eyedir).rgb * exposure; } [/codeblock] 替换着色器代码并保存后，在检查器的 ShaderMaterial 的 Shader Parameters 部分指定导入的 Cubemap 资源。或者，你也可以将立方体贴图转换为等距柱状投影天空图，照常使用 PanoramaSkyMaterial。

**方法（Methods）：**
- create_placeholder() -> Resource（创建占位符）
