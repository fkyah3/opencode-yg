## CameraAttributesPhysical（物理摄像机属性）<- CameraAttributes（摄像机属性）

CameraAttributesPhysical 用于基于物理摄像机的设置来设置渲染参数。负责曝光、自动曝光和景深。当用于 WorldEnvironment 时，为曝光、自动曝光和景深提供默认设置，这些设置将由所有没有自己 CameraAttributes 的摄像机使用，包括编辑器摄像机。当用于 Camera3D 时，将覆盖 WorldEnvironment 中设置的任何 CameraAttributes，并将覆盖 Camera3D 的 `Camera3D.far`、`Camera3D.near`、`Camera3D.fov` 和 `Camera3D.keep_aspect` 属性。当用于 VoxelGI 或 LightmapGI 时，仅使用曝光设置。默认设置旨在用于室外环境，室内环境的设置建议可在每个设置的文档中找到。**注意：** 景深模糊仅在 Forward+ 和 Mobile 渲染方法中支持，Compatibility 不支持。

**属性（Props）：**
- auto_exposure_max_exposure_value: float = 10.0 —— 自动曝光最大值
- auto_exposure_min_exposure_value: float = -8.0 —— 自动曝光最小值
- exposure_aperture: float = 16.0 —— 曝光光圈
- exposure_shutter_speed: float = 100.0 —— 曝光快门速度
- frustum_far: float = 4000.0 —— 视锥体远平面
- frustum_focal_length: float = 35.0 —— 视锥体焦距
- frustum_focus_distance: float = 10.0 —— 视锥体对焦距离
- frustum_near: float = 0.05 —— 视锥体近平面

**方法（Methods）：**
- get_fov() -> float —— 获取视野
