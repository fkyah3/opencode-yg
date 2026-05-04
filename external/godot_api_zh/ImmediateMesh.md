## ImmediateMesh（即时网格） <- Mesh（网格）

一种专为手动创建几何体而优化的网格类型，类似于 OpenGL 1.x 的即时模式。以下是生成三角形面的示例：**注意：** 使用 ImmediateMesh 生成复杂几何体效率极低。相反，它设计用于生成经常变化的简单几何体。

**方法（Methods）：**
- clear_surfaces() —— 清除所有表面
- surface_add_vertex(vertex: Vector3) —— 添加顶点
- surface_add_vertex_2d(vertex: Vector2) —— 添加 2D 顶点
- surface_begin(primitive: int, material: Material = null) —— 开始绘制表面
- surface_end() —— 结束绘制表面
- surface_set_color(color: Color) —— 设置颜色
- surface_set_normal(normal: Vector3) —— 设置法线
- surface_set_tangent(tangent: Plane) —— 设置切线
- surface_set_uv(uv: Vector2) —— 设置 UV
- surface_set_uv2(uv2: Vector2) —— 设置 UV2
