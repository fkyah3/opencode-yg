## WorkerThreadPool <- Object（对象）

WorkerThreadPool 单例在项目启动时分配一组线程（称为工作线程），并提供将任务卸载到这些线程的方法。这可用于简单的多线程编程，无需创建 Threads。任务持有要由线程运行的 Callable。WorkerThreadPool 可以创建常规任务（由一个工作线程执行）或组任务（可分布在多个工作线程之间）。组任务多次执行 Callable，因此适用于迭代大量元素，如竞技场中的敌人。以下是将耗时函数卸载到工作线程的示例：上述代码依赖于 `enemies` 数组中的元素数量在多线程部分保持恒定。**注意：** 如果在线程间分配的任务计算量不大，使用此单例可能会对性能产生负面影响。

**方法（Methods）：**
- add_group_task(action: Callable, elements: int, tasks_needed: int = -1, high_priority: bool = false, description: String = "") -> int —— 添加组任务
- add_task(action: Callable, high_priority: bool = false, description: String = "") -> int —— 添加任务
- get_caller_group_id() -> int —— 获取调用者组ID
- get_caller_task_id() -> int —— 获取调用者任务ID
- get_group_processed_element_count(group_id: int) -> int —— 获取组已处理的元素数量
- is_group_task_completed(group_id: int) -> bool —— 组任务是否完成
- is_task_completed(task_id: int) -> bool —— 任务是否完成
- wait_for_group_task_completion(group_id: int) —— 等待组任务完成
- wait_for_task_completion(task_id: int) -> int —— 等待任务完成
