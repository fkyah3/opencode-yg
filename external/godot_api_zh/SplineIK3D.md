## SplineIK3D（样条IK3D）<- ChainIK3D（链式IK3D）

用于沿 Path3D 对齐骨骼的 SkeletonModifier3D。拟合的平滑度取决于 `Curve3D.bake_interval`。如果希望 Path3D 附加到特定骨骼，建议在 SkeletonModifier3D 列表（Skeleton3D 的子级）中，将 ModifierBoneTarget3D 放在 SplineIK3D 之前，然后将 Path3D 作为 ModifierBoneTarget3D 的子级。骨骼扭转基于 `Curve3D.get_point_tilt` 确定。如果根骨骼关节与 Curve3D 的起点分离，则假设它们之间存在一条线性线段。这意味着指向 Curve3D 起点的向量优先于沿 Curve3D 的最短交点。如果末端骨骼关节超出路径长度，则尽可能弯曲到 Curve3D 的终点附近。

**属性（Props）：**
- setting_count: int = 0 —— 设置数量

**方法（Methods）：**
- get_path_3d(index: int) -> NodePath —— 获取 Path3D
- get_tilt_fade_in(index: int) -> int —— 获取倾斜淡入
- get_tilt_fade_out(index: int) -> int —— 获取倾斜淡出
- is_tilt_enabled(index: int) -> bool —— 是否启用倾斜
- set_path_3d(index: int, path_3d: NodePath) —— 设置 Path3D
- set_tilt_enabled(index: int, enabled: bool) —— 设置启用倾斜
- set_tilt_fade_in(index: int, size: int) —— 设置倾斜淡入
- set_tilt_fade_out(index: int, size: int) —— 设置倾斜淡出
