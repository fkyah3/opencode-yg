## PCKPacker（PCK打包器） <- RefCounted（引用计数）

PCKPacker 用于创建可以加载到运行中项目的包，使用 `ProjectSettings.load_resource_pack`。上面的 PCKPacker 创建包 `test.pck`，然后在包根目录添加名为 `text.txt` 的文件。**注意：** PCK 是 Godot 自己的包文件格式。要创建任何程序都能读取的 ZIP 归档，请改用 ZIPPacker。

**方法（Methods）：**
- add_file(target_path: String, source_path: String, encrypt: bool = false) -> int —— 添加文件
- add_file_from_buffer(target_path: String, data: PackedByteArray, encrypt: bool = false) -> int —— 从缓冲区添加文件
- add_file_removal(target_path: String) -> int —— 添加文件移除记录
- flush(verbose: bool = false) -> int —— 刷新
- pck_start(pck_path: String, alignment: int = 32, key: String = "0000000000000000000000000000000000000000000000000000000000000000", encrypt_directory: bool = false) -> int —— 开始PCK
