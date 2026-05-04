## Skin（皮肤） <- Resource（资源）

**Methods（方法）：**
- add_bind(bone: int, pose: Transform3D) —— 添加绑定
- add_named_bind(name: String, pose: Transform3D) —— 添加命名的绑定
- clear_binds() —— 清除所有绑定
- get_bind_bone(bind_index: int) -> int —— 获取指定绑定索引的骨骼
- get_bind_count() -> int —— 获取绑定数量
- get_bind_name(bind_index: int) -> StringName —— 获取指定绑定索引的名称
- get_bind_pose(bind_index: int) -> Transform3D —— 获取指定绑定索引的姿势
- set_bind_bone(bind_index: int, bone: int) —— 设置指定绑定索引的骨骼
- set_bind_count(bind_count: int) —— 设置绑定数量
- set_bind_name(bind_index: int, name: StringName) —— 设置指定绑定索引的名称
- set_bind_pose(bind_index: int, pose: Transform3D) —— 设置指定绑定索引的姿势
