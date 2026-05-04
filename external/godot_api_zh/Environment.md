## Environment（环境） <- Resource（资源）

用于环境节点（如 WorldEnvironment）的资源，定义多个环境操作（如背景天空或颜色、环境光、雾、景深等）。这些参数影响场景的最终渲染。这些操作的顺序为：- 景深模糊 - 自动曝光 - 辉光 - 色调映射 - 色彩调整

**属性（Props）：**
- adjustment_brightness: float = 1.0 —— 调整亮度
- adjustment_color_correction: Texture —— 调整色彩校正
- adjustment_contrast: float = 1.0 —— 调整对比度
- adjustment_enabled: bool = false —— 是否启用调整
- adjustment_saturation: float = 1.0 —— 调整饱和度
- ambient_light_color: Color = Color(0, 0, 0, 1) —— 环境光颜色
- ambient_light_energy: float = 1.0 —— 环境光强度
- ambient_light_sky_contribution: float = 1.0 —— 环境光天空贡献度
- ambient_light_source: int (Environment.AmbientSource) = 0 —— 环境光源
- background_camera_feed_id: int = 1 —— 背景摄像头源 ID
- background_canvas_max_layer: int = 0 —— 背景画布最大层
- background_color: Color = Color(0, 0, 0, 1) —— 背景颜色
- background_energy_multiplier: float = 1.0 —— 背景能量倍增器
- background_intensity: float = 30000.0 —— 背景强度
- background_mode: int (Environment.BGMode) = 0 —— 背景模式
- fog_aerial_perspective: float = 0.0 —— 雾空气透视
- fog_density: float = 0.01 —— 雾密度
- fog_depth_begin: float = 10.0 —— 雾深度起始
- fog_depth_curve: float = 1.0 —— 雾深度曲线
- fog_depth_end: float = 100.0 —— 雾深度结束
- fog_enabled: bool = false —— 是否启用雾
- fog_height: float = 0.0 —— 雾高度
- fog_height_density: float = 0.0 —— 雾高度密度
- fog_light_color: Color = Color(0.518, 0.553, 0.608, 1) —— 雾光照颜色
- fog_light_energy: float = 1.0 —— 雾光照强度
- fog_mode: int (Environment.FogMode) = 0 —— 雾模式
- fog_sky_affect: float = 1.0 —— 雾对天空的影响
- fog_sun_scatter: float = 0.0 —— 雾阳光散射
- glow_blend_mode: int (Environment.GlowBlendMode) = 1 —— 辉光混合模式
- glow_bloom: float = 0.0 —— 辉光泛光
- glow_enabled: bool = false —— 是否启用辉光
- glow_hdr_luminance_cap: float = 12.0 —— 辉光 HDR 亮度上限
- glow_hdr_scale: float = 2.0 —— 辉光 HDR 缩放
- glow_hdr_threshold: float = 1.0 —— 辉光 HDR 阈值
- glow_intensity: float = 0.3 —— 辉光强度
- glow_levels/1: float = 0.0 —— 辉光级别 1
- glow_levels/2: float = 0.8 —— 辉光级别 2
- glow_levels/3: float = 0.4 —— 辉光级别 3
- glow_levels/4: float = 0.1 —— 辉光级别 4
- glow_levels/5: float = 0.0 —— 辉光级别 5
- glow_levels/6: float = 0.0 —— 辉光级别 6
- glow_levels/7: float = 0.0 —— 辉光级别 7
- glow_map: Texture —— 辉光映射纹理
- glow_map_strength: float = 0.8 —— 辉光映射强度
- glow_mix: float = 0.05 —— 辉光混合
- glow_normalized: bool = false —— 辉光是否归一化
- glow_strength: float = 1.0 —— 辉光强度
- reflected_light_source: int (Environment.ReflectionSource) = 0 —— 反射光源
- sdfgi_bounce_feedback: float = 0.5 —— SDFGI 反弹反馈
- sdfgi_cascade0_distance: float = 12.8 —— SDFGI 级联 0 距离
- sdfgi_cascades: int = 4 —— SDFGI 级联数
- sdfgi_enabled: bool = false —— 是否启用 SDFGI
- sdfgi_energy: float = 1.0 —— SDFGI 能量
- sdfgi_max_distance: float = 204.8 —— SDFGI 最大距离
- sdfgi_min_cell_size: float = 0.2 —— SDFGI 最小单元大小
- sdfgi_normal_bias: float = 1.1 —— SDFGI 法线偏差
- sdfgi_probe_bias: float = 1.1 —— SDFGI 探针偏差
- sdfgi_read_sky_light: bool = true —— SDFGI 是否读取天空光
- sdfgi_use_occlusion: bool = false —— SDFGI 是否使用遮挡
- sdfgi_y_scale: int (Environment.SDFGIYScale) = 1 —— SDFGI Y 轴缩放
- sky: Sky —— 天空
- sky_custom_fov: float = 0.0 —— 天空自定义视场
- sky_rotation: Vector3 = Vector3(0, 0, 0) —— 天空旋转
- ssao_ao_channel_affect: float = 0.0 —— SSAO 通道影响
- ssao_detail: float = 0.5 —— SSAO 细节
- ssao_enabled: bool = false —— 是否启用 SSAO
- ssao_horizon: float = 0.06 —— SSAO 水平角
- ssao_intensity: float = 2.0 —— SSAO 强度
- ssao_light_affect: float = 0.0 —— SSAO 光照影响
- ssao_power: float = 1.5 —— SSAO 幂次
- ssao_radius: float = 1.0 —— SSAO 半径
- ssao_sharpness: float = 0.98 —— SSAO 锐度
- ssil_enabled: bool = false —— 是否启用 SSIL
- ssil_intensity: float = 1.0 —— SSIL 强度
- ssil_normal_rejection: float = 1.0 —— SSIL 法线抑制
- ssil_radius: float = 5.0 —— SSIL 半径
- ssil_sharpness: float = 0.98 —— SSIL 锐度
- ssr_depth_tolerance: float = 0.5 —— SSR 深度容差
- ssr_enabled: bool = false —— 是否启用 SSR
- ssr_fade_in: float = 0.15 —— SSR 淡入
- ssr_fade_out: float = 2.0 —— SSR 淡出
- ssr_max_steps: int = 64 —— SSR 最大步数
- tonemap_agx_contrast: float = 1.25 —— AGX 色调映射对比度
- tonemap_agx_white: float = 16.29 —— AGX 色调映射白点
- tonemap_exposure: float = 1.0 —— 色调映射曝光
- tonemap_mode: int (Environment.ToneMapper) = 0 —— 色调映射模式
- tonemap_white: float = 1.0 —— 色调映射白点
- volumetric_fog_albedo: Color = Color(1, 1, 1, 1) —— 体积雾漫反射颜色
- volumetric_fog_ambient_inject: float = 0.0 —— 体积雾环境注入
- volumetric_fog_anisotropy: float = 0.2 —— 体积雾各向异性
- volumetric_fog_density: float = 0.05 —— 体积雾密度
- volumetric_fog_detail_spread: float = 2.0 —— 体积雾细节扩散
- volumetric_fog_emission: Color = Color(0, 0, 0, 1) —— 体积雾自发光颜色
- volumetric_fog_emission_energy: float = 1.0 —— 体积雾自发光强度
- volumetric_fog_enabled: bool = false —— 是否启用体积雾
- volumetric_fog_gi_inject: float = 1.0 —— 体积雾全局光照注入
- volumetric_fog_length: float = 64.0 —— 体积雾长度
- volumetric_fog_sky_affect: float = 1.0 —— 体积雾对天空的影响
- volumetric_fog_temporal_reprojection_amount: float = 0.9 —— 体积雾时间重投影量
- volumetric_fog_temporal_reprojection_enabled: bool = true —— 体积雾时间重投影是否启用

