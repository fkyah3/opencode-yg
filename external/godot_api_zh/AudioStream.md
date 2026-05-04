## AudioStream（音频流） <- Resource（资源）

音频流的基类。音频流用于音效和音乐播放，支持 WAV（通过 AudioStreamWAV）和 Ogg（通过 AudioStreamOggVorbis）文件格式。

**方法（Methods）：**
- can_be_sampled() -> bool —— 是否可以被采样
- generate_sample() -> AudioSample —— 生成样本
- get_length() -> float —— 获取长度
- instantiate_playback() -> AudioStreamPlayback —— 实例化播放
- is_meta_stream() -> bool —— 是否为元流
- is_monophonic() -> bool —— 是否为单声道

**信号（Signals）：**
- parameter_list_changed —— 参数列表已更改
