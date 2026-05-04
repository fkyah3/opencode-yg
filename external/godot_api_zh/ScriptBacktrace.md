## ScriptBacktrace（脚本回溯）<- RefCounted（引用计数）

ScriptBacktrace 保存特定脚本语言（如 GDScript 或 C#）已捕获的回溯信息，这些信息通过 `Engine.capture_script_backtraces` 捕获。参见 `ProjectSettings.debug/settings/gdscript/always_track_call_stacks` 和 `ProjectSettings.debug/settings/gdscript/always_track_local_variables` 了解控制此类内容的方法。

**方法（Methods）：**
- format(indent_all: int = 0, indent_frames: int = 4) -> String —— 格式化输出
- get_frame_count() -> int —— 获取帧数
- get_frame_file(index: int) -> String —— 获取帧对应文件
- get_frame_function(index: int) -> String —— 获取帧对应函数
- get_frame_line(index: int) -> int —— 获取帧对应行号
- get_global_variable_count() -> int —— 获取全局变量数
- get_global_variable_name(variable_index: int) -> String —— 获取全局变量名
- get_global_variable_value(variable_index: int) -> Variant —— 获取全局变量值
- get_language_name() -> String —— 获取语言名称
- get_local_variable_count(frame_index: int) -> int —— 获取局部变量数
- get_local_variable_name(frame_index: int, variable_index: int) -> String —— 获取局部变量名
- get_local_variable_value(frame_index: int, variable_index: int) -> Variant —— 获取局部变量值
- get_member_variable_count(frame_index: int) -> int —— 获取成员变量数
- get_member_variable_name(frame_index: int, variable_index: int) -> String —— 获取成员变量名
- get_member_variable_value(frame_index: int, variable_index: int) -> Variant —— 获取成员变量值
- is_empty() -> bool —— 是否为空
