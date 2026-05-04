## Timer（计时器）<- Node（节点）

Timer 节点是一个倒计时计时器，是引擎中处理基于时间的逻辑的最简单方式。当计时器到达其 `wait_time` 结束时，它将发出 `timeout` 信号。计时器进入场景树后，可以通过 `start` 手动启动。如果 `autostart` 为 `true`，计时器节点也会自动启动。无需编写太多代码，即可在编辑器中添加和配置计时器节点。它发出的 `timeout` 信号也可以通过编辑器中的信号面板连接。**注意：** 要创建一次性计时器而无需实例化节点，请使用 `SceneTree.create_timer`。**注意：** 计时器受 `Engine.time_scale` 影响，除非 `ignore_time_scale` 为 `true`。时间比例越高，计时器结束得越快。计时器处理的频率可能取决于帧率或 `Engine.physics_ticks_per_second`。

**属性（Props）：**
- autostart: bool = false —— 自动启动
- ignore_time_scale: bool = false —— 忽略时间缩放
- one_shot: bool = false —— 单次触发
- paused: bool —— 暂停
- process_callback: int (Timer.TimerProcessCallback) = 1 —— 处理回调
- time_left: float —— 剩余时间
- wait_time: float = 1.0 —— 等待时间

**方法（Methods）：**
- is_stopped() -> bool —— 是否已停止
- start(time_sec: float = -1) —— 启动
- stop() —— 停止

**信号（Signals）：**
- timeout —— 超时

**枚举（Enums）：**
**TimerProcessCallback（计时器处理回调）：** TIMER_PROCESS_PHYSICS=0（物理帧处理），TIMER_PROCESS_IDLE=1（空闲帧处理）
