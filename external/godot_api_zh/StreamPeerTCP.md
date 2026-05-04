## StreamPeerTCP（TCP流对等体）<- StreamPeerSocket（流对等体套接字）

处理 TCP 连接的流对等体。此对象可用于连接到 TCP 服务器，也可由 TCP 服务器返回。**注意：** 导出到 Android 时，请确保在 Android 导出预设中启用 `INTERNET` 权限，然后再导出项目或使用一键部署。否则，任何类型的网络通信都会被 Android 阻止。

**方法（Methods）：**
- bind(port: int, host: String = "*") -> int —— 绑定
- connect_to_host(host: String, port: int) -> int —— 连接到主机
- get_connected_host() -> String —— 获取连接的主机
- get_connected_port() -> int —— 获取连接的端口
- get_local_port() -> int —— 获取本地端口
- set_no_delay(enabled: bool) —— 设置无延迟
