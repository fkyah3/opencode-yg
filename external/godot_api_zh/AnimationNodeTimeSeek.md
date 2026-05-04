## AnimationNodeTimeSeek（动画节点时间跳转） <- AnimationNode（动画节点）

此动画节点可用于对动画图中的任何子节点执行跳转命令。用于从起始位置或 AnimationNodeBlendTree 内的某个特定播放位置播放动画。设置时间并更改动画播放后，时间跳转节点会在下一个处理帧自动将其 `seek_request` 值设置为 `-1.0` 以进入休眠模式。

**Props（属性）：**
- explicit_elapse: bool = true —— 是否显式消逝
