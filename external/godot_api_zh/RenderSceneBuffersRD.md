## RenderSceneBuffersRD（RD渲染场景缓冲区） <- RenderSceneBuffers（渲染场景缓冲区）

该对象管理基于渲染设备渲染器的所有 3D 渲染缓冲区。为每个启用 3D 渲染的视口创建该对象的一个实例。另请参见 RenderSceneBuffers。所有缓冲区按**上下文（contexts）**组织。默认上下文名为 **render_buffers**，可包含颜色缓冲区、深度缓冲区、速度缓冲、VRS 密度图和这些缓冲区的 MSAA 变体等。缓冲区仅保证在视口渲染期间存在。**注意：** 这是内部渲染服务器对象。请勿从脚本实例化此类。

**方法（Methods）：**
- clear_context(context: StringName) —— 清除上下文
- create_texture(context: StringName, name: StringName, data_format: int, usage_bits: int, texture_samples: int, size: Vector2i, layers: int, mipmaps: int, unique: bool, discardable: bool) -> RID —— 创建纹理
- create_texture_from_format(context: StringName, name: StringName, format: RDTextureFormat, view: RDTextureView, unique: bool) -> RID —— 从格式创建纹理
- create_texture_view(context: StringName, name: StringName, view_name: StringName, view: RDTextureView) -> RID —— 创建纹理视图
- get_color_layer(layer: int, msaa: bool = false) -> RID —— 获取颜色层
- get_color_texture(msaa: bool = false) -> RID —— 获取颜色纹理
- get_depth_layer(layer: int, msaa: bool = false) -> RID —— 获取深度层
- get_depth_texture(msaa: bool = false) -> RID —— 获取深度纹理
- get_fsr_sharpness() -> float —— 获取 FSR 锐度
- get_internal_size() -> Vector2i —— 获取内部大小
- get_msaa_3d() -> int —— 获取 3D MSAA
- get_render_target() -> RID —— 获取渲染目标
- get_scaling_3d_mode() -> int —— 获取 3D 缩放模式
- get_screen_space_aa() -> int —— 获取屏幕空间抗锯齿
- get_target_size() -> Vector2i —— 获取目标大小
- get_texture(context: StringName, name: StringName) -> RID —— 获取纹理
- get_texture_format(context: StringName, name: StringName) -> RDTextureFormat —— 获取纹理格式
- get_texture_samples() -> int —— 获取纹理采样数
- get_texture_slice(context: StringName, name: StringName, layer: int, mipmap: int, layers: int, mipmaps: int) -> RID —— 获取纹理切片
- get_texture_slice_size(context: StringName, name: StringName, mipmap: int) -> Vector2i —— 获取纹理切片大小
- get_texture_slice_view(context: StringName, name: StringName, layer: int, mipmap: int, layers: int, mipmaps: int, view: RDTextureView) -> RID —— 获取纹理切片视图
- get_use_debanding() -> bool —— 是否使用去条带
- get_use_taa() -> bool —— 是否使用 TAA
- get_velocity_layer(layer: int, msaa: bool = false) -> RID —— 获取速度层
- get_velocity_texture(msaa: bool = false) -> RID —— 获取速度纹理
- get_view_count() -> int —— 获取视图数量
- has_texture(context: StringName, name: StringName) -> bool —— 是否有纹理
