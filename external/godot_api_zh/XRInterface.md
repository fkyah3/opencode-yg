## XRInterface <- RefCounted（引用计数）

此类需要被实现以使 AR 或 VR 平台对 Godot 可用，这些应作为 C++ 模块或 GDExtension 模块实现。接口的一部分暴露给 GDScript，以便可以检测、启用和配置 AR 或 VR 平台。接口的编写方式应确保仅启用它们即可提供可用的设置。可以通过 XRServer 查询可用的接口。

**属性（Props）：**
- ar_is_anchor_detection_enabled: bool = false —— AR锚点检测是否启用
- environment_blend_mode: int (XRInterface.EnvironmentBlendMode) = 0 —— 环境混合模式
- interface_is_primary: bool = false —— 是否为主接口
- xr_play_area_mode: int (XRInterface.PlayAreaMode) = 0 —— XR游玩区域模式

**方法（Methods）：**
- get_camera_feed_id() -> int —— 获取相机馈送ID
- get_capabilities() -> int —— 获取能力
- get_name() -> StringName —— 获取名称
- get_play_area() -> PackedVector3Array —— 获取游玩区域
- get_projection_for_view(view: int, aspect: float, near: float, far: float) -> Projection —— 获取视图投影
- get_render_target_size() -> Vector2 —— 获取渲染目标大小
- get_supported_environment_blend_modes() -> Array —— 获取支持的环境混合模式
- get_system_info() -> Dictionary —— 获取系统信息
- get_tracking_status() -> int —— 获取追踪状态
- get_transform_for_view(view: int, cam_transform: Transform3D) -> Transform3D —— 获取视图变换
- get_view_count() -> int —— 获取视图数量
- initialize() -> bool —— 初始化
- is_initialized() -> bool —— 是否已初始化
- is_passthrough_enabled() -> bool —— 是否启用透视
- is_passthrough_supported() -> bool —— 是否支持透视
- set_environment_blend_mode(mode: int) -> bool —— 设置环境混合模式
- set_play_area_mode(mode: int) -> bool —— 设置游玩区域模式
- start_passthrough() -> bool —— 开始透视
- stop_passthrough() —— 停止透视
- supports_play_area_mode(mode: int) -> bool —— 是否支持游玩区域模式
- trigger_haptic_pulse(action_name: String, tracker_name: StringName, frequency: float, amplitude: float, duration_sec: float, delay_sec: float) —— 触发触觉脉冲
- uninitialize() —— 反初始化

**信号（Signals）：**
- play_area_changed(mode: int) —— 游玩区域已变更

**枚举（Enums）：**
**Capabilities（能力）：** XR_NONE=0（无）, XR_MONO=1（单目）, XR_STEREO=2（立体）, XR_QUAD=4（四目）, XR_VR=8（VR）, XR_AR=16（AR）, XR_EXTERNAL=32（外部）
**TrackingStatus（追踪状态）：** XR_NORMAL_TRACKING=0（正常追踪）, XR_EXCESSIVE_MOTION=1（过度运动）, XR_INSUFFICIENT_FEATURES=2（特征不足）, XR_UNKNOWN_TRACKING=3（未知追踪）, XR_NOT_TRACKING=4（未追踪）
**PlayAreaMode（游玩区域模式）：** XR_PLAY_AREA_UNKNOWN=0（未知）, XR_PLAY_AREA_3DOF=1（3自由度）, XR_PLAY_AREA_SITTING=2（坐姿）, XR_PLAY_AREA_ROOMSCALE=3（房间规模）, XR_PLAY_AREA_STAGE=4（舞台）, XR_PLAY_AREA_CUSTOM=2147483647（自定义）
**EnvironmentBlendMode（环境混合模式）：** XR_ENV_BLEND_MODE_OPAQUE=0（不透明）, XR_ENV_BLEND_MODE_ADDITIVE=1（叠加）, XR_ENV_BLEND_MODE_ALPHA_BLEND=2（Alpha混合）
**VRSTextureFormat（VRS纹理格式）：** XR_VRS_TEXTURE_FORMAT_UNIFIED=0（统一）, XR_VRS_TEXTURE_FORMAT_FRAGMENT_SHADING_RATE=1（片段着色率）, XR_VRS_TEXTURE_FORMAT_FRAGMENT_DENSITY_MAP=2（片段密度图）
