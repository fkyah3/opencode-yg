## GPUParticlesAttractorVectorField3D（GPU粒子吸引器向量场3D） <- GPUParticlesAttractor3D（GPU粒子吸引器3D）

一种盒形吸引器，内部定义了不同的方向和强度，影响来自 GPUParticles3D 节点的粒子。与 GPUParticlesAttractorBox3D 不同，GPUParticlesAttractorVectorField3D 使用 `texture` 来影响盒子内的吸引强度。这可用于创建复杂的吸引场景，其中粒子根据其位置向不同方向运动。这对沙尘暴等天气效果很有用。粒子吸引器实时工作，可以在游戏过程中移动、旋转和缩放。与碰撞形状不同，吸引器的非均匀缩放也是支持的。**注意：** 粒子吸引器仅影响 GPUParticles3D，不影响 CPUParticles3D。

**属性（Props）：**
- size: Vector3 = Vector3(2, 2, 2) —— 大小
- texture: Texture3D —— 纹理
