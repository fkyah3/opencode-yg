## GPUParticlesCollisionHeightField3D（GPU粒子碰撞高度场3D） <- GPUParticlesCollision3D（GPU粒子碰撞3D）

一种影响 GPUParticles3D 节点的实时高度图形状 3D 粒子碰撞形状。高度图形状可以高效地表示凸面和凹面物体的碰撞，且具有一个"底面"（如地形）。这不如 GPUParticlesCollisionSDF3D 灵活，但不需要烘焙步骤。GPUParticlesCollisionHeightField3D 也可以在移动、摄像机移动甚至连续运行的情况下实时重新生成。这使得 GPUParticlesCollisionHeightField3D 成为雨雪等天气效果以及高度动态几何体游戏的理想选择。但是，此类的局限性在于高度图无法表示悬垂物（例如室内或洞穴）。**注意：** 必须在 GPUParticles3D 的处理材质上将 `ParticleProcessMaterial.collision_mode` 设置为 `true`，碰撞才能工作。**注意：** 粒子碰撞仅影响 GPUParticles3D，不影响 CPUParticles3D。

**属性（Props）：**
- follow_camera_enabled: bool = false —— 是否跟随摄像机
- heightfield_mask: int = 1048575 —— 高度场遮罩
- resolution: int (GPUParticlesCollisionHeightField3D.Resolution) = 2 —— 分辨率
- size: Vector3 = Vector3(2, 2, 2) —— 大小
- update_mode: int (GPUParticlesCollisionHeightField3D.UpdateMode) = 0 —— 更新模式

**方法（Methods）：**
- get_heightfield_mask_value(layer_number: int) -> bool —— 获取高度场遮罩值
- set_heightfield_mask_value(layer_number: int, value: bool) —— 设置高度场遮罩值

**枚举（Enums）：**
**Resolution（分辨率）：** RESOLUTION_256=0, RESOLUTION_512=1, RESOLUTION_1024=2, RESOLUTION_2048=3, RESOLUTION_4096=4, RESOLUTION_8192=5, RESOLUTION_MAX=6
**UpdateMode（更新模式）：** UPDATE_MODE_WHEN_MOVED=0（移动时更新）, UPDATE_MODE_ALWAYS=1（始终更新）
