## AnimationMixer（动画混合器）<- Node

AnimationPlayer 和 AnimationTree 的基类，用于管理动画列表。它还包含用于播放和混合的通用属性和方法。在扩展类中实例化播放信息数据后，由 AnimationMixer 处理混合操作。

**属性（Props）：**
- active: bool = true
- audio_max_polyphony: int = 32
- callback_mode_discrete: int (AnimationMixer.AnimationCallbackModeDiscrete) = 1
- callback_mode_method: int (AnimationMixer.AnimationCallbackModeMethod) = 0
- callback_mode_process: int (AnimationMixer.AnimationCallbackModeProcess) = 1
- deterministic: bool = false
- reset_on_save: bool = true
- root_motion_local: bool = false
- root_motion_track: NodePath = NodePath("")
- root_node: NodePath = NodePath("..")

**方法（Methods）：**
- add_animation_library(name: StringName, library: AnimationLibrary) -> int
- advance(delta: float)
- capture(name: StringName, duration: float, trans_type: int = 0, ease_type: int = 0)
- clear_caches()
- find_animation(animation: Animation) -> StringName
- find_animation_library(animation: Animation) -> StringName
- get_animation(name: StringName) -> Animation
- get_animation_library(name: StringName) -> AnimationLibrary
- get_animation_library_list() -> StringName[]
- get_animation_list() -> PackedStringArray
- get_root_motion_position() -> Vector3
- get_root_motion_position_accumulator() -> Vector3
- get_root_motion_rotation() -> Quaternion
- get_root_motion_rotation_accumulator() -> Quaternion
- get_root_motion_scale() -> Vector3
- get_root_motion_scale_accumulator() -> Vector3
- has_animation(name: StringName) -> bool
- has_animation_library(name: StringName) -> bool
- remove_animation_library(name: StringName)
- rename_animation_library(name: StringName, newname: StringName)

**信号（Signals）：**
- animation_finished(anim_name: StringName)
- animation_libraries_updated
- animation_list_changed
- animation_started(anim_name: StringName)
- caches_cleared
- mixer_applied
- mixer_updated

**枚举（Enums）：**
**AnimationCallbackModeProcess（动画回调模式-处理）：** ANIMATION_CALLBACK_MODE_PROCESS_PHYSICS=0, ANIMATION_CALLBACK_MODE_PROCESS_IDLE=1, ANIMATION_CALLBACK_MODE_PROCESS_MANUAL=2
**AnimationCallbackModeMethod（动画回调模式-方法）：** ANIMATION_CALLBACK_MODE_METHOD_DEFERRED=0, ANIMATION_CALLBACK_MODE_METHOD_IMMEDIATE=1
**AnimationCallbackModeDiscrete（动画回调模式-离散）：** ANIMATION_CALLBACK_MODE_DISCRETE_DOMINANT=0, ANIMATION_CALLBACK_MODE_DISCRETE_RECESSIVE=1, ANIMATION_CALLBACK_MODE_DISCRETE_FORCE_CONTINUOUS=2
