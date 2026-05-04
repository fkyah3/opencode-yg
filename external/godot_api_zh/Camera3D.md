## Camera3D（3D摄像机）<- Node3D

Camera3D 是一个特殊节点，显示从其当前位置可见的内容。摄像机在最近的 Viewport 节点中注册（当向上遍历场景树时）。每个视口只能有一个活动摄像机。如果在向上遍历场景树时没有可用的视口，摄像机将在全局视口中注册。换句话说，摄像机仅向 Viewport 提供 3D 显示能力，如果没有摄像机，注册在该 Viewport（或上级视口）中的场景将无法显示。

**属性（Props）：**
- attributes: CameraAttributes —— 摄像机属性
- compositor: Compositor —— 合成器
- cull_mask: int = 1048575 —— 剔除掩码
- current: bool = false —— 是否为当前
- doppler_tracking: int (Camera3D.DopplerTracking) = 0 —— 多普勒追踪
- environment: Environment —— 环境
- far: float = 4000.0 —— 远裁剪面
- fov: float = 75.0 —— 视野
- frustum_offset: Vector2 = Vector2(0, 0) —— 视锥体偏移
- h_offset: float = 0.0 —— 水平偏移
- keep_aspect: int (Camera3D.KeepAspect) = 1 —— 保持宽高比
- near: float = 0.05 —— 近裁剪面
- projection: int (Camera3D.ProjectionType) = 0 —— 投影类型
- size: float = 1.0 —— 尺寸
- v_offset: float = 0.0 —— 垂直偏移

**方法（Methods）：**
- clear_current(enable_next: bool = true) —— 清除当前状态
- get_camera_projection() -> Projection —— 获取摄像机投影
- get_camera_rid() -> RID —— 获取摄像机 RID
- get_camera_transform() -> Transform3D —— 获取摄像机变换
- get_cull_mask_value(layer_number: int) -> bool —— 获取剔除掩码值
- get_frustum() -> Plane[] —— 获取视锥体平面
- get_pyramid_shape_rid() -> RID —— 获取金字塔形状 RID
- is_position_behind(world_point: Vector3) -> bool —— 判断位置是否在后方
- is_position_in_frustum(world_point: Vector3) -> bool —— 判断位置是否在视锥体内
- make_current() —— 设为当前
- project_local_ray_normal(screen_point: Vector2) -> Vector3 —— 投影局部射线法线
- project_position(screen_point: Vector2, z_depth: float) -> Vector3 —— 投影位置
- project_ray_normal(screen_point: Vector2) -> Vector3 —— 投影射线法线
- project_ray_origin(screen_point: Vector2) -> Vector3 —— 投影射线起点
- set_cull_mask_value(layer_number: int, value: bool) —— 设置剔除掩码值
- set_frustum(size: float, offset: Vector2, z_near: float, z_far: float) —— 设置视锥体
- set_orthogonal(size: float, z_near: float, z_far: float) —— 设置正交投影
- set_perspective(fov: float, z_near: float, z_far: float) —— 设置透视投影
- unproject_position(world_point: Vector3) -> Vector2 —— 反投影位置

**枚举（Enums）：**
**ProjectionType（投影类型）：** PROJECTION_PERSPECTIVE=0 —— 透视投影，PROJECTION_ORTHOGONAL=1 —— 正交投影，PROJECTION_FRUSTUM=2 —— 视锥体投影
**KeepAspect（保持宽高比）：** KEEP_WIDTH=0 —— 保持宽度，KEEP_HEIGHT=1 —— 保持高度
**DopplerTracking（多普勒追踪）：** DOPPLER_TRACKING_DISABLED=0 —— 禁用多普勒，DOPPLER_TRACKING_IDLE_STEP=1 —— 空闲步进追踪，DOPPLER_TRACKING_PHYSICS_STEP=2 —— 物理步进追踪
