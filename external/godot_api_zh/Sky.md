## Sky（天空）<- Resource（资源）

Sky 类使用 Material 来渲染 3D 环境的背景及其发出的光照，通过更新反射/辐射立方体贴图实现。

**属性（Props）：**
- process_mode: int (Sky.ProcessMode) = 0 —— 处理模式
- radiance_size: int (Sky.RadianceSize) = 3 —— 辐射大小
- sky_material: Material —— 天空材质

**枚举（Enums）：**
**RadianceSize（辐射大小）：** RADIANCE_SIZE_32=0，RADIANCE_SIZE_64=1，RADIANCE_SIZE_128=2，RADIANCE_SIZE_256=3，RADIANCE_SIZE_512=4，RADIANCE_SIZE_1024=5，RADIANCE_SIZE_2048=6，RADIANCE_SIZE_MAX=7
**ProcessMode（处理模式）：** PROCESS_MODE_AUTOMATIC=0 —— 自动，PROCESS_MODE_QUALITY=1 —— 质量，PROCESS_MODE_INCREMENTAL=2 —— 增量，PROCESS_MODE_REALTIME=3 —— 实时
