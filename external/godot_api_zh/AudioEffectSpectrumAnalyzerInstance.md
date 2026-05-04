## AudioEffectSpectrumAnalyzerInstance（音频效果频谱分析器实例） <- AudioEffectInstance（音频效果实例）

AudioEffectSpectrumAnalyzer 的运行时部分，可用于查询其宿主总线上某一频率范围的幅度。此类的实例可以通过 `AudioServer.get_bus_effect_instance` 获得。

**方法（Methods）：**
- get_magnitude_for_frequency_range(from_hz: float, to_hz: float, mode: int = 1) -> Vector2 —— 获取频率范围的幅度

**枚举（Enums）：**
**MagnitudeMode（幅度模式）：** MAGNITUDE_AVERAGE=0 —— 平均幅度, MAGNITUDE_MAX=1 —— 最大幅度
