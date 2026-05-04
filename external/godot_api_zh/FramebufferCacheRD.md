## FramebufferCacheRD（渲染设备帧缓冲缓存） <- Object（对象）

基于 RenderingDevice 的渲染器的帧缓冲缓存管理器。提供创建帧缓冲的方法，并在所使用的纹理存在期间可在后续调用中复用。当依赖对象被释放时，帧缓冲将自动清理。

**方法（Methods）：**
- get_cache_multipass(textures: RID[], passes: RDFramebufferPass[], views: int) -> RID —— 获取多通道缓存
