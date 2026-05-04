## OS <- Object（对象）

OS 类封装了与宿主操作系统通信的最常用功能，例如视频驱动、延迟、环境变量、执行二进制文件、命令行等。**注意：** 在 Godot 4 中，与窗口管理、剪贴板和 TTS 相关的 OS 函数已移至 DisplayServer 单例（和 Window 类）。与时间相关的函数已被移除，仅在 Time 类中可用。

**属性（Props）：**
- delta_smoothing: bool = true —— 增量平滑
- low_processor_usage_mode: bool = false —— 低处理器使用模式
- low_processor_usage_mode_sleep_usec: int = 6900 —— 低处理器使用模式睡眠微秒数

**方法（Methods）：**
- add_logger(logger: Logger) —— 添加日志记录器
- alert(text: String, title: String = "Alert!") —— 显示警报
- close_midi_inputs() —— 关闭 MIDI 输入
- crash(message: String) —— 崩溃（测试用）
- create_instance(arguments: PackedStringArray) -> int —— 创建实例
- create_process(path: String, arguments: PackedStringArray, open_console: bool = false) -> int —— 创建进程
- delay_msec(msec: int) —— 延迟毫秒数
- delay_usec(usec: int) —— 延迟微秒数
- execute(path: String, arguments: PackedStringArray, output: Array = [], read_stderr: bool = false, open_console: bool = false) -> int —— 执行命令
- execute_with_pipe(path: String, arguments: PackedStringArray, blocking: bool = true) -> Dictionary —— 通过管道执行命令
- find_keycode_from_string(string: String) -> int —— 从字符串查找键码
- get_cache_dir() -> String —— 获取缓存目录
- get_cmdline_args() -> PackedStringArray —— 获取命令行参数
- get_cmdline_user_args() -> PackedStringArray —— 获取用户命令行参数
- get_config_dir() -> String —— 获取配置目录
- get_connected_midi_inputs() -> PackedStringArray —— 获取已连接的 MIDI 输入
- get_data_dir() -> String —— 获取数据目录
- get_distribution_name() -> String —— 获取发行版名称
- get_entropy(size: int) -> PackedByteArray —— 获取熵
- get_environment(variable: String) -> String —— 获取环境变量
- get_executable_path() -> String —— 获取可执行文件路径
- get_granted_permissions() -> PackedStringArray —— 获取已授予的权限
- get_keycode_string(code: int) -> String —— 获取键码字符串
- get_locale() -> String —— 获取区域设置
- get_locale_language() -> String —— 获取区域语言
- get_main_thread_id() -> int —— 获取主线程 ID
- get_memory_info() -> Dictionary —— 获取内存信息
- get_model_name() -> String —— 获取设备型号名称
- get_name() -> String —— 获取操作系统名称
- get_process_exit_code(pid: int) -> int —— 获取进程退出码
- get_process_id() -> int —— 获取进程 ID
- get_processor_count() -> int —— 获取处理器数量
- get_processor_name() -> String —— 获取处理器名称
- get_restart_on_exit_arguments() -> PackedStringArray —— 获取退出时重启参数
- get_static_memory_peak_usage() -> int —— 获取静态内存峰值使用量
- get_static_memory_usage() -> int —— 获取静态内存使用量
- get_stderr_type() -> int —— 获取标准错误类型
- get_stdin_type() -> int —— 获取标准输入类型
- get_stdout_type() -> int —— 获取标准输出类型
- get_system_ca_certificates() -> String —— 获取系统 CA 证书
- get_system_dir(dir: int, shared_storage: bool = true) -> String —— 获取系统目录
- get_system_font_path(font_name: String, weight: int = 400, stretch: int = 100, italic: bool = false) -> String —— 获取系统字体路径
- get_system_font_path_for_text(font_name: String, text: String, locale: String = "", script: String = "", weight: int = 400, stretch: int = 100, italic: bool = false) -> PackedStringArray —— 获取匹配文本的系统字体路径
- get_system_fonts() -> PackedStringArray —— 获取系统字体列表
- get_temp_dir() -> String —— 获取临时目录
- get_thread_caller_id() -> int —— 获取线程调用者 ID
- get_unique_id() -> String —— 获取唯一 ID
- get_user_data_dir() -> String —— 获取用户数据目录
- get_version() -> String —— 获取版本
- get_version_alias() -> String —— 获取版本别名
- get_video_adapter_driver_info() -> PackedStringArray —— 获取显卡驱动信息
- has_environment(variable: String) -> bool —— 是否存在环境变量
- has_feature(tag_name: String) -> bool —— 是否具有指定功能
- is_debug_build() -> bool —— 是否为调试构建
- is_keycode_unicode(code: int) -> bool —— 键码是否为 Unicode
- is_process_running(pid: int) -> bool —— 进程是否在运行
- is_restart_on_exit_set() -> bool —— 是否设置了退出重启
- is_sandboxed() -> bool —— 是否在沙箱中运行
- is_stdout_verbose() -> bool —— 标准输出是否为详细模式
- is_userfs_persistent() -> bool —— 用户文件系统是否持久化
- kill(pid: int) -> int —— 终止进程
- move_to_trash(path: String) -> int —— 移动到回收站
- open_midi_inputs() —— 打开 MIDI 输入
- open_with_program(program_path: String, paths: PackedStringArray) -> int —— 使用指定程序打开
- read_buffer_from_stdin(buffer_size: int = 1024) -> PackedByteArray —— 从标准输入读取缓冲区
- read_string_from_stdin(buffer_size: int = 1024) -> String —— 从标准输入读取字符串
- remove_logger(logger: Logger) —— 移除日志记录器
- request_permission(name: String) -> bool —— 请求权限
- request_permissions() -> bool —— 请求所有权限
- revoke_granted_permissions() —— 撤销已授予的权限
- set_environment(variable: String, value: String) —— 设置环境变量
- set_restart_on_exit(restart: bool, arguments: PackedStringArray = PackedStringArray()) —— 设置退出时重启
- set_thread_name(name: String) -> int —— 设置线程名称
- set_use_file_access_save_and_swap(enabled: bool) —— 设置使用文件访问保存与交换
- shell_open(uri: String) -> int —— 使用系统默认方式打开
- shell_show_in_file_manager(file_or_dir_path: String, open_folder: bool = true) -> int —— 在文件管理器中显示
- unset_environment(variable: String) —— 取消设置环境变量

**枚举（Enums）：**
**RenderingDriver（渲染驱动）：** RENDERING_DRIVER_VULKAN=0 —— Vulkan, RENDERING_DRIVER_OPENGL3=1 —— OpenGL 3, RENDERING_DRIVER_D3D12=2 —— Direct3D 12, RENDERING_DRIVER_METAL=3 —— Metal
**SystemDir（系统目录）：** SYSTEM_DIR_DESKTOP=0 —— 桌面, SYSTEM_DIR_DCIM=1 —— 相册, SYSTEM_DIR_DOCUMENTS=2 —— 文档, SYSTEM_DIR_DOWNLOADS=3 —— 下载, SYSTEM_DIR_MOVIES=4 —— 电影, SYSTEM_DIR_MUSIC=5 —— 音乐, SYSTEM_DIR_PICTURES=6 —— 图片, SYSTEM_DIR_RINGTONES=7 —— 铃声
**StdHandleType（标准句柄类型）：** STD_HANDLE_INVALID=0 —— 无效, STD_HANDLE_CONSOLE=1 —— 控制台, STD_HANDLE_FILE=2 —— 文件, STD_HANDLE_PIPE=3 —— 管道, STD_HANDLE_UNKNOWN=4 —— 未知
