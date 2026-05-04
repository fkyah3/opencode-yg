## BoneMap（骨骼映射）<- Resource（资源）

此类包含一个字典，使用 SkeletonProfile 中的骨骼名称列表作为键名。通过将实际的 Skeleton3D 骨骼名称赋值为键值，它将 Skeleton3D 映射到 SkeletonProfile。

**属性（Props）：**
- profile: SkeletonProfile —— 骨骼轮廓

**方法（Methods）：**
- find_profile_bone_name(skeleton_bone_name: StringName) -> StringName —— 查找轮廓骨骼名称
- get_skeleton_bone_name(profile_bone_name: StringName) -> StringName —— 获取骨骼骨骼名称
- set_skeleton_bone_name(profile_bone_name: StringName, skeleton_bone_name: StringName) —— 设置骨骼骨骼名称

**信号（Signals）：**
- bone_map_updated —— 骨骼映射已更新
- profile_updated —— 轮廓已更新
