## StreamPeerGZIP（GZIP流对等体）<- StreamPeer（流对等体）

该类允许以流式方式使用 GZIP/deflate 压缩或解压缩数据。这在需要压缩或解压缩通过网络发送的文件时特别有用，无需将所有数据分配在内存中。通过 `start_compression`（或 `start_decompression`）启动流后，在此流上调用 `StreamPeer.put_partial_data` 将压缩（或解压缩）数据，将其写入内部缓冲区。调用 `StreamPeer.get_available_bytes` 将返回内部缓冲区中的待处理字节数，`StreamPeer.get_partial_data` 将从缓冲区中检索压缩（或解压缩）后的字节。流结束时，必须调用 `finish` 以确保内部缓冲区被正确刷新（请务必再调用一次 `StreamPeer.get_available_bytes` 检查之后是否还有更多数据需要读取）。

**方法（Methods）：**
- clear() —— 清除
- finish() -> int —— 完成
- start_compression(use_deflate: bool = false, buffer_size: int = 65535) -> int —— 开始压缩
- start_decompression(use_deflate: bool = false, buffer_size: int = 65535) -> int —— 开始解压缩
