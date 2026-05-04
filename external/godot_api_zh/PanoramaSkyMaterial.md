## PanoramaSkyMaterial（全景天空材质）<- Material（材质）

在 Sky 中引用的用于绘制背景的资源。PanoramaSkyMaterial 的功能类似于其他引擎中的天空盒，但它使用等距柱状投影天空贴图而非 Cubemap。强烈建议使用 HDR 全景图以获得准确、高质量的反射。Godot 支持 Radiance HDR（`.hdr`）和 OpenEXR（`.exr`）图像格式用于此目的。你可以使用工具将立方体贴图转换为等距柱状投影天空贴图。

**属性（Props）：**
- energy_multiplier: float = 1.0 —— 能量倍率
- filter: bool = true —— 过滤
- panorama: Texture2D —— 全景纹理
