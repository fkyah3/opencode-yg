## DirAccess（目录访问） <- RefCounted（引用计数）

该类用于管理目录及其内容，甚至可以在项目文件夹之外使用。DirAccess 不能直接实例化。而是通过静态方法创建，该方法接收一个路径，并针对该路径打开。大多数方法都有静态替代版本，可以在不创建 DirAccess 的情况下使用。静态方法仅支持绝对路径（包括 `res://` 和 `user://`）。**注意：** 导出后访问项目（"res://"）目录可能会表现异常，因为某些文件被转换为引擎特定格式，其原始源文件可能不在预期的 PCK 包中。因此，要在导出的项目中访问资源，建议使用 ResourceLoader 而非 FileAccess。以下是如何遍历目录中文件的示例：请记住，文件名在导出后可能更改或重新映射。如果你想查看编辑器中实际的资源文件列表，请改用 `ResourceLoader.list_directory`。

**属性（Props）：**
- include_hidden: bool —— 是否包含隐藏文件
- include_navigational: bool —— 是否包含导航文件

**方法（Methods）：**
- change_dir(to_dir: String) -> int —— 更改目录
- copy(from: String, to: String, chmod_flags: int = -1) -> int —— 复制
- copy_absolute(from: String, to: String, chmod_flags: int = -1) -> int —— 使用绝对路径复制
- create_link(source: String, target: String) -> int —— 创建链接
- create_temp(prefix: String = "", keep: bool = false) -> DirAccess —— 创建临时目录
- current_is_dir() -> bool —— 当前是否为目录
- dir_exists(path: String) -> bool —— 目录是否存在
- dir_exists_absolute(path: String) -> bool —— 使用绝对路径检查目录是否存在
- file_exists(path: String) -> bool —— 文件是否存在
- get_current_dir(include_drive: bool = true) -> String —— 获取当前目录
- get_current_drive() -> int —— 获取当前驱动器
- get_directories() -> PackedStringArray —— 获取子目录列表
- get_directories_at(path: String) -> PackedStringArray —— 获取指定路径的子目录列表
- get_drive_count() -> int —— 获取驱动器数量
- get_drive_name(idx: int) -> String —— 获取驱动器名称
- get_files() -> PackedStringArray —— 获取文件列表
- get_files_at(path: String) -> PackedStringArray —— 获取指定路径的文件列表
- get_filesystem_type() -> String —— 获取文件系统类型
- get_next() -> String —— 获取下一个条目
- get_open_error() -> int —— 获取打开错误码
- get_space_left() -> int —— 获取剩余空间
- is_bundle(path: String) -> bool —— 是否为 bundle
- is_case_sensitive(path: String) -> bool —— 是否区分大小写
- is_equivalent(path_a: String, path_b: String) -> bool —— 是否等效
- is_link(path: String) -> bool —— 是否为链接
- list_dir_begin() -> int —— 开始列出目录
- list_dir_end() —— 结束列出目录
- make_dir(path: String) -> int —— 创建目录
- make_dir_absolute(path: String) -> int —— 使用绝对路径创建目录
- make_dir_recursive(path: String) -> int —— 递归创建目录
- make_dir_recursive_absolute(path: String) -> int —— 使用绝对路径递归创建目录
- open(path: String) -> DirAccess —— 打开目录
- read_link(path: String) -> String —— 读取链接
- remove(path: String) -> int —— 移除
- remove_absolute(path: String) -> int —— 使用绝对路径移除
- rename(from: String, to: String) -> int —— 重命名
- rename_absolute(from: String, to: String) -> int —— 使用绝对路径重命名
