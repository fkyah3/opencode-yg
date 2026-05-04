## AudioEffectCapture（音频效果捕获）<- AudioEffect

AudioEffectCapture 是一种 AudioEffect，它将来自所附加音频效果总线的所有音频帧复制到其内部环形缓冲区。应用程序代码应使用 `get_buffer` 从此环形缓冲区消费这些音频帧，并根据需要处理，例如捕获来自 AudioStreamMicrophone 的数据、实现应用自定义效果或通过网络传输音频。从麦克风捕获音频数据时，采样格式为立体声 32 位浮点 PCM。与 AudioEffectRecord 不同，此效果仅返回原始音频采样，而不是将其编码到 AudioStream 中。

**属性（Props）：**
- buffer_length: float = 0.1

**方法（Methods）：**
- can_get_buffer(frames: int) -> bool
- clear_buffer()
- get_buffer(frames: int) -> PackedVector2Array
- get_buffer_length_frames() -> int
- get_discarded_frames() -> int
- get_frames_available() -> int
- get_pushed_frames() -> int
