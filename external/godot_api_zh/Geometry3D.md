## Geometry3D（几何3D） <- Object（对象）

提供一组辅助函数，用于创建几何形状、计算形状之间的交集以及处理 3D 中的各种其他几何操作。

**方法（Methods）：**
- build_box_planes(extents: Vector3) -> Plane[] —— 构建立方体平面
- build_capsule_planes(radius: float, height: float, sides: int, lats: int, axis: int = 2) -> Plane[] —— 构建胶囊体平面
- build_cylinder_planes(radius: float, height: float, sides: int, axis: int = 2) -> Plane[] —— 构建圆柱体平面
- clip_polygon(points: PackedVector3Array, plane: Plane) -> PackedVector3Array —— 裁剪多边形
- compute_convex_mesh_points(planes: Plane[]) -> PackedVector3Array —— 计算凸网格点
- get_closest_point_to_segment(point: Vector3, s1: Vector3, s2: Vector3) -> Vector3 —— 获取线段上最近点
- get_closest_point_to_segment_uncapped(point: Vector3, s1: Vector3, s2: Vector3) -> Vector3 —— 获取无限延伸线段上最近点
- get_closest_points_between_segments(p1: Vector3, p2: Vector3, q1: Vector3, q2: Vector3) -> PackedVector3Array —— 获取两线段间的最近点
- get_triangle_barycentric_coords(point: Vector3, a: Vector3, b: Vector3, c: Vector3) -> Vector3 —— 获取三角形重心坐标
- ray_intersects_triangle(from: Vector3, dir: Vector3, a: Vector3, b: Vector3, c: Vector3) -> Variant —— 射线与三角形相交
- segment_intersects_convex(from: Vector3, to: Vector3, planes: Plane[]) -> PackedVector3Array —— 线段与凸体相交
- segment_intersects_cylinder(from: Vector3, to: Vector3, height: float, radius: float) -> PackedVector3Array —— 线段与圆柱体相交
- segment_intersects_sphere(from: Vector3, to: Vector3, sphere_position: Vector3, sphere_radius: float) -> PackedVector3Array —— 线段与球体相交
- segment_intersects_triangle(from: Vector3, to: Vector3, a: Vector3, b: Vector3, c: Vector3) -> Variant —— 线段与三角形相交
- tetrahedralize_delaunay(points: PackedVector3Array) -> PackedInt32Array —— Delaunay 四面体剖分
