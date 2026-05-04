## LightOccluder2D（2D光照遮挡器） <- Node2D（2D节点）

遮挡 Light2D 发出的光照，投射阴影。必须为 LightOccluder2D 提供 OccluderPolygon2D 才能计算阴影。

**属性（Props）：**
- occluder: OccluderPolygon2D —— 遮挡多边形
- occluder_light_mask: int = 1 —— 遮挡光照遮罩
- sdf_collision: bool = true —— 是否启用 SDF 碰撞
