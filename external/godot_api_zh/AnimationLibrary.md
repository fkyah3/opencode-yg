## AnimationLibrary（动画库）<- Resource（资源）

动画库存储一组可通过 StringName 键访问的动画，供 AnimationPlayer 节点使用。

**方法（Methods）：**
- add_animation(name: StringName, animation: Animation) -> int —— 添加动画
- get_animation(name: StringName) -> Animation —— 获取动画
- get_animation_list() -> StringName[] —— 获取动画列表
- get_animation_list_size() -> int —— 获取动画列表大小
- has_animation(name: StringName) -> bool —— 是否有动画
- remove_animation(name: StringName) —— 移除动画
- rename_animation(name: StringName, newname: StringName) —— 重命名动画

**信号（Signals）：**
- animation_added(name: StringName) —— 动画已添加
- animation_changed(name: StringName) —— 动画已更改
- animation_removed(name: StringName) —— 动画已移除
- animation_renamed(name: StringName, to_name: StringName) —— 动画已重命名
