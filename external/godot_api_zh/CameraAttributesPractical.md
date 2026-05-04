## CameraAttributesPractical（实用摄像机属性）<- CameraAttributes（摄像机属性）

控制摄像机特定属性，如自动曝光、景深和曝光覆盖。当用于 WorldEnvironment 时，为曝光、自动曝光和景深提供默认设置，这些设置将由所有没有自己 CameraAttributes 的摄像机使用，包括编辑器摄像机。当用于 Camera3D 时，将覆盖 WorldEnvironment 中设置的任何 CameraAttributes。当用于 VoxelGI 或 LightmapGI 时，仅使用曝光设置。

**属性（Props）：**
- auto_exposure_max_sensitivity: float = 800.0 —— 自动曝光最大感光度
- auto_exposure_min_sensitivity: float = 0.0 —— 自动曝光最小感光度
- dof_blur_amount: float = 0.1 —— 景深模糊量
- dof_blur_far_distance: float = 10.0 —— 景深模糊远距离
- dof_blur_far_enabled: bool = false —— 启用远距离景深模糊
- dof_blur_far_transition: float = 5.0 —— 远距离景深模糊过渡
- dof_blur_near_distance: float = 2.0 —— 景深模糊近距离
- dof_blur_near_enabled: bool = false —— 启用近距离景深模糊
- dof_blur_near_transition: float = 1.0 —— 近距离景深模糊过渡
