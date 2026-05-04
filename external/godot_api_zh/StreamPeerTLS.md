## StreamPeerTLS（流对等TLS） <- StreamPeer（流对等）

处理 TLS 连接的流对等。此对象可用于连接到 TLS 服务器或接受单个 TLS 客户端连接。**注意：** 导出到 Android 时，请确保在 Android 导出预设中启用 `INTERNET` 权限，然后再导出项目或使用一键部署。否则，任何类型的网络通信都将被 Android 阻止。

**方法（Methods）：**
- accept_stream(stream: StreamPeer, server_options: TLSOptions) -> int —— 接受流
- connect_to_stream(stream: StreamPeer, common_name: String, client_options: TLSOptions = null) -> int —— 连接到流
- disconnect_from_stream() —— 断开与流的连接
- get_status() -> int —— 获取状态
- get_stream() -> StreamPeer —— 获取流
- poll() —— 轮询

**枚举（Enums）：**
**Status（状态）：** STATUS_DISCONNECTED=0, STATUS_HANDSHAKING=1, STATUS_CONNECTED=2, STATUS_ERROR=3, STATUS_ERROR_HOSTNAME_MISMATCH=4
