## AudioEffectPhaser（移相音频效果） <- AudioEffect（音频效果）

将移相信号与原始信号混合。移相信号的移动由低频振荡器控制。

**属性（Props）：**
- depth: float = 1.0 —— 效果深度
- feedback: float = 0.7 —— 反馈量
- range_max_hz: float = 1600.0 —— 最大频率范围（赫兹）
- range_min_hz: float = 440.0 —— 最小频率范围（赫兹）
- rate_hz: float = 0.5 —— 调制速率（赫兹）
