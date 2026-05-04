## CameraAttributes（摄像机属性）<- Resource（资源）

控制摄像机特定属性，如景深和曝光覆盖。当用于 WorldEnvironment 时，为曝光、自动曝光和景深提供默认设置，这些设置将由所有没有自己 CameraAttributes 的摄像机使用，包括编辑器摄像机。当用于 Camera3D 时，将覆盖 WorldEnvironment 中设置的任何 CameraAttributes。当用于 VoxelGI 或 LightmapGI 时，仅使用曝光设置。另请参见 Environment 了解通用 3D 环境设置。这是一个纯虚类，由 CameraAttributesPhysical 和 CameraAttributesPractical 继承。

**属性（Props）：**
- auto_exposure_enabled: bool = false —— 启用自动曝光
- auto_exposure_scale: float = 0.4 —— 自动曝光缩放
- auto_exposure_speed: float = 0.5 —— 自动曝光速度
- exposure_multiplier: float = 1.0 —— 曝光倍率
- exposure_sensitivity: float = 100.0 —— 曝光感光度
