## AudioEffectReverb（混响音频效果） <- AudioEffect（音频效果）

模拟声学环境的声音，例如房间、音乐厅、洞穴或开阔空间。

**属性（Props）：**
- damping: float = 0.5 —— 高频阻尼
- dry: float = 1.0 —— 干声比例
- hipass: float = 0.0 —— 高通滤波
- predelay_feedback: float = 0.4 —— 预延迟反馈
- predelay_msec: float = 150.0 —— 预延迟时间（毫秒）
- room_size: float = 0.8 —— 房间大小
- spread: float = 1.0 —— 扩散度
- wet: float = 0.5 —— 湿声比例
