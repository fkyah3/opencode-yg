## EngineDebugger（引擎调试器） <- Object（对象）

EngineDebugger 处理编辑器与运行中的游戏之间的通信。它在运行中的游戏中处于活动状态。可以通过它发送/接收消息。它还管理性能分析器。

**方法（Methods）：**
- clear_breakpoints() —— 清除断点
- debug(can_continue: bool = true, is_error_breakpoint: bool = false) —— 调试
- get_depth() -> int —— 获取深度
- get_lines_left() -> int —— 获取剩余行数
- has_capture(name: StringName) -> bool —— 是否有捕获
- has_profiler(name: StringName) -> bool —— 是否有分析器
- insert_breakpoint(line: int, source: StringName) —— 插入断点
- is_active() -> bool —— 是否激活
- is_breakpoint(line: int, source: StringName) -> bool —— 是否为断点
- is_profiling(name: StringName) -> bool —— 是否正在分析
- is_skipping_breakpoints() -> bool —— 是否跳过断点
- line_poll() —— 行轮询
- profiler_add_frame_data(name: StringName, data: Array) —— 分析器添加帧数据
- profiler_enable(name: StringName, enable: bool, arguments: Array = []) —— 启用/禁用分析器
- register_message_capture(name: StringName, callable: Callable) —— 注册消息捕获
- register_profiler(name: StringName, profiler: EngineProfiler) —— 注册分析器
- remove_breakpoint(line: int, source: StringName) —— 移除断点
- script_debug(language: ScriptLanguage, can_continue: bool = true, is_error_breakpoint: bool = false) —— 脚本调试
- send_message(message: String, data: Array) —— 发送消息
- set_depth(depth: int) —— 设置深度
- set_lines_left(lines: int) —— 设置剩余行数
- unregister_message_capture(name: StringName) —— 注销消息捕获
- unregister_profiler(name: StringName) —— 注销分析器
