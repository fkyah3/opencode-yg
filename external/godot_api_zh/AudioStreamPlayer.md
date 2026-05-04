## AudioStreamPlayer（音频流播放器）<- Node

AudioStreamPlayer 节点非定位地播放音频流。非常适合用户界面、菜单或背景音乐。要使用此节点，需要将 `stream` 设置为有效的 AudioStream 资源。同时支持播放多个声音，参见 `max_polyphony`。如果需要在特定位置播放音频，请改用 AudioStreamPlayer2D 或 AudioStreamPlayer3D。

**属性（Props）：**
- autoplay: bool = false
- bus: StringName = &"Master"
- max_polyphony: int = 1
- mix_target: int (AudioStreamPlayer.MixTarget) = 0
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

**枚举（Enums）：**
**MixTarget（混音目标）：** MIX_TARGET_STEREO=0, MIX_TARGET_SURROUND=1, MIX_TARGET_CENTER=2
