## AnimationNodeAnimation（动画节点动画）<- AnimationRootNode（动画根节点）

添加到 AnimationNodeBlendTree 的资源。仅有一个使用 `animation` 属性的输出端口。用作混合动画的 AnimationNode 的输入。

**属性（Props）：**
- advance_on_start: bool = false —— 启动时前进
- animation: StringName = &"" —— 动画名称
- loop_mode: int (Animation.LoopMode) —— 循环模式
- play_mode: int (AnimationNodeAnimation.PlayMode) = 0 —— 播放模式
- start_offset: float —— 起始偏移
- stretch_time_scale: bool —— 拉伸时间缩放
- timeline_length: float —— 时间线长度
- use_custom_timeline: bool = false —— 使用自定义时间线

**枚举（Enums）：**
**PlayMode：** PLAY_MODE_FORWARD=0 —— 正向播放, PLAY_MODE_BACKWARD=1 —— 反向播放
