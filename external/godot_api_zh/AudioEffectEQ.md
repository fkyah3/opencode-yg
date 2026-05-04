## AudioEffectEQ（音频效果均衡器）<- AudioEffect（音频效果）

AudioEffectEQ 让你控制频率。用于补偿音频中现有的不足。AudioEffectEQ 在 Master 总线上非常有用，可以完全掌控混音并赋予其更多特色。当游戏在移动设备上运行时，它们也很有用，可以针对这类扬声器调整混音（可以在插入耳机时添加但禁用）。

**方法（Methods）：**
- get_band_count() -> int
- get_band_gain_db(band_idx: int) -> float
- set_band_gain_db(band_idx: int, volume_db: float)
