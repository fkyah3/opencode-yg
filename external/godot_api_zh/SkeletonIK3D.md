## SkeletonIK3D（骨架IK3D）<- SkeletonModifier3D（骨架修改器3D）

SkeletonIK3D 用于旋转 Skeleton3D 骨骼链中的所有骨骼，使末端骨骼位于所需的三维位置。游戏中 IK 的典型场景是将角色的脚放在地面上，或将角色的手放在当前持有的物体上。SkeletonIK 内部使用 FabrikInverseKinematic 求解骨骼链，并将结果应用到 Skeleton3D 的 `bones_global_pose_override` 属性，作用于链中的所有受影响的骨骼。如果完全应用，这将覆盖来自动画或用户设置的骨骼自定义姿势的任何骨骼变换。应用量可以通过 `SkeletonModifier3D.influence` 属性控制。

**属性（Props）：**
- interpolation: float —— 插值
- magnet: Vector3 = Vector3(0, 0, 0) —— 磁力方向
- max_iterations: int = 10 —— 最大迭代次数
- min_distance: float = 0.01 —— 最小距离
- override_tip_basis: bool = true —— 覆盖尖端基底
- root_bone: StringName = &"" —— 根骨骼
- target: Transform3D = Transform3D(1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0) —— 目标变换
- target_node: NodePath = NodePath("") —— 目标节点
- tip_bone: StringName = &"" —— 尖端骨骼
- use_magnet: bool = false —— 使用磁力

**方法（Methods）：**
- get_parent_skeleton() -> Skeleton3D —— 获取父级骨架
- is_running() -> bool —— 是否运行中
- start(one_time: bool = false) —— 开始
- stop() —— 停止
