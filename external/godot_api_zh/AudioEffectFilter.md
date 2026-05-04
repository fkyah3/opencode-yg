## AudioEffectFilter（音频效果滤波器） <- AudioEffect（音频效果）

允许除 `cutoff_hz` 以外的频率通过。

**属性（Props）：**
- cutoff_hz: float = 2000.0 —— 截止频率
- db: int (AudioEffectFilter.FilterDB) = 0 —— 分贝斜率
- gain: float = 1.0 —— 增益
- resonance: float = 0.5 —— 共振

**枚举（Enums）：**
**FilterDB（滤波器分贝）：** FILTER_6DB=0, FILTER_12DB=1, FILTER_18DB=2, FILTER_24DB=3
