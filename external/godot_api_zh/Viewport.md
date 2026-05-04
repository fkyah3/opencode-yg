## Viewport <- Node（节点）

Viewport 创建进入屏幕的不同视图，或另一个视口内的子视图。子级 2D 节点将显示在上面，子级 Camera3D 3D 节点也会在上面渲染。可选地，视口可以拥有自己的 2D 或 3D 世界，使其不与其他视口共享绘制内容。视口也可以选择成为音频监听器，从而根据其子级的 2D 或 3D 相机生成位置音频。此外，视口可以分配到不同的屏幕（如果设备有多个屏幕）。最后，视口还可以作为渲染目标，这种情况下它们将不可见，除非使用关联的纹理来绘制。

**属性（Props）：**
- anisotropic_filtering_level: int (Viewport.AnisotropicFiltering) = 2 —— 各向异性过滤级别
- audio_listener_enable_2d: bool = false —— 启用2D音频监听器
- audio_listener_enable_3d: bool = false —— 启用3D音频监听器
- canvas_cull_mask: int = 4294967295 —— 画布剔除遮罩
- canvas_item_default_texture_filter: int (Viewport.DefaultCanvasItemTextureFilter) = 1 —— 画布项目默认纹理过滤
- canvas_item_default_texture_repeat: int (Viewport.DefaultCanvasItemTextureRepeat) = 0 —— 画布项目默认纹理重复
- canvas_transform: Transform2D —— 画布变换
- debug_draw: int (Viewport.DebugDraw) = 0 —— 调试绘制
- disable_3d: bool = false —— 禁用3D
- fsr_sharpness: float = 0.2 —— FSR锐度
- global_canvas_transform: Transform2D —— 全局画布变换
- gui_disable_input: bool = false —— 禁用GUI输入
- gui_drag_threshold: int = 10 —— 拖拽阈值
- gui_embed_subwindows: bool = false —— 嵌入子窗口
- gui_snap_controls_to_pixels: bool = true —— 将控件对齐到像素
- handle_input_locally: bool = true —— 本地处理输入
- mesh_lod_threshold: float = 1.0 —— 网格LOD阈值
- msaa_2d: int (Viewport.MSAA) = 0 —— 2D MSAA
- msaa_3d: int (Viewport.MSAA) = 0 —— 3D MSAA
- oversampling: bool = true —— 过采样
- oversampling_override: float = 0.0 —— 过采样覆盖
- own_world_3d: bool = false —— 拥有自己的3D世界
- physics_interpolation_mode: int (Node.PhysicsInterpolationMode) = 1 —— 物理插值模式
- physics_object_picking: bool = false —— 物理对象拾取
- physics_object_picking_first_only: bool = false —— 仅拾取第一个物理对象
- physics_object_picking_sort: bool = false —— 物理对象拾取排序
- positional_shadow_atlas_16_bits: bool = true —— 位置阴影图集16位
- positional_shadow_atlas_quad_0: int (Viewport.PositionalShadowAtlasQuadrantSubdiv) = 2 —— 阴影图集象限0细分
- positional_shadow_atlas_quad_1: int (Viewport.PositionalShadowAtlasQuadrantSubdiv) = 2 —— 阴影图集象限1细分
- positional_shadow_atlas_quad_2: int (Viewport.PositionalShadowAtlasQuadrantSubdiv) = 3 —— 阴影图集象限2细分
- positional_shadow_atlas_quad_3: int (Viewport.PositionalShadowAtlasQuadrantSubdiv) = 4 —— 阴影图集象限3细分
- positional_shadow_atlas_size: int = 2048 —— 位置阴影图集大小
- scaling_3d_mode: int (Viewport.Scaling3DMode) = 0 —— 3D缩放模式
- scaling_3d_scale: float = 1.0 —— 3D缩放比例
- screen_space_aa: int (Viewport.ScreenSpaceAA) = 0 —— 屏幕空间抗锯齿
- sdf_oversize: int (Viewport.SDFOversize) = 1 —— SDF过大比例
- sdf_scale: int (Viewport.SDFScale) = 1 —— SDF缩放
- snap_2d_transforms_to_pixel: bool = false —— 2D变换对齐到像素
- snap_2d_vertices_to_pixel: bool = false —— 2D顶点对齐到像素
- texture_mipmap_bias: float = 0.0 —— 纹理mipmap偏移
- transparent_bg: bool = false —— 透明背景
- use_debanding: bool = false —— 使用去条带
- use_hdr_2d: bool = false —— 使用HDR 2D
- use_occlusion_culling: bool = false —— 使用遮挡剔除
- use_taa: bool = false —— 使用TAA
- use_xr: bool = false —— 使用XR
- vrs_mode: int (Viewport.VRSMode) = 0 —— VRS模式
- vrs_texture: Texture2D —— VRS纹理
- vrs_update_mode: int (Viewport.VRSUpdateMode) = 1 —— VRS更新模式
- world_2d: World2D —— 2D世界
- world_3d: World3D —— 3D世界

