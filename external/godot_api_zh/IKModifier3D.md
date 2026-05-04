## IKModifier3D（逆运动学修改器3D） <- SkeletonModifier3D（骨骼修改器3D）

具有关节列表并应用逆运动学的 SkeletonModifier3D 基类。包含一些用于求解逆运动学的结构体、枚举和辅助方法。

**属性（Props）：**
- mutable_bone_axes: bool = true —— 骨骼轴是否可变

**方法（Methods）：**
- clear_settings() —— 清除设置
- get_setting_count() -> int —— 获取设置数量
- reset() —— 重置
- set_setting_count(count: int) —— 设置设置数量
