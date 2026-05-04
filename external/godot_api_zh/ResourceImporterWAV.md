## ResourceImporterWAV（WAV 资源导入器） <- ResourceImporter（资源导入器）

WAV 是一种未压缩格式，可提供比 Ogg Vorbis 和 MP3 更高的质量。它的解码 CPU 开销也最低。这意味着即使是在低端设备上，也可以同时播放大量 WAV 音效。默认情况下，Godot 使用有损的 Quite OK Audio 压缩来导入 WAV 文件。可以通过设置 `compress/mode` 属性来更改此行为。

**属性（Props）：**
- compress/mode: int = 2 —— 压缩模式
- edit/loop_begin: int = 0 —— 循环起始点
- edit/loop_end: int = -1 —— 循环结束点
- edit/loop_mode: int = 0 —— 循环模式
- edit/normalize: bool = false —— 是否归一化
- edit/trim: bool = false —— 是否修剪
- force/8_bit: bool = false —— 强制 8 位
- force/max_rate: bool = false —— 强制最大采样率
- force/max_rate_hz: float = 44100 —— 强制最大采样率（赫兹）
- force/mono: bool = false —— 强制单声道