**方法（Methods）：**
- find_world_2d() -> World2D —— 查找2D世界
- find_world_3d() -> World3D —— 查找3D世界
- get_audio_listener_2d() -> AudioListener2D —— 获取2D音频监听器
- get_audio_listener_3d() -> AudioListener3D —— 获取3D音频监听器
- get_camera_2d() -> Camera2D —— 获取2D相机
- get_camera_3d() -> Camera3D —— 获取3D相机
- get_canvas_cull_mask_bit(layer: int) -> bool —— 获取画布剔除遮罩位
- get_embedded_subwindows() -> Window[] —— 获取嵌入的子窗口
- get_final_transform() -> Transform2D —— 获取最终变换
- get_mouse_position() -> Vector2 —— 获取鼠标位置
- get_oversampling() -> float —— 获取过采样值
- get_positional_shadow_atlas_quadrant_subdiv(quadrant: int) -> int —— 获取阴影图集象限细分
- get_render_info(type: int, info: int) -> int —— 获取渲染信息
- get_screen_transform() -> Transform2D —— 获取屏幕变换
- get_stretch_transform() -> Transform2D —— 获取拉伸变换
- get_texture() -> ViewportTexture —— 获取纹理
- get_viewport_rid() -> RID —— 获取视口RID
- get_visible_rect() -> Rect2 —— 获取可见矩形
- gui_cancel_drag() —— 取消拖拽
- gui_get_drag_data() -> Variant —— 获取拖拽数据
- gui_get_drag_description() -> String —— 获取拖拽描述
- gui_get_focus_owner() -> Control —— 获取焦点所有者
- gui_get_hovered_control() -> Control —— 获取悬停的控件
- gui_is_drag_successful() -> bool —— 拖拽是否成功
- gui_is_dragging() -> bool —— 是否正在拖拽
- gui_release_focus() —— 释放焦点
- gui_set_drag_description(description: String) —— 设置拖拽描述
- is_input_handled() -> bool —— 输入是否已处理
- notify_mouse_entered() —— 通知鼠标进入
- notify_mouse_exited() —— 通知鼠标退出
- push_input(event: InputEvent, in_local_coords: bool = false) —— 推送输入
- push_text_input(text: String) —— 推送文本输入
- push_unhandled_input(event: InputEvent, in_local_coords: bool = false) —— 推送未处理输入
- set_canvas_cull_mask_bit(layer: int, enable: bool) —— 设置画布剔除遮罩位
- set_input_as_handled() —— 将输入标记为已处理
- set_positional_shadow_atlas_quadrant_subdiv(quadrant: int, subdiv: int) —— 设置阴影图集象限细分
- update_mouse_cursor_state() —— 更新鼠标光标状态
- warp_mouse(position: Vector2) —— 扭曲鼠标位置

**信号（Signals）：**
- gui_focus_changed(node: Control) —— GUI焦点改变
- size_changed —— 大小改变

