## VisualShaderNodeCubemap（视觉着色器节点立方体贴图） <- VisualShaderNode（视觉着色器节点）

在着色器语言中翻译为 `texture(cubemap, vec3)`。返回颜色向量和 Alpha 通道（标量）。

**属性（Props）：**
- cube_map: TextureLayered —— 立方体贴图
- source: int (VisualShaderNodeCubemap.Source) = 0 —— 来源
- texture_type: int (VisualShaderNodeCubemap.TextureType) = 0 —— 纹理类型

**枚举（Enums）：**
**Source（来源）：** SOURCE_TEXTURE=0 —— 纹理, SOURCE_PORT=1 —— 端口, SOURCE_MAX=2
**TextureType（纹理类型）：** TYPE_DATA=0 —— 数据, TYPE_COLOR=1 —— 颜色, TYPE_NORMAL_MAP=2 —— 法线贴图, TYPE_MAX=3
