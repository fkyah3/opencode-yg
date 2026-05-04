## AnimationNodeStateMachinePlayback（动画节点状态机回放） <- Resource（资源）

允许控制使用 AnimationNodeStateMachine 创建的 AnimationTree 状态机。通过 `$AnimationTree.get("parameters/playback")` 获取。

**属性（Props）：**
- resource_local_to_scene: bool = true —— 资源本地化到场景

**方法（Methods）：**
- get_current_length() -> float —— 获取当前长度
- get_current_node() -> StringName —— 获取当前节点
- get_current_play_position() -> float —— 获取当前播放位置
- get_fading_from_length() -> float —— 获取淡出源长度
- get_fading_from_node() -> StringName —— 获取淡出源节点
- get_fading_from_play_position() -> float —— 获取淡出源播放位置
- get_fading_length() -> float —— 获取淡出长度
- get_fading_position() -> float —— 获取淡出位置
- get_travel_path() -> StringName[] —— 获取行进路径
- is_playing() -> bool —— 是否正在播放
- next() —— 下一个
- start(node: StringName, reset: bool = true) —— 开始
- stop() —— 停止
- travel(to_node: StringName, reset_on_teleport: bool = true) —— 行进到节点

**信号（Signals）：**
- state_finished(state: StringName) —— 状态完成
- state_started(state: StringName) —— 状态开始
