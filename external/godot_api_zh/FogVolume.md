## FogVolume（雾体积） <- VisualInstance3D（可视实例3D）

FogVolume 用于向全局体积雾效果添加局部雾。如果使用具有负 `FogMaterial.density` 的 FogMaterial，FogVolume 也可以从特定区域移除体积雾。FogVolume 的性能与其在屏幕上的相对大小以及附加的 FogMaterial 的复杂度直接相关。尽可能保持 FogVolume 相对较小和简单。**注意：** 仅当 `Environment.volumetric_fog_enabled` 为 `true` 时，FogVolume 才会产生可见效果。如果你不希望雾全局可见（仅在 FogVolume 节点内可见），请将 `Environment.volumetric_fog_density` 设置为 `0.0`。

**属性（Props）：**
- material: Material —— 材质
- shape: int (RenderingServer.FogVolumeShape) = 3 —— 形状
- size: Vector3 = Vector3(2, 2, 2) —— 大小
