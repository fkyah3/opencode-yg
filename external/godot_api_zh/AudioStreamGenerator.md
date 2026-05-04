## AudioStreamGenerator（音频流生成器）<- AudioStream

AudioStreamGenerator 是一种不会自行播放声音的音频流类型；相反，它期望脚本为其生成音频数据。另请参见 AudioStreamGeneratorPlayback。以下是使用它生成正弦波的示例：上例中，"AudioStreamPlayer"节点必须使用 AudioStreamGenerator 作为其流。`fill_buffer` 函数提供用于近似正弦波的音频数据。另请参见 AudioEffectSpectrumAnalyzer 以执行实时音频频谱分析。**注意：** 由于性能限制，此类最好从 C# 或通过 GDExtension 从编译语言使用。如果仍想从 GDScript 使用此类，请考虑使用较低的 `mix_rate`，例如 11,025 Hz 或 22,050 Hz。

**属性（Props）：**
- buffer_length: float = 0.5
- mix_rate: float = 44100.0
- mix_rate_mode: int (AudioStreamGenerator.AudioStreamGeneratorMixRate) = 2

**枚举（Enums）：**
**AudioStreamGeneratorMixRate（音频流生成器混音率）：** MIX_RATE_OUTPUT=0, MIX_RATE_INPUT=1, MIX_RATE_CUSTOM=2, MIX_RATE_MAX=3
