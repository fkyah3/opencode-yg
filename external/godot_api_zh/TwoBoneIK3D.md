## TwoBoneIK3D <- IKModifier3D（IK修改器3D）

此 IKModifier3D 需要极目标（pole target）。它通过从每个关节和极目标构建平面，并找到两个圆（3D 中的圆盘）的交点来提供确定性的结果。该 IK 可以通过设置极方向来处理扭转。如果每组骨骼之间的骨骼不止一块，则忽略它们的旋转，将连接根-中和中-端关节的直线视为虚拟骨骼。

**属性（Props）：**
- setting_count: int = 0 —— 设置数量

**方法（Methods）：**
- get_end_bone(index: int) -> int —— 获取末端骨骼
- get_end_bone_direction(index: int) -> int —— 获取末端骨骼方向
- get_end_bone_length(index: int) -> float —— 获取末端骨骼长度
- get_end_bone_name(index: int) -> String —— 获取末端骨骼名称
- get_middle_bone(index: int) -> int —— 获取中间骨骼
- get_middle_bone_name(index: int) -> String —— 获取中间骨骼名称
- get_pole_direction(index: int) -> int —— 获取极方向
- get_pole_direction_vector(index: int) -> Vector3 —— 获取极方向向量
- get_pole_node(index: int) -> NodePath —— 获取极节点
- get_root_bone(index: int) -> int —— 获取根骨骼
- get_root_bone_name(index: int) -> String —— 获取根骨骼名称
- get_target_node(index: int) -> NodePath —— 获取目标节点
- is_end_bone_extended(index: int) -> bool —— 末端骨骼是否扩展
- is_using_virtual_end(index: int) -> bool —— 是否使用虚拟末端
- set_end_bone(index: int, bone: int) —— 设置末端骨骼
- set_end_bone_direction(index: int, bone_direction: int) —— 设置末端骨骼方向
- set_end_bone_length(index: int, length: float) —— 设置末端骨骼长度
- set_end_bone_name(index: int, bone_name: String) —— 设置末端骨骼名称
- set_extend_end_bone(index: int, enabled: bool) —— 设置扩展末端骨骼
- set_middle_bone(index: int, bone: int) —— 设置中间骨骼
- set_middle_bone_name(index: int, bone_name: String) —— 设置中间骨骼名称
- set_pole_direction(index: int, direction: int) —— 设置极方向
- set_pole_direction_vector(index: int, vector: Vector3) —— 设置极方向向量
- set_pole_node(index: int, pole_node: NodePath) —— 设置极节点
- set_root_bone(index: int, bone: int) —— 设置根骨骼
- set_root_bone_name(index: int, bone_name: String) —— 设置根骨骼名称
- set_target_node(index: int, target_node: NodePath) —— 设置目标节点
- set_use_virtual_end(index: int, enabled: bool) —— 使用虚拟末端
