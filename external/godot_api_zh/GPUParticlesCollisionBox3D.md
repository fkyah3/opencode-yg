## GPUParticlesCollisionBox3D（GPU粒子碰撞盒体3D）<- GPUParticlesCollision3D（GPU粒子碰撞3D）

影响 GPUParticles3D 节点的盒体形状 3D 粒子碰撞体。粒子碰撞体实时工作，可在游戏过程中移动、旋转和缩放。与吸引器不同，碰撞体的非均匀缩放*不*受支持。**注意：** 要使碰撞生效，GPUParticles3D 的处理材质上的 `ParticleProcessMaterial.collision_mode` 必须设置为 `ParticleProcessMaterial.COLLISION_RIGID` 或 `ParticleProcessMaterial.COLLISION_HIDE_ON_CONTACT`。**注意：** 粒子碰撞仅影响 GPUParticles3D，不影响 CPUParticles3D。

**属性（Props）：**
- size: Vector3 = Vector3(2, 2, 2) —— 大小
