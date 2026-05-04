## AudioEffectLimiter（音频效果限制器）<- AudioEffect（音频效果）

限制器类似于压缩器，但灵活性较低，旨在防止声音超过给定的分贝阈值。建议在 Master 总线上添加限制器以减少削波效应。软削波在略低于阈值的水平开始减少峰值，并随着输入电平的增加逐步增强效果，从而确保阈值永远不会被超过。

**属性（Props）：**
- ceiling_db: float = -0.1 —— 上限分贝
- soft_clip_db: float = 2.0 —— 软削波分贝
- soft_clip_ratio: float = 10.0 —— 软削波比率
- threshold_db: float = 0.0 —— 阈值分贝
