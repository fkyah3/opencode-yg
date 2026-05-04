## AnimationTree（动画树）<- AnimationMixer

用于 AnimationPlayer 中高级动画过渡的节点。**注意：** 当与 AnimationPlayer 关联时，对应 AnimationPlayer 的若干属性和方法将无法按预期运行。播放和过渡应仅使用 AnimationTree 及其组成的 AnimationNode 处理。AnimationPlayer 节点应仅用于添加、删除和编辑动画。

**属性（Props）：**
- advance_expression_base_node: NodePath = NodePath(".")
- anim_player: NodePath = NodePath("")
- callback_mode_discrete: int (AnimationMixer.AnimationCallbackModeDiscrete) = 2
- deterministic: bool = true
- tree_root: AnimationRootNode

**方法（Methods）：**
- get_process_callback() -> int
- set_process_callback(mode: int)

**信号（Signals）：**
- animation_player_changed

**枚举（Enums）：**
**AnimationProcessCallback（动画处理回调）：** ANIMATION_PROCESS_PHYSICS=0, ANIMATION_PROCESS_IDLE=1, ANIMATION_PROCESS_MANUAL=2
