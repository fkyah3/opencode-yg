## Polygon2D（2D多边形） <- Node2D（2D节点）

Polygon2D 由一组点定义。每个点连接到下一个点，最后一个点连接到第一个点，形成闭合多边形。Polygon2D 可以用颜色（纯色或渐变）填充，或用给定纹理填充。

**属性（Props）：**
- antialiased: bool = false —— 抗锯齿
- color: Color = Color(1, 1, 1, 1) —— 颜色
- internal_vertex_count: int = 0 —— 内部顶点数量
- invert_border: float = 100.0 —— 反转边框
- invert_enabled: bool = false —— 是否启用反转
- offset: Vector2 = Vector2(0, 0) —— 偏移
- polygon: PackedVector2Array = PackedVector2Array() —— 多边形顶点
- polygons: Array = [] —— 子多边形数组
- skeleton: NodePath = NodePath("") —— 骨骼
- texture: Texture2D —— 纹理
- texture_offset: Vector2 = Vector2(0, 0) —— 纹理偏移
- texture_rotation: float = 0.0 —— 纹理旋转
- texture_scale: Vector2 = Vector2(1, 1) —— 纹理缩放
- uv: PackedVector2Array = PackedVector2Array() —— UV 坐标
- vertex_colors: PackedColorArray = PackedColorArray() —— 顶点颜色

**方法（Methods）：**
- add_bone(path: NodePath, weights: PackedFloat32Array) —— 添加骨骼
- clear_bones() —— 清除骨骼
- erase_bone(index: int) —— 擦除骨骼
- get_bone_count() -> int —— 获取骨骼数量
- get_bone_path(index: int) -> NodePath —— 获取骨骼路径
- get_bone_weights(index: int) -> PackedFloat32Array —— 获取骨骼权重
- set_bone_path(index: int, path: NodePath) —— 设置骨骼路径
- set_bone_weights(index: int, weights: PackedFloat32Array) —— 设置骨骼权重
