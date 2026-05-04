## HeightMapShape3D（高度图形状3D） <- Shape3D（形状3D）

一种 3D 高度图形状，旨在用于物理系统，为 CollisionShape3D 提供形状。此类型最常用于地形，顶点以固定宽度网格排列。高度图表示为高度值的 2D 网格，这些值表示网格点在 Y 轴上的位置。网格点在 X 和 Z 轴上的间距为 1 个单位，网格以 CollisionShape3D 节点的原点为中心。内部地，每个网格方块被划分为两个三角形。由于高度图的特性，它不能用于建模悬垂物或洞穴，这需要在同一垂直位置有多个顶点。通过将 `@GDScript.NAN` 分配给所需顶点的高度值，可以在碰撞中打出孔洞（GodotPhysics3D 和 Jolt Physics 均支持）。然后，你可以插入带有自己独立碰撞的网格来提供悬垂物、洞穴等。**性能：** HeightMapShape3D 的碰撞检测速度比 ConcavePolygonShape3D 快，但明显比 BoxShape3D 等基本形状慢。也可以使用 Image 引用来构建高度图碰撞形状：**注意：** 如果需要使用不同于 1 个单位的间距，可以调整形状的 `Node3D.scale`。但是，请注意 GodotPhysics3D 不支持非均匀缩放：Y 轴的缩放必须与 X 和 Z 轴相同，这意味着 `map_data` 中的值需要预先按该缩放的倒数进行缩放。另外请注意，GodotPhysics3D 完全不支持动态体（即非冻结的 RigidBody3D 节点）的缩放；要在动态体上使用缩放的 HeightMapShape3D，你需要使用 Jolt Physics。

**属性（Props）：**
- map_data: PackedFloat32Array = PackedFloat32Array(0, 0, 0, 0) —— 地图数据
- map_depth: int = 2 —— 地图深度
- map_width: int = 2 —— 地图宽度

**方法（Methods）：**
- get_max_height() -> float —— 获取最大高度
- get_min_height() -> float —— 获取最小高度
- update_map_data_from_image(image: Image, height_min: float, height_max: float) —— 从图像更新地图数据