**方法（Methods）：**
- get_glow_level(idx: int) -> float —— 获取辉光级别
- set_glow_level(idx: int, intensity: float) —— 设置辉光级别

**枚举（Enums）：**
**BGMode（背景模式）：** BG_CLEAR_COLOR=0（清除颜色）, BG_COLOR=1（纯色）, BG_SKY=2（天空）, BG_CANVAS=3（画布）, BG_KEEP=4（保持）, BG_CAMERA_FEED=5（摄像头源）, BG_MAX=6
**AmbientSource（环境光源）：** AMBIENT_SOURCE_BG=0（背景）, AMBIENT_SOURCE_DISABLED=1（禁用）, AMBIENT_SOURCE_COLOR=2（颜色）, AMBIENT_SOURCE_SKY=3（天空）
**ReflectionSource（反射源）：** REFLECTION_SOURCE_BG=0（背景）, REFLECTION_SOURCE_DISABLED=1（禁用）, REFLECTION_SOURCE_SKY=2（天空）
**ToneMapper（色调映射器）：** TONE_MAPPER_LINEAR=0（线性）, TONE_MAPPER_REINHARDT=1（Reinhardt）, TONE_MAPPER_FILMIC=2（胶片）, TONE_MAPPER_ACES=3（ACES）, TONE_MAPPER_AGX=4（AGX）
**GlowBlendMode（辉光混合模式）：** GLOW_BLEND_MODE_ADDITIVE=0（相加）, GLOW_BLEND_MODE_SCREEN=1（滤色）, GLOW_BLEND_MODE_SOFTLIGHT=2（柔光）, GLOW_BLEND_MODE_REPLACE=3（替换）, GLOW_BLEND_MODE_MIX=4（混合）
**FogMode（雾模式）：** FOG_MODE_EXPONENTIAL=0（指数）, FOG_MODE_DEPTH=1（深度）
**SDFGIYScale（SDFGI Y 轴缩放）：** SDFGI_Y_SCALE_50_PERCENT=0（50%）, SDFGI_Y_SCALE_75_PERCENT=1（75%）, SDFGI_Y_SCALE_100_PERCENT=2（100%）
