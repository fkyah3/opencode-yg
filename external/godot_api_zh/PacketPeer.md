## PacketPeer（数据包对端）<- RefCounted（引用计数）

PacketPeer 是基于数据包的协议（如 UDP）的抽象和基类。它提供用于发送和接收数据包（原始数据或变量）的 API。这使得在不将数据编码为低级字节或担心网络字节序的情况下轻松传输数据。**注意：** 导出到 Android 时，请确保在 Android 导出预设中启用 `INTERNET` 权限，然后再导出项目或使用一键部署。否则，任何类型的网络通信都将被 Android 阻止。

**属性（Props）：**
- encode_buffer_max_size: int = 8388608 —— 编码缓冲区最大大小

**方法（Methods）：**
- get_available_packet_count() -> int —— 获取可用数据包数量
- get_packet() -> PackedByteArray —— 获取数据包
- get_packet_error() -> int —— 获取数据包错误
- get_var(allow_objects: bool = false) -> Variant —— 获取变量
- put_packet(buffer: PackedByteArray) -> int —— 发送数据包
- put_var(var: Variant, full_objects: bool = false) -> int —— 发送变量
