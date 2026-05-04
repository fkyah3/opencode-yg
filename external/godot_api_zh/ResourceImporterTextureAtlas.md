## ResourceImporterTextureAtlas（资源导入器纹理图集）<- ResourceImporter（资源导入器）

此导入器将 PNG 图像中的纹理集合导入为 AtlasTexture 或 2D ArrayMesh。这可用于在从精灵表导入 2D 动画时节省内存。纹理图集仅在 2D 渲染中受支持，3D 中不支持。另请参阅 ResourceImporterTexture 和 ResourceImporterLayeredTexture。**注意：** ResourceImporterTextureAtlas 不处理导入 TileSetAtlasSource，后者是使用 TileSet 编辑器创建的。

**属性（Props）：**
- atlas_file: String = "" —— 图集文件
- crop_to_region: bool = false —— 裁剪到区域
- import_mode: int = 0 —— 导入模式
- trim_alpha_border_from_region: bool = true —— 从区域修剪Alpha边框
