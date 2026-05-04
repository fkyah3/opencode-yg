## VoxelGIData <- Resource（资源）

VoxelGIData 包含用于 VoxelGI 节点的烘焙体素全局光照数据。VoxelGIData 还提供了几个属性来调整全局光照的最终外观。这些属性可以在运行时调整，无需重新烘焙 VoxelGI 节点。**注意：** 为防止基于文本的场景文件 (`.tscn`) 变得过大且加载保存缓慢，请始终将 VoxelGIData 保存到外部二进制资源文件 (`.res`)，而不是嵌入到场景中。这可以通过点击 VoxelGIData 资源旁边的下拉箭头，选择**编辑**，点击检查器顶部的软盘图标，然后选择**另存为...**来完成。

**属性（Props）：**
- bias: float = 1.5 —— 偏移
- dynamic_range: float = 2.0 —— 动态范围
- energy: float = 1.0 —— 能量
- interior: bool = false —— 内部
- normal_bias: float = 0.0 —— 法线偏移
- propagation: float = 0.5 —— 传播
- use_two_bounces: bool = true —— 使用两次反弹

**方法（Methods）：**
- allocate(to_cell_xform: Transform3D, aabb: AABB, octree_size: Vector3, octree_cells: PackedByteArray, data_cells: PackedByteArray, distance_field: PackedByteArray, level_counts: PackedInt32Array) —— 分配
- get_bounds() -> AABB —— 获取边界
- get_data_cells() -> PackedByteArray —— 获取数据单元格
- get_level_counts() -> PackedInt32Array —— 获取层级计数
- get_octree_cells() -> PackedByteArray —— 获取八叉树单元格
- get_octree_size() -> Vector3 —— 获取八叉树大小
- get_to_cell_xform() -> Transform3D —— 获取到单元格的变换
