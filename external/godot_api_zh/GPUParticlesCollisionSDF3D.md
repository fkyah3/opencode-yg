## GPUParticlesCollisionSDF3D（GPU粒子碰撞SDF3D） <- GPUParticlesCollision3D（GPU粒子碰撞3D）

一种影响 GPUParticles3D 节点的烘焙有符号距离场 3D 粒子碰撞形状。有符号距离场（SDF）可以高效地表示任意形状的凸面和凹面物体的近似碰撞形状。这比 GPUParticlesCollisionHeightField3D 更灵活，但需要烘焙步骤。**烘焙：** 可以通过在编辑器中选择 GPUParticlesCollisionSDF3D 节点，然后单击 3D 视口顶部的 **Bake SDF** 来烘焙有符号距离场纹理。`size` 内任何*可见*的 MeshInstance3D 都将被纳入烘焙考虑，无论其 `GeometryInstance3D.gi_mode` 如何。**注意：** 烘焙 GPUParticlesCollisionSDF3D 的 `texture` 只能在编辑器中进行，因为导出的项目中没有公开的烘焙方法。但是，在导出的项目中，仍然可以将预烘焙的 Texture3D 加载到其 `texture` 属性中。**注意：** 必须在 GPUParticles3D 的处理材质上将 `ParticleProcessMaterial.collision_mode` 设置为 `ParticleProcessMaterial.COLLISION_RIGID` 或 `ParticleProcessMaterial.COLLISION_HIDE_ON_CONTACT`，碰撞才能工作。**注意：** 粒子碰撞仅影响 GPUParticles3D，不影响 CPUParticles3D。

**属性（Props）：**
- bake_mask: int = 4294967295 —— 烘焙遮罩
- resolution: int (GPUParticlesCollisionSDF3D.Resolution) = 2 —— 分辨率
- size: Vector3 = Vector3(2, 2, 2) —— 大小
- texture: Texture3D —— 纹理
- thickness: float = 1.0 —— 厚度

**方法（Methods）：**
- get_bake_mask_value(layer_number: int) -> bool —— 获取烘焙遮罩值
- set_bake_mask_value(layer_number: int, value: bool) —— 设置烘焙遮罩值

**枚举（Enums）：**
**Resolution（分辨率）：** RESOLUTION_16=0, RESOLUTION_32=1, RESOLUTION_64=2, RESOLUTION_128=3, RESOLUTION_256=4, RESOLUTION_512=5, RESOLUTION_MAX=6
