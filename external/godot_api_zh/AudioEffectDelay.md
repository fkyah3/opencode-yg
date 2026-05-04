## AudioEffectDelay（音频延迟效果） <- AudioEffect（音频效果）

在一段时间后回放输入信号。延迟信号可以多次回放，以产生重复衰减回声的效果。延迟效果范围从微弱的回声效果到新旧声音的明显混合。

**属性（Props）：**
- dry: float = 1.0 —— 干声比例
- feedback_active: bool = false —— 是否启用反馈
- feedback_delay_ms: float = 340.0 —— 反馈延迟毫秒数
- feedback_level_db: float = -6.0 —— 反馈电平（分贝）
- feedback_lowpass: float = 16000.0 —— 反馈低通滤波
- tap1_active: bool = true —— 是否启用拍 1
- tap1_delay_ms: float = 250.0 —— 拍 1 延迟毫秒数
- tap1_level_db: float = -6.0 —— 拍 1 电平（分贝）
- tap1_pan: float = 0.2 —— 拍 1 声像
- tap2_active: bool = true —— 是否启用拍 2
- tap2_delay_ms: float = 500.0 —— 拍 2 延迟毫秒数
- tap2_level_db: float = -12.0 —— 拍 2 电平（分贝）
- tap2_pan: float = -0.4 —— 拍 2 声像
