## AnimationNodeOneShot（动画节点单次播放）<- AnimationNodeSync

可添加到 AnimationNodeBlendTree 的资源。此动画节点将执行一个子动画，完成后返回。淡入和淡出的混合时间以及过滤器均可自定义。设置请求并更改动画播放后，单次播放节点会在下一处理帧自动清除该请求，将其 `request` 值设置为 `ONE_SHOT_REQUEST_NONE`。

**属性（Props）：**
- abort_on_reset: bool = false
- autorestart: bool = false
- autorestart_delay: float = 1.0
- autorestart_random_delay: float = 0.0
- break_loop_at_end: bool = false
- fadein_curve: Curve
- fadein_time: float = 0.0
- fadeout_curve: Curve
- fadeout_time: float = 0.0
- mix_mode: int (AnimationNodeOneShot.MixMode) = 0

**枚举（Enums）：**
**OneShotRequest（单次播放请求）：** ONE_SHOT_REQUEST_NONE=0, ONE_SHOT_REQUEST_FIRE=1, ONE_SHOT_REQUEST_ABORT=2, ONE_SHOT_REQUEST_FADE_OUT=3
**MixMode（混合模式）：** MIX_MODE_BLEND=0, MIX_MODE_ADD=1
