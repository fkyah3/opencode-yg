## ResourceImporterScene（场景资源导入器）<- ResourceImporter（资源导入器）

另见 ResourceImporterOBJ，它用于导入可作为独立 Mesh 或场景的 OBJ 模型。其他选项（如提取单个网格或材质到文件）可在**高级导入设置**对话框中找到。该对话框可通过在 FileSystem 停靠面板中双击 3D 场景，或在 FileSystem 停靠面板中选择 3D 场景后进入 Import 停靠面板并选择**高级**来打开。**注意：** ResourceImporterScene *不*用于 PackedScene，例如 `.tscn` 和 `.scn` 文件。

**属性（Props）：**
- _subresources: Dictionary = {} —— 子资源
- animation/fps: float = 30 —— 动画帧率
- animation/import: bool = true —— 导入动画
- animation/import_rest_as_RESET: bool = false —— 将 rest 姿势导入为 RESET
- animation/remove_immutable_tracks: bool = true —— 移除不可变轨道
- animation/trimming: bool = false —— 动画裁剪
- import_script/path: String = "" —— 导入脚本路径
- materials/extract: int = 0 —— 提取材质
- materials/extract_format: int = 0 —— 提取格式
- materials/extract_path: String = "" —— 提取路径
- meshes/create_shadow_meshes: bool = true —— 创建阴影网格
- meshes/ensure_tangents: bool = true —— 确保切线存在
- meshes/force_disable_compression: bool = false —— 强制禁用压缩
- meshes/generate_lods: bool = true —— 生成 LOD
- meshes/light_baking: int = 1 —— 光照烘焙
- meshes/lightmap_texel_size: float = 0.2 —— 光照图纹素大小
- nodes/apply_root_scale: bool = true —— 应用根节点缩放
- nodes/import_as_skeleton_bones: bool = false —— 作为骨骼导入
- nodes/root_name: String = "" —— 根节点名称
- nodes/root_scale: float = 1.0 —— 根节点缩放
- nodes/root_script: Script = null —— 根节点脚本
- nodes/root_type: String = "" —— 根节点类型
- nodes/use_name_suffixes: bool = true —— 使用名称后缀
- nodes/use_node_type_suffixes: bool = true —— 使用节点类型后缀
- skins/use_named_skins: bool = true —— 使用命名皮肤
