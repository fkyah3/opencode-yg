## StreamPeerBuffer（流对等体缓冲区）<- StreamPeer（流对等体）

一种使用字节数组作为流的数据缓冲区流对等体。此对象可用于处理网络会话中的二进制数据。要处理文件中存储的二进制数据，可以直接使用 FileAccess。StreamPeerBuffer 对象维护一个内部游标，即相对于缓冲区起始位置的字节偏移量。获取和放入操作在游标位置执行，并将相应移动游标。

**属性（Props）：**
- data_array: PackedByteArray = PackedByteArray() —— 数据数组

**方法（Methods）：**
- clear() —— 清除
- duplicate() -> StreamPeerBuffer —— 复制
- get_position() -> int —— 获取位置
- get_size() -> int —— 获取大小
- resize(size: int) —— 调整大小
- seek(position: int) —— 定位
