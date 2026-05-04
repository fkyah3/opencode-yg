## VisualShaderNodeParticleMeshEmitter（可视化着色器粒子网格发射器节点） <- VisualShaderNodeParticleEmitter（可视化着色器粒子发射器节点）

使粒子以指定 `mesh` 的形状发射的 VisualShaderNodeParticleEmitter。粒子将从网格的表面发射，可以是所有表面或仅指定的表面。

**属性（Props）：**
- mesh: Mesh —— 发射形状的网格
- surface_index: int = 0 —— 表面索引
- use_all_surfaces: bool = true —— 是否使用所有表面
