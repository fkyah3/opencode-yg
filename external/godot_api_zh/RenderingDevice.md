## RenderingDevice（渲染设备） <- Object（对象）

RenderingDevice 是用于处理现代低级图形 API（如 Vulkan）的抽象。与 RenderingServer（处理 Godot 自身的渲染子系统）相比，RenderingDevice 更为底层，允许更直接地操作底层图形 API。Godot 使用 RenderingDevice 来支持多种现代低级图形 API，同时减少所需的代码重复量。RenderingDevice 也可用于您自己的项目，执行 RenderingServer 或高级节点未暴露的操作，例如使用计算着色器。启动时，Godot 创建一个全局 RenderingDevice，可通过 `RenderingServer.get_rendering_device` 获取。该全局 RenderingDevice 执行屏幕绘制。**本地 RenderingDevice：** 使用 `RenderingServer.create_local_rendering_device`，您可以创建"辅助"渲染设备，在单独线程上执行绘制和 GPU 计算操作。**注意：** RenderingDevice 假定您具备现代图形 API（如 Vulkan、Direct3D 12、Metal 或 WebGPU）的中级知识。这些图形 API 比 OpenGL 或 Direct3D 11 更底层，要求您执行以前由图形驱动程序自身完成的操作。如果您难以理解此类中使用的概念，请查阅相关教程或文档。建议在尝试学习低级图形 API 之前，具备现有的现代 OpenGL 或 Direct3D 11 知识。**注意：** RenderingDevice 在无头模式或使用 Compatibility 渲染方法时不可用。

