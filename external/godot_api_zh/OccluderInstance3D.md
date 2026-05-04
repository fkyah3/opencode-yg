## OccluderInstance3D（3D遮挡器实例）<- VisualInstance3D（3D可视化实例）

在封闭/半开放区域中，遮挡剔除（occlusion culling）通过隐藏被其他物体遮挡的几何体来提高渲染性能。遮挡剔除系统大多是静态的。OccluderInstance3D 可以在运行时移动或隐藏，但这会触发后台重新计算，可能需要花费数帧时间。建议仅偶尔移动 OccluderInstance3D（例如用于程序化生成目的），而不是每帧都移动。遮挡剔除系统通过在 CPU 上并行渲染遮挡器，将结果绘制到低分辨率缓冲区，然后使用该缓冲区逐个剔除 3D 节点。在 3D 编辑器中，您可以通过在 3D 视口左上角选择 **Perspective > Display Advanced... > Occlusion Culling Buffer** 来预览遮挡剔除缓冲区。遮挡剔除缓冲区质量可以在项目设置中调整。**烘焙：** 选择一个 OccluderInstance3D 节点，然后使用 3D 编辑器顶部的 **Bake Occluders** 按钮。只有不透明材质会被考虑；透明材质（alpha 混合或 alpha 测试）将被遮挡器生成忽略。**注意：** 仅在 `ProjectSettings.rendering/occlusion_culling/use_occlusion_culling` 为 `true` 时，遮挡剔除才有效。启用遮挡剔除会带来 CPU 开销。仅当您确实需要使用它时才启用遮挡剔除。很少有或没有阻挡视线的物体的大型开放场景通常不会从遮挡剔除中获得太多收益。大型开放场景通常从网格 LOD 和可见性范围（`GeometryInstance3D.visibility_range_begin` 和 `GeometryInstance3D.visibility_range_end`）中获益更多。**注意：** 由于内存限制，Web 导出模板默认不支持遮挡剔除。可以通过使用 `module_raycast_enabled=yes` 编译自定义 Web 导出模板来启用它。

**属性（Props）：**
- bake_mask: int = 4294967295 —— 烘焙遮罩
- bake_simplification_distance: float = 0.1 —— 烘焙简化距离
- occluder: Occluder3D —— 遮挡器

**方法（Methods）：**
- get_bake_mask_value(layer_number: int) -> bool —— 获取烘焙遮罩值
- set_bake_mask_value(layer_number: int, value: bool) —— 设置烘焙遮罩值
