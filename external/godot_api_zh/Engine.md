## Engine（引擎） <- Object（对象）

Engine 单例允许你查询和修改项目的运行时参数，如每秒帧数、时间缩放等。它还存储有关当前 Godot 构建版本的信息，如当前版本号。

**属性（Props）：**
- max_fps: int = 0 —— 最大 FPS
- max_physics_steps_per_frame: int = 8 —— 每帧最大物理步数
- physics_jitter_fix: float = 0.5 —— 物理抖动修正
- physics_ticks_per_second: int = 60 —— 每秒物理滴答数
- print_error_messages: bool = true —— 是否打印错误消息
- print_to_stdout: bool = true —— 是否输出到标准输出
- time_scale: float = 1.0 —— 时间缩放

**方法（Methods）：**
- capture_script_backtraces(include_variables: bool = false) -> ScriptBacktrace[] —— 捕获脚本回溯
- get_architecture_name() -> String —— 获取架构名称
- get_author_info() -> Dictionary —— 获取作者信息
- get_copyright_info() -> Dictionary[] —— 获取版权信息
- get_donor_info() -> Dictionary —— 获取捐赠者信息
- get_frames_drawn() -> int —— 获取已绘制帧数
- get_frames_per_second() -> float —— 获取每秒帧数
- get_license_info() -> Dictionary —— 获取许可证信息
- get_license_text() -> String —— 获取许可证文本
- get_main_loop() -> MainLoop —— 获取主循环
- get_physics_frames() -> int —— 获取物理帧数
- get_physics_interpolation_fraction() -> float —— 获取物理插值分数
- get_process_frames() -> int —— 获取处理帧数
- get_script_language(index: int) -> ScriptLanguage —— 获取脚本语言
- get_script_language_count() -> int —— 获取脚本语言数量
- get_singleton(name: StringName) -> Object —— 获取单例
- get_singleton_list() -> PackedStringArray —— 获取单例列表
- get_version_info() -> Dictionary —— 获取版本信息
- get_write_movie_path() -> String —— 获取录制电影路径
- has_singleton(name: StringName) -> bool —— 是否有单例
- is_editor_hint() -> bool —— 是否为编辑器提示
- is_embedded_in_editor() -> bool —— 是否嵌入在编辑器中
- is_in_physics_frame() -> bool —— 是否在物理帧中
- register_script_language(language: ScriptLanguage) -> int —— 注册脚本语言
- register_singleton(name: StringName, instance: Object) —— 注册单例
- unregister_script_language(language: ScriptLanguage) -> int —— 注销脚本语言
- unregister_singleton(name: StringName) —— 注销单例
