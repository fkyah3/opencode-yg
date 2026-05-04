## MultiplayerPeer <- PacketPeer（数据包对等端）

管理与一个或多个远程对等端的连接，作为服务器或客户端运行，并为每个对等端分配唯一 ID。另请参见 MultiplayerAPI。**注意：** MultiplayerAPI 协议是一个实现细节，不适用于非 Godot 服务器。它可能随时更改，恕不另行通知。**注意：** 导出到 Android 时，请确保在 Android 导出预设中启用 `INTERNET` 权限，然后再导出项目或使用一键部署。否则，任何类型的网络通信都会被 Android 阻止。

**属性（Props）：**
- refuse_new_connections: bool = false
- transfer_channel: int = 0
- transfer_mode: int (MultiplayerPeer.TransferMode) = 2

**方法（Methods）：**
- close()
- disconnect_peer(peer: int, force: bool = false)
- generate_unique_id() -> int
- get_connection_status() -> int
- get_packet_channel() -> int
- get_packet_mode() -> int
- get_packet_peer() -> int
- get_unique_id() -> int
- is_server_relay_supported() -> bool
- poll()
- set_target_peer(id: int)

**信号（Signals）：**
- peer_connected(id: int)
- peer_disconnected(id: int)

**枚举（Enums）：**
**ConnectionStatus：** CONNECTION_DISCONNECTED=0, CONNECTION_CONNECTING=1, CONNECTION_CONNECTED=2
**常量（Constants）：** TARGET_PEER_BROADCAST=0, TARGET_PEER_SERVER=1
**TransferMode：** TRANSFER_MODE_UNRELIABLE=0, TRANSFER_MODE_UNRELIABLE_ORDERED=1, TRANSFER_MODE_RELIABLE=2
