## AudioStreamPlaybackPolyphonic（音频流播放复音） <- AudioStreamPlayback（音频流播放）

AudioStreamPolyphonic 的播放实例。在设置了 `stream` 属性后，可以通过调用 `AudioStreamPlayer.get_stream_playback`、`AudioStreamPlayer2D.get_stream_playback` 或 `AudioStreamPlayer3D.get_stream_playback` 方法来获取播放实例。

**方法（Methods）：**
- is_stream_playing(stream: int) -> bool —— 流是否正在播放
- play_stream(stream: AudioStream, from_offset: float = 0, volume_db: float = 0, pitch_scale: float = 1.0, playback_type: int = 0, bus: StringName = &"Master") -> int —— 播放流
- set_stream_pitch_scale(stream: int, pitch_scale: float) —— 设置流音调缩放
- set_stream_volume(stream: int, volume_db: float) —— 设置流音量
- stop_stream(stream: int) —— 停止流

**枚举（Enums）：**
**常量（Constants）：** INVALID_ID=-1