**方法（Methods）：**
- acceleration_structure_build(acceleration_structure: RID) -> int —— 构建加速结构
- barrier(from: int = 32767, to: int = 32767) —— 屏障
- blas_create(vertex_array: RID, index_array: RID, geometry_bits: int = 0, position_attribute_location: int = 0) -> RID —— 创建 BLAS
- buffer_clear(buffer: RID, offset: int, size_bytes: int) -> int —— 清除缓冲区
- buffer_copy(src_buffer: RID, dst_buffer: RID, src_offset: int, dst_offset: int, size: int) -> int —— 复制缓冲区
- buffer_get_data(buffer: RID, offset_bytes: int = 0, size_bytes: int = 0) -> PackedByteArray —— 获取缓冲区数据
- buffer_get_data_async(buffer: RID, callback: Callable, offset_bytes: int = 0, size_bytes: int = 0) -> int —— 异步获取缓冲区数据
- buffer_get_device_address(buffer: RID) -> int —— 获取缓冲区设备地址
- buffer_update(buffer: RID, offset: int, size_bytes: int, data: PackedByteArray) -> int —— 更新缓冲区
- capture_timestamp(name: String) —— 捕获时间戳
- compute_list_add_barrier(compute_list: int) —— 计算列表添加屏障
- compute_list_begin() -> int —— 开始计算列表
- compute_list_bind_compute_pipeline(compute_list: int, compute_pipeline: RID) —— 计算列表绑定计算管线
- compute_list_bind_uniform_set(compute_list: int, uniform_set: RID, set_index: int) —— 计算列表绑定 uniform 集
- compute_list_dispatch(compute_list: int, x_groups: int, y_groups: int, z_groups: int) —— 计算列表分发
- compute_list_dispatch_indirect(compute_list: int, buffer: RID, offset: int) —— 计算列表间接分发
- compute_list_end() —— 结束计算列表
- compute_list_set_push_constant(compute_list: int, buffer: PackedByteArray, size_bytes: int) —— 计算列表设置推送常量
- compute_pipeline_create(shader: RID, specialization_constants: RDPipelineSpecializationConstant[] = []) -> RID —— 创建计算管线
- compute_pipeline_is_valid(compute_pipeline: RID) -> bool —— 计算管线是否有效
- create_local_device() -> RenderingDevice —— 创建本地设备
- draw_command_begin_label(name: String, color: Color) —— 绘制命令开始标签
- draw_command_end_label() —— 绘制命令结束标签
- draw_command_insert_label(name: String, color: Color) —— 绘制命令插入标签
- draw_list_begin(framebuffer: RID, draw_flags: int = 0, clear_color_values: PackedColorArray = PackedColorArray(), clear_depth_value: float = 1.0, clear_stencil_value: int = 0, region: Rect2 = Rect2(0, 0, 0, 0), breadcrumb: int = 0) -> int —— 开始绘制列表
- draw_list_begin_for_screen(screen: int = 0, clear_color: Color = Color(0, 0, 0, 1)) -> int —— 为屏幕开始绘制列表
- draw_list_begin_split(framebuffer: RID, splits: int, initial_color_action: int, final_color_action: int, initial_depth_action: int, final_depth_action: int, clear_color_values: PackedColorArray = PackedColorArray(), clear_depth: float = 1.0, clear_stencil: int = 0, region: Rect2 = Rect2(0, 0, 0, 0), storage_textures: RID[] = []) -> PackedInt64Array —— 开始拆分绘制列表
- draw_list_bind_index_array(draw_list: int, index_array: RID) —— 绘制列表绑定索引数组
- draw_list_bind_render_pipeline(draw_list: int, render_pipeline: RID) —— 绘制列表绑定渲染管线
- draw_list_bind_uniform_set(draw_list: int, uniform_set: RID, set_index: int) —— 绘制列表绑定 uniform 集
- draw_list_bind_vertex_array(draw_list: int, vertex_array: RID) —— 绘制列表绑定顶点数组
- draw_list_bind_vertex_buffers_format(draw_list: int, vertex_format: int, vertex_count: int, vertex_buffers: RID[], offsets: PackedInt64Array = PackedInt64Array()) —— 绘制列表绑定顶点缓冲区格式
- draw_list_disable_scissor(draw_list: int) —— 绘制列表禁用裁剪
- draw_list_draw(draw_list: int, use_indices: bool, instances: int, procedural_vertex_count: int = 0) —— 绘制列表绘制
- draw_list_draw_indirect(draw_list: int, use_indices: bool, buffer: RID, offset: int = 0, draw_count: int = 1, stride: int = 0) —— 绘制列表间接绘制
- draw_list_enable_scissor(draw_list: int, rect: Rect2 = Rect2(0, 0, 0, 0)) —— 绘制列表启用裁剪
- draw_list_end() —— 结束绘制列表
- draw_list_set_blend_constants(draw_list: int, color: Color) —— 绘制列表设置混合常量
- draw_list_set_push_constant(draw_list: int, buffer: PackedByteArray, size_bytes: int) —— 绘制列表设置推送常量
- draw_list_switch_to_next_pass() -> int —— 切换到下一通道
- draw_list_switch_to_next_pass_split(splits: int) -> PackedInt64Array —— 切换到下一拆分通道
- framebuffer_create(textures: RID[], validate_with_format: int = -1, view_count: int = 1) -> RID —— 创建帧缓冲区
- framebuffer_create_empty(size: Vector2i, samples: int = 0, validate_with_format: int = -1) -> RID —— 创建空帧缓冲区
- framebuffer_create_multipass(textures: RID[], passes: RDFramebufferPass[], validate_with_format: int = -1, view_count: int = 1) -> RID —— 创建多通道帧缓冲区
- framebuffer_format_create(attachments: RDAttachmentFormat[], view_count: int = 1) -> int —— 创建帧缓冲区格式
- framebuffer_format_create_empty(samples: int = 0) -> int —— 创建空帧缓冲区格式
- framebuffer_format_create_multipass(attachments: RDAttachmentFormat[], passes: RDFramebufferPass[], view_count: int = 1) -> int —— 创建多通道帧缓冲区格式
- framebuffer_format_get_texture_samples(format: int, render_pass: int = 0) -> int —— 获取帧缓冲区格式纹理采样数
- framebuffer_get_format(framebuffer: RID) -> int —— 获取帧缓冲区格式
- framebuffer_is_valid(framebuffer: RID) -> bool —— 帧缓冲区是否有效
- free_rid(rid: RID) —— 释放 RID
- full_barrier() —— 全屏障
- get_captured_timestamp_cpu_time(index: int) -> int —— 获取捕获的时间戳 CPU 时间
- get_captured_timestamp_gpu_time(index: int) -> int —— 获取捕获的时间戳 GPU 时间
- get_captured_timestamp_name(index: int) -> String —— 获取捕获的时间戳名称
- get_captured_timestamps_count() -> int —— 获取捕获的时间戳数量
- get_captured_timestamps_frame() -> int —— 获取捕获的时间戳帧
- get_device_allocation_count() -> int —— 获取设备分配计数
- get_device_allocs_by_object_type(type: int) -> int —— 按对象类型获取设备分配数
- get_device_memory_by_object_type(type: int) -> int —— 按对象类型获取设备内存
- get_device_name() -> String —— 获取设备名称
- get_device_pipeline_cache_uuid() -> String —— 获取设备管线缓存 UUID
- get_device_total_memory() -> int —— 获取设备总内存
- get_device_vendor_name() -> String —— 获取设备供应商名称
- get_driver_allocation_count() -> int —— 获取驱动分配计数
- get_driver_allocs_by_object_type(type: int) -> int —— 按对象类型获取驱动分配数
- get_driver_and_device_memory_report() -> String —— 获取驱动和设备内存报告
- get_driver_memory_by_object_type(type: int) -> int —— 按对象类型获取驱动内存
- get_driver_resource(resource: int, rid: RID, index: int) -> int —— 获取驱动资源
- get_driver_total_memory() -> int —— 获取驱动总内存
- get_frame_delay() -> int —— 获取帧延迟
- get_memory_usage(type: int) -> int —— 获取内存使用量
- get_perf_report() -> String —— 获取性能报告
- get_tracked_object_name(type_index: int) -> String —— 获取跟踪对象名称
- get_tracked_object_type_count() -> int —— 获取跟踪对象类型数量
- has_feature(feature: int) -> bool —— 是否具有某功能
- index_array_create(index_buffer: RID, index_offset: int, index_count: int) -> RID —— 创建索引数组
- index_buffer_create(size_indices: int, format: int, data: PackedByteArray = PackedByteArray(), use_restart_indices: bool = false, creation_bits: int = 0) -> RID —— 创建索引缓冲区
- limit_get(limit: int) -> int —— 获取限制
- raytracing_list_begin() -> int —— 开始光线追踪列表
- raytracing_list_bind_raytracing_pipeline(raytracing_list: int, raytracing_pipeline: RID) —— 光线追踪列表绑定光线追踪管线
- raytracing_list_bind_uniform_set(raytracing_list: int, uniform_set: RID, set_index: int) —— 光线追踪列表绑定 uniform 集
- raytracing_list_end() —— 结束光线追踪列表
- raytracing_list_set_push_constant(raytracing_list: int, buffer: PackedByteArray, size_bytes: int) —— 光线追踪列表设置推送常量
- raytracing_list_trace_rays(raytracing_list: int, width: int, height: int) —— 光线追踪列表追踪光线
- raytracing_pipeline_create(shader: RID, specialization_constants: RDPipelineSpecializationConstant[] = []) -> RID —— 创建光线追踪管线
- raytracing_pipeline_is_valid(raytracing_pipeline: RID) -> bool —— 光线追踪管线是否有效
- render_pipeline_create(shader: RID, framebuffer_format: int, vertex_format: int, primitive: int, rasterization_state: RDPipelineRasterizationState, multisample_state: RDPipelineMultisampleState, stencil_state: RDPipelineDepthStencilState, color_blend_state: RDPipelineColorBlendState, dynamic_state_flags: int = 0, for_render_pass: int = 0, specialization_constants: RDPipelineSpecializationConstant[] = []) -> RID —— 创建渲染管线
- render_pipeline_is_valid(render_pipeline: RID) -> bool —— 渲染管线是否有效
- sampler_create(state: RDSamplerState) -> RID —— 创建采样器
- sampler_is_format_supported_for_filter(format: int, sampler_filter: int) -> bool —— 采样器格式是否支持过滤
- screen_get_framebuffer_format(screen: int = 0) -> int —— 获取屏幕帧缓冲区格式
- screen_get_height(screen: int = 0) -> int —— 获取屏幕高度
- screen_get_width(screen: int = 0) -> int —— 获取屏幕宽度
- set_resource_name(id: RID, name: String) —— 设置资源名称
- shader_compile_binary_from_spirv(spirv_data: RDShaderSPIRV, name: String = "") -> PackedByteArray —— 从 SPIR-V 编译二进制着色器
- shader_compile_spirv_from_source(shader_source: RDShaderSource, allow_cache: bool = true) -> RDShaderSPIRV —— 从源码编译 SPIR-V
- shader_create_from_bytecode(binary_data: PackedByteArray, placeholder_rid: RID = RID()) -> RID —— 从字节码创建着色器
- shader_create_from_spirv(spirv_data: RDShaderSPIRV, name: String = "") -> RID —— 从 SPIR-V 创建着色器
- shader_create_placeholder() -> RID —— 创建占位着色器
- shader_get_vertex_input_attribute_mask(shader: RID) -> int —— 获取着色器顶点输入属性掩码
- storage_buffer_create(size_bytes: int, data: PackedByteArray = PackedByteArray(), usage: int = 0, creation_bits: int = 0) -> RID —— 创建存储缓冲区
- submit() —— 提交
- sync() —— 同步
- texture_buffer_create(size_bytes: int, format: int, data: PackedByteArray = PackedByteArray()) -> RID —— 创建纹理缓冲区
- texture_clear(texture: RID, color: Color, base_mipmap: int, mipmap_count: int, base_layer: int, layer_count: int) -> int —— 清除纹理
- texture_copy(from_texture: RID, to_texture: RID, from_pos: Vector3, to_pos: Vector3, size: Vector3, src_mipmap: int, dst_mipmap: int, src_layer: int, dst_layer: int) -> int —— 复制纹理
- texture_create(format: RDTextureFormat, view: RDTextureView, data: PackedByteArray[] = []) -> RID —— 创建纹理
- texture_create_from_extension(type: int, format: int, samples: int, usage_flags: int, image: int, width: int, height: int, depth: int, layers: int, mipmaps: int = 1) -> RID —— 从扩展创建纹理
- texture_create_shared(view: RDTextureView, with_texture: RID) -> RID —— 创建共享纹理
- texture_create_shared_from_slice(view: RDTextureView, with_texture: RID, layer: int, mipmap: int, mipmaps: int = 1, slice_type: int = 0) -> RID —— 从切片创建共享纹理
- texture_get_data(texture: RID, layer: int) -> PackedByteArray —— 获取纹理数据
- texture_get_data_async(texture: RID, layer: int, callback: Callable) -> int —— 异步获取纹理数据
- texture_get_format(texture: RID) -> RDTextureFormat —— 获取纹理格式
- texture_get_native_handle(texture: RID) -> int —— 获取纹理原生句柄
- texture_is_discardable(texture: RID) -> bool —— 纹理是否可丢弃
- texture_is_format_supported_for_usage(format: int, usage_flags: int) -> bool —— 纹理格式是否支持该用途
- texture_is_shared(texture: RID) -> bool —— 纹理是否共享
- texture_is_valid(texture: RID) -> bool —— 纹理是否有效
- texture_resolve_multisample(from_texture: RID, to_texture: RID) -> int —— 纹理解析多重采样
- texture_set_discardable(texture: RID, discardable: bool) —— 设置纹理可丢弃
- texture_update(texture: RID, layer: int, data: PackedByteArray) -> int —— 更新纹理
- tlas_create(instances_buffer: RID) -> RID —— 创建 TLAS
- tlas_instances_buffer_create(instance_count: int, creation_bits: int = 0) -> RID —— 创建 TLAS 实例缓冲区
- tlas_instances_buffer_fill(instances_buffer: RID, blases: RID[], transforms: Transform3D[]) —— 填充 TLAS 实例缓冲区
- uniform_buffer_create(size_bytes: int, data: PackedByteArray = PackedByteArray(), creation_bits: int = 0) -> RID —— 创建 uniform 缓冲区
- uniform_set_create(uniforms: RDUniform[], shader: RID, shader_set: int) -> RID —— 创建 uniform 集
- uniform_set_is_valid(uniform_set: RID) -> bool —— uniform 集是否有效
- vertex_array_create(vertex_count: int, vertex_format: int, src_buffers: RID[], offsets: PackedInt64Array = PackedInt64Array()) -> RID —— 创建顶点数组
- vertex_buffer_create(size_bytes: int, data: PackedByteArray = PackedByteArray(), creation_bits: int = 0) -> RID —— 创建顶点缓冲区
- vertex_format_create(vertex_descriptions: RDVertexAttribute[]) -> int —— 创建顶点格式

