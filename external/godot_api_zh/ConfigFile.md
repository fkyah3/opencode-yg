## ConfigFile（配置文件）<- RefCounted（引用计数）

此辅助类可用于使用 INI 样式格式将 Variant 值存储在文件系统上。存储的值由 section（节）和 key（键）标识：`[codeblock lang=text] [section] some_key=42 string_example="Hello World3D!" a_vector=Vector3(1, 0, 2) [/codeblock]` 存储的数据可以保存到文件或从文件中解析，但 ConfigFile 对象也可以直接使用而无需访问文件系统。以下示例显示如何创建一个简单的 ConfigFile 并将其保存到磁盘：此示例显示如何加载上述文件：任何修改 ConfigFile 的操作（如 `set_value`、`clear` 或 `erase_section`）仅更改内存中加载的数据。如果要将更改写入文件，必须使用 `save`、`save_encrypted` 或 `save_encrypted_pass` 保存更改。请记住，节和属性名称不能包含空格。空格后的任何内容在保存和加载时都将被忽略。ConfigFile 还可以包含以分号（`;`）开头的手动编写的注释行。解析文件时将忽略这些行。注意，保存 ConfigFile 时注释将丢失。这对于专用服务器配置文件仍然有用，这些文件通常不会在没有用户明确操作的情况下被覆盖。**注意：** 赋予 ConfigFile 的文件扩展名对其格式或行为没有任何影响。按照惯例，这里使用 `.cfg` 扩展名，但任何其他扩展名（如 `.ini`）也是有效的。由于 `.cfg` 和 `.ini` 都没有标准化，Godot 的 ConfigFile 格式可能与其他程序写入的文件不同。

**方法（Methods）：**
- clear() —— 清除
- encode_to_text() -> String —— 编码为文本
- erase_section(section: String) —— 擦除节
- erase_section_key(section: String, key: String) —— 擦除节中的键
- get_section_keys(section: String) -> PackedStringArray —— 获取节的键列表
- get_sections() -> PackedStringArray —— 获取所有节
- get_value(section: String, key: String, default: Variant = null) -> Variant —— 获取值
- has_section(section: String) -> bool —— 是否有节
- has_section_key(section: String, key: String) -> bool —— 节中是否有键
- load(path: String) -> int —— 加载
- load_encrypted(path: String, key: PackedByteArray) -> int —— 加载加密文件（二进制密钥）
- load_encrypted_pass(path: String, password: String) -> int —— 加载加密文件（密码）
- parse(data: String) -> int —— 解析
- save(path: String) -> int —— 保存
- save_encrypted(path: String, key: PackedByteArray) -> int —— 保存加密文件（二进制密钥）
- save_encrypted_pass(path: String, password: String) -> int —— 保存加密文件（密码）
- set_value(section: String, key: String, value: Variant) —— 设置值
