## ResourceImporterTexture（纹理资源导入器）<- ResourceImporter（资源导入器）

该导入器导入 CompressedTexture2D 资源。如果你需要在脚本中以更方便的方式处理图像，请改用 ResourceImporterImage。另见 ResourceImporterLayeredTexture。

**属性（Props）：**
- compress/channel_pack: int = 0 —— 通道打包
- compress/hdr_compression: int = 1 —— HDR 压缩
- compress/high_quality: bool = false —— 高质量
- compress/lossy_quality: float = 0.7 —— 有损质量
- compress/mode: int = 0 —— 压缩模式
- compress/normal_map: int = 0 —— 法线贴图
- compress/rdo_quality_loss: float = 0.0 —— RDO 质量损失
- compress/uastc_level: int = 0 —— UASTC 等级
- detect_3d/compress_to: int = 1 —— 3D 检测压缩目标
- editor/convert_colors_with_editor_theme: bool = false —— 用编辑器主题转换颜色
- editor/scale_with_editor_scale: bool = false —— 随编辑器缩放
- mipmaps/generate: bool = false —— 生成 mipmap
- mipmaps/limit: int = -1 —— mipmap 限制
- process/channel_remap/alpha: int = 3 —— Alpha 通道重映射
- process/channel_remap/blue: int = 2 —— 蓝色通道重映射
- process/channel_remap/green: int = 1 —— 绿色通道重映射
- process/channel_remap/red: int = 0 —— 红色通道重映射
- process/fix_alpha_border: bool = true —— 修复 Alpha 边框
- process/hdr_as_srgb: bool = false —— HDR 作为 sRGB
- process/hdr_clamp_exposure: bool = false —— HDR 钳制曝光
- process/normal_map_invert_y: bool = false —— 法线贴图反转 Y
- process/premult_alpha: bool = false —— 预乘 Alpha
- process/size_limit: int = 0 —— 大小限制
- roughness/mode: int = 0 —— 粗糙度模式
- roughness/src_normal: String = "" —— 粗糙度源法线
- svg/scale: float = 1.0 —— SVG 缩放
