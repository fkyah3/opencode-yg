## SpriteFrames（精灵帧）<- Resource（资源）

用于 AnimatedSprite2D 或 AnimatedSprite3D 节点的精灵帧库。包含用于播放的帧和动画数据。

**方法（Methods）：**
- add_animation(anim: StringName) —— 添加动画
- add_frame(anim: StringName, texture: Texture2D, duration: float = 1.0, at_position: int = -1) —— 添加帧
- clear(anim: StringName) —— 清除动画
- clear_all() —— 清除所有
- duplicate_animation(anim_from: StringName, anim_to: StringName) —— 复制动画
- get_animation_loop(anim: StringName) -> bool —— 获取动画循环
- get_animation_names() -> PackedStringArray —— 获取动画名称列表
- get_animation_speed(anim: StringName) -> float —— 获取动画速度
- get_frame_count(anim: StringName) -> int —— 获取帧数量
- get_frame_duration(anim: StringName, idx: int) -> float —— 获取帧时长
- get_frame_texture(anim: StringName, idx: int) -> Texture2D —— 获取帧纹理
- has_animation(anim: StringName) -> bool —— 是否有动画
- remove_animation(anim: StringName) —— 移除动画
- remove_frame(anim: StringName, idx: int) —— 移除帧
- rename_animation(anim: StringName, newname: StringName) —— 重命名动画
- set_animation_loop(anim: StringName, loop: bool) —— 设置动画循环
- set_animation_speed(anim: StringName, fps: float) —— 设置动画速度
- set_frame(anim: StringName, idx: int, texture: Texture2D, duration: float = 1.0) —— 设置帧
