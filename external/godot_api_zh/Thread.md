## Thread（线程） <- RefCounted（引用计数）

进程中的执行单元。可以同时在对象上运行方法。如果处理共享对象，建议通过 Mutex 或 Semaphore 使用同步。**警告：** 为确保正确清理而不发生崩溃或死锁，当 Thread 的引用计数归零并被销毁时，必须满足以下条件：- 它不能锁定任何 Mutex 对象。- 它不能在任何 Semaphore 对象上等待。- 应在其上调用过 `wait_to_finish`。

**方法（Methods）：**
- get_id() -> String —— 获取ID
- is_alive() -> bool —— 是否存活
- is_main_thread() -> bool —— 是否为主线程
- is_started() -> bool —— 是否已启动
- set_thread_safety_checks_enabled(enabled: bool) —— 设置线程安全检查启用
- start(callable: Callable, priority: int = 1) -> int —— 启动
- wait_to_finish() -> Variant —— 等待完成

**枚举（Enums）：**
**Priority（优先级）：** PRIORITY_LOW=0, PRIORITY_NORMAL=1, PRIORITY_HIGH=2
