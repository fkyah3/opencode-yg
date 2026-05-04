## AudioListener3D（音频监听器3D）<- Node3D（节点3D）

一旦添加到场景树并通过 `make_current` 启用，此节点将覆盖声音的监听位置。可用于从不同于 Camera3D 的位置进行监听。

**属性（Props）：**
- doppler_tracking: int (AudioListener3D.DopplerTracking) = 0

**方法（Methods）：**
- clear_current()
- get_listener_transform() -> Transform3D
- is_current() -> bool
- make_current()

**枚举（Enums）：**
**DopplerTracking：** DOPPLER_TRACKING_DISABLED=0 —— 禁用多普勒追踪, DOPPLER_TRACKING_IDLE_STEP=1 —— 空闲步进多普勒追踪, DOPPLER_TRACKING_PHYSICS_STEP=2 —— 物理步进多普勒追踪
