## RetargetModifier3D（重定向修改器3D）<- SkeletonModifier3D（骨架修改器3D）

获取相对于父级骨架静止姿势的模型空间中的姿势（或全局姿势），并将其传递到子骨架。此修改器在父骨架的更新过程中直接重写子骨架的姿势。这意味着它会覆盖目标骨架上正常过程中设置的重映射骨骼姿势。如果要在重定向后设置目标骨架骨骼姿势，需要为目标骨架添加 SkeletonModifier3D 子节点来修改姿势。**注意：** 当启用 `use_global_pose` 时，即使是未映射的骨骼，也可能导致视觉问题，因为全局姿势会忽略父骨骼的姿势**如果它有已映射的骨骼子级**。另见 `use_global_pose`。

**属性（Props）：**
- enable: int (RetargetModifier3D.TransformFlag) = 7 —— 启用的变换标志
- profile: SkeletonProfile —— 骨骼配置文件
- use_global_pose: bool = false —— 使用全局姿势

**方法（Methods）：**
- is_position_enabled() -> bool —— 是否启用位置
- is_rotation_enabled() -> bool —— 是否启用旋转
- is_scale_enabled() -> bool —— 是否启用缩放
- set_position_enabled(enabled: bool) —— 设置位置启用
- set_rotation_enabled(enabled: bool) —— 设置旋转启用
- set_scale_enabled(enabled: bool) —— 设置缩放启用

**枚举（Enums）：**
**TransformFlag（变换标志）：** TRANSFORM_FLAG_POSITION=1 —— 位置变换, TRANSFORM_FLAG_ROTATION=2 —— 旋转变换, TRANSFORM_FLAG_SCALE=4 —— 缩放变换, TRANSFORM_FLAG_ALL=7 —— 全部变换
