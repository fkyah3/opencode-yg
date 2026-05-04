## GPUParticlesCollision3D（GPU粒子碰撞3D） <- VisualInstance3D（可视化实例3D）

粒子碰撞形状可用于使粒子停止或弹回。粒子碰撞形状实时工作，可以在游戏过程中移动、旋转和缩放。与吸引子不同，碰撞形状的**不**均匀缩放不受支持。粒子碰撞形状可以通过隐藏临时禁用。**注意：** 必须在 GPUParticles3D 的处理材质上将 `ParticleProcessMaterial.collision_mode` 设置为 `ParticleProcessMaterial.COLLISION_RIGID` 或 `ParticleProcessMaterial.COLLISION_HIDE_ON_CONTACT`，碰撞才能工作。**注意：** 粒子碰撞仅影响 GPUParticles3D，不影响 CPUParticles3D。**注意：** 被移动的碰撞体推动的粒子不会被插值，可能导致可见的抖动。将 `GPUParticles3D.fixed_fps` 设置为 `0` 或匹配/超过目标帧率的值可以缓解此问题。

**属性（Props）：**
- cull_mask: int = 4294967295 —— 剔除遮罩
