## StreamPeer（流对等体）<- RefCounted（引用计数）

StreamPeer 是一个抽象基类，主要用于基于流的协议（如 TCP）。它提供了通过流以原始数据或字符串形式发送和接收数据的 API。**注意：** 导出到 Android 时，请确保在 Android 导出预设中启用 `INTERNET` 权限，然后再导出项目或使用一键部署。否则，任何类型的网络通信都将被 Android 阻止。

**属性（Props）：**
- big_endian: bool = false —— 大端序

**方法（Methods）：**
- get_8() -> int —— 获取8位有符号整数
- get_16() -> int —— 获取16位有符号整数
- get_32() -> int —— 获取32位有符号整数
- get_64() -> int —— 获取64位有符号整数
- get_available_bytes() -> int —— 获取可用字节数
- get_data(bytes: int) -> Array —— 获取数据
- get_double() -> float —— 获取双精度浮点数
- get_float() -> float —— 获取单精度浮点数
- get_half() -> float —— 获取半精度浮点数
- get_partial_data(bytes: int) -> Array —— 获取部分数据
- get_string(bytes: int = -1) -> String —— 获取字符串
- get_u8() -> int —— 获取8位无符号整数
- get_u16() -> int —— 获取16位无符号整数
- get_u32() -> int —— 获取32位无符号整数
- get_u64() -> int —— 获取64位无符号整数
- get_utf8_string(bytes: int = -1) -> String —— 获取UTF-8字符串
- get_var(allow_objects: bool = false) -> Variant —— 获取变量
- put_8(value: int) —— 写入8位有符号整数
- put_16(value: int) —— 写入16位有符号整数
- put_32(value: int) —— 写入32位有符号整数
- put_64(value: int) —— 写入64位有符号整数
- put_data(data: PackedByteArray) -> int —— 写入数据
- put_double(value: float) —— 写入双精度浮点数
- put_float(value: float) —— 写入单精度浮点数
- put_half(value: float) —— 写入半精度浮点数
- put_partial_data(data: PackedByteArray) -> Array —— 写入部分数据
- put_string(value: String) —— 写入字符串
- put_u8(value: int) —— 写入8位无符号整数
- put_u16(value: int) —— 写入16位无符号整数
- put_u32(value: int) —— 写入32位无符号整数
- put_u64(value: int) —— 写入64位无符号整数
- put_utf8_string(value: String) —— 写入UTF-8字符串
- put_var(value: Variant, full_objects: bool = false) —— 写入变量
