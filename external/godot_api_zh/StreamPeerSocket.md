## StreamPeerSocket（流对等套接字） <- StreamPeer（流对等）

StreamPeerSocket 是一个抽象基类，定义了基于套接字的流的通用行为。

**方法（Methods）：**
- disconnect_from_host() —— 断开与主机的连接
- get_status() -> int —— 获取状态
- poll() -> int —— 轮询

**枚举（Enums）：**
**Status（状态）：** STATUS_NONE=0 —— 无状态, STATUS_CONNECTING=1 —— 连接中, STATUS_CONNECTED=2 —— 已连接, STATUS_ERROR=3 —— 错误
