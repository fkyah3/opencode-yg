## AudioStreamPolyphonic（音频流复音）<- AudioStream（音频流）

允许用户随时从代码中同时使用单个播放器播放自定义流的音频流。播放控制通过设置在播放器中的 AudioStreamPlaybackPolyphonic 实例完成，可通过 `AudioStreamPlayer.get_stream_playback`、`AudioStreamPlayer2D.get_stream_playback` 或 `AudioStreamPlayer3D.get_stream_playback` 方法获取。仅当在这些播放器中将 `stream` 属性设置为 AudioStreamPolyphonic 后，获取播放实例才有效。

**属性（Props）：**
- polyphony: int = 32 —— 复音数
