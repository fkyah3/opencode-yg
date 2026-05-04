## AnimationNodeStateMachineTransition（动画节点状态机过渡） <- Resource（资源）

使用 `AnimationNodeStateMachinePlayback.travel` 时生成的路径限于由 AnimationNodeStateMachineTransition 连接的节点。你可以详细设置过渡的时序和条件。

**属性（Props）：**
- advance_condition: StringName = &"" —— 前进条件
- advance_expression: String = "" —— 前进表达式
- advance_mode: int (AnimationNodeStateMachineTransition.AdvanceMode) = 1 —— 前进模式
- break_loop_at_end: bool = false —— 结束时打破循环
- priority: int = 1 —— 优先级
- reset: bool = true —— 重置
- switch_mode: int (AnimationNodeStateMachineTransition.SwitchMode) = 0 —— 切换模式
- xfade_curve: Curve —— 交叉淡入淡出曲线
- xfade_time: float = 0.0 —— 交叉淡入淡出时间

**信号（Signals）：**
- advance_condition_changed —— 前进条件改变

**枚举（Enums）：**
**SwitchMode（切换模式）：** SWITCH_MODE_IMMEDIATE=0, SWITCH_MODE_SYNC=1, SWITCH_MODE_AT_END=2
**AdvanceMode（前进模式）：** ADVANCE_MODE_DISABLED=0, ADVANCE_MODE_ENABLED=1, ADVANCE_MODE_AUTO=2