**枚举（Enums）：**
**PositionalShadowAtlasQuadrantSubdiv（位置阴影图集象限细分）：** SHADOW_ATLAS_QUADRANT_SUBDIV_DISABLED=0（禁用）, SHADOW_ATLAS_QUADRANT_SUBDIV_1=1（1块）, SHADOW_ATLAS_QUADRANT_SUBDIV_4=2（4块）, SHADOW_ATLAS_QUADRANT_SUBDIV_16=3（16块）, SHADOW_ATLAS_QUADRANT_SUBDIV_64=4（64块）, SHADOW_ATLAS_QUADRANT_SUBDIV_256=5（256块）, SHADOW_ATLAS_QUADRANT_SUBDIV_1024=6（1024块）, SHADOW_ATLAS_QUADRANT_SUBDIV_MAX=7（最大值）
**Scaling3DMode（3D缩放模式）：** SCALING_3D_MODE_BILINEAR=0（双线性）, SCALING_3D_MODE_FSR=1（FSR）, SCALING_3D_MODE_FSR2=2（FSR2）, SCALING_3D_MODE_METALFX_SPATIAL=3（MetalFX空间）, SCALING_3D_MODE_METALFX_TEMPORAL=4（MetalFX时间）, SCALING_3D_MODE_MAX=5（最大值）
**MSAA（多重采样抗锯齿）：** MSAA_DISABLED=0（禁用）, MSAA_2X=1（2倍）, MSAA_4X=2（4倍）, MSAA_8X=3（8倍）, MSAA_MAX=4（最大值）
**AnisotropicFiltering（各向异性过滤）：** ANISOTROPY_DISABLED=0（禁用）, ANISOTROPY_2X=1（2倍）, ANISOTROPY_4X=2（4倍）, ANISOTROPY_8X=3（8倍）, ANISOTROPY_16X=4（16倍）, ANISOTROPY_MAX=5（最大值）
**ScreenSpaceAA（屏幕空间抗锯齿）：** SCREEN_SPACE_AA_DISABLED=0（禁用）, SCREEN_SPACE_AA_FXAA=1（FXAA）, SCREEN_SPACE_AA_SMAA=2（SMAA）, SCREEN_SPACE_AA_MAX=3（最大值）
**RenderInfo（渲染信息）：** RENDER_INFO_OBJECTS_IN_FRAME=0（帧内对象数）, RENDER_INFO_PRIMITIVES_IN_FRAME=1（帧内图元数）, RENDER_INFO_DRAW_CALLS_IN_FRAME=2（帧内绘制调用数）, RENDER_INFO_MAX=3（最大值）
**RenderInfoType（渲染信息类型）：** RENDER_INFO_TYPE_VISIBLE=0（可见）, RENDER_INFO_TYPE_SHADOW=1（阴影）, RENDER_INFO_TYPE_CANVAS=2（画布）, RENDER_INFO_TYPE_MAX=3（最大值）
**DebugDraw（调试绘制）：** DEBUG_DRAW_DISABLED=0（禁用）, DEBUG_DRAW_UNSHADED=1（无阴影）, DEBUG_DRAW_LIGHTING=2（光照）, DEBUG_DRAW_OVERDRAW=3（过度绘制）, DEBUG_DRAW_WIREFRAME=4（线框）, DEBUG_DRAW_NORMAL_BUFFER=5（法线缓冲）, DEBUG_DRAW_VOXEL_GI_ALBEDO=6（体素GI反照率）, DEBUG_DRAW_VOXEL_GI_LIGHTING=7（体素GI光照）, DEBUG_DRAW_VOXEL_GI_EMISSION=8（体素GI自发光）, DEBUG_DRAW_SHADOW_ATLAS=9（阴影图集）, ...
**DefaultCanvasItemTextureFilter（默认画布项目纹理过滤）：** DEFAULT_CANVAS_ITEM_TEXTURE_FILTER_NEAREST=0（最近邻）, DEFAULT_CANVAS_ITEM_TEXTURE_FILTER_LINEAR=1（线性）, DEFAULT_CANVAS_ITEM_TEXTURE_FILTER_LINEAR_WITH_MIPMAPS=2（线性+mipmap）, DEFAULT_CANVAS_ITEM_TEXTURE_FILTER_NEAREST_WITH_MIPMAPS=3（最近邻+mipmap）, DEFAULT_CANVAS_ITEM_TEXTURE_FILTER_MAX=4（最大值）
**DefaultCanvasItemTextureRepeat（默认画布项目纹理重复）：** DEFAULT_CANVAS_ITEM_TEXTURE_REPEAT_DISABLED=0（禁用）, DEFAULT_CANVAS_ITEM_TEXTURE_REPEAT_ENABLED=1（启用）, DEFAULT_CANVAS_ITEM_TEXTURE_REPEAT_MIRROR=2（镜像）, DEFAULT_CANVAS_ITEM_TEXTURE_REPEAT_MAX=3（最大值）
**SDFOversize（SDF过大比例）：** SDF_OVERSIZE_100_PERCENT=0（100%）, SDF_OVERSIZE_120_PERCENT=1（120%）, SDF_OVERSIZE_150_PERCENT=2（150%）, SDF_OVERSIZE_200_PERCENT=3（200%）, SDF_OVERSIZE_MAX=4（最大值）
**SDFScale（SDF缩放）：** SDF_SCALE_100_PERCENT=0（100%）, SDF_SCALE_50_PERCENT=1（50%）, SDF_SCALE_25_PERCENT=2（25%）, SDF_SCALE_MAX=3（最大值）
**VRSMode（VRS模式）：** VRS_DISABLED=0（禁用）, VRS_TEXTURE=1（纹理）, VRS_XR=2（XR）, VRS_MAX=3（最大值）
**VRSUpdateMode（VRS更新模式）：** VRS_UPDATE_DISABLED=0（禁用更新）, VRS_UPDATE_ONCE=1（更新一次）, VRS_UPDATE_ALWAYS=2（始终更新）, VRS_UPDATE_MAX=3（最大值）
