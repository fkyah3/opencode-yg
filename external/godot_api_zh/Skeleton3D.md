## Skeleton3D（骨架3D）<- Node3D（节点3D）

Skeleton3D 提供了管理骨骼层次结构的接口，包括姿势、静止姿势和动画（参见 Animation）。它还可以使用布娃娃物理。骨骼相对于骨架的整体变换由骨骼姿势决定。骨骼静止姿势定义骨骼姿势的初始变换。请注意，下面的"全局姿势"指的是骨骼相对于骨架的整体变换，因此它不是骨骼的实际全局/世界变换。

**属性（Props）：**
- animate_physical_bones: bool = true —— 动画物理骨骼
- modifier_callback_mode_process: int (Skeleton3D.ModifierCallbackModeProcess) = 1 —— 修改器回调模式
- motion_scale: float = 1.0 —— 运动缩放
- show_rest_only: bool = false —— 仅显示静止姿势

**方法（Methods）：**
- add_bone(name: String) -> int —— 添加骨骼
- advance(delta: float) —— 推进
- clear_bones() —— 清除所有骨骼
- clear_bones_global_pose_override() —— 清除所有骨骼全局姿势覆盖
- create_skin_from_rest_transforms() -> Skin —— 从静止变换创建皮肤
- find_bone(name: String) -> int —— 查找骨骼
- force_update_all_bone_transforms() —— 强制更新所有骨骼变换
- force_update_bone_child_transform(bone_idx: int) —— 强制更新骨骼子变换
- get_bone_children(bone_idx: int) -> PackedInt32Array —— 获取骨骼子级
- get_bone_count() -> int —— 获取骨骼数量
- get_bone_global_pose(bone_idx: int) -> Transform3D —— 获取骨骼全局姿势
- get_bone_global_pose_no_override(bone_idx: int) -> Transform3D —— 获取骨骼全局姿势（无覆盖）
- get_bone_global_pose_override(bone_idx: int) -> Transform3D —— 获取骨骼全局姿势覆盖
- get_bone_global_rest(bone_idx: int) -> Transform3D —— 获取骨骼全局静止姿势
- get_bone_meta(bone_idx: int, key: StringName) -> Variant —— 获取骨骼元数据
- get_bone_meta_list(bone_idx: int) -> StringName[] —— 获取骨骼元数据列表
- get_bone_name(bone_idx: int) -> String —— 获取骨骼名称
- get_bone_parent(bone_idx: int) -> int —— 获取骨骼父级
- get_bone_pose(bone_idx: int) -> Transform3D —— 获取骨骼姿势
- get_bone_pose_position(bone_idx: int) -> Vector3 —— 获取骨骼姿势位置
- get_bone_pose_rotation(bone_idx: int) -> Quaternion —— 获取骨骼姿势旋转
- get_bone_pose_scale(bone_idx: int) -> Vector3 —— 获取骨骼姿势缩放
- get_bone_rest(bone_idx: int) -> Transform3D —— 获取骨骼静止姿势
- get_concatenated_bone_names() -> StringName —— 获取拼接的骨骼名称
- get_parentless_bones() -> PackedInt32Array —— 获取无父级骨骼
- get_version() -> int —— 获取版本
- has_bone_meta(bone_idx: int, key: StringName) -> bool —— 是否有骨骼元数据
- is_bone_enabled(bone_idx: int) -> bool —— 骨骼是否启用
- localize_rests() —— 局部化静止姿势
- physical_bones_add_collision_exception(exception: RID) —— 物理骨骼添加碰撞例外
- physical_bones_remove_collision_exception(exception: RID) —— 物理骨骼移除碰撞例外
- physical_bones_start_simulation(bones: StringName[] = []) —— 物理骨骼开始模拟
- physical_bones_stop_simulation() —— 物理骨骼停止模拟
- register_skin(skin: Skin) -> SkinReference —— 注册皮肤
- reset_bone_pose(bone_idx: int) —— 重置骨骼姿势
- reset_bone_poses() —— 重置所有骨骼姿势
- set_bone_enabled(bone_idx: int, enabled: bool = true) —— 设置骨骼启用
- set_bone_global_pose(bone_idx: int, pose: Transform3D) —— 设置骨骼全局姿势
- set_bone_global_pose_override(bone_idx: int, pose: Transform3D, amount: float, persistent: bool = false) —— 设置骨骼全局姿势覆盖
- set_bone_meta(bone_idx: int, key: StringName, value: Variant) —— 设置骨骼元数据
- set_bone_name(bone_idx: int, name: String) —— 设置骨骼名称
- set_bone_parent(bone_idx: int, parent_idx: int) —— 设置骨骼父级
- set_bone_pose(bone_idx: int, pose: Transform3D) —— 设置骨骼姿势
- set_bone_pose_position(bone_idx: int, position: Vector3) —— 设置骨骼姿势位置
- set_bone_pose_rotation(bone_idx: int, rotation: Quaternion) —— 设置骨骼姿势旋转
- set_bone_pose_scale(bone_idx: int, scale: Vector3) —— 设置骨骼姿势缩放
- set_bone_rest(bone_idx: int, rest: Transform3D) —— 设置骨骼静止姿势
- unparent_bone_and_rest(bone_idx: int) —— 解除骨骼父子关系并重置静止姿势

**信号（Signals）：**
- bone_enabled_changed(bone_idx: int) —— 骨骼启用状态已更改
- bone_list_changed —— 骨骼列表已更改
- pose_updated —— 姿势已更新
- rest_updated —— 静止姿势已更新
- show_rest_only_changed —— 仅显示静止姿势状态已更改
- skeleton_updated —— 骨架已更新

**枚举（Enums）：**
**常量：** NOTIFICATION_UPDATE_SKELETON=50 —— 更新骨架通知
**ModifierCallbackModeProcess（修改器回调模式）：** MODIFIER_CALLBACK_MODE_PROCESS_PHYSICS=0 —— 物理帧回调, MODIFIER_CALLBACK_MODE_PROCESS_IDLE=1 —— 空闲帧回调, MODIFIER_CALLBACK_MODE_PROCESS_MANUAL=2 —— 手动回调
