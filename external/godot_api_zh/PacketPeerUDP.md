## PacketPeerUDP（UDP数据包对等体） <- PacketPeer（数据包对等体）

UDP 数据包对等体。可用于发送和接收原始 UDP 数据包以及 Variant 类型。**示例：** 发送数据包：**示例：** 监听数据包：**注意：** 导出到 Android 时，请确保在 Android 导出预设中启用 `INTERNET` 权限，然后再导出项目或使用一键部署。否则，Android 会阻止任何类型的网络通信。

**方法（Methods）：**
- bind(port: int, bind_address: String = "*", recv_buf_size: int = 65536) -> int
- close()
- connect_to_host(host: String, port: int) -> int
- get_local_port() -> int
- get_packet_ip() -> String
- get_packet_port() -> int
- is_bound() -> bool
- is_socket_connected() -> bool
- join_multicast_group(multicast_address: String, interface_name: String) -> int
- leave_multicast_group(multicast_address: String, interface_name: String) -> int
- set_broadcast_enabled(enabled: bool)
- set_dest_address(host: String, port: int) -> int
- wait() -> int
