## RenderSceneBuffersConfiguration（渲染场景缓冲区配置）<- RefCounted（引用计数）

此配置对象由渲染引擎在视口更改时创建和填充，用于（重新）配置 RenderSceneBuffers 对象。

**属性（Props）：**
- anisotropic_filtering_level: int (RenderingServer.ViewportAnisotropicFiltering) = 2 —— 各向异性过滤级别
- fsr_sharpness: float = 0.0 —— FSR锐度
- internal_size: Vector2i = Vector2i(0, 0) —— 内部大小
- msaa_3d: int (RenderingServer.ViewportMSAA) = 0 —— 3D MSAA
- render_target: RID = RID() —— 渲染目标
- scaling_3d_mode: int (RenderingServer.ViewportScaling3DMode) = 255 —— 3D缩放模式
- screen_space_aa: int (RenderingServer.ViewportScreenSpaceAA) = 0 —— 屏幕空间抗锯齿
- target_size: Vector2i = Vector2i(0, 0) —— 目标大小
- texture_mipmap_bias: float = 0.0 —— 纹理米普映射偏移
- view_count: int = 1 —— 视图数量
