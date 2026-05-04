## AimModifier3D（瞄准修改器3D） <- BoneConstraint3D（骨骼约束3D）

这是 LookAtModifier3D 的简化版本，仅允许骨骼指向参考点，没有角度限制或基于时间的插值等高级选项。功能简化了，但取而代之的是使用无欧拉角的平滑追踪实现，请参见 `set_use_euler`。

**属性（Props）：**
- setting_count: int = 0 —— 设置数量

**方法（Methods）：**
- get_forward_axis(index: int) -> int —— 获取前向轴
- get_primary_rotation_axis(index: int) -> int —— 获取主旋转轴
- is_relative(index: int) -> bool —— 是否相对
- is_using_euler(index: int) -> bool —— 是否使用欧拉角
- is_using_secondary_rotation(index: int) -> bool —— 是否使用辅助旋转
- set_forward_axis(index: int, axis: int) —— 设置前向轴
- set_primary_rotation_axis(index: int, axis: int) —— 设置主旋转轴
- set_relative(index: int, enabled: bool) —— 设置相对模式
- set_use_euler(index: int, enabled: bool) —— 设置使用欧拉角
- set_use_secondary_rotation(index: int, enabled: bool) —— 设置使用辅助旋转
