## AudioEffectSpectrumAnalyzer（音频效果频谱分析器）<- AudioEffect（音频效果）

此音频效果不影响声音输出，但可用于实时音频可视化。此资源配置 AudioEffectSpectrumAnalyzerInstance，后者在运行时执行实际分析。实例可通过 `AudioServer.get_bus_effect_instance` 获取。另请参阅 AudioStreamGenerator 以了解程序化生成声音。

**属性（Props）：**
- buffer_length: float = 2.0 —— 缓冲区长度
- fft_size: int (AudioEffectSpectrumAnalyzer.FFTSize) = 2 —— FFT大小

**枚举（Enums）：**
**FFTSize（FFT大小）：** FFT_SIZE_256=0，FFT_SIZE_512=1，FFT_SIZE_1024=2，FFT_SIZE_2048=3，FFT_SIZE_4096=4，FFT_SIZE_MAX=5