**枚举（Enums）：**
**DeviceType（设备类型）：** DEVICE_TYPE_OTHER=0 —— 其他, DEVICE_TYPE_INTEGRATED_GPU=1 —— 集成 GPU, DEVICE_TYPE_DISCRETE_GPU=2 —— 独立 GPU, DEVICE_TYPE_VIRTUAL_GPU=3 —— 虚拟 GPU, DEVICE_TYPE_CPU=4 —— CPU, DEVICE_TYPE_MAX=5
**DriverResource（驱动资源）：** DRIVER_RESOURCE_LOGICAL_DEVICE=0 —— 逻辑设备, DRIVER_RESOURCE_PHYSICAL_DEVICE=1 —— 物理设备, DRIVER_RESOURCE_TOPMOST_OBJECT=2 —— 顶层对象, DRIVER_RESOURCE_COMMAND_QUEUE=3 —— 命令队列, ...
**DataFormat（数据格式）：** DATA_FORMAT_R4G4_UNORM_PACK8=0, ... 各种数据格式
**BarrierMask（屏障掩码）：** BARRIER_MASK_VERTEX=1 —— 顶点, BARRIER_MASK_FRAGMENT=8 —— 片元, BARRIER_MASK_COMPUTE=2 —— 计算, BARRIER_MASK_TRANSFER=4 —— 传输, BARRIER_MASK_RASTER=9 —— 光栅化, BARRIER_MASK_ALL_BARRIERS=32767 —— 所有屏障, BARRIER_MASK_NO_BARRIER=32768 —— 无屏障
**TextureType（纹理类型）：** TEXTURE_TYPE_1D=0, TEXTURE_TYPE_2D=1, TEXTURE_TYPE_3D=2, TEXTURE_TYPE_CUBE=3 —— 立方体, TEXTURE_TYPE_1D_ARRAY=4, TEXTURE_TYPE_2D_ARRAY=5, TEXTURE_TYPE_CUBE_ARRAY=6, TEXTURE_TYPE_MAX=7
**TextureSamples（纹理采样数）：** TEXTURE_SAMPLES_1=0, TEXTURE_SAMPLES_2=1, TEXTURE_SAMPLES_4=2, TEXTURE_SAMPLES_8=3, TEXTURE_SAMPLES_16=4, TEXTURE_SAMPLES_32=5, TEXTURE_SAMPLES_64=6, TEXTURE_SAMPLES_MAX=7
**TextureUsageBits（纹理用途位）：** TEXTURE_USAGE_SAMPLING_BIT=1 —— 采样, TEXTURE_USAGE_COLOR_ATTACHMENT_BIT=2 —— 颜色附件, TEXTURE_USAGE_DEPTH_STENCIL_ATTACHMENT_BIT=4 —— 深度模板附件, ...
**TextureSwizzle（纹理重映射）：** TEXTURE_SWIZZLE_IDENTITY=0 —— 单位, TEXTURE_SWIZZLE_ZERO=1 —— 零, TEXTURE_SWIZZLE_ONE=2 —— 一, TEXTURE_SWIZZLE_R=3, TEXTURE_SWIZZLE_G=4, TEXTURE_SWIZZLE_B=5, TEXTURE_SWIZZLE_A=6, TEXTURE_SWIZZLE_MAX=7
**TextureSliceType（纹理切片类型）：** TEXTURE_SLICE_2D=0, TEXTURE_SLICE_CUBEMAP=1, TEXTURE_SLICE_3D=2
**SamplerFilter（采样器过滤）：** SAMPLER_FILTER_NEAREST=0 —— 最近邻, SAMPLER_FILTER_LINEAR=1 —— 线性
**SamplerRepeatMode（采样器重复模式）：** SAMPLER_REPEAT_MODE_REPEAT=0 —— 重复, SAMPLER_REPEAT_MODE_MIRRORED_REPEAT=1 —— 镜像重复, SAMPLER_REPEAT_MODE_CLAMP_TO_EDGE=2 —— 边缘钳制, SAMPLER_REPEAT_MODE_CLAMP_TO_BORDER=3 —— 边界钳制, SAMPLER_REPEAT_MODE_MIRROR_CLAMP_TO_EDGE=4 —— 镜像边缘钳制, SAMPLER_REPEAT_MODE_MAX=5
**SamplerBorderColor（采样器边界颜色）：** SAMPLER_BORDER_COLOR_FLOAT_TRANSPARENT_BLACK=0 —— 浮点透明黑, SAMPLER_BORDER_COLOR_INT_TRANSPARENT_BLACK=1 —— 整数透明黑, ...
**VertexFrequency（顶点频率）：** VERTEX_FREQUENCY_VERTEX=0 —— 顶点, VERTEX_FREQUENCY_INSTANCE=1 —— 实例
**IndexBufferFormat（索引缓冲区格式）：** INDEX_BUFFER_FORMAT_UINT16=0, INDEX_BUFFER_FORMAT_UINT32=1
**UniformType（Uniform 类型）：** UNIFORM_TYPE_SAMPLER=0 —— 采样器, UNIFORM_TYPE_SAMPLER_WITH_TEXTURE=1 —— 带纹理采样器, UNIFORM_TYPE_TEXTURE=2 —— 纹理, UNIFORM_TYPE_IMAGE=3 —— 图像, ...
**RenderPrimitive（渲染图元）：** RENDER_PRIMITIVE_POINTS=0 —— 点, RENDER_PRIMITIVE_LINES=1 —— 线, RENDER_PRIMITIVE_TRIANGLES=5 —— 三角形, ...
**PolygonCullMode（多边形剔除模式）：** POLYGON_CULL_DISABLED=0 —— 禁用, POLYGON_CULL_FRONT=1 —— 正面, POLYGON_CULL_BACK=2 —— 背面
**PolygonFrontFace（多边形正面）：** POLYGON_FRONT_FACE_CLOCKWISE=0 —— 顺时针, POLYGON_FRONT_FACE_COUNTER_CLOCKWISE=1 —— 逆时针
**StencilOperation（模板操作）：** STENCIL_OP_KEEP=0 —— 保持, STENCIL_OP_ZERO=1 —— 归零, STENCIL_OP_REPLACE=2 —— 替换, STENCIL_OP_INCREMENT_AND_CLAMP=3 —— 递增并钳制, ...
**CompareOperator（比较运算符）：** COMPARE_OP_NEVER=0 —— 永不, COMPARE_OP_LESS=1 —— 小于, COMPARE_OP_EQUAL=2 —— 等于, COMPARE_OP_LESS_OR_EQUAL=3 —— 小于等于, ...
**BlendFactor（混合因子）：** BLEND_FACTOR_ZERO=0, BLEND_FACTOR_ONE=1, BLEND_FACTOR_SRC_COLOR=2 —— 源颜色, ...
**BlendOperation（混合操作）：** BLEND_OP_ADD=0 —— 相加, BLEND_OP_SUBTRACT=1 —— 相减, BLEND_OP_REVERSE_SUBTRACT=2 —— 反向相减, BLEND_OP_MINIMUM=3 —— 最小值, BLEND_OP_MAXIMUM=4 —— 最大值, BLEND_OP_MAX=5
**InitialAction（初始操作）：** INITIAL_ACTION_LOAD=0 —— 加载, INITIAL_ACTION_CLEAR=1 —— 清除, INITIAL_ACTION_DISCARD=2 —— 丢弃, ...
**FinalAction（最终操作）：** FINAL_ACTION_STORE=0 —— 存储, FINAL_ACTION_DISCARD=1 —— 丢弃, ...
**ShaderStage（着色器阶段）：** SHADER_STAGE_VERTEX=0 —— 顶点, SHADER_STAGE_FRAGMENT=1 —— 片元, SHADER_STAGE_TESSELATION_CONTROL=2 —— 曲面细分控制, ...
**ShaderLanguage（着色器语言）：** SHADER_LANGUAGE_GLSL=0, SHADER_LANGUAGE_HLSL=1
**Features（功能特性）：** 各种功能支持常量
**Limit（限制）：** 各种限制常量
**MemoryType（内存类型）：** MEMORY_TEXTURES=0 —— 纹理, MEMORY_BUFFERS=1 —— 缓冲区, MEMORY_TOTAL=2 —— 总计
**Constants（常量）：** INVALID_ID=-1, INVALID_FORMAT_ID=-1
**BreadcrumbMarker（面包屑标记）：** 各种渲染阶段标记
**DrawFlags（绘制标志）：** DRAW_DEFAULT_ALL=0, DRAW_CLEAR_COLOR_*=1~255 颜色清除位
