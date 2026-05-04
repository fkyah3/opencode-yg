## AudioEffectRecord（音频效果录制） <- AudioEffect（音频效果）

允许用户将音频总线的声音录制到 AudioStreamWAV 中。当在"Master"音频总线上使用时，这包括 Godot 的所有音频输出。与 AudioEffectCapture 不同，此效果以指定格式（8位、16位或压缩）对录制进行编码，而不是提供对原始音频样本的访问。可以与 AudioStreamMicrophone 一起用于从麦克风录制。**注意：** `ProjectSettings.audio/driver/enable_input` 必须为 `true` 才能使音频输入工作。另请参见该设置的描述，了解与权限和操作系统隐私设置相关的注意事项。

**属性（Props）：**
- format: int (AudioStreamWAV.Format) = 1 —— 格式

**方法（Methods）：**
- get_recording() -> AudioStreamWAV —— 获取录制
- is_recording_active() -> bool —— 录制是否激活
- set_recording_active(record: bool) —— 设置录制激活
