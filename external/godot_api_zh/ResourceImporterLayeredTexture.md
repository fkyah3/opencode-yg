## ResourceImporterLayeredTexture（资源导入器分层纹理）<- ResourceImporter（资源导入器）

此导入器导入三维纹理，可用于自定义着色器、作为 FogMaterial 密度图或作为 GPUParticlesAttractorVectorField3D。另请参阅 ResourceImporterTexture 和 ResourceImporterTextureAtlas。

**属性（Props）：**
- compress/channel_pack: int = 0 —— 压缩/通道打包
- compress/hdr_compression: int = 1 —— 压缩/HDR压缩
- compress/high_quality: bool = false —— 压缩/高质量
- compress/lossy_quality: float = 0.7 —— 压缩/有损质量
- compress/mode: int = 1 —— 压缩/模式
- compress/rdo_quality_loss: float = 0.0 —— 压缩/RDO质量损失
- compress/uastc_level: int = 0 —— 压缩/UASTC级别
- mipmaps/generate: bool = true —— 米普映射/生成
- mipmaps/limit: int = -1 —— 米普映射/限制
- slices/arrangement: int = 1 —— 切片/排列
