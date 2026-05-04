## MeshConvexDecompositionSettings（网格凸分解设置） <- RefCounted（引用计数）

与网格凸分解操作一起使用的参数。

**属性（Props）：**
- convex_hull_approximation: bool = true —— 凸包近似
- convex_hull_downsampling: int = 4 —— 凸包降采样
- max_concavity: float = 1.0 —— 最大凹陷度
- max_convex_hulls: int = 1 —— 最大凸包数量
- max_num_vertices_per_convex_hull: int = 32 —— 每个凸包的最大顶点数
- min_volume_per_convex_hull: float = 0.0001 —— 每个凸包的最小体积
- mode: int (MeshConvexDecompositionSettings.Mode) = 0 —— 模式
- normalize_mesh: bool = false —— 是否归一化网格
- plane_downsampling: int = 4 —— 平面降采样
- project_hull_vertices: bool = true —— 是否投影凸包顶点
- resolution: int = 10000 —— 分辨率
- revolution_axes_clipping_bias: float = 0.05 —— 旋转轴裁剪偏置
- symmetry_planes_clipping_bias: float = 0.05 —— 对称平面裁剪偏置

**枚举（Enums）：**
**Mode（模式）：** CONVEX_DECOMPOSITION_MODE_VOXEL=0 —— 体素模式, CONVEX_DECOMPOSITION_MODE_TETRAHEDRON=1 —— 四面体模式
