## VisualShaderNodeTextureParameter <- VisualShaderNodeParameter（参数节点）

对着色器中作为 uniform 提供的纹理执行查找操作。

**属性（Props）：**
- color_default: int (VisualShaderNodeTextureParameter.ColorDefault) = 0 —— 默认颜色
- texture_filter: int (VisualShaderNodeTextureParameter.TextureFilter) = 0 —— 纹理过滤
- texture_repeat: int (VisualShaderNodeTextureParameter.TextureRepeat) = 0 —— 纹理重复
- texture_source: int (VisualShaderNodeTextureParameter.TextureSource) = 0 —— 纹理源
- texture_type: int (VisualShaderNodeTextureParameter.TextureType) = 0 —— 纹理类型

**枚举（Enums）：**
**TextureType（纹理类型）：** TYPE_DATA=0（数据）, TYPE_COLOR=1（颜色）, TYPE_NORMAL_MAP=2（法线贴图）, TYPE_ANISOTROPY=3（各向异性）, TYPE_MAX=4（最大值）
**ColorDefault（默认颜色）：** COLOR_DEFAULT_WHITE=0（白色）, COLOR_DEFAULT_BLACK=1（黑色）, COLOR_DEFAULT_TRANSPARENT=2（透明）, COLOR_DEFAULT_MAX=3（最大值）
**TextureFilter（纹理过滤）：** FILTER_DEFAULT=0（默认）, FILTER_NEAREST=1（最近邻）, FILTER_LINEAR=2（线性）, FILTER_NEAREST_MIPMAP=3（最近邻mipmap）, FILTER_LINEAR_MIPMAP=4（线性mipmap）, FILTER_NEAREST_MIPMAP_ANISOTROPIC=5（最近邻mipmap各向异性）, FILTER_LINEAR_MIPMAP_ANISOTROPIC=6（线性mipmap各向异性）, FILTER_MAX=7（最大值）
**TextureRepeat（纹理重复）：** REPEAT_DEFAULT=0（默认）, REPEAT_ENABLED=1（启用）, REPEAT_DISABLED=2（禁用）, REPEAT_MAX=3（最大值）
**TextureSource（纹理源）：** SOURCE_NONE=0（无）, SOURCE_SCREEN=1（屏幕）, SOURCE_DEPTH=2（深度）, SOURCE_NORMAL_ROUGHNESS=3（法线粗糙度）, SOURCE_MAX=4（最大值）
