## FileAccess（文件访问） <- RefCounted（引用计数）

该类可用于在用户设备的文件系统中永久存储数据以及从中读取数据。这对于存储游戏存档数据或玩家配置文件非常有用。**示例：** 如何写入和读取文件。名为 `"save_game.dat"` 的文件将存储在用户数据文件夹中，如文档所述：FileAccess 实例有自己的文件游标，即文件中下一个读/写操作将发生的位置（以字节为单位）。诸如 `get_8`、`get_16`、`store_8` 和 `store_16` 等函数会将文件游标向前移动已读/写的字节数。文件游标可以使用 `seek` 或 `seek_end` 移动到特定位置，其位置可以使用 `get_position` 获取。FileAccess 实例在释放时会关闭其文件。由于它继承自 RefCounted，当不再使用时会自动发生。可以调用 `close` 提前关闭。在 C# 中，必须手动处理引用，可以使用 `using` 语句或直接调用 `Dispose` 方法。**注意：** 导出后访问项目资源，建议使用 ResourceLoader 而非 FileAccess，因为某些文件被转换为引擎特定格式，其原始源文件可能不在导出的 PCK 包中。如果使用 FileAccess，请确保在 Import 面板中将文件的导入模式更改为 **Keep File (exported as is)** 以将其包含在导出中；对于没有此选项的文件，请在 Export 对话框中的非资源导出过滤器中添加文件扩展名（如 `*.txt`）。**注意：** 仅当进程"正常"退出时（如单击窗口管理器的关闭按钮或按 [kbd]Alt + F4[/kbd]），文件才会自动关闭。如果在项目运行时按 [kbd]F8[/kbd] 停止项目执行，文件将不会关闭，因为游戏进程会被终止。可以通过在...

**属性（Props）：**
- big_endian: bool —— 是否为大端

**方法（Methods）：**
- close() —— 关闭
- create_temp(mode_flags: int, prefix: String = "", extension: String = "", keep: bool = false) -> FileAccess —— 创建临时文件
- eof_reached() -> bool —— 是否到达文件末尾
- file_exists(path: String) -> bool —— 文件是否存在
- flush() —— 刷新
- get_8() -> int —— 读取 8 位
- get_16() -> int —— 读取 16 位
- get_32() -> int —— 读取 32 位
- get_64() -> int —— 读取 64 位
- get_access_time(file: String) -> int —— 获取访问时间
- get_as_text() -> String —— 以文本形式获取
- get_buffer(length: int) -> PackedByteArray —— 获取缓冲区
- get_csv_line(delim: String = ",") -> PackedStringArray —— 获取 CSV 行
- get_double() -> float —— 读取 double
- get_error() -> int —— 获取错误码
- get_extended_attribute(file: String, attribute_name: String) -> PackedByteArray —— 获取扩展属性
- get_extended_attribute_string(file: String, attribute_name: String) -> String —— 获取扩展属性字符串
- get_extended_attributes_list(file: String) -> PackedStringArray —— 获取扩展属性列表
- get_file_as_bytes(path: String) -> PackedByteArray —— 以字节形式获取文件
- get_file_as_string(path: String) -> String —— 以字符串形式获取文件
- get_float() -> float —— 读取 float
- get_half() -> float —— 读取 half
- get_hidden_attribute(file: String) -> bool —— 获取隐藏属性
- get_length() -> int —— 获取长度
- get_line() -> String —— 读取行
- get_md5(path: String) -> String —— 获取 MD5
- get_modified_time(file: String) -> int —— 获取修改时间
- get_open_error() -> int —— 获取打开错误码
- get_pascal_string() -> String —— 读取 Pascal 字符串
- get_path() -> String —— 获取路径
- get_path_absolute() -> String —— 获取绝对路径
- get_position() -> int —— 获取位置
- get_read_only_attribute(file: String) -> bool —— 获取只读属性
- get_real() -> float —— 读取实数
- get_sha256(path: String) -> String —— 获取 SHA256
- get_size(file: String) -> int —— 获取大小
- get_unix_permissions(file: String) -> int —— 获取 Unix 权限
- get_var(allow_objects: bool = false) -> Variant —— 读取变量
- is_open() -> bool —— 是否打开
- open(path: String, flags: int) -> FileAccess —— 打开
- open_compressed(path: String, mode_flags: int, compression_mode: int = 0) -> FileAccess —— 打开压缩文件
- open_encrypted(path: String, mode_flags: int, key: PackedByteArray, iv: PackedByteArray = PackedByteArray()) -> FileAccess —— 打开加密文件
- open_encrypted_with_pass(path: String, mode_flags: int, pass: String) -> FileAccess —— 用密码打开加密文件
- remove_extended_attribute(file: String, attribute_name: String) -> int —— 移除扩展属性
- resize(length: int) -> int —— 调整大小
- seek(position: int) —— 定位
- seek_end(position: int = 0) —— 定位到末尾
- set_extended_attribute(file: String, attribute_name: String, data: PackedByteArray) -> int —— 设置扩展属性
- set_extended_attribute_string(file: String, attribute_name: String, data: String) -> int —— 设置扩展属性字符串
- set_hidden_attribute(file: String, hidden: bool) -> int —— 设置隐藏属性
- set_read_only_attribute(file: String, ro: bool) -> int —— 设置只读属性
- set_unix_permissions(file: String, permissions: int) -> int —— 设置 Unix 权限
- store_8(value: int) -> bool —— 写入 8 位
- store_16(value: int) -> bool —— 写入 16 位
- store_32(value: int) -> bool —— 写入 32 位
- store_64(value: int) -> bool —— 写入 64 位
- store_buffer(buffer: PackedByteArray) -> bool —— 写入缓冲区
- store_csv_line(values: PackedStringArray, delim: String = ",") -> bool —— 写入 CSV 行
- store_double(value: float) -> bool —— 写入 double
- store_float(value: float) -> bool —— 写入 float
- store_half(value: float) -> bool —— 写入 half
- store_line(line: String) -> bool —— 写入行
- store_pascal_string(string: String) -> bool —— 写入 Pascal 字符串
- store_real(value: float) -> bool —— 写入实数
- store_string(string: String) -> bool —— 写入字符串
- store_var(value: Variant, full_objects: bool = false) -> bool —— 写入变量

**枚举（Enums）：**
**ModeFlags（模式标志）：** READ=1（读取）, WRITE=2（写入）, READ_WRITE=3（读写）, WRITE_READ=7（写入后读取）
**CompressionMode（压缩模式）：** COMPRESSION_FASTLZ=0, COMPRESSION_DEFLATE=1, COMPRESSION_ZSTD=2, COMPRESSION_GZIP=3, COMPRESSION_BROTLI=4
**UnixPermissionFlags（Unix 权限标志）：** UNIX_READ_OWNER=256（所有者读）, UNIX_WRITE_OWNER=128（所有者写）, UNIX_EXECUTE_OWNER=64（所有者执行）, UNIX_READ_GROUP=32（组读）, UNIX_WRITE_GROUP=16（组写）, UNIX_EXECUTE_GROUP=8（组执行）, UNIX_READ_OTHER=4（其他读）, UNIX_WRITE_OTHER=2（其他写）, UNIX_EXECUTE_OTHER=1（其他执行）, UNIX_SET_USER_ID=2048（设置用户 ID）, ...
