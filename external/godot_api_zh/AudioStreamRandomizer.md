## AudioStreamRandomizer（音频流随机化器） <- AudioStream（音频流）

根据播放模式从池中选择随机 AudioStream，并在播放过程中应用随机音调偏移和音量偏移。

**属性（Props）：**
- playback_mode: int (AudioStreamRandomizer.PlaybackMode) = 0 —— 播放模式
- random_pitch: float = 1.0 —— 随机音调
- random_pitch_semitones: float = 0.0 —— 随机音调半音数
- random_volume_offset_db: float = 0.0 —— 随机音量偏移分贝
- streams_count: int = 0 —— 流数量

**方法（Methods）：**
- add_stream(index: int, stream: AudioStream, weight: float = 1.0) —— 添加流
- get_stream(index: int) -> AudioStream —— 获取流
- get_stream_probability_weight(index: int) -> float —— 获取流概率权重
- move_stream(index_from: int, index_to: int) —— 移动流
- remove_stream(index: int) —— 移除流
- set_stream(index: int, stream: AudioStream) —— 设置流
- set_stream_probability_weight(index: int, weight: float) —— 设置流概率权重

**枚举（Enums）：**
**PlaybackMode（播放模式）：** PLAYBACK_RANDOM_NO_REPEATS=0, PLAYBACK_RANDOM=1, PLAYBACK_SEQUENTIAL=2
