## AnimationNodeTransition（动画节点过渡）<- AnimationNodeSync

适用于不需要更高级的 AnimationNodeStateMachine 的简单状态机。动画可以连接到输入，并可以指定过渡时间。设置请求并更改动画播放后，过渡节点会在下一处理帧自动清除该请求，将其 `transition_request` 值设置为空。**注意：** 使用交叉淡入淡出时，`current_state` 和 `current_index` 在交叉淡入淡出开始后立即切换到下一状态。

**属性（Props）：**
- allow_transition_to_self: bool = false
- input_count: int = 0
- xfade_curve: Curve
- xfade_time: float = 0.0

**方法（Methods）：**
- is_input_loop_broken_at_end(input: int) -> bool
- is_input_reset(input: int) -> bool
- is_input_set_as_auto_advance(input: int) -> bool
- set_input_as_auto_advance(input: int, enable: bool)
- set_input_break_loop_at_end(input: int, enable: bool)
- set_input_reset(input: int, enable: bool)
