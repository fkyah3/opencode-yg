## LightmapGI <- VisualInstance3D（可视化实例3D）

LightmapGI 节点用于计算和存储烘焙光照图。光照图用于提供高质量、极少漏光的间接光照。如果启用了 `directional`，LightmapGI 还可以使用球谐函数提供粗略反射。动态对象可以通过*光照探针*接收间接光照，通过将 `generate_probes_subdiv` 设置为除 `GENERATE_PROBES_DISABLED` 以外的值可以自动放置探针。也可以通过创建 LightmapProbe 节点添加额外的光照图探针。缺点是光照图是完全静态的，无法在导出的项目中烘焙。烘焙 LightmapGI 节点也比 VoxelGI 慢。**程序化生成：** 光照图烘焙功能仅在编辑器中可用。这意味着 LightmapGI 不适合程序化生成或用户构建的关卡。对于程序化生成或用户构建的关卡，请改用 VoxelGI 或 SDFGI（参见 `Environment.sdfgi_enabled`）。**性能：** LightmapGI 提供了最佳运行时性能的全局光照。它适用于低端硬件，包括集成显卡和移动设备。**注意：** 由于光照图的工作原理，大多数属性只有在再次烘焙光照图后才会产生可见效果。**注意：** 不支持在 CSGShape3D 和 PrimitiveMesh 上烘焙光照图，因为它们无法存储烘焙所需的 UV2 数据。**注意：** 如果没有安装自定义光照图烘焙器，LightmapGI 只能在支持 Forward+ 或 Mobile 渲染器的设备上烘焙。**注意：** LightmapGI 节点仅为其父节点的子节点烘焙光照数据。场景层次结构中更上层的节点不会被烘焙。

**属性（Props）：**
- bias: float = 0.0005
- bounce_indirect_energy: float = 1.0
- bounces: int = 3
- camera_attributes: CameraAttributes
- denoiser_range: int = 10
- denoiser_strength: float = 0.1
- directional: bool = false
- environment_custom_color: Color = Color(1, 1, 1, 1)
- environment_custom_energy: float = 1.0
- environment_custom_sky: Sky
- environment_mode: int (LightmapGI.EnvironmentMode) = 1
- generate_probes_subdiv: int (LightmapGI.GenerateProbes) = 2
- interior: bool = false
- light_data: LightmapGIData
- max_texture_size: int = 16384
- quality: int (LightmapGI.BakeQuality) = 1
- shadowmask_mode: int (LightmapGIData.ShadowmaskMode) = 0
- supersampling: bool = false
- supersampling_factor: float = 2.0
- texel_scale: float = 1.0
- use_denoiser: bool = true
- use_texture_for_bounces: bool = true

**枚举（Enums）：**
**BakeQuality：** BAKE_QUALITY_LOW=0, BAKE_QUALITY_MEDIUM=1, BAKE_QUALITY_HIGH=2, BAKE_QUALITY_ULTRA=3
**GenerateProbes：** GENERATE_PROBES_DISABLED=0, GENERATE_PROBES_SUBDIV_4=1, GENERATE_PROBES_SUBDIV_8=2, GENERATE_PROBES_SUBDIV_16=3, GENERATE_PROBES_SUBDIV_32=4
**BakeError：** BAKE_ERROR_OK=0, BAKE_ERROR_NO_SCENE_ROOT=1, BAKE_ERROR_FOREIGN_DATA=2, BAKE_ERROR_NO_LIGHTMAPPER=3, BAKE_ERROR_NO_SAVE_PATH=4, BAKE_ERROR_NO_MESHES=5, BAKE_ERROR_MESHES_INVALID=6, BAKE_ERROR_CANT_CREATE_IMAGE=7, BAKE_ERROR_USER_ABORTED=8, BAKE_ERROR_TEXTURE_SIZE_TOO_SMALL=9, ...
**EnvironmentMode：** ENVIRONMENT_MODE_DISABLED=0, ENVIRONMENT_MODE_SCENE=1, ENVIRONMENT_MODE_CUSTOM_SKY=2, ENVIRONMENT_MODE_CUSTOM_COLOR=3
