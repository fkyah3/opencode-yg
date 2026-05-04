## ResourceImporterOBJ（OBJ资源导入器） <- ResourceImporter（资源导入器）

与 ResourceImporterScene 不同，ResourceImporterOBJ 默认导入单个 Mesh 资源，而不是导入 PackedScene。这使得在需要直接 Mesh 资源的节点（如 GridMap、GPUParticles3D 或 CPUParticles3D）中使用 Mesh 资源更加方便。请注意，仍然可以使用**高级导入设置**对话框从 3D 场景中保存网格资源，无论源格式如何。另请参见 ResourceImporterScene，它用于更高级的 3D 格式（如 glTF）。

**属性（Props）：**
- force_disable_mesh_compression: bool = false —— 强制禁用网格压缩
- generate_lightmap_uv2: bool = false —— 生成光照贴图 UV2
- generate_lightmap_uv2_texel_size: float = 0.2 —— 生成光照贴图 UV2 纹素大小
- generate_lods: bool = true —— 生成 LOD
- generate_shadow_mesh: bool = true —— 生成阴影网格
- generate_tangents: bool = true —— 生成切线
- offset_mesh: Vector3 = Vector3(0, 0, 0) —— 网格偏移
- scale_mesh: Vector3 = Vector3(1, 1, 1) —— 网格缩放
