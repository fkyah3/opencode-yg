## AudioStreamPlayback（音频流播放） <- RefCounted（引用计数）

可以播放、循环、暂停和滚动浏览音频。用法见 AudioStream 和 AudioStreamOggVorbis。

**Methods（方法）：**
- get_loop_count() -> int —— 获取循环次数
- get_playback_position() -> float —— 获取播放位置
- get_sample_playback() -> AudioSamplePlayback —— 获取音频样本播放
- is_playing() -> bool —— 是否正在播放
- mix_audio(rate_scale: float, frames: int) -> PackedVector2Array —— 混音音频
- seek(time: float = 0.0) —— 跳转到指定位置
- set_sample_playback(playback_sample: AudioSamplePlayback) —— 设置音频样本播放
- start(from_pos: float = 0.0) —— 开始播放
- stop() —— 停止播放
