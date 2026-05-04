## AudioEffectCompressor（音频效果压缩器）<- AudioEffect

动态范围压缩器在声音振幅超过特定分贝阈值时降低其电平。压缩器的主要用途之一是以尽可能少的裁剪（当声音超过 0dB 时）增加动态范围。压缩器在混音中有许多用途：- 在主总线上压缩整个输出（尽管 AudioEffectHardLimiter 可能更合适）。- 在语音通道中确保它们听起来尽可能平衡。- 侧链压缩。这可以通过另一个音频总线进行阈值检测来降低侧链声音的电平。这种技术在游戏混音中常见，在语音播报时降低音乐和音效的电平。- 通过使用较宽的启动时间突出瞬态，使效果听起来更有冲击力。

**属性（Props）：**
- attack_us: float = 20.0
- gain: float = 0.0
- mix: float = 1.0
- ratio: float = 4.0
- release_ms: float = 250.0
- sidechain: StringName = &""
- threshold: float = 0.0
