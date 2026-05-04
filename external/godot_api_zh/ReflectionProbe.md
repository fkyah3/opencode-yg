## ReflectionProbe（反射探针） <- VisualInstance3D（3D可视实例）

将周围环境捕获为立方体贴图，并存储其逐渐增加模糊级别的版本，以模拟不同材质粗糙度。ReflectionProbe 用于以较低的性能代价创建高质量反射（当 `update_mode` 为 `UPDATE_ONCE` 时）。ReflectionProbe 可以彼此混合以及与场景的其他部分平滑混合。ReflectionProbe 还可以与 VoxelGI、SDFGI（`Environment.sdfgi_enabled`）和屏幕空间反射（`Environment.ssr_enabled`）结合，以在特定区域获得更准确的反射。ReflectionProbe 渲染其 `cull_mask` 内的所有对象，因此更新它们可能相当昂贵。最好用重要的静态对象更新一次，然后保持不动。**注意：** 与 VoxelGI 和 SDFGI 不同，ReflectionProbe 仅从 WorldEnvironment 节点获取环境。如果在 Camera3D 节点中指定了 Environment 资源，将被 ReflectionProbe 忽略。这可能导致 ReflectionProbe 内光照不正确。**注意：** 使用 Mobile 渲染方法时，每个网格资源上只能显示 `8` 个反射探针，而 Compatibility 渲染方法每个网格最多支持 `2` 个反射探针。尝试在单个网格资源上使用 Mobile 渲染器显示超过 `8` 个反射探针将导致探针在相机移动时闪烁进出，而使用超过 `2` 个反射探针时 Compatibility 渲染器将不会渲染任何额外探针。**注意：** 使用 Mobile 渲染方法时，反射探针仅正确影响其可见性 AABB 与反射探针 AABB 相交的网格。如果使用着色器以使网格变形超出其 AABB，则必须在网格上增加 `GeometryInstance3D.extra_cull_margin`。否则，反射探针可能无法在网格上显示。

**属性（Props）：**
- ambient_color: Color = Color(0, 0, 0, 1) —— 环境颜色
- ambient_color_energy: float = 1.0 —— 环境颜色能量
- ambient_mode: int (ReflectionProbe.AmbientMode) = 1 —— 环境模式
- blend_distance: float = 1.0 —— 混合距离
- box_projection: bool = false —— 盒体投影
- cull_mask: int = 1048575 —— 剔除掩码
- enable_shadows: bool = false —— 启用阴影
- intensity: float = 1.0 —— 强度
- interior: bool = false —— 内部
- max_distance: float = 0.0 —— 最大距离
- mesh_lod_threshold: float = 1.0 —— 网格 LOD 阈值
- origin_offset: Vector3 = Vector3(0, 0, 0) —— 原点偏移
- reflection_mask: int = 1048575 —— 反射掩码
- size: Vector3 = Vector3(20, 20, 20) —— 大小
- update_mode: int (ReflectionProbe.UpdateMode) = 0 —— 更新模式

**枚举（Enums）：**
**UpdateMode（更新模式）：** UPDATE_ONCE=0 —— 更新一次, UPDATE_ALWAYS=1 —— 始终更新
**AmbientMode（环境模式）：** AMBIENT_DISABLED=0 —— 禁用, AMBIENT_ENVIRONMENT=1 —— 使用环境, AMBIENT_COLOR=2 —— 使用颜色
