## ChainIK3D（链式反向动力学3D）<- IKModifier3D（IK修改器3D）

SkeletonModifier3D 的基类，自动从根骨骼和末端骨骼之间的骨骼生成关节列表。

**方法（Methods）：**
- get_end_bone(index: int) -> int —— 获取末端骨骼
- get_end_bone_direction(index: int) -> int —— 获取末端骨骼方向
- get_end_bone_length(index: int) -> float —— 获取末端骨骼长度
- get_end_bone_name(index: int) -> String —— 获取末端骨骼名称
- get_joint_bone(index: int, joint: int) -> int —— 获取关节骨骼
- get_joint_bone_name(index: int, joint: int) -> String —— 获取关节骨骼名称
- get_joint_count(index: int) -> int —— 获取关节数量
- get_root_bone(index: int) -> int —— 获取根骨骼
- get_root_bone_name(index: int) -> String —— 获取根骨骼名称
- is_end_bone_extended(index: int) -> bool —— 末端骨骼是否扩展
- set_end_bone(index: int, bone: int) —— 设置末端骨骼
- set_end_bone_direction(index: int, bone_direction: int) —— 设置末端骨骼方向
- set_end_bone_length(index: int, length: float) —— 设置末端骨骼长度
- set_end_bone_name(index: int, bone_name: String) —— 设置末端骨骼名称
- set_extend_end_bone(index: int, enabled: bool) —— 设置扩展末端骨骼
- set_root_bone(index: int, bone: int) —— 设置根骨骼
- set_root_bone_name(index: int, bone_name: String) —— 设置根骨骼名称
