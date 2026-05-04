## VideoStreamPlayback（视频流播放器）<- Resource（资源）

此类旨在供视频解码扩展重写，以实现自定义的 VideoStream。

**方法（Methods）：**
- mix_audio(num_frames: int, buffer: PackedFloat32Array = PackedFloat32Array(), offset: int = 0) -> int —— 混音音频
