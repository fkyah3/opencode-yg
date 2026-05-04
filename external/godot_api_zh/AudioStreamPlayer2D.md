## AudioStreamPlayer2D（音频流播放器2D）<- Node2D

播放随与监听器的距离而衰减的音频。默认情况下，从屏幕中心听到音频。可以通过在场景中添加 AudioListener2D 节点并调用 `AudioListener2D.make_current` 来启用它来改变这一行为。另请参见 AudioStreamPlayer 以非定位方式播放声音。**注意：** 隐藏 AudioStreamPlayer2D 节点不会禁用其音频输出。要临时禁用 AudioStreamPlayer2D 的音频输出，请将 `volume_db` 设置为非常低的值，例如 `-100`（人耳无法听到）。

**属性（Props）：**
- area_mask: int = 1
- attenuation: float = 1.0
- autoplay: bool = false
- bus: StringName = &"Master"
- max_distance: float = 2000.0
- max_polyphony: int = 1
- panning_strength: float = 1.0
- pitch_scale: float = 1.0
- playback_type: int (AudioServer.PlaybackType) = 0
- playing: bool = false
- stream: AudioStream
- stream_paused: bool = false
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
