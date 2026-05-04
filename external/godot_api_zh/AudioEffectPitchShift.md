## AudioEffectPitchShift（音高偏移音频效果） <- AudioEffect（音频效果）

允许独立于速度调制音高。可以增加/降低所有频率，同时对瞬态的影响最小。

**属性（Props）：**
- fft_size: int (AudioEffectPitchShift.FFTSize) = 3 —— FFT 大小
- oversampling: int = 4 —— 过采样率
- pitch_scale: float = 1.0 —— 音高比例

**枚举（Enums）：**
**FFTSize（FFT大小）：** FFT_SIZE_256=0, FFT_SIZE_512=1, FFT_SIZE_1024=2, FFT_SIZE_2048=3, FFT_SIZE_4096=4, FFT_SIZE_MAX=5
