## PointMesh（点网格） <- PrimitiveMesh（基本网格）

PointMesh 是由单个点组成的基本网格。点不是依赖三角形，而是在屏幕上渲染为具有恒定大小的单个矩形。它们旨在与粒子系统一起使用，但也可以用作渲染公告板精灵的低成本方式（例如在点云中）。为了显示，点网格必须与具有点大小的材质一起使用。点大小可以在着色器中使用 `POINT_SIZE` 内置变量访问，或者在 BaseMaterial3D 中设置 `BaseMaterial3D.use_point_size` 和 `BaseMaterial3D.point_size` 属性。**注意：** 使用点网格时，通常影响顶点的属性将被忽略，包括 `BaseMaterial3D.billboard_mode`、`BaseMaterial3D.grow` 和 `BaseMaterial3D.cull_mode`。
