## BoneTwistDisperser3D（骨骼扭转分散器3D）<- SkeletonModifier3D（骨骼修改器3D）

此 BoneTwistDisperser3D 允许通过在多个骨骼之间分散末端骨骼的扭转来实现平滑的扭转插值。仅改变扭转，不改变每个关节的全局位置。与 CopyTransformModifier3D 和 IK 结合使用时，可用于平滑地扭转骨骼。**注意：** 如果提取的扭转大于 180 度，会发生翻转。这与 ConvertTransformModifier3D 类似。

**属性（Props）：**
- mutable_bone_axes: bool = true —— 可变骨骼轴
- setting_count: int = 0 —— 设置数量

**方法（Methods）：**
- clear_settings() —— 清除设置
- get_damping_curve(index: int) -> Curve —— 获取阻尼曲线
- get_disperse_mode(index: int) -> int —— 获取分散模式
- get_end_bone(index: int) -> int —— 获取末端骨骼
- get_end_bone_direction(index: int) -> int —— 获取末端骨骼方向
- get_end_bone_name(index: int) -> String —— 获取末端骨骼名称
- get_joint_bone(index: int, joint: int) -> int —— 获取关节骨骼
- get_joint_bone_name(index: int, joint: int) -> String —— 获取关节骨骼名称
- get_joint_count(index: int) -> int —— 获取关节数量
- get_joint_twist_amount(index: int, joint: int) -> float —— 获取关节扭转量
- get_reference_bone(index: int) -> int —— 获取参考骨骼
- get_reference_bone_name(index: int) -> String —— 获取参考骨骼名称
- get_root_bone(index: int) -> int —— 获取根骨骼
- get_root_bone_name(index: int) -> String —— 获取根骨骼名称
- get_twist_from(index: int) -> Quaternion —— 获取扭转起始
- get_weight_position(index: int) -> float —— 获取权重位置
- is_end_bone_extended(index: int) -> bool —— 末端骨骼是否扩展
- is_twist_from_rest(index: int) -> bool —— 扭转是否从休止位开始
- set_damping_curve(index: int, curve: Curve) —— 设置阻尼曲线
- set_disperse_mode(index: int, disperse_mode: int) —— 设置分散模式
- set_end_bone(index: int, bone: int) —— 设置末端骨骼
- set_end_bone_direction(index: int, bone_direction: int) —— 设置末端骨骼方向
- set_end_bone_name(index: int, bone_name: String) —— 设置末端骨骼名称
- set_extend_end_bone(index: int, enabled: bool) —— 设置扩展末端骨骼
- set_joint_twist_amount(index: int, joint: int, twist_amount: float) —— 设置关节扭转量
- set_root_bone(index: int, bone: int) —— 设置根骨骼
- set_root_bone_name(index: int, bone_name: String) —— 设置根骨骼名称
- set_twist_from(index: int, from: Quaternion) —— 设置扭转起始
- set_twist_from_rest(index: int, enabled: bool) —— 设置从休止位扭转
- set_weight_position(index: int, weight_position: float) —— 设置权重位置

**枚举（Enums）：**
**DisperseMode（分散模式）：** DISPERSE_MODE_EVEN=0 —— 均匀分散，DISPERSE_MODE_WEIGHTED=1 —— 加权分散，DISPERSE_MODE_CUSTOM=2 —— 自定义分散
