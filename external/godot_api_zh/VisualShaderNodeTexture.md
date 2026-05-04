## VisualShaderNodeTexture（可视化着色器节点纹理）<- VisualShaderNode（可视化着色器节点）

对提供的纹理执行查找操作，支持多种纹理来源选择。

**属性（Props）：**
- source: int (VisualShaderNodeTexture.Source) = 0 —— 纹理来源
- texture: Texture2D —— 纹理
- texture_type: int (VisualShaderNodeTexture.TextureType) = 0 —— 纹理类型

**枚举（Enums）：**
**Source：** SOURCE_TEXTURE=0 —— 纹理来源, SOURCE_SCREEN=1 —— 屏幕来源, SOURCE_2D_TEXTURE=2 —— 2D纹理来源, SOURCE_2D_NORMAL=3 —— 2D法线来源, SOURCE_DEPTH=4 —— 深度来源, SOURCE_PORT=5 —— 端口来源, SOURCE_3D_NORMAL=6 —— 3D法线来源, SOURCE_ROUGHNESS=7 —— 粗糙度来源, SOURCE_MAX=8
**TextureType：** TYPE_DATA=0 —— 数据类型, TYPE_COLOR=1 —— 颜色类型, TYPE_NORMAL_MAP=2 —— 法线贴图类型, TYPE_MAX=3
