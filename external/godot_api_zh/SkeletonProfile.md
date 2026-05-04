## SkeletonProfile（骨骼配置文件）<- Resource（资源）

此资源用于 EditorScenePostImport。某些参数引用 Skeleton3D、Skin、Animation 中的骨骼，其他一些节点根据 SkeletonProfile 的参数重写。**注意：** 这些参数仅在创建自定义配置文件时需要设置。在 SkeletonProfileHumanoid 中，它们被定义为内部只读值。

**属性（Props）：**
- bone_size: int = 0 —— 骨骼数量
- group_size: int = 0 —— 组数量
- root_bone: StringName = &"" —— 根骨骼
- scale_base_bone: StringName = &"" —— 缩放基准骨骼

**方法（Methods）：**
- find_bone(bone_name: StringName) -> int —— 查找骨骼
- get_bone_name(bone_idx: int) -> StringName —— 获取骨骼名称
- get_bone_parent(bone_idx: int) -> StringName —— 获取骨骼父级
- get_bone_tail(bone_idx: int) -> StringName —— 获取骨骼尾部
- get_group(bone_idx: int) -> StringName —— 获取骨骼所属组
- get_group_name(group_idx: int) -> StringName —— 获取组名称
- get_handle_offset(bone_idx: int) -> Vector2 —— 获取手柄偏移
- get_reference_pose(bone_idx: int) -> Transform3D —— 获取参考姿势
- get_tail_direction(bone_idx: int) -> int —— 获取尾部方向
- get_texture(group_idx: int) -> Texture2D —— 获取组纹理
- is_required(bone_idx: int) -> bool —— 是否为必需的
- set_bone_name(bone_idx: int, bone_name: StringName) —— 设置骨骼名称
- set_bone_parent(bone_idx: int, bone_parent: StringName) —— 设置骨骼父级
- set_bone_tail(bone_idx: int, bone_tail: StringName) —— 设置骨骼尾部
- set_group(bone_idx: int, group: StringName) —— 设置骨骼所属组
- set_group_name(group_idx: int, group_name: StringName) —— 设置组名称
- set_handle_offset(bone_idx: int, handle_offset: Vector2) —— 设置手柄偏移
- set_reference_pose(bone_idx: int, bone_name: Transform3D) —— 设置参考姿势
- set_required(bone_idx: int, required: bool) —— 设置是否为必需的
- set_tail_direction(bone_idx: int, tail_direction: int) —— 设置尾部方向
- set_texture(group_idx: int, texture: Texture2D) —— 设置组纹理

**信号（Signals）：**
- profile_updated —— 配置文件已更新

**枚举（Enums）：**
**TailDirection（尾部方向）：** TAIL_DIRECTION_AVERAGE_CHILDREN=0 —— 平均子级方向, TAIL_DIRECTION_SPECIFIC_CHILD=1 —— 特定子级方向, TAIL_DIRECTION_END=2 —— 末端方向
