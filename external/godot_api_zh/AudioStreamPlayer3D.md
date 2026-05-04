## AudioStreamPlayer3D（音频流播放器3D）<- Node3D

基于音频监听器的相对位置播放具有位置音效的音频。位置效果包括距离衰减、方向性和多普勒效应。为获得更真实的效果，会对远处的声音应用低通滤波器。可以通过将 `attenuation_filter_cutoff_hz` 设置为 `20500` 来禁用此效果。默认情况下，从摄像机位置听到音频。可以通过在场景中添加 AudioListener3D 节点并调用 `AudioListener3D.make_current` 来启用它来改变这一行为。另请参见 AudioStreamPlayer 以非定位方式播放声音。**注意：** 隐藏 AudioStreamPlayer3D 节点不会禁用其音频输出。要临时禁用 AudioStreamPlayer3D 的音频输出，请将 `volume_db` 设置为非常低的值，例如 `-100`（人耳无法听到）。

**属性（Props）：**
- area_mask: int = 1
- attenuation_filter_cutoff_hz: float = 5000.0
- attenuation_filter_db: float = -24.0
- attenuation_model: int (AudioStreamPlayer3D.AttenuationModel) = 0
- autoplay: bool = false
- bus: StringName = &"Master"
- doppler_tracking: int (AudioStreamPlayer3D.DopplerTracking) = 0
- emission_angle_degrees: float = 45.0
- emission_angle_enabled: bool = false
- emission_angle_filter_attenuation_db: float = -12.0
- max_db: float = 3.0
- max_distance: float = 0.0
- max_polyphony: int = 1
- panning_strength: float = 1.0
- pitch_scale: float = 1.0
- playback_type: int (AudioServer.PlaybackType) = 0
- playing: bool = false
- stream: AudioStream
- stream_paused: bool = false
- unit_size: float = 10.0
- volume_db: float = 0.0
- volume_linear: float

**方法（Methods）：**
- get_playback_position() -> float
- get_stream_playback() -> AudioStreamPlayback
- has_stream_playback() -> bool
- play(from_position: float = 0.0)
- seek(to_position: float)
- stop()

**信号（Signals）：**
- finished

**枚举（Enums）：**
**AttenuationModel（衰减模型）：** ATTENUATION_INVERSE_DISTANCE=0, ATTENUATION_INVERSE_SQUARE_DISTANCE=1, ATTENUATION_LOGARITHMIC=2, ATTENUATION_DISABLED=3
**DopplerTracking（多普勒追踪）：** DOPPLER_TRACKING_DISABLED=0, DOPPLER_TRACKING_IDLE_STEP=1, DOPPLER_TRACKING_PHYSICS_STEP=2
