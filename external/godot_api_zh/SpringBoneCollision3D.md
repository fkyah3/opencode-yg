## SpringBoneCollision3D（弹簧骨骼碰撞3D）<- Node3D（节点3D）

碰撞体可以是 SpringBoneSimulator3D 的子级。如果不是 SpringBoneSimulator3D 的子级，则无效。碰撞和滑动在 SpringBoneSimulator3D 的修改过程中按其碰撞列表的顺序执行，该列表由 `SpringBoneSimulator3D.set_collision_path` 设置。如果 `SpringBoneSimulator3D.are_all_child_collisions_enabled` 为 `true`，则顺序与 SceneTree 匹配。如果设置了 `bone`，它将与祖先 Skeleton3D 的骨骼姿势同步，这在 SpringBoneSimulator3D 的修改过程之前作为预处理执行。**警告：** 缩放的 SpringBoneCollision3D 很可能无法按预期运行。请确保父级 Skeleton3D 及其骨骼未缩放。

**属性（Props）：**
- bone: int = -1 —— 骨骼索引
- bone_name: String = "" —— 骨骼名称
- position_offset: Vector3 —— 位置偏移
- rotation_offset: Quaternion —— 旋转偏移

**方法（Methods）：**
- get_skeleton() -> Skeleton3D —— 获取骨架
