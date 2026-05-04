## AudioStreamWAV（音频流WAV）<- AudioStream

AudioStreamWAV 存储从 WAV 文件加载的声音采样。要播放存储的声音，请使用 AudioStreamPlayer（非定位音频）或 AudioStreamPlayer2D/AudioStreamPlayer3D（定位音频）。声音可以循环播放。此类也可用于存储动态生成的 PCM 音频数据。另请参见 AudioStreamGenerator 以了解程序化音频生成。

**属性（Props）：**
- data: PackedByteArray = PackedByteArray()
- format: int (AudioStreamWAV.Format) = 0
- loop_begin: int = 0
- loop_end: int = 0
- loop_mode: int (AudioStreamWAV.LoopMode) = 0
- mix_rate: int = 44100
- stereo: bool = false
- tags: Dictionary = {}

**方法（Methods）：**
- load_from_buffer(stream_data: PackedByteArray, options: Dictionary = {}) -> AudioStreamWAV
- load_from_file(path: String, options: Dictionary = {}) -> AudioStreamWAV
- save_to_wav(path: String) -> int

**枚举（Enums）：**
**Format（格式）：** FORMAT_8_BITS=0, FORMAT_16_BITS=1, FORMAT_IMA_ADPCM=2, FORMAT_QOA=3
**LoopMode（循环模式）：** LOOP_DISABLED=0, LOOP_FORWARD=1, LOOP_PINGPONG=2, LOOP_BACKWARD=3
