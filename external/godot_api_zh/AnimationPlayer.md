## AnimationPlayer（动画播放器）<- AnimationMixer

AnimationPlayer 用于通用动画播放。它包含 AnimationLibrary 资源的字典以及动画过渡之间的自定义混合时间。某些方法和属性使用单个键直接引用动画。这些键的格式为库的键，后跟正斜杠，再跟库中动画的键，例如 `"movement/run"`。如果库的键为空字符串（称为默认库），则省略正斜杠，使用与库相同的键。AnimationPlayer 比 Tween 更适合复杂的动画，例如具有复杂时间控制的动画。如果动画轨道编辑器比代码更方便，也可以用来代替 Tween。目标属性的更新在处理帧进行。

**属性（Props）：**
- assigned_animation: StringName
- autoplay: StringName = &""
- current_animation: StringName = &""
- current_animation_length: float
- current_animation_position: float
- movie_quit_on_finish: bool = false
- playback_auto_capture: bool = true
- playback_auto_capture_duration: float = -1.0
- playback_auto_capture_ease_type: int (Tween.EaseType) = 0
- playback_auto_capture_transition_type: int (Tween.TransitionType) = 0
- playback_default_blend_time: float = 0.0
- speed_scale: float = 1.0

**方法（Methods）：**
- animation_get_next(animation_from: StringName) -> StringName
- animation_set_next(animation_from: StringName, animation_to: StringName)
- clear_queue()
- get_blend_time(animation_from: StringName, animation_to: StringName) -> float
- get_method_call_mode() -> int
- get_playing_speed() -> float
- get_process_callback() -> int
- get_queue() -> StringName[]
- get_root() -> NodePath
- get_section_end_time() -> float
- get_section_start_time() -> float
- has_section() -> bool
- is_animation_active() -> bool
- is_playing() -> bool
- pause()
- play(name: StringName = &"", custom_blend: float = -1, custom_speed: float = 1.0, from_end: bool = false)
- play_backwards(name: StringName = &"", custom_blend: float = -1)
- play_section(name: StringName = &"", start_time: float = -1, end_time: float = -1, custom_blend: float = -1, custom_speed: float = 1.0, from_end: bool = false)
- play_section_backwards(name: StringName = &"", start_time: float = -1, end_time: float = -1, custom_blend: float = -1)
- play_section_with_markers(name: StringName = &"", start_marker: StringName = &"", end_marker: StringName = &"", custom_blend: float = -1, custom_speed: float = 1.0, from_end: bool = false)
- play_section_with_markers_backwards(name: StringName = &"", start_marker: StringName = &"", end_marker: StringName = &"", custom_blend: float = -1)
- play_with_capture(name: StringName = &"", duration: float = -1.0, custom_blend: float = -1, custom_speed: float = 1.0, from_end: bool = false, trans_type: int = 0, ease_type: int = 0)
- queue(name: StringName)
- reset_section()
- seek(seconds: float, update: bool = false, update_only: bool = false)
- set_blend_time(animation_from: StringName, animation_to: StringName, sec: float)
- set_method_call_mode(mode: int)
- set_process_callback(mode: int)
- set_root(path: NodePath)
- set_section(start_time: float = -1, end_time: float = -1)
- set_section_with_markers(start_marker: StringName = &"", end_marker: StringName = &"")
- stop(keep_state: bool = false)

**信号（Signals）：**
- animation_changed(old_name: StringName, new_name: StringName)
- current_animation_changed(name: StringName)

**枚举（Enums）：**
**AnimationProcessCallback（动画处理回调）：** ANIMATION_PROCESS_PHYSICS=0, ANIMATION_PROCESS_IDLE=1, ANIMATION_PROCESS_MANUAL=2
**AnimationMethodCallMode（动画方法调用模式）：** ANIMATION_METHOD_CALL_DEFERRED=0, ANIMATION_METHOD_CALL_IMMEDIATE=1
