## AudioStreamGeneratorPlayback（音频流生成器回放） <- AudioStreamPlaybackResampled（重采样音频流回放）

此类用于与 AudioStreamGenerator 配合，实时回放生成的音频。

**方法（Methods）：**
- can_push_buffer(amount: int) -> bool —— 是否可以推入缓冲区
- clear_buffer() —— 清空缓冲区
- get_frames_available() -> int —— 获取可用帧数
- get_skips() -> int —— 获取跳过的帧数
- push_buffer(frames: PackedVector2Array) -> bool —— 推入帧缓冲区
- push_frame(frame: Vector2) -> bool —— 推入单帧
