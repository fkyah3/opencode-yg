## Lightmapper（光照贴图器） <- RefCounted（引用计数）

此类应由自定义光照贴图器类扩展。光照贴图器可与 LightmapGI 配合使用，在 3D 场景中提供快速烘焙的全局光照。Godot 包含一个基于 GPU 的内置光照贴图器 LightmapperRD（使用计算着色器），但 C++ 模块也可以实现自定义光照贴图器。
