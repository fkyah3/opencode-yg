## PacketPeerStream（数据包对等流）<- PacketPeer（数据包对等）

PacketStreamPeer 提供了在流上使用数据包工作的包装器。这允许将基于数据包的代码与 StreamPeer 一起使用。PacketPeerStream 在 StreamPeer 之上实现了自定义协议，因此用户不应直接读取或写入包装的 StreamPeer。**注意：** 导出到 Android 时，请确保在 Android 导出预设中启用 `INTERNET` 权限，然后再导出项目或使用一键部署。否则，任何类型的网络通信都会被 Android 阻止。

**属性（Props）：**
- input_buffer_max_size: int = 65532 —— 输入缓冲区最大大小
- output_buffer_max_size: int = 65532 —— 输出缓冲区最大大小
- stream_peer: StreamPeer —— 流对等体
