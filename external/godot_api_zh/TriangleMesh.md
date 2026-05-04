## TriangleMesh（三角形网格） <- RefCounted（引用计数）

在三角形几何体周围创建包围体层次结构（BVH）树。三角形 BVH 树可用于进行高效的相交查询，无需涉及物理引擎。例如，可在编辑器工具中用于基于鼠标光标位置选择复杂形状的对象。**性能：** 为复杂几何体创建 BVH 树是较慢的过程，最好在后台线程中完成。

**方法（Methods）：**
- create_from_faces(faces: PackedVector3Array) -> bool —— 从面创建
- get_faces() -> PackedVector3Array —— 获取面
- intersect_ray(begin: Vector3, dir: Vector3) -> Dictionary —— 射线相交检测
- intersect_segment(begin: Vector3, end: Vector3) -> Dictionary —— 线段相交检测
