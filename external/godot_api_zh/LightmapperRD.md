## LightmapperRD（光照贴图器RD）<- Lightmapper（光照贴图器）

LightmapperRD（"RD"代表 RenderingDevice）是用于 LightmapGI 的内置 GPU 光照贴图器。在大多数专用 GPU 上，它烘焙光照贴图的速度远快于大多数基于 CPU 的光照贴图器。LightmapperRD 使用计算着色器烘焙光照贴图，因此无需安装 CUDA 或 OpenCL 库即可使用。**注意：** 此光照贴图器需要 GPU 支持 RenderingDevice 后端（Forward+ 和 Mobile 渲染器）。使用 Compatibility 渲染器时，烘焙将使用临时 RenderingDevice。渲染*之前*已烘焙好的光照贴图不需要支持 RenderingDevice。
