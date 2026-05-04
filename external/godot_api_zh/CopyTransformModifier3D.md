## CopyTransformModifier3D（复制变换修改器3D）<- BoneConstraint3D（骨骼约束3D）

将 `BoneConstraint3D.set_reference_bone` 设置的骨骼的复制变换，通过一些掩码和选项处理后，应用于 `BoneConstraint3D.set_apply_bone` 设置的骨骼。根据 `set_relative` 和 `set_additive` 的组合，有 4 种应用变换的方式：**相对 + 叠加：** - 提取相对于休止位的参考姿势并添加到应用骨骼的姿势。**相对 + 非叠加：** - 提取相对于休止位的参考姿势并添加到应用骨骼的休止位。**非相对 + 叠加：** - 绝对提取参考姿势并添加到应用骨骼的姿势。**非相对 + 非叠加：** - 绝对提取参考姿势，应用骨骼的姿势被替换为它。**注意：** 相对选项仅在 `BoneConstraint3D.get_reference_type` 为 `BoneConstraint3D.REFERENCE_TYPE_BONE` 时可用。另请参见 `BoneConstraint3D.ReferenceType`。

**属性（Props）：**
- setting_count: int = 0 —— 设置数量

**方法（Methods）：**
- get_axis_flags(index: int) -> int —— 获取轴标志
- get_copy_flags(index: int) -> int —— 获取复制标志
- get_invert_flags(index: int) -> int —— 获取反转标志
- is_additive(index: int) -> bool —— 是否为叠加
- is_axis_x_enabled(index: int) -> bool —— X 轴是否启用
- is_axis_x_inverted(index: int) -> bool —— X 轴是否反转
- is_axis_y_enabled(index: int) -> bool —— Y 轴是否启用
- is_axis_y_inverted(index: int) -> bool —— Y 轴是否反转
- is_axis_z_enabled(index: int) -> bool —— Z 轴是否启用
- is_axis_z_inverted(index: int) -> bool —— Z 轴是否反转
- is_position_copying(index: int) -> bool —— 是否复制位置
- is_relative(index: int) -> bool —— 是否为相对
- is_rotation_copying(index: int) -> bool —— 是否复制旋转
- is_scale_copying(index: int) -> bool —— 是否复制缩放
- set_additive(index: int, enabled: bool) —— 设置叠加
- set_axis_flags(index: int, axis_flags: int) —— 设置轴标志
- set_axis_x_enabled(index: int, enabled: bool) —— 设置 X 轴启用
- set_axis_x_inverted(index: int, enabled: bool) —— 设置 X 轴反转
- set_axis_y_enabled(index: int, enabled: bool) —— 设置 Y 轴启用
- set_axis_y_inverted(index: int, enabled: bool) —— 设置 Y 轴反转
- set_axis_z_enabled(index: int, enabled: bool) —— 设置 Z 轴启用
- set_axis_z_inverted(index: int, enabled: bool) —— 设置 Z 轴反转
- set_copy_flags(index: int, copy_flags: int) —— 设置复制标志
- set_copy_position(index: int, enabled: bool) —— 设置复制位置
- set_copy_rotation(index: int, enabled: bool) —— 设置复制旋转
- set_copy_scale(index: int, enabled: bool) —— 设置复制缩放
- set_invert_flags(index: int, axis_flags: int) —— 设置反转标志
- set_relative(index: int, enabled: bool) —— 设置相对

**枚举（Enums）：**
**TransformFlag（变换标志）：** TRANSFORM_FLAG_POSITION=1 —— 位置标志，TRANSFORM_FLAG_ROTATION=2 —— 旋转标志，TRANSFORM_FLAG_SCALE=4 —— 缩放标志，TRANSFORM_FLAG_ALL=7 —— 全部标志
**AxisFlag（轴标志）：** AXIS_FLAG_X=1 —— X 轴标志，AXIS_FLAG_Y=2 —— Y 轴标志，AXIS_FLAG_Z=4 —— Z 轴标志，AXIS_FLAG_ALL=7 —— 全部标志
