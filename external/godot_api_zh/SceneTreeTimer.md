## SceneTreeTimer（场景树计时器） <- RefCounted（引用计数）

由场景树管理的单次计时器，完成时发出 `timeout` 信号。另请参见 `SceneTree.create_timer`。与 Timer 不同，它不需要实例化节点。通常用于创建单次延迟计时器，如下例所示：计时器在时间到达后会自动解除引用。要保留计时器，可以持有对其的引用。参见 RefCounted。**注意：** 计时器在当前帧所有节点之后处理，即节点的 `Node._process` 方法会在计时器之前调用（如果 `SceneTree.create_timer` 中的 `process_in_physics` 设置为 `true`，则 `Node._physics_process` 也会在计时器之前调用）。

**属性（Props）：**
- time_left: float —— 剩余时间

**信号（Signals）：**
- timeout —— 超时
