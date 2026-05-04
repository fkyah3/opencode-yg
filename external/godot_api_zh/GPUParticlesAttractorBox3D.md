## GPUParticlesAttractorBox3D（GPU粒子吸引器盒体3D） <- GPUParticlesAttractor3D（GPU粒子吸引器3D）

一个盒体形状的吸引器，影响来自 GPUParticles3D 节点的粒子。可用于将粒子吸引到其原点，或将其推离原点。粒子吸引器实时工作，可在游戏过程中移动、旋转和缩放。与碰撞形状不同，吸引器还支持非均匀缩放。**注意：** 粒子吸引器仅影响 GPUParticles3D，不影响 CPUParticles3D。

**Props（属性）：**
- size: Vector3 = Vector3(2, 2, 2) —— 大小
