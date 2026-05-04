## ArrayOccluder3D（数组遮挡器3D） <- Occluder3D（遮挡器3D）

ArrayOccluder3D 存储一个可由引擎遮挡剔除系统使用的任意 3D 多边形形状。这类似于 ArrayMesh，但用于遮挡器。有关设置遮挡剔除的说明，请参见 OccluderInstance3D 的文档。

**Props（属性）：**
- indices: PackedInt32Array = PackedInt32Array() —— 索引数组
- vertices: PackedVector3Array = PackedVector3Array() —— 顶点数组

**Methods（方法）：**
- set_arrays(vertices: PackedVector3Array, indices: PackedInt32Array) —— 设置顶点和索引数组
