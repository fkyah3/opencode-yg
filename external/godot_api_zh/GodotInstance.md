## GodotInstance（Godot实例） <- Object（对象）

GodotInstance 表示一个由外部代码库控制、无永久主循环的运行中 Godot 实例。通过 C API `libgodot_create_godot_instance` 创建。每个进程只能创建一个实例。

**方法（Methods）：**
- focus_in() —— 获得焦点
- focus_out() —— 失去焦点
- is_started() -> bool —— 是否已启动
- iteration() -> bool —— 执行一次迭代
- pause() —— 暂停
- resume() —— 恢复
- start() -> bool —— 启动
