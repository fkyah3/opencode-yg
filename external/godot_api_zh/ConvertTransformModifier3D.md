## ConvertTransformModifier3D（转换变换修改器3D）<- BoneConstraint3D（骨骼约束3D）

将 `BoneConstraint3D.set_reference_bone` 设置的骨骼的复制变换，通过一些选项重新映射后，应用于 `BoneConstraint3D.set_apply_bone` 设置的骨骼的特定轴。根据 `set_relative` 和 `set_additive` 的组合，有 4 种应用变换的方式：**相对 + 叠加：** - 提取相对于休止位的参考姿势并添加到应用骨骼的姿势。**相对 + 非叠加：** - 提取相对于休止位的参考姿势并添加到应用骨骼的休止位。**非相对 + 叠加：** - 绝对提取参考姿势并添加到应用骨骼的姿势。**非相对 + 非叠加：** - 绝对提取参考姿势，应用骨骼的姿势被替换为它。**注意：** 相对选项仅在 `BoneConstraint3D.get_reference_type` 为 `BoneConstraint3D.REFERENCE_TYPE_BONE` 时可用。另请参见 `BoneConstraint3D.ReferenceType`。**注意：** 如果受约束的轴上有大于 `180` 度的旋转，可能会发生翻转。

**属性（Props）：**
- setting_count: int = 0 —— 设置数量

**方法（Methods）：**
- get_apply_axis(index: int) -> int —— 获取应用轴
- get_apply_range_max(index: int) -> float —— 获取应用范围最大值
- get_apply_range_min(index: int) -> float —— 获取应用范围最小值
- get_apply_transform_mode(index: int) -> int —— 获取应用变换模式
- get_reference_axis(index: int) -> int —— 获取参考轴
- get_reference_range_max(index: int) -> float —— 获取参考范围最大值
- get_reference_range_min(index: int) -> float —— 获取参考范围最小值
- get_reference_transform_mode(index: int) -> int —— 获取参考变换模式
- is_additive(index: int) -> bool —— 是否为叠加
- is_relative(index: int) -> bool —— 是否为相对
- set_additive(index: int, enabled: bool) —— 设置叠加
- set_apply_axis(index: int, axis: int) —— 设置应用轴
- set_apply_range_max(index: int, range_max: float) —— 设置应用范围最大值
- set_apply_range_min(index: int, range_min: float) —— 设置应用范围最小值
- set_apply_transform_mode(index: int, transform_mode: int) —— 设置应用变换模式
- set_reference_axis(index: int, axis: int) —— 设置参考轴
- set_reference_range_max(index: int, range_max: float) —— 设置参考范围最大值
- set_reference_range_min(index: int, range_min: float) —— 设置参考范围最小值
- set_reference_transform_mode(index: int, transform_mode: int) —— 设置参考变换模式
- set_relative(index: int, enabled: bool) —— 设置相对

**枚举（Enums）：**
**TransformMode（变换模式）：** TRANSFORM_MODE_POSITION=0 —— 位置，TRANSFORM_MODE_ROTATION=1 —— 旋转，TRANSFORM_MODE_SCALE=2 —— 缩放
