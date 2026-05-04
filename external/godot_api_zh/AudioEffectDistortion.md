## AudioEffectDistortion（音频效果失真）<- AudioEffect（音频效果）

提供多种失真类型：clip（削波）、tan（正切）、lo-fi（位压缩）、overdrive（过载）或 waveshape（波形塑形）。通过失真波形改变频率内容，通常会使声音变得"嘎吱作响"或"刺耳"。对于游戏来说，它可以非常高效地模拟来自某些饱和设备或扬声器的声音。

**属性（Props）：**
- drive: float = 0.0 —— 驱动量
- keep_hf_hz: float = 16000.0 —— 保留高频截止频率
- mode: int (AudioEffectDistortion.Mode) = 0 —— 失真模式
- post_gain: float = 0.0 —— 后增益
- pre_gain: float = 0.0 —— 前增益

**枚举（Enums）：**
**Mode：** MODE_CLIP=0 —— 削波, MODE_ATAN=1 —— 反正切, MODE_LOFI=2 —— 低保真, MODE_OVERDRIVE=3 —— 过载, MODE_WAVESHAPE=4 —— 波形塑形
