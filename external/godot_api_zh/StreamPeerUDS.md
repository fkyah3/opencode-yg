## StreamPeerUDS（流对等端UDS）<- StreamPeerSocket（流对等端套接字）

处理 UNIX 域套接字（UDS）连接的流对等端。此对象可用于连接到 UDS 服务器，也可由 UDS 服务器返回。UNIX 域套接字使用文件系统命名空间在同一台机器上提供进程间通信。**注意：** UNIX 域套接字仅在类 UNIX 系统（Linux、macOS 等）上可用，不支持 Windows。

**方法（Methods）：**
- bind(path: String) -> int
- connect_to_host(path: String) -> int
- get_connected_path() -> String
