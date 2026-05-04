## UniformSetCacheRD（渲染设备uniform集缓存） <- Object（对象）

基于 RenderingDevice 的渲染器的 uniform 集缓存管理器。提供创建 uniform 集并在后续调用中复用（只要该 uniform 集存在）的方法。当依赖对象被释放时，uniform 集将自动清理。

**方法（Methods）：**
- get_cache(shader: RID, set: int, uniforms: RDUniform[]) -> RID —— 获取uniform集缓存
