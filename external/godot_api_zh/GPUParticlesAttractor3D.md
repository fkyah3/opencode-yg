## GPUParticlesAttractor3D（GPU粒子吸引器3D）<- VisualInstance3D（可视化实例3D）

粒子吸引器可用于将粒子吸引至吸引器原点，或将其推离吸引器原点。粒子吸引器实时工作，可在游戏过程中移动、旋转和缩放。与碰撞体不同，吸引器也支持非均匀缩放。吸引器可通过隐藏或将 `strength` 设置为 `0.0` 来临时禁用。**注意：** 粒子吸引器仅影响 GPUParticles3D，不影响 CPUParticles3D。

**属性（Props）：**
- attenuation: float = 1.0 —— 衰减
- cull_mask: int = 4294967295 —— 剔除掩码
- directionality: float = 0.0 —— 方向性
- strength: float = 1.0 —— 强度
