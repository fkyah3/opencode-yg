## AudioStreamMicrophone（音频流麦克风） <- AudioStream（音频流）

当直接在 AudioStreamPlayer 节点中使用时，AudioStreamMicrophone 实时播放麦克风输入。这可以与 AudioEffectCapture 结合使用以处理数据或保存数据。**注意：** `ProjectSettings.audio/driver/enable_input` 必须为 `true` 才能使音频输入工作。另请参阅该设置的描述，了解与权限和操作系统隐私设置相关的注意事项。
