## PacketPeerDTLS（DTLS数据包对端）<- PacketPeer（数据包对端）

此类表示 DTLS 对端连接。可用于连接到 DTLS 服务器，并由 `DTLSServer.take_connection` 返回。**注意：** 导出到 Android 时，请确保在 Android 导出预设中启用 `INTERNET` 权限，然后再导出项目或使用一键部署。否则，任何类型的网络通信都将被 Android 阻止。**警告：** 目前不支持 TLS 证书吊销和证书固定。只要吊销的证书在其他方面有效，就会被接受。如果这是一个问题，您可能需要使用具有较短有效期的自动管理证书。

**方法（Methods）：**
- connect_to_peer(packet_peer: PacketPeerUDP, hostname: String, client_options: TLSOptions = null) -> int —— 连接到对端
- disconnect_from_peer() —— 断开与对端的连接
- get_status() -> int —— 获取状态
- poll() —— 轮询

**枚举（Enums）：**
**Status（状态）：** STATUS_DISCONNECTED=0 —— 已断开, STATUS_HANDSHAKING=1 —— 握手进行中, STATUS_CONNECTED=2 —— 已连接, STATUS_ERROR=3 —— 错误, STATUS_ERROR_HOSTNAME_MISMATCH=4 —— 主机名不匹配错误
